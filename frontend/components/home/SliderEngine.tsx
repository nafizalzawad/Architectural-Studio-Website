'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { ChevronLeft, ChevronRight, Maximize2, ArrowUpRight } from 'lucide-react';

interface SlideItem {
  id: number;
  section: string;
  subtitle: string;
  seoTitle: string;
  heading: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  noCta?: boolean;
  imageUrl: string;
}

const slidesData: SlideItem[] = [
  {
    id: 0,
    section: 'Studio',
    subtitle: 'LONDON DESIGN STUDIO',
    seoTitle: 'ARCHITECTURE AND INTERIOR DESIGN STUDIO LONDON',
    heading: 'DESIGN MATTERS',
    description:
      'Minale + Mann is an award winning architectural and interior design studio based in London.',
    noCta: true,
    imageUrl: 'https://minaleandmann.com/wp-content/uploads/2018/04/1-13.jpg',
  },
  {
    id: 1,
    section: 'Services',
    subtitle: 'RESIDENTIAL',
    seoTitle: 'RESIDENTIAL ARCHITECTS LONDON',
    heading: 'ARCHITECTURAL DESIGN',
    description: 'The most important material with which we design, is light.',
    ctaText: 'Read More',
    ctaLink: '/services/architectural-design?sector=residential',
    imageUrl: 'https://minaleandmann.com/wp-content/uploads/2018/05/slide_02-1600x1068.jpg',
  },
  {
    id: 2,
    section: 'Services',
    subtitle: 'COMMERCIAL',
    seoTitle: 'COMMERCIAL ARCHITECTS',
    heading: 'ARCHITECTURAL DESIGN',
    description:
      'Design is about a way of living, be it at home, in the workplace, relaxing, or entertaining. It is our duty as designers to enhance and encourage social interaction through good design.',
    ctaText: 'Read More',
    ctaLink: '/services/architectural-design?sector=commercial',
    imageUrl: 'https://minaleandmann.com/wp-content/uploads/2018/04/1-New-Size-11.jpg',
  },
  {
    id: 3,
    section: 'Services',
    subtitle: 'RESIDENTIAL',
    seoTitle: 'PLANNING APPLICATIONS',
    heading: 'PLANNING APPLICATIONS',
    description:
      'Securing statutory planning consents and listed building permissions with a 95%+ success rate across prime London boroughs.',
    ctaText: 'Read More',
    ctaLink: '/services/planning-applications',
    imageUrl: 'https://minaleandmann.com/wp-content/uploads/2018/02/6.-Planning-Archway-img-10.jpg',
  },
  {
    id: 4,
    section: 'Services',
    subtitle: 'RESIDENTIAL',
    seoTitle: 'RESIDENTIAL INTERIOR DESIGN LONDON',
    heading: 'INTERIOR DESIGN',
    description: 'We aspire to create an interior experience that is both memorable, and timeless.',
    ctaText: 'Read More',
    ctaLink: '/services/interior-design?sector=residential',
    imageUrl: 'https://minaleandmann.com/wp-content/uploads/2018/05/slide_05-1600x887.jpg',
  },
  {
    id: 5,
    section: 'Services',
    subtitle: 'COMMERCIAL',
    seoTitle: 'COMMERCIAL INTERIOR DESIGNERS',
    heading: 'INTERIOR DESIGN',
    description:
      'As architects and designers it is important to focus on the experience of the space we find ourselves, as much as it is concerned with the aesthetic.',
    ctaText: 'Read More',
    ctaLink: '/services/interior-design?sector=commercial',
    imageUrl: 'https://minaleandmann.com/wp-content/uploads/2018/04/1-New-Size-15.jpg',
  },
  {
    id: 6,
    section: 'Services',
    subtitle: 'RESIDENTIAL',
    seoTitle: 'CONSERVATION ARCHITECTS LONDON',
    heading: 'CONSERVATION & HERITAGE DESIGN',
    description: 'Conservation Architects to transform your heritage property.',
    ctaText: 'Read More',
    ctaLink: '/services/conservation-heritage',
    imageUrl: 'https://minaleandmann.com/wp-content/uploads/2018/05/slide_07-1600x1069.jpg',
  },
  {
    id: 7,
    section: 'Services',
    subtitle: 'RESIDENTIAL',
    seoTitle: 'RESIDENTIAL ARCHITECTURAL DESIGN SERVICES',
    heading: 'CREATE & CONSTRUCT',
    description:
      'Whether a new build project, or transforming a home through renovation or refurbishment; we take the ordinary and elevate to the extraordinary.',
    ctaText: 'Read More',
    ctaLink: '/services/create-construct?sector=residential',
    imageUrl: 'https://minaleandmann.com/wp-content/uploads/2018/05/slide_08-1600x1068.jpg',
  },
  {
    id: 8,
    section: 'Services',
    subtitle: 'COMMERCIAL',
    seoTitle: 'COMMERCIAL DESIGN AND BUILD COMPANY',
    heading: 'CREATE & CONSTRUCT',
    description: 'Turnkey design and construction management governed by architectural precision.',
    ctaText: 'Read More',
    ctaLink: '/services/create-construct?sector=commercial',
    imageUrl: 'https://minaleandmann.com/wp-content/uploads/2018/04/6-New-Size.jpg',
  },
  {
    id: 9,
    section: 'About',
    subtitle: 'ABOUT',
    seoTitle: 'ARCHITECTURE AND INTERIOR DESIGN STUDIO',
    heading: 'MINALE + MANN',
    description: "At Minale + Mann we believe that 'Design Matters'.",
    ctaText: 'Read More',
    ctaLink: '/about',
    imageUrl: 'https://minaleandmann.com/wp-content/uploads/2018/05/slide_10-810x1080.jpg',
  },
  {
    id: 10,
    section: 'Contact',
    subtitle: 'CONTACT',
    seoTitle: 'CONTACT LONDON STUDIO',
    heading: 'CONTACT',
    description:
      'Contact us and let us know about your project, or find out more about our award winning services.',
    ctaText: 'Get in touch',
    ctaLink: '/contact',
    imageUrl: 'https://minaleandmann.com/wp-content/uploads/2018/05/9-2.jpg',
  },
];

const AUTOPLAY_INTERVAL_MS = 6500; // 6.5 seconds per slide

export const SliderEngine: React.FC = () => {
  const {
    isOverviewMode,
    setOverviewMode,
    activeSlideIndex,
    setActiveSlideIndex,
  } = useNavigation();

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const totalSlides = slidesData.length;
  const filmstripRef = useRef<HTMLDivElement>(null);

  // Navigate functions
  const nextSlide = useCallback(() => {
    setActiveSlideIndex((activeSlideIndex + 1) % totalSlides);
  }, [activeSlideIndex, setActiveSlideIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveSlideIndex((activeSlideIndex - 1 + totalSlides) % totalSlides);
  }, [activeSlideIndex, setActiveSlideIndex, totalSlides]);

  // Autoplay timer: automatically advances to next carousel slide
  useEffect(() => {
    if (isOverviewMode || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [nextSlide, isOverviewMode, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const current = slidesData[activeSlideIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-screen overflow-hidden bg-[#1b1b1e] text-white select-none"
    >
      {/* 1. FULLSCREEN SLIDE / PANORAMA VIEW */}
      <AnimatePresence mode="wait">
        {!isOverviewMode ? (
          <motion.div
            key={`slide-${current.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image with Ambient Smooth Scaling */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.04 }}
              transition={{ duration: 8, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={current.imageUrl}
                alt={current.heading}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center filter contrast-[1.03]"
              />
              {/* Subtle ambient darkening to ensure crisp typography readability */}
              <div className="absolute inset-0 bg-black/25" />
            </motion.div>

            {/* Captions HUD matching Reference Screenshot Layout */}
            <div className="absolute bottom-16 sm:bottom-20 lg:bottom-24 left-8 sm:left-14 lg:left-20 z-20 max-w-2xl pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 sm:space-y-4"
              >
                {/* Top Badge: [LONDON DESIGN STUDIO | ARCHITECTURE AND INTERIOR DESIGN STUDIO LONDON] */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-white">
                    {current.subtitle}
                  </span>
                  <span className="h-3 w-[1px] bg-white/40" />
                  <span className="text-[10px] sm:text-[11px] font-light uppercase tracking-[0.16em] text-white/60">
                    {current.seoTitle}
                  </span>
                </div>

                {/* Primary Large Heading: [DESIGN MATTERS] */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-light uppercase tracking-tight text-white leading-none">
                  {current.heading}
                </h1>

                {/* Narrative Paragraph */}
                <p className="text-xs sm:text-sm md:text-base text-white/85 font-light leading-relaxed max-w-md pt-1">
                  {current.description}
                </p>

                {/* Optional Ghost Button (hidden on slide 0 just like reference site) */}
                {!current.noCta && current.ctaText && current.ctaLink && (
                  <div className="pt-2 pointer-events-auto">
                    <Link
                      href={current.ctaLink}
                      className="group inline-flex items-center gap-2.5 text-[11px] uppercase font-mono tracking-[0.25em] px-5 py-2.5 border border-white/40 bg-black/30 hover:bg-white hover:text-[#1b1b1e] transition-all duration-300"
                    >
                      <span>{current.ctaText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* ================= 2.5D OVERVIEW / FILMSTRIP MODE ================= */
          <motion.div
            key="overview-mode"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-30 bg-[#141416] flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden"
          >
            {/* Top Bar with Exit */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-400">
                Architectural Panorama // Index
              </span>
              <button
                type="button"
                onClick={() => setOverviewMode(false)}
                className="group flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>Full View</span>
                <Maximize2 className="w-4 h-4 stroke-1" />
              </button>
            </div>

            {/* Panoramic Horizontal Ribbon */}
            <div
              ref={filmstripRef}
              className="flex items-center gap-6 overflow-x-auto py-10 no-scrollbar scroll-smooth my-auto px-4"
            >
              {slidesData.map((s, idx) => {
                const isActive = idx === activeSlideIndex;
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      setActiveSlideIndex(idx);
                      setOverviewMode(false);
                    }}
                    className={`shrink-0 w-64 sm:w-80 cursor-pointer group transition-all duration-500 ${
                      isActive
                        ? 'scale-105 ring-2 ring-white opacity-100'
                        : 'opacity-60 hover:opacity-100 hover:scale-100'
                    }`}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 border border-white/15 mb-3">
                      <Image
                        src={s.imageUrl}
                        alt={s.heading}
                        fill
                        sizes="320px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 text-[9px] font-mono uppercase tracking-wider text-white">
                        {String(s.id + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block">
                        {s.subtitle}
                      </span>
                      <h4 className="text-sm font-light uppercase tracking-wide text-white group-hover:text-neutral-200">
                        {s.heading}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Scrubber */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>{String(activeSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}</span>
              <div className="w-48 sm:w-64 h-1 bg-white/20 relative rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${((activeSlideIndex + 1) / totalSlides) * 100}%` }}
                />
              </div>
              <span className="text-[10px] uppercase tracking-wider">Click slide to enter</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MINIMALIST EDGE ARROWS MATCHING SCREENSHOT */}
      {!isOverviewMode && (
        <>
          {/* Left Arrow (<) */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-30 p-3 text-white/50 hover:text-white transition-all hover:-translate-x-1 focus:outline-none cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
          </button>

          {/* Right Arrow (>) matching exact arrow in screenshot */}
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 p-3 text-white/70 hover:text-white transition-all hover:translate-x-1 focus:outline-none cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
          </button>
        </>
      )}

      {/* 3. SUBTLE PROGRESS TIMER BAR AT BOTTOM */}
      {!isOverviewMode && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
          <motion.div
            key={current.id}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: AUTOPLAY_INTERVAL_MS / 1000,
              ease: 'linear',
            }}
            className="h-full bg-white/75"
          />
        </div>
      )}
    </div>
  );
};

export default SliderEngine;
