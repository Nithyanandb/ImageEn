import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="pt-28 pb-20">
          {/* Top Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-semibold tracking-wider text-gray-900 mb-6 uppercase">
              Introducing AI
            </h2>
            <h1 className="text-6xl md:text-7xl font-serif text-gray-900 leading-tight mb-8 max-w-4xl mx-auto">
              Transform your media with the power of AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Experience the future of content enhancement with our state-of-the-art AI technology.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
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
                    src="https://images.unsplash.com/photo-1736267739939-6ee19bbe7fae?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Premium Camera"
                    className="w-full h-full object-cover opacity-90"
                  />
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <img
                  src="https://plus.unsplash.com/premium_photo-1720441309407-ef290ed869a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwbHVzLWZlZWR8MTZ8fHxlbnwwfHx8fHw%3D"
                  alt="AI Processing"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-serif text-gray-900 mb-4">
                  Elevate Your Content
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're a professional photographer, content creator, or enthusiast, our AI-powered tools will help you achieve stunning results in seconds.
                </p>
              </div>

              <div className="space-y-6">
                <label className="block">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl cursor-pointer hover:bg-gray-800 transition-all duration-300"
                  >
                    <Upload className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">Upload Your Media</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                    />
                  </motion.div>
                </label>
                <p className="text-sm text-gray-500 text-center">
                  Supports JPG, PNG, MP4, MOV up to 100MB
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">4K Upscaling</h4>
                  <p className="text-gray-600">Transform low-res content into crystal clear quality</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">AI Enhancement</h4>
                  <p className="text-gray-600">Perfect colors, details, and composition instantly</p>
                </div>
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-gray-900 font-medium"
              >
                Learn more about our technology
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};