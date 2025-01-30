import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateImage } from './api';

export const ImageGeneration: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt.trim() || !imageFile) return;

    setIsLoading(true);
    try {
      const response = await generateImage(imageFile, prompt, 0.8, 50, 7.5);
      setGeneratedImage(response.generated_image_url);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Image Preview */}
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
          <img
            src={generatedImage || "https://images.unsplash.com/photo-1737995720044-8d9bd388ff4f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt="Generated or Default"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-8"
      >
        <div>
          <h3 className="text-2xl font-serif text-gray-900 mb-4">
            AI-Powered Image Generation
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Transform your ideas into stunning AI-generated images using text prompts.
          </p>
        </div>

        <div className="space-y-6">
          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 rounded-lg border border-gray-200 outline-none"
          />

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt for image generation..."
            className="w-full p-3 rounded-lg border border-gray-200 outline-none"
            rows={3}
          />

          <motion.button
           
            onClick={handleGenerateImage}
            disabled={isLoading || !imageFile}
            className="w-full bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            {isLoading ? 'Generating...' : 'Generate Image'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
