'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useNavigation } from '@/context/NavigationContext';

export const Header: React.FC = () => {
  const { isOpen, toggleOpen } = useNavigation();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled && !isOpen
          ? 'bg-[#0c0d0e]/85 backdrop-blur-md border-b border-white/10 py-5'
          : 'bg-transparent py-7 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Left: Text Logo */}
        <Link
          href="/"
          className="group flex flex-col focus:outline-none"
          aria-label="Minale + Mann Homepage"
        >
          <span className="text-sm sm:text-base md:text-lg font-light tracking-[0.28em] uppercase text-white transition-opacity duration-300 group-hover:opacity-70">
            Minale + Mann
          </span>
          <span className="text-[9px] tracking-[0.35em] uppercase text-neutral-400 font-extralight transition-colors duration-300 group-hover:text-neutral-300">
            London &bull; Architecture &bull; Build
          </span>
        </Link>

        {/* Right: Minimalist Toggle Navigation Button */}
        <button
          type="button"
          onClick={toggleOpen}
          className="group flex items-center gap-3.5 px-3 py-2 text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded transition-all duration-300"
          aria-label={isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={isOpen}
          aria-controls="navigation-drawer"
        >
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-light text-neutral-300 group-hover:text-white transition-colors">
            {isOpen ? 'Close' : 'Menu'}
          </span>

          {/* Minimalist 2-line Animated Hamburger Icon */}
          <div className="w-6 h-5 relative flex flex-col justify-center items-center">
            <span
              className={`block absolute h-[1px] bg-white transition-all duration-300 ease-in-out ${
                isOpen
                  ? 'w-5 rotate-45 top-2.5 bg-white'
                  : 'w-6 -translate-y-1.5 group-hover:w-4'
              }`}
            />
            <span
              className={`block absolute h-[1px] bg-white transition-all duration-300 ease-in-out ${
                isOpen
                  ? 'w-5 -rotate-45 top-2.5 bg-white'
                  : 'w-4 translate-y-1.5 group-hover:w-6'
              }`}
            />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
