import React from 'react';
import { motion } from 'framer-motion';
import { Features } from './components/Asserts/Features';
import { Footer } from './components/Asserts/Footer';
import { Header } from './components/Asserts/Header';
import { HeroSection } from './components/Asserts/HeroSection';
import { Pricing } from './components/Asserts/HowItWorks';
import { Showcase } from './components/Asserts/Testimonials';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
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