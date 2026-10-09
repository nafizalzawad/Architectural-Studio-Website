'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`min-h-screen flex flex-col ${isHomepage ? 'pt-0' : 'pt-24 md:pt-28'}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
