import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm pl-16 pr-16"
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <motion.a
            href="/"
            whileHover={{ scale: 1 }}
            className="text-2xl font-serif font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent"
          >
            AuraFlow
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {['Home', 'Articles', 'About', 'Contact'].map((item) => (
              <motion.li
                key={item}
                whileHover={{ y: 0 }}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4"
          >
            <ul className="py-4 space-y-4">
              {['Home', 'Articles', 'About', 'Contact'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 4 }}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  <a href={`#${item.toLowerCase()}`}>{item}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};