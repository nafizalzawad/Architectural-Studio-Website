'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { X, ChevronRight, Award, ArrowUpRight } from 'lucide-react';

type Tier1Item = 'services' | 'portfolio' | null;
type Tier2ServiceItem = 'architecture' | 'interior' | 'construct' | null;

export const NavigationDrawer: React.FC = () => {
  const { isOpen, closeMenu } = useNavigation();

  // Active hover/selection state across tiers
  const [activeTier1, setActiveTier1] = useState<Tier1Item>('services');
  const [activeTier2Service, setActiveTier2Service] = useState<Tier2ServiceItem>('architecture');

  // Reset states on drawer close
  React.useEffect(() => {
    if (!isOpen) {
      setActiveTier1('services');
      setActiveTier2Service('architecture');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="navigation-drawer" className="fixed inset-0 z-[90] overflow-hidden">
          {/* Backdrop veil */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeMenu}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Full-screen drawer container */}
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-[#1b1b1e] text-white flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-y-auto"
          >
            {/* Top Bar with Logo & Close Button */}
            <div className="flex items-center justify-between pb-8 border-b border-white/10">
              <Link href="/" onClick={closeMenu} className="focus:outline-none flex items-center">
                <Image
                  src="/images/mawk-logo-white.png"
                  alt="M. A. Wakeel Khan & Associates"
                  width={64}
                  height={64}
                  priority
                  className="w-12 sm:w-16 h-auto object-contain"
                />
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
                aria-label="Close navigation"
              >
                <span className="text-xs uppercase font-mono tracking-[0.25em]">Close</span>
                <X className="w-6 h-6 stroke-1 transition-transform group-hover:rotate-90" />
              </button>
            </div>

            {/* Middle: 3-Tier Cascading Horizontal Menu */}
            <div className="my-auto py-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* TIER 1: Main Menu */}
              <div className="md:col-span-4 lg:col-span-4 space-y-4 sm:space-y-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-4">
                  01 // Navigation
                </span>

                <ul className="space-y-3 sm:space-y-4">
                  {/* Services */}
                  <li>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveTier1('services')}
                      onClick={() => setActiveTier1('services')}
                      className={`text-2xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight transition-all duration-300 flex items-center gap-4 text-left w-full cursor-pointer ${
                        activeTier1 === 'services'
                          ? 'text-white translate-x-2'
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      <span>Services</span>
                      {activeTier1 === 'services' && (
                        <span className="w-2 h-2 rounded-full bg-white hidden sm:inline-block" />
                      )}
                    </button>
                  </li>

                  {/* Portfolio */}
                  <li>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveTier1('portfolio')}
                      onClick={() => setActiveTier1('portfolio')}
                      className={`text-2xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight transition-all duration-300 flex items-center gap-4 text-left w-full cursor-pointer ${
                        activeTier1 === 'portfolio'
                          ? 'text-white translate-x-2'
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      <span>Portfolio</span>
                      {activeTier1 === 'portfolio' && (
                        <span className="w-2 h-2 rounded-full bg-white hidden sm:inline-block" />
                      )}
                    </button>
                  </li>

                  {/* About */}
                  <li>
                    <Link
                      href="/about"
                      onClick={closeMenu}
                      className="text-2xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-neutral-500 hover:text-white transition-all duration-300 block"
                    >
                      About
                    </Link>
                  </li>

                  {/* Contact */}
                  <li>
                    <Link
                      href="/contact"
                      onClick={closeMenu}
                      className="text-2xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-neutral-500 hover:text-white transition-all duration-300 block"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* TIER 2: Secondary Tier (Divided by thin vertical hairline) */}
              <div className="md:col-span-4 lg:col-span-4 md:border-l border-white/10 md:pl-8 lg:pl-12 space-y-4 sm:space-y-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-4">
                  02 // Categories
                </span>

                {activeTier1 === 'services' && (
                  <ul className="space-y-3 sm:space-y-4">
                    <li>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveTier2Service('architecture')}
                        onClick={() => setActiveTier2Service('architecture')}
                        className={`text-lg sm:text-2xl font-light tracking-wide transition-all text-left w-full cursor-pointer flex items-center justify-between ${
                          activeTier2Service === 'architecture'
                            ? 'text-white'
                            : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <span>Architectural Design</span>
                        <ChevronRight className="w-4 h-4 text-neutral-600" />
                      </button>
                    </li>

                    <li>
                      <Link
                        href="/services/planning-applications"
                        onClick={closeMenu}
                        className="text-lg sm:text-2xl font-light tracking-wide text-neutral-400 hover:text-white transition-colors block"
                      >
                        Planning Applications
                      </Link>
                    </li>

                    <li>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveTier2Service('interior')}
                        onClick={() => setActiveTier2Service('interior')}
                        className={`text-lg sm:text-2xl font-light tracking-wide transition-all text-left w-full cursor-pointer flex items-center justify-between ${
                          activeTier2Service === 'interior'
                            ? 'text-white'
                            : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <span>Interior Design</span>
                        <ChevronRight className="w-4 h-4 text-neutral-600" />
                      </button>
                    </li>

                    <li>
                      <Link
                        href="/services/conservation-heritage"
                        onClick={closeMenu}
                        className="text-lg sm:text-2xl font-light tracking-wide text-neutral-400 hover:text-white transition-colors block"
                      >
                        Conservation & Heritage Design
                      </Link>
                    </li>

                    <li>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveTier2Service('construct')}
                        onClick={() => setActiveTier2Service('construct')}
                        className={`text-lg sm:text-2xl font-light tracking-wide transition-all text-left w-full cursor-pointer flex items-center justify-between ${
                          activeTier2Service === 'construct'
                            ? 'text-white'
                            : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <span>Create & Construct</span>
                        <ChevronRight className="w-4 h-4 text-neutral-600" />
                      </button>
                    </li>
                  </ul>
                )}

                {activeTier1 === 'portfolio' && (
                  <ul className="space-y-3 sm:space-y-4">
                    <li>
                      <Link
                        href="/portfolio?category=residential"
                        onClick={closeMenu}
                        className="text-lg sm:text-2xl font-light tracking-wide text-neutral-400 hover:text-white transition-colors block"
                      >
                        Residential Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/portfolio?category=commercial"
                        onClick={closeMenu}
                        className="text-lg sm:text-2xl font-light tracking-wide text-neutral-400 hover:text-white transition-colors block"
                      >
                        Commercial Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/portfolio?category=heritage"
                        onClick={closeMenu}
                        className="text-lg sm:text-2xl font-light tracking-wide text-neutral-400 hover:text-white transition-colors block"
                      >
                        Conservation & Heritage
                      </Link>
                    </li>
                  </ul>
                )}
              </div>

              {/* TIER 3: Tertiary Sector Breakdown */}
              <div className="md:col-span-4 lg:col-span-4 md:border-l border-white/10 md:pl-8 lg:pl-12 space-y-4 sm:space-y-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-4">
                  03 // Sector Scope
                </span>

                {activeTier1 === 'services' && activeTier2Service && (
                  <ul className="space-y-3 sm:space-y-4">
                    <li>
                      <Link
                        href={`/services/${
                          activeTier2Service === 'architecture'
                            ? 'architectural-design'
                            : activeTier2Service === 'interior'
                            ? 'interior-design'
                            : 'create-construct'
                        }?sector=residential`}
                        onClick={closeMenu}
                        className="text-base sm:text-xl font-light tracking-wide text-neutral-300 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <span>Residential</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/services/${
                          activeTier2Service === 'architecture'
                            ? 'architectural-design'
                            : activeTier2Service === 'interior'
                            ? 'interior-design'
                            : 'create-construct'
                        }?sector=commercial`}
                        onClick={closeMenu}
                        className="text-base sm:text-xl font-light tracking-wide text-neutral-300 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <span>Commercial</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  </ul>
                )}

                {activeTier1 === 'portfolio' && (
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xs">
                    Explore our curated case studies across prime central London, featuring detailed architectural floorplans, structural specifications, and bespoke interiors.
                  </p>
                )}
              </div>
            </div>

            {/* Bottom: Awards Emblems & Social Attribution */}
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
              {/* Award Badges */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-white stroke-1" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                    Winner: International Design & Architecture Awards
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-white stroke-1" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                    Sunday Times British Homes Awards
                  </span>
                </div>
              </div>

              {/* Social & Studio Links */}
              <div className="flex items-center gap-6">
                <a
                  href="https://www.instagram.com/minaleandmann_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="text-[10px] uppercase font-mono tracking-wider">Instagram</span>
                </a>
                <span className="text-neutral-600">&bull;</span>
                <span className="text-[10px] font-mono tracking-wider text-neutral-500">
                  Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NavigationDrawer;
