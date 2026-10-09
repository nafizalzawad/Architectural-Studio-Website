'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavigation } from '@/context/NavigationContext';

export const Header: React.FC = () => {
  const {
    isOpen,
    toggleOpen,
    headerTheme,
    isOverviewMode,
    toggleOverviewMode,
  } = useNavigation();

  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkText = headerTheme === 'black' && !isScrolled && !isOpen;
  const logoFill = isDarkText ? 'fill-[#1b1b1e]' : 'fill-white';
  const iconStroke = isDarkText ? 'border-[#1b1b1e]' : 'border-white';
  const burgerBg = isDarkText ? 'bg-[#1b1b1e]' : 'bg-white';
  const isHomepage = pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled && !isOpen
          ? 'bg-[#1b1b1e]/90 backdrop-blur-md border-b border-white/10 py-5 shadow-lg'
          : 'bg-transparent py-7 sm:py-9'
      }`}
    >
      <div className="w-full px-8 sm:px-12 lg:px-16 flex items-center justify-between">
        {/* Left: Authentic Minale + Mann Geometric Vector Monogram */}
        <Link
          href="/"
          className="group flex items-center focus:outline-none transition-opacity hover:opacity-80"
          aria-label="Minale + Mann"
        >
          <svg
            viewBox="0 0 269 95.6"
            className={`w-14 sm:w-16 md:w-20 h-auto ${logoFill} transition-all duration-300`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="269,94.5 237.4,0 237.4,0 221.6,0 221.6,0 197.8,71 174,0 174,0 158.3,0 158.3,0 134.5,71 110.7,0 110.7,0 95,0 95,0 71.2,71 47.4,0 47.4,0 31.7,0 31.7,0 0,94.5 15.7,94.5 39.5,23.4 63.3,94.5 63.4,94.5 79.1,94.5 79.1,94.5 102.9,23.4 126.7,94.5 126.7,94.5 142.4,94.5 142.4,94.5 166.2,23.4 190,94.5 190,94.5 205.7,94.5 205.7,94.5 229.5,23.4 253.3,94.5" />
          </svg>
        </Link>

        {/* Right: Exactly Two Minimalist Icons matching Reference Screenshot */}
        <div className="flex items-center gap-6 sm:gap-7">
          {/* 1. Rectangular View-Toggle Icon [   ] */}
          {isHomepage && (
            <button
              type="button"
              onClick={toggleOverviewMode}
              className="p-1 focus:outline-none transition-all duration-300 hover:scale-105 group cursor-pointer"
              title={isOverviewMode ? 'Full view' : 'Overview view'}
              aria-label="Toggle view mode"
            >
              <div
                className={`w-5 sm:w-6 h-3 sm:h-3.5 border ${
                  isOverviewMode ? 'border-dashed' : 'border-solid'
                } ${iconStroke} border-[1.2px] transition-all group-hover:border-opacity-100 border-opacity-90`}
              />
            </button>
          )}

          {/* 2. Minimalist Three-Line Hamburger Icon (≡) */}
          <button
            type="button"
            onClick={toggleOpen}
            className="p-1 focus:outline-none transition-all duration-300 group cursor-pointer"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-5 sm:w-6 h-3 sm:h-3.5 flex flex-col justify-between">
              <span
                className={`block h-[1.2px] w-full ${burgerBg} transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-[5px]' : ''
                }`}
              />
              <span
                className={`block h-[1.2px] w-full ${burgerBg} transition-all duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-[1.2px] w-full ${burgerBg} transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-[5px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
