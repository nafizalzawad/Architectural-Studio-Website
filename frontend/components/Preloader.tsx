'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Check if user has already seen the preloader in this session
    const hasSeen = sessionStorage.getItem('mawk_preloader_seen');
    if (hasSeen) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('mawk_preloader_seen', 'true');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('mawk_preloader_seen', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          onClick={handleDismiss}
          className="fixed inset-0 z-[100] cursor-pointer flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.5 } }}
        >
          {/* Top Curtain */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#161618] border-b border-white/5"
          />

          {/* Bottom Curtain */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#161618] border-t border-white/5"
          />

          {/* Central Animated Vector Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Authentic MAWK Monogram Logo */}
            <div className="relative w-28 sm:w-36 h-28 sm:h-36 mb-4 flex items-center justify-center">
              <Image
                src="/images/mawk-logo-white.png"
                alt="M. A. Wakeel Khan & Associates"
                width={140}
                height={140}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400">
              Dhaka &bull; Architecture &bull; Interiors
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
