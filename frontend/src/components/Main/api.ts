const API_URL = 'http://localhost:8000';

export const generateCaption = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to generate caption");
  }
  return response.json();
};

export const generateImage = async (
  image: File,
  prompt: string,
  strength: number,
  steps: number,
  guidanceScale: number
) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("prompt", prompt);
  formData.append("strength", strength.toString());
  formData.append("steps", steps.toString());
  formData.append("guidance_scale", guidanceScale.toString());

  const response = await fetch(`${API_URL}/api/generate/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to generate image");
  }
  return response.json();
};
