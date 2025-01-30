import React, { useState, useEffect } from 'react';
import { Generator } from '../Main/CaptionGenerator';
import { ImageGeneration } from '../Main/ImageGenerator';

export const HeroSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'caption' | 'generate'>('caption');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="pt-28 pb-20">
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-full">
              <button
                onClick={() => setActiveTab('caption')}
                className={`px-6 py-2 rounded-full ${activeTab === 'caption' ? 'bg-gray-900 text-white' : 'text-gray-700'}`}
              >
                Image Captioning
              </button>
              <button
                onClick={() => setActiveTab('generate')}
                className={`px-6 py-2 rounded-full ${activeTab === 'generate' ? 'bg-gray-900 text-white' : 'text-gray-700'}`}
              >
                Image Generation
              </button>
            </div>
          </div>

          {activeTab === 'caption' ? (
            <Generator selectedFile={selectedFile} preview={preview} onFileChange={setSelectedFile} />
          ) : (
            <ImageGeneration selectedFile={selectedFile} preview={preview} onFileChange={handleFileChange} />
          )}
        </div>
      </div>
    </section>
  );
};
