import React from 'react';
import { motion } from 'framer-motion';
import { ImagePlus, Video, Sparkles, Maximize, Palette, Zap } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <ImagePlus className="w-8 h-8" />,
      title: "AI Image Generation",
      description: "Create stunning images from text descriptions using state-of-the-art AI"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Enhancement",
      description: "Upscale and enhance video quality with advanced AI processing"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Smart Retouching",
      description: "Automatically remove imperfections and enhance details"
    },
    {
      icon: <Maximize className="w-8 h-8" />,
      title: "4K Upscaling",
      description: "Convert low-resolution media to crystal clear 4K quality"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Style Transfer",
      description: "Apply artistic styles to your images and videos"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Processing",
      description: "Get results in seconds with our optimized AI models"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-serif text-gray-900 mb-12 text-center">Transform Your Media</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-gray-900 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};