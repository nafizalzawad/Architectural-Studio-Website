'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavigation } from '@/context/NavigationContext';
import { LayoutGrid, Maximize2 } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    isOpen,
    toggleOpen,
    headerTheme,
    activeProjectTicker,
    isOverviewMode,
    toggleOverviewMode,
    openQuickContact,
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
  const textColor = isDarkText ? 'text-[#1b1b1e]' : 'text-white';
  const subTextColor = isDarkText ? 'text-[#1b1b1e]/70' : 'text-neutral-400';
  const logoFill = isDarkText ? 'fill-[#1b1b1e]' : 'fill-white';
  const hamburgerBg = isDarkText ? 'bg-[#1b1b1e]' : 'bg-white';
  const isHomepage = pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled && !isOpen
          ? 'bg-[#1b1b1e]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-xl'
          : 'bg-transparent py-6 sm:py-8'
      }`}
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Left: Vector Monogram & Dynamic Project Indicator */}
        <div className="flex items-center gap-5 sm:gap-7">
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="Minale + Mann"
          >
            {/* Authentic Minale + Mann Geometric Monogram */}
            <svg
              viewBox="0 0 269 95.6"
              className={`w-28 sm:w-36 h-auto ${logoFill} transition-all duration-300 group-hover:opacity-80`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="269,94.5 237.4,0 237.4,0 221.6,0 221.6,0 197.8,71 174,0 174,0 158.3,0 158.3,0 134.5,71 110.7,0 110.7,0 95,0 95,0 71.2,71 47.4,0 47.4,0 31.7,0 31.7,0 0,94.5 15.7,94.5 39.5,23.4 63.3,94.5 63.4,94.5 79.1,94.5 79.1,94.5 102.9,23.4 126.7,94.5 126.7,94.5 142.4,94.5 142.4,94.5 166.2,23.4 190,94.5 190,94.5 205.7,94.5 205.7,94.5 229.5,23.4 253.3,94.5" />
            </svg>
          </Link>

          {/* Active Project / Section Ticker (.project .case) */}
          {activeProjectTicker && (
            <div className="hidden md:flex items-center gap-3 pl-4 border-l border-white/20">
              <span className={`text-[10px] uppercase font-mono tracking-[0.25em] ${subTextColor}`}>
                {activeProjectTicker}
              </span>
            </div>
          )}
        </div>

        {/* Right: Controls (View-Toggle, Quick Contact, Hamburger) */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* View-Toggle Button (Only relevant on homepage slider or portfolio) */}
          {isHomepage && (
            <button
              type="button"
              onClick={toggleOverviewMode}
              className={`p-2 transition-all duration-300 hover:scale-105 ${textColor} focus:outline-none`}
              title={isOverviewMode ? 'Return to slide mode' : 'View overview filmstrip'}
              aria-label="Toggle panorama overview"
            >
              {isOverviewMode ? (
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 opacity-80 hover:opacity-100" />
              ) : (
                <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5 opacity-80 hover:opacity-100" />
              )}
            </button>
          )}

          {/* Quick Inquiry Trigger Button */}
          <button
            type="button"
            onClick={openQuickContact}
            className={`hidden sm:inline-block text-[10px] uppercase font-mono tracking-[0.25em] px-3.5 py-1.5 border transition-all duration-300 ${
              isDarkText
                ? 'border-[#1b1b1e]/30 text-[#1b1b1e] hover:bg-[#1b1b1e] hover:text-white'
                : 'border-white/25 text-white hover:bg-white hover:text-[#1b1b1e]'
            }`}
          >
            Inquire
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={toggleOpen}
            className="group flex items-center gap-3 px-2 py-2 focus:outline-none"
            aria-label={isOpen ? 'Close Navigation' : 'Open Navigation'}
            aria-expanded={isOpen}
          >
            <span
              className={`text-[11px] sm:text-xs tracking-[0.25em] uppercase font-light transition-colors ${
                isOpen ? 'text-white' : textColor
              }`}
            >
              {isOpen ? 'Close' : 'Menu'}
            </span>

            {/* Architectural 2-line Animated Hamburger */}
            <div className="w-6 h-5 relative flex flex-col justify-center items-center">
              <span
                className={`block absolute h-[1px] transition-all duration-300 ease-in-out ${
                  isOpen
                    ? 'w-5 rotate-45 top-2.5 bg-white'
                    : `w-6 -translate-y-1.5 ${hamburgerBg} group-hover:w-4`
                }`}
              />
              <span
                className={`block absolute h-[1px] transition-all duration-300 ease-in-out ${
                  isOpen
                    ? 'w-5 -rotate-45 top-2.5 bg-white'
                    : `w-4 translate-y-1.5 ${hamburgerBg} group-hover:w-6`
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
