from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from PIL import Image
import io
import requests
from transformers import pipeline
from contextlib import asynccontextmanager
import urllib.parse as parse
import torch
from diffusers import AutoencoderKL, UNet2DConditionModel, PNDMScheduler, StableDiffusionDepth2ImgPipeline
from transformers import CLIPTextModel, CLIPTokenizer, DPTForDepthEstimation, DPTImageProcessor

# Helper function to validate URL
def is_url(string):
    try:
        result = parse.urlparse(string)
        return all([result.scheme, result.netloc, result.path])
    except:
        return False

@asynccontextmanager
async def lifespan(app: FastAPI):
    global image_captioner, depth2img
    model_name = "Abdou/vit-swin-base-224-gpt2-image-captioning"
    image_captioner = pipeline("image-to-text", model=model_name)
    
    # Load image generation pipeline
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    
    try:
        vae = AutoencoderKL.from_pretrained('stabilityai/stable-diffusion-2-depth', subfolder='vae').to(device)
        tokenizer = CLIPTokenizer.from_pretrained('stabilityai/stable-diffusion-2-depth', subfolder='tokenizer')
        text_encoder = CLIPTextModel.from_pretrained('stabilityai/stable-diffusion-2-depth', subfolder='text_encoder').to(device)
        unet = UNet2DConditionModel.from_pretrained('stabilityai/stable-diffusion-2-depth', subfolder='unet').to(device)
        scheduler = PNDMScheduler(beta_start=0.00085, beta_end=0.012, beta_schedule='scaled_linear', num_train_timesteps=1000)
        depth_estimator = DPTForDepthEstimation.from_pretrained('stabilityai/stable-diffusion-2-depth', subfolder='depth_estimator')
        depth_feature_extractor = DPTImageProcessor.from_pretrained('stabilityai/stable-diffusion-2-depth', subfolder='feature_extractor')

        depth2img = StableDiffusionDepth2ImgPipeline(
            vae=vae,
            tokenizer=tokenizer,
            text_encoder=text_encoder,
            unet=unet,  
            scheduler=scheduler,
            feature_extractor=depth_feature_extractor,
            depth_estimator=depth_estimator
        ).to(device)

    except Exception as e:
        print(f"Error loading models: {e}")
        raise HTTPException(status_code=500, detail="Failed to load models")
    
    yield
    image_captioner = None
    depth2img = None
    
app = FastAPI(lifespan=lifespan)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/caption/")
async def get_caption_from_url(image_url: str):
    """Generate caption for an image from a URL."""
    if not is_url(image_url):
        raise HTTPException(status_code=400, detail="Invalid URL format")

    try:
        response = requests.get(image_url, stream=True)
        response.raise_for_status()
        image = Image.open(response.raw)

        result = image_captioner(image)
        return {"caption": result[0]['generated_text']}

    except requests.RequestException:
        raise HTTPException(status_code=400, detail="Could not fetch image from URL")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/upload/")
async def get_caption_from_file(file: UploadFile = File(...)):
    """Generate a caption from an uploaded image file."""
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        result = image_captioner(image)
        return {"caption": result[0]['generated_text']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate/")
async def generate_image_from_prompt(
    file: UploadFile = File(...), 
    prompt: str = Form(...), 
    strength: float = Form(0.8), 
    steps: int = Form(50), 
    guidance_scale: float = Form(7.5)
):
    """Generate an image based on an uploaded image and text prompt."""
    try:
        # Read and process uploaded image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        # Generate the new image
        generated_images = depth2img(prompt=prompt, image=image, strength=strength, num_inference_steps=steps, guidance_scale=guidance_scale).images
        generated_img = generated_images[0]

        # Convert image to bytes for response
        img_io = io.BytesIO()
        generated_img.save(img_io, format="PNG")
        img_io.seek(0)

        return StreamingResponse(img_io, media_type="image/png")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
