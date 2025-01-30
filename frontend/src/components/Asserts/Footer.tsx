import React from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif text-gray-900 mb-4 flex items-center gap-2">
              <Wand2 className="w-6 h-6" />
              Aura Flow
            </h3>
            <p className="text-gray-600">
              Transform your media with cutting-edge AI technology.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'API', 'Documentation'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 2 }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <a href={`#${item.toLowerCase()}`}>{item}</a>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 2 }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <a href={`#${item.toLowerCase()}`}>{item}</a>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Terms', 'Privacy', 'Security'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 2 }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <a href={`#${item.toLowerCase()}`}>{item}</a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-600">
          <p>&copy; 2024 EnhanceAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};