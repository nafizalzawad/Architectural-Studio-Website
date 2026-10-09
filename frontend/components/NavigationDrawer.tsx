'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import {
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  X,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

interface SubService {
  title: string;
  href: string;
}

interface ServiceItem {
  title: string;
  href?: string;
  subItems?: SubService[];
}

const serviceItems: ServiceItem[] = [
  {
    title: 'Architectural Design',
    href: '/services/architectural-design',
  },
  {
    title: 'Planning Applications',
    href: '/services/planning-applications',
  },
  {
    title: 'Interior Design',
    href: '/services/interior-design',
    subItems: [
      { title: 'Residential', href: '/services/interior-design/residential' },
      { title: 'Commercial', href: '/services/interior-design/commercial' },
    ],
  },
  {
    title: 'Conservation & Heritage',
    href: '/services/conservation-heritage',
  },
  {
    title: 'Create & Construct',
    href: '/services/create-construct',
  },
];

export const NavigationDrawer: React.FC = () => {
  const { isOpen, closeMenu } = useNavigation();

  // Accordion state
  const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
  const [isInteriorDesignOpen, setIsInteriorDesignOpen] = useState<boolean>(false);

  // Reset nested open states when drawer closes
  React.useEffect(() => {
    if (!isOpen) {
      setIsServicesOpen(false);
      setIsInteriorDesignOpen(false);
    }
  }, [isOpen]);

  // Framer Motion variants
  const drawerVariants = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    open: {
      opacity: 1,
      y: '0%',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const menuContainerVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.25,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const accordionVariants = {
    collapsed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
    },
    expanded: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          initial="closed"
          animate="open"
          exit="closed"
          variants={drawerVariants}
          className="fixed inset-0 z-40 bg-[#0a0a0c] text-white flex flex-col justify-between overflow-y-auto"
        >
          {/* Header Bar inside Drawer for close action & branding */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-7 md:pt-8 pb-4 flex items-center justify-between border-b border-white/10">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-sm sm:text-base font-light tracking-[0.28em] uppercase text-white hover:opacity-75 transition-opacity"
            >
              Minale + Mann
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              className="group flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Close navigation menu"
            >
              <span>Close</span>
              <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* Main Navigation Content Grid */}
          <div className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Primary Nav Links (8 cols) */}
            <motion.nav
              variants={menuContainerVariants}
              initial="closed"
              animate="open"
              className="lg:col-span-8 flex flex-col space-y-6 sm:space-y-8"
            >
              {/* Top-Level: SERVICES with nested accordion */}
              <motion.div variants={menuItemVariants} className="border-b border-white/10 pb-6">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsServicesOpen((prev) => !prev)}
                    className="group flex items-center gap-4 text-2xl sm:text-4xl md:text-5xl font-light tracking-tight hover:text-neutral-300 transition-colors focus:outline-none text-left"
                    aria-expanded={isServicesOpen}
                  >
                    <span className="text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-widest">
                      01
                    </span>
                    <span className="uppercase tracking-[0.08em]">Services</span>
                    <ChevronDown
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-neutral-400 transition-transform duration-300 ${
                        isServicesOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  {/* Back button visible when Services accordion is expanded */}
                  {isServicesOpen && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsServicesOpen(false);
                        setIsInteriorDesignOpen(false);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors px-3 py-1.5 rounded border border-white/10 hover:border-white/30"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  )}
                </div>

                {/* Level 1 Services Accordion Content */}
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      variants={accordionVariants}
                      className="overflow-hidden pl-7 sm:pl-12 pt-6 space-y-4"
                    >
                      {serviceItems.map((item) => {
                        // Nested Sub-Accordion for "Interior Design"
                        if (item.subItems) {
                          return (
                            <div key={item.title} className="pt-2 pb-2">
                              <div className="flex items-center justify-between">
                                <button
                                  type="button"
                                  onClick={() => setIsInteriorDesignOpen((prev) => !prev)}
                                  className="group flex items-center gap-3 text-lg sm:text-2xl font-light text-neutral-300 hover:text-white transition-colors focus:outline-none"
                                  aria-expanded={isInteriorDesignOpen}
                                >
                                  <ChevronRight
                                    className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                                      isInteriorDesignOpen ? 'rotate-90 text-white' : ''
                                    }`}
                                  />
                                  <span className="tracking-wide">{item.title}</span>
                                </button>

                                {/* Back button for Interior Design nested level */}
                                {isInteriorDesignOpen && (
                                  <button
                                    type="button"
                                    onClick={() => setIsInteriorDesignOpen(false)}
                                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-neutral-400 hover:text-white transition-colors px-2.5 py-1 rounded border border-white/10"
                                  >
                                    <ArrowLeft className="w-3 h-3" />
                                    <span>Back to Services</span>
                                  </button>
                                )}
                              </div>

                              {/* Level 2 Sub-items: Residential, Commercial */}
                              <AnimatePresence>
                                {isInteriorDesignOpen && (
                                  <motion.div
                                    initial="collapsed"
                                    animate="expanded"
                                    exit="collapsed"
                                    variants={accordionVariants}
                                    className="overflow-hidden pl-7 sm:pl-10 pt-3 space-y-2.5"
                                  >
                                    {item.subItems.map((sub) => (
                                      <div key={sub.title}>
                                        <Link
                                          href={sub.href}
                                          onClick={closeMenu}
                                          className="group inline-flex items-center gap-2 text-sm sm:text-base font-light text-neutral-400 hover:text-white transition-colors"
                                        >
                                          <span className="w-1.5 h-[1px] bg-neutral-500 group-hover:w-3 group-hover:bg-white transition-all" />
                                          <span>{sub.title}</span>
                                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-400" />
                                        </Link>
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        }

                        // Regular service items
                        return (
                          <div key={item.title}>
                            <Link
                              href={item.href || '#'}
                              onClick={closeMenu}
                              className="group inline-flex items-center gap-3 text-lg sm:text-2xl font-light text-neutral-300 hover:text-white transition-colors"
                            >
                              <span className="tracking-wide">{item.title}</span>
                              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-400" />
                            </Link>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Top-Level: PORTFOLIO */}
              <motion.div variants={menuItemVariants} className="border-b border-white/10 pb-6">
                <Link
                  href="/portfolio"
                  onClick={closeMenu}
                  className="group flex items-center justify-between text-2xl sm:text-4xl md:text-5xl font-light tracking-tight hover:text-neutral-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-widest">
                      02
                    </span>
                    <span className="uppercase tracking-[0.08em]">Portfolio</span>
                  </div>
                  <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </Link>
              </motion.div>

              {/* Top-Level: ABOUT */}
              <motion.div variants={menuItemVariants} className="border-b border-white/10 pb-6">
                <Link
                  href="/about"
                  onClick={closeMenu}
                  className="group flex items-center justify-between text-2xl sm:text-4xl md:text-5xl font-light tracking-tight hover:text-neutral-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-widest">
                      03
                    </span>
                    <span className="uppercase tracking-[0.08em]">About</span>
                  </div>
                  <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </Link>
              </motion.div>

              {/* Top-Level: CONTACT */}
              <motion.div variants={menuItemVariants} className="border-b border-white/10 pb-6">
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="group flex items-center justify-between text-2xl sm:text-4xl md:text-5xl font-light tracking-tight hover:text-neutral-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs sm:text-sm font-mono text-neutral-500 uppercase tracking-widest">
                      04
                    </span>
                    <span className="uppercase tracking-[0.08em]">Contact</span>
                  </div>
                  <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </Link>
              </motion.div>
            </motion.nav>

            {/* Architectural Studio Information Panel (4 cols) */}
            <motion.div
              variants={menuItemVariants}
              className="lg:col-span-4 flex flex-col justify-between space-y-10 border-l border-white/10 lg:pl-10 text-neutral-400"
            >
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-4">
                  Studio Inquiry
                </h3>
                <p className="text-sm font-light text-neutral-300 leading-relaxed mb-6">
                  Bespoke architectural design, comprehensive planning, and turn-key construction
                  crafted for distinguished residences and commercial spaces.
                </p>

                <div className="space-y-3 text-xs sm:text-sm font-light text-neutral-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                    <span>39-41 Battersea Park Road, London SW11 4LS</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                    <a
                      href="tel:+442077386732"
                      className="hover:text-white transition-colors"
                    >
                      +44 (0)20 7738 6732
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                    <a
                      href="mailto:studio@minaleandmann.com"
                      className="hover:text-white transition-colors"
                    >
                      studio@minaleandmann.com
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-3">
                  Connect
                </h3>
                <div className="flex items-center gap-5 text-xs uppercase tracking-widest text-neutral-400">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                  <span className="text-neutral-700">&bull;</span>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Pinterest
                  </a>
                  <span className="text-neutral-700">&bull;</span>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Bar inside Drawer */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 uppercase tracking-widest">
            <span>&copy; {new Date().getFullYear()} Minale + Mann Architects</span>
            <div className="flex items-center gap-6 mt-2 sm:mt-0">
              <Link href="/privacy-policy" onClick={closeMenu} className="hover:text-neutral-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" onClick={closeMenu} className="hover:text-neutral-300 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationDrawer;
