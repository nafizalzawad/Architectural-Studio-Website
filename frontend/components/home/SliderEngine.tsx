'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const totalSlides = slidesData.length;
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const wheelLockRef = useRef<number>(0);

  // Responsive screen size detection for exact scale matching
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigate functions
  const nextSlide = useCallback(() => {
    setActiveSlideIndex((activeSlideIndex + 1) % totalSlides);
  }, [activeSlideIndex, setActiveSlideIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveSlideIndex((activeSlideIndex - 1 + totalSlides) % totalSlides);
  }, [activeSlideIndex, setActiveSlideIndex, totalSlides]);

  // Autoplay countdown timer
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

  // Mouse wheel horizontal navigation in overview mode
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!isOverviewMode) return;
      const now = Date.now();
      if (now - wheelLockRef.current < 450) return;

      if (e.deltaY > 25 || e.deltaX > 25) {
        wheelLockRef.current = now;
        nextSlide();
      } else if (e.deltaY < -25 || e.deltaX < -25) {
        wheelLockRef.current = now;
        prevSlide();
      }
    },
    [isOverviewMode, nextSlide, prevSlide]
  );

  // Click on slide in overview mode: selects and smoothly zooms in
  const handleSlideCardClick = (idx: number) => {
    if (isOverviewMode) {
      setActiveSlideIndex(idx);
      setOverviewMode(false);
    }
  };

  // Click on bottom timeline track to jump directly to any slide
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressTrackRef.current) return;
    const rect = progressTrackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetIdx = Math.floor(ratio * totalSlides);
    setActiveSlideIndex(Math.min(totalSlides - 1, targetIdx));
  };

  const current = slidesData[activeSlideIndex];
  const targetScale = isOverviewMode ? (isMobile ? 0.52 : 0.42) : 1;

  return (
    <div
      id="sliderNav"
      onWheel={handleWheel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-screen overflow-hidden bg-[#161618] text-white select-none"
    >
      {/* ================= 1. SECTION WRAP (Category indicator above active slide) ================= */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOverviewMode ? 1 : 0,
          y: isOverviewMode ? 0 : -15,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-12 sm:top-14 md:top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <span className="h-4 sm:h-5 w-[1.5px] bg-white/70 inline-block" />
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white font-medium">
            {current.section}
          </span>
        </div>
      </motion.div>

      {/* ================= 2. CONTINUOUS CAMERA TRACK (Zoom Out / In) ================= */}
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{
          scale: targetScale,
        }}
        transition={{
          duration: 1.15,
          ease: [0.76, 0, 0.24, 1], // Smooth Cubic.easeInOut matching TweenMax
        }}
        style={{
          transformOrigin: '50vw 45vh',
        }}
      >
        {/* Continuous Horizontal Slides Track */}
        <motion.div
          className="flex h-full will-change-transform"
          animate={{
            x: `-${activeSlideIndex * 100}vw`,
          }}
          transition={{
            duration: 0.85,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {slidesData.map((slide, idx) => {
            const isSelected = idx === activeSlideIndex;
            return (
              <div
                key={slide.id}
                onClick={() => handleSlideCardClick(idx)}
                className={`w-[100vw] h-[100vh] shrink-0 relative flex flex-col justify-center items-center transition-all duration-500 ${
                  isOverviewMode ? 'cursor-pointer group' : ''
                }`}
              >
                {/* Image Container */}
                <div
                  className={`relative w-full h-full overflow-hidden transition-all duration-700 ${
                    isOverviewMode
                      ? isSelected
                        ? 'ring-1 ring-white/60 shadow-2xl opacity-100'
                        : 'opacity-40 group-hover:opacity-85'
                      : 'opacity-100'
                  }`}
                >
                  <Image
                    src={slide.imageUrl}
                    alt={slide.heading}
                    fill
                    priority={idx === 0 || isSelected}
                    sizes="100vw"
                    className="object-cover object-center filter contrast-[1.03]"
                  />
                  {/* Subtle darkening for editorial contrast */}
                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${
                      isOverviewMode
                        ? isSelected
                          ? 'bg-black/15'
                          : 'bg-black/40 group-hover:bg-black/20'
                        : 'bg-black/25'
                    }`}
                  />
                </div>

                {/* .append Label directly underneath each miniature slide */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isOverviewMode ? (isSelected ? 1 : 0.35) : 0,
                    y: isOverviewMode ? 0 : 20,
                  }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="absolute -bottom-24 sm:-bottom-28 w-full text-center pointer-events-none select-none px-4"
                >
                  <p className="text-sm sm:text-base font-light uppercase tracking-[0.25em] text-white">
                    {slide.heading}
                  </p>
                  <span className="text-[10px] sm:text-xs font-light uppercase tracking-[0.25em] text-white/50 mt-1 block">
                    {slide.subtitle}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ================= 3. CAPTIONS HUD (Overlay bottom-left, visible in full mode) ================= */}
      <AnimatePresence>
        {!isOverviewMode && (
          <motion.div
            key={`caption-${current.id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.25 } }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 sm:bottom-20 lg:bottom-24 left-8 sm:left-14 lg:left-20 z-20 max-w-2xl pointer-events-none"
          >
            <div className="space-y-3 sm:space-y-4">
              {/* Top Subtitle Badge */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  {current.subtitle}
                </span>
                <span className="h-3 w-[1px] bg-white/40" />
                <span className="text-[10px] sm:text-[11px] font-light uppercase tracking-[0.16em] text-white/60">
                  {current.seoTitle}
                </span>
              </div>

              {/* Main Editorial Heading */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-light uppercase tracking-tight text-white leading-none">
                {current.heading}
              </h1>

              {/* Narrative Paragraph */}
              <p className="text-xs sm:text-sm md:text-base text-white/85 font-light leading-relaxed max-w-md pt-1">
                {current.description}
              </p>

              {/* Ghost CTA Button */}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 4. OVERVIEW MODE BOTTOM PROGRESS SCRUBBER ================= */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOverviewMode ? 1 : 0,
          y: isOverviewMode ? 0 : 20,
          pointerEvents: isOverviewMode ? 'auto' : 'none',
        }}
        transition={{ duration: 0.45 }}
        className="absolute bottom-10 sm:bottom-14 left-0 right-0 px-8 sm:px-16 lg:px-28 z-30 flex flex-col items-center gap-3"
      >
        {/* Scrubber Track */}
        <div
          ref={progressTrackRef}
          onClick={handleProgressClick}
          className="relative w-full h-8 flex items-center cursor-pointer group"
        >
          {/* Subtle 1px Rail */}
          <div className="w-full h-[1px] bg-white/20 group-hover:bg-white/35 transition-colors" />

          {/* White Active Scrubber Bar Indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-white transition-all duration-300"
            style={{
              width: `${100 / totalSlides}%`,
              left: `${(activeSlideIndex / totalSlides) * 100}%`,
            }}
          />
        </div>

        {/* Informational Subline */}
        <div className="flex items-center justify-between w-full text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/50">
          <span>
            {String(activeSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
          <span className="hidden sm:inline">Click project or toggle [ ] to enter</span>
          <span className="truncate max-w-[150px] sm:max-w-none">{current.heading}</span>
        </div>
      </motion.div>

      {/* ================= 5. INTERACTIVE EDGE HIT-AREAS & ARROWS ================= */}
      {/* Left Hit-Area */}
      <button
        type="button"
        onClick={prevSlide}
        className={`absolute left-0 top-0 bottom-0 z-20 focus:outline-none flex items-center transition-all ${
          isOverviewMode
            ? 'w-16 sm:w-24 px-4 hover:bg-black/10'
            : 'w-20 sm:w-28 px-6 sm:px-10 group'
        }`}
        aria-label="Previous slide"
      >
        <span
          className={`p-2 rounded-full text-white/40 hover:text-white transition-all ${
            isOverviewMode
              ? 'opacity-80 hover:opacity-100 hover:-translate-x-1'
              : 'opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'
          }`}
        >
          <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
        </span>
      </button>

      {/* Right Hit-Area */}
      <button
        type="button"
        onClick={nextSlide}
        className={`absolute right-0 top-0 bottom-0 z-20 focus:outline-none flex items-center justify-end transition-all ${
          isOverviewMode
            ? 'w-16 sm:w-24 px-4 hover:bg-black/10'
            : 'w-20 sm:w-28 px-6 sm:px-10 group'
        }`}
        aria-label="Next slide"
      >
        <span
          className={`p-2 rounded-full text-white/40 hover:text-white transition-all ${
            isOverviewMode
              ? 'opacity-80 hover:opacity-100 hover:translate-x-1'
              : 'opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
          }`}
        >
          <ChevronRight className="w-6 h-6 stroke-[1.5]" />
        </span>
      </button>

      {/* ================= 6. SUBTLE AUTOPLAY TIMER LINE AT BOTTOM ================= */}
      {!isOverviewMode && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20 pointer-events-none">
          <motion.div
            key={current.id}
            initial={{ width: '0%' }}
            animate={{ width: isPaused ? undefined : '100%' }}
            transition={{
              duration: AUTOPLAY_INTERVAL_MS / 1000,
              ease: 'linear',
            }}
            className="h-full bg-white/70"
          />
        </div>
      )}
    </div>
  );
};

export default SliderEngine;
