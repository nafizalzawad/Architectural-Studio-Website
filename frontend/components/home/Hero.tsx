'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    alt: 'Minale + Mann Contemporary Minimalist Residence',
  },
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85',
    alt: 'The Battersea Powerhouse Architecture',
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85',
    alt: 'Kensington Townhouse Architectural Detail',
  },
];

export const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Subtle ambient background transition every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-[#0c0d0e] text-white">
      {/* Background Image Carousel with Ambient Fade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={HERO_IMAGES[currentImageIndex].url}
              alt={HERO_IMAGES[currentImageIndex].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center filter grayscale-[35%] contrast-[1.05]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layered Architectural Vignette / Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d0e]/80 via-[#0c0d0e]/40 to-[#0c0d0e]/95" />
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,rgba(12,13,14,0.7)_100%]" />
      </div>

      {/* Top Space Reservation for Fixed Header */}
      <div className="h-24 w-full" />

      {/* Centered Minimalist Typography */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center my-auto flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-neutral-400 mb-6 sm:mb-8"
        >
          London &bull; Battersea &bull; Global Practice
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.32em] sm:tracking-[0.38em] uppercase text-white leading-tight drop-shadow-sm pl-2"
        >
          design matters
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '4rem' }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-[1px] bg-white/40 my-8 sm:my-10"
        />

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xs sm:text-sm md:text-base font-light tracking-[0.25em] sm:tracking-[0.3em] uppercase text-neutral-300 max-w-2xl leading-relaxed"
        >
          Architecture and Interior Design Studio London
        </motion.h2>
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 pb-10 flex flex-col items-center gap-3 cursor-pointer select-none"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
          });
        }}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">
          Scroll
        </span>
        <div className="w-[1px] h-9 bg-neutral-700 relative overflow-hidden">
          <motion.div
            animate={{
              y: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
