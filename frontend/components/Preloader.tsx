'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Check if user has already seen the preloader in this session
    const hasSeen = sessionStorage.getItem('mm_preloader_seen');
    if (hasSeen) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('mm_preloader_seen', 'true');
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.5 } }}
        >
          {/* Top Curtain */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#1b1b1e] border-b border-white/5"
          />

          {/* Bottom Curtain */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#1b1b1e] border-t border-white/5"
          />

          {/* Central Animated Vector Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Authentic Minale + Mann Geometric Facet Monogram SVG */}
            <svg
              viewBox="0 0 269 95.6"
              className="w-36 sm:w-44 h-auto fill-white mb-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="269,94.5 237.4,0 237.4,0 221.6,0 221.6,0 197.8,71 174,0 174,0 158.3,0 158.3,0 134.5,71 110.7,0 110.7,0 95,0 95,0 71.2,71 47.4,0 47.4,0 31.7,0 31.7,0 0,94.5 15.7,94.5 39.5,23.4 63.3,94.5 63.4,94.5 79.1,94.5 79.1,94.5 102.9,23.4 126.7,94.5 126.7,94.5 142.4,94.5 142.4,94.5 166.2,23.4 190,94.5 190,94.5 205.7,94.5 205.7,94.5 229.5,23.4 253.3,94.5" />
            </svg>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400">
              London &bull; Architecture &bull; Interiors
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
