import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { generateCaption } from './api';

interface GeneratorProps {
  selectedFile: File | null;
  preview: string | null;
  onFileChange: (file: File | null) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const Generator: React.FC<GeneratorProps> = React.memo(({ selectedFile, preview, onFileChange }) => {
  const [caption, setCaption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        onFileChange(file); // Ensure onFileChange is defined and called correctly
        setError(null);
      }
    },
    onDropRejected: (rejectedFiles) => {
      const file = rejectedFiles[0];
      if (file) {
        if (file.file.size > MAX_FILE_SIZE) {
          setError('File size exceeds the limit of 5MB.');
        } else {
          setError('Please upload a valid image file (JPEG, PNG, WEBP).');
        }
      }
    },
  });

  
  const handleGenerateCaption = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setCaption(null);

    try {
      const response = await generateCaption(selectedFile);
      setCaption(response.caption);
    } catch (err) {
      setError('Failed to generate caption. Please try again.');
      console.error('Error generating caption:', err);
    } finally {
      setIsLoading(false);
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
              data-testid="preview-image"
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1736267739939-6ee19bbe7fae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Default"
              className="w-full h-full object-cover opacity-90"
              data-testid="default-image"
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
            AI-Powered Image Captioning
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Generate accurate and descriptive captions for your images using advanced AI models.
          </p>
        </div>

        <div className="space-y-6">
          {/* File Upload Area */}
          <div
            {...getRootProps()}
            className={`group border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-gray-900 bg-gray-50' : 'border-gray-200'}
              ${isDragReject ? 'border-red-500 bg-red-50' : ''}
              ${isLoading ? 'opacity-50 pointer-events-none' : ''}
            `}
            aria-label="File upload area"
            data-testid="file-upload-area"
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-3">
              <Upload className={`w-5 h-5 ${isDragActive ? 'text-gray-900' : 'text-gray-400'}`} />
              <div>
                <p className="font-medium text-gray-900">
                  {isDragActive ? 'Drop image here' : 'Drag & drop or click to upload'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  JPEG, PNG, WEBP (max 5MB)
                </p>
              </div>
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm -mt-4" data-testid="error-message">
              {error}
            </div>
          )}

          {/* Generate Caption Button */}
          {selectedFile && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerateCaption}
              disabled={isLoading}
              className="w-full bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
              data-testid="generate-caption-button"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Caption'
              )}
            </motion.button>
          )}

          {/* Generated Caption */}
          {caption && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-gray-50 rounded-xl"
              data-testid="caption-result"
            >
              <h4 className="font-semibold text-gray-900 mb-2">Generated Caption:</h4>
              <p className="text-gray-700">{caption}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
});

Generator.displayName = 'Generator';