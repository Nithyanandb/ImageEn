import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Maximize, Palette } from 'lucide-react';

export const Showcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const examples = [
    {
      before: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&q=60&w=1200",
      after: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&q=100&w=1200",
      title: "AI Enhancement",
      description: "Transform your photos with intelligent color correction and detail enhancement",
      icon: <Sparkles className="w-6 h-6" />,
      stats: ["2x Sharper", "Enhanced Colors", "Reduced Noise"]
    },
    {
      before: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=60&w=1200",
      after: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=100&w=1200",
      title: "4K Upscaling",
      description: "Upgrade your content to crystal clear 4K resolution with AI-powered upscaling",
      icon: <Maximize className="w-6 h-6" />,
      stats: ["4x Resolution", "Crisp Details", "No Artifacts"]
    },
    {
      before: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=60&w=1200",
      after: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=100&w=1200",
      title: "Style Transfer",
      description: "Apply stunning artistic styles while maintaining image quality and details",
      icon: <Palette className="w-6 h-6" />,
      stats: ["100+ Styles", "Real-time", "Custom Presets"]
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-semibold tracking-wider text-gray-900 mb-6 uppercase">
            The Power of AI
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">
            See the Difference
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the transformative power of our AI technology through these stunning before-and-after comparisons.
          </p>
        </motion.div>

        {/* Examples Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image Comparison */}
              <div 
                className="relative aspect-[4/3] cursor-pointer overflow-hidden"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
                <img
                  src={example.before}
                  alt="Before"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={{ x: "100%" }}
                  animate={{ x: activeIndex === index ? "0%" : "100%" }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={example.after}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <span className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                    {activeIndex === index ? "Release to revert" : "Hold to see enhanced"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-900 text-white rounded-lg">
                    {example.icon}
                  </div>
                  <h3 className="text-xl font-serif text-gray-900">{example.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{example.description}</p>
                
                {/* Stats */}
                <div className="flex gap-4 mb-6">
                  {example.stats.map((stat, statIndex) => (
                    <div
                      key={statIndex}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {stat}
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-gray-900 font-medium group/btn"
                >
                  Try it now
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors"
          >
            <span className="font-medium">Start Enhancing Your Media</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};