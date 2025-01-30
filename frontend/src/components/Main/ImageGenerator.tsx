import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { generateImage, generateCaption } from './api';

interface ImageGenerationProps {
  selectedFile: File | null;
  preview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageGeneration: React.FC<ImageGenerationProps> = ({ selectedFile, preview, onFileChange }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateImage = async () => {
    if (selectedFile && prompt) {
      setIsLoading(true);
      try {
        const captionResponse = await generateCaption(selectedFile);
        setCaption(captionResponse.caption);

        const imageResponse = await generateImage(selectedFile, prompt, 0.8, 50, 7.5);
        setGeneratedImage(imageResponse.generated_image_url);
      } catch (error) {
        console.error('Error generating image:', error);
      } finally {
        setIsLoading(false);
      }
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
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1737995720044-8d9bd388ff4f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Default"
              className="w-full h-full object-cover opacity-90"
            />
          )}
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
            Transform your images using text prompts with our advanced AI models.
          </p>
        </div>

        <div className="space-y-6">
          <label className="block">
            <motion.div
              className="group flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-3 rounded-xl cursor-pointer hover:bg-gray-800"
            >
              <Upload className="w-5 h-5 " />
              <span className="font-medium">Upload Image</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onFileChange}
              />
            </motion.div>
          </label>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt for image generation..."
            className="w-full p-3 rounded-lg border border-gray-200 outline-none"
            rows={3}
          />

          {selectedFile && (
            <motion.button
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0 }}
              onClick={handleGenerateImage}
              disabled={isLoading}
              className="w-full bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              {isLoading ? 'Generating...' : 'Generate Image'}
            </motion.button>
          )}

          {caption && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Generated Caption:</h4>
              <p className="text-gray-600">{caption}</p>
            </div>
          )}

          {generatedImage && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Generated Image:</h4>
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full rounded-lg"
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};