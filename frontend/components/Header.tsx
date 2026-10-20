'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useNavigation } from '@/context/NavigationContext';

export const Header: React.FC = () => {
  const {
    isOpen,
    toggleOpen,
    headerTheme,
    isOverviewMode,
    toggleOverviewMode,
    isSoundMuted,
    toggleSound,
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none ${
        isHomepage
          ? 'bg-transparent py-4 sm:py-7 lg:py-9'
          : isScrolled && !isOpen
          ? 'bg-[#1b1b1e]/90 backdrop-blur-md border-b border-white/10 py-3.5 sm:py-5 shadow-lg'
          : 'bg-transparent py-4 sm:py-7 lg:py-9'
      }`}
    >
      <div className="w-full px-5 sm:px-10 lg:px-20 flex items-center justify-between pointer-events-auto">
        {/* Left: Authentic M. A. Wakeel Khan & Associates (MAWK) Logo Monogram */}
        <Link
          href="/"
          className="group flex items-center focus:outline-none transition-opacity hover:opacity-85"
          aria-label="M. A. Wakeel Khan & Associates"
        >
          <Image
            src={isDarkText ? '/images/mawk-logo-dark.png' : '/images/mawk-logo-white.png'}
            alt="M. A. Wakeel Khan & Associates"
            width={84}
            height={84}
            priority
            className="w-11 sm:w-14 md:w-18 h-auto object-contain transition-all duration-300"
          />
        </Link>

        {/* Right: Sound Controller, Overview View-Toggle Icon, Minimalist Hamburger */}
        <div className="flex items-center gap-3.5 sm:gap-6 md:gap-7">
          {/* Audio Sound Toggle with Animated Architectural Equalizer */}
          {isHomepage && (
            <button
              type="button"
              onClick={toggleSound}
              className="p-1.5 sm:p-1 focus:outline-none transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer flex items-center gap-1.5 sm:gap-2"
              title={isSoundMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
              aria-label={isSoundMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
            >
              <div className="flex items-end gap-[2px] h-3 sm:h-3.5">
                <span
                  className={`w-[1.5px] ${isDarkText ? 'bg-[#1b1b1e]' : 'bg-white'} rounded-full transition-all duration-300 ${
                    isSoundMuted ? 'h-1 opacity-30' : 'h-2.5 sm:h-3 animate-pulse'
                  }`}
                />
                <span
                  className={`w-[1.5px] ${isDarkText ? 'bg-[#1b1b1e]' : 'bg-white'} rounded-full transition-all duration-300 ${
                    isSoundMuted ? 'h-1 opacity-30' : 'h-3 sm:h-3.5 animate-pulse [animation-delay:150ms]'
                  }`}
                />
                <span
                  className={`w-[1.5px] ${isDarkText ? 'bg-[#1b1b1e]' : 'bg-white'} rounded-full transition-all duration-300 ${
                    isSoundMuted ? 'h-1 opacity-30' : 'h-1.5 sm:h-2 animate-pulse [animation-delay:300ms]'
                  }`}
                />
              </div>
              <span
                className={`text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase transition-colors ${
                  isDarkText ? 'text-[#1b1b1e]' : 'text-white'
                } ${isSoundMuted ? 'opacity-40 group-hover:opacity-80' : 'opacity-85 group-hover:opacity-100'} hidden md:inline`}
              >
                {isSoundMuted ? 'Muted' : 'Sound'}
              </span>
            </button>
          )}

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
