from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import requests
from transformers import pipeline
from contextlib import asynccontextmanager
import urllib.parse as parse
import torch
from diffusers import AutoencoderKL, UNet2DConditionModel, PNDMScheduler
from transformers import CLIPTextModel, CLIPTokenizer, DPTForDepthEstimation, DPTFeatureExtractor

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
    vae = AutoencoderKL.from_pretrained('stabilityai/stable-diffusion-2-depth', subfolder='vae').to(device)
    tokenizer = CLIPTokenizer.from_pretrained('stabilityai/stable-diffusion-2-depth', subfolder='tokenizer')
    text_encoder = CLIPTextModel.from_pretrained('stabilityai/stable-diffusion-2-depth', subfolder='text_encoder').to(device)
    unet = UNet2DConditionModel.from_pretrained('stabilityai/stable-diffusion-2-depth', subfolder='unet').to(device)
    scheduler = PNDMScheduler(beta_start=0.00085, beta_end=0.012, beta_schedule='scaled_linear', num_train_timesteps=1000)
    depth_estimator = DPTForDepthEstimation.from_pretrained('stabilityai/stable-diffusion-2-depth', subfolder='depth_estimator')
    depth_feature_extractor = DPTFeatureExtractor.from_pretrained('stabilityai/stable-diffusion-2-depth', subfolder='feature_extractor')
    
    depth2img = Depth2ImgPipeline(vae, tokenizer, text_encoder, unet, scheduler, depth_feature_extractor, depth_estimator)
    
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
    """Process an image from a URL."""
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
    """Process uploaded image files."""
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        result = image_captioner(image)
        return {"caption": result[0]['generated_text']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate/")
async def generate_image_from_prompt(file: UploadFile = File(...), prompt: str = "", strength: float = 0.8, steps: int = 50, guidance_scale: float = 7.5):
    """Generate a new image based on the uploaded image and prompt."""
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        generated_image = depth2img(prompt, image, strength, steps, guidance_scale)[0]
        generated_image.save("generated_image.png")
        
        return {"generated_image_url": "http://localhost:8000/generated_image.png"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))