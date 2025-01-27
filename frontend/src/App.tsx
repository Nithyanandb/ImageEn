import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Features } from './components/Features';
import { Pricing } from './components/HowItWorks';
import { Showcase } from './components/Testimonials';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <Features />
        <Showcase />
        <Pricing />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;