'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize2, ArrowUpRight } from 'lucide-react';

interface SlideItem {
  id: number;
  section: string;
  subtitle: string;
  seoTitle: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  isQuickContact?: boolean;
  imageUrl: string;
}

const slidesData: SlideItem[] = [
  {
    id: 0,
    section: 'Studio',
    subtitle: 'London Design Studio',
    seoTitle: 'Architecture and Interior Design Studio London',
    heading: 'design matters',
    description:
      'Minale + Mann is an award-winning architectural and interior design studio based in London.',
    ctaText: 'Explore Studio',
    ctaLink: '/about',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 1,
    section: 'Services',
    subtitle: 'Residential',
    seoTitle: 'Residential Architects London',
    heading: 'Architectural Design',
    description: 'The most important material with which we design, is light.',
    ctaText: 'Read More',
    ctaLink: '/services/architectural-design?sector=residential',
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 2,
    section: 'Services',
    subtitle: 'Commercial',
    seoTitle: 'Commercial Architects',
    heading: 'Architectural Design',
    description:
      'Design is about a way of living, be it at home, in the workplace, relaxing, or entertaining. It is our duty as designers to enhance and encourage social interaction through good design.',
    ctaText: 'Read More',
    ctaLink: '/services/architectural-design?sector=commercial',
    imageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 3,
    section: 'Services',
    subtitle: 'Residential',
    seoTitle: 'Planning Applications',
    heading: 'Planning Applications',
    description:
      'Securing statutory planning consents and listed building permissions with a 95%+ success rate across prime London boroughs.',
    ctaText: 'Read More',
    ctaLink: '/services/planning-applications',
    imageUrl:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 4,
    section: 'Services',
    subtitle: 'Residential',
    seoTitle: 'Residential Interior Design London',
    heading: 'Interior Design',
    description:
      'We aspire to create an interior experience that is both memorable, and timeless.',
    ctaText: 'Read More',
    ctaLink: '/services/interior-design?sector=residential',
    imageUrl:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 5,
    section: 'Services',
    subtitle: 'Commercial',
    seoTitle: 'Commercial Interior Designers',
    heading: 'Interior Design',
    description:
      'As architects and designers it is important to focus on the experience of the space we find ourselves, as much as it is concerned with the aesthetic.',
    ctaText: 'Read More',
    ctaLink: '/services/interior-design?sector=commercial',
    imageUrl:
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 6,
    section: 'Services',
    subtitle: 'Residential',
    seoTitle: 'Conservation Architects London',
    heading: 'Conservation & Heritage Design',
    description: 'Conservation Architects to transform your heritage property.',
    ctaText: 'Read More',
    ctaLink: '/services/conservation-heritage',
    imageUrl:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 7,
    section: 'Services',
    subtitle: 'Residential',
    seoTitle: 'Residential Architectural Design Services',
    heading: 'Create & Construct',
    description:
      'Whether a new build project, or transforming a home through renovation or refurbishment; we take the ordinary and elevate to the extraordinary.',
    ctaText: 'Read More',
    ctaLink: '/services/create-construct?sector=residential',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 8,
    section: 'Services',
    subtitle: 'Commercial',
    seoTitle: 'Commercial Design and Build Company',
    heading: 'Create & Construct',
    description:
      'Turnkey design and construction management governed by architectural precision.',
    ctaText: 'Read More',
    ctaLink: '/services/create-construct?sector=commercial',
    imageUrl:
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 9,
    section: 'About',
    subtitle: 'About',
    seoTitle: 'architecture and interior design studio',
    heading: 'Minale + Mann',
    description: "At Minale + Mann we believe that 'Design Matters'.",
    ctaText: 'Read More',
    ctaLink: '/about',
    imageUrl:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=85',
  },
  {
    id: 10,
    section: 'Contact',
    subtitle: 'Contact',
    seoTitle: 'Contact',
    heading: 'Contact',
    description:
      'Contact us and let us know about your project, or find out more about our award winning services.',
    ctaText: 'Get in touch',
    ctaLink: '/contact',
    isQuickContact: true,
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85',
  },
];

export const SliderEngine: React.FC = () => {
  const {
    isOverviewMode,
    setOverviewMode,
    activeSlideIndex,
    setActiveSlideIndex,
    setActiveProjectTicker,
    openQuickContact,
  } = useNavigation();

  const [mouseSide, setMouseSide] = useState<'left' | 'right' | null>(null);
  const totalSlides = slidesData.length;
  const filmstripRef = useRef<HTMLDivElement>(null);

  // Update ticker in header whenever slide changes
  useEffect(() => {
    const currentSlide = slidesData[activeSlideIndex];
    if (currentSlide) {
      setActiveProjectTicker(`${currentSlide.section} // ${currentSlide.subtitle}`);
    }
    return () => setActiveProjectTicker('');
  }, [activeSlideIndex, setActiveProjectTicker]);

  // Navigate functions
  const nextSlide = () => {
    setActiveSlideIndex((activeSlideIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlideIndex((activeSlideIndex - 1 + totalSlides) % totalSlides);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlideIndex]);

  // Handle mouse move for sensitive edge hit areas
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOverviewMode) {
      setMouseSide(null);
      return;
    }
    const width = window.innerWidth;
    const x = e.clientX;

    if (x < width * 0.18) {
      setMouseSide('left');
    } else if (x > width * 0.82) {
      setMouseSide('right');
    } else {
      setMouseSide(null);
    }
  };

  const current = slidesData[activeSlideIndex];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouseSide(null)}
      className="relative w-full h-screen overflow-hidden bg-[#1b1b1e] text-white select-none"
    >
      {/* 1. SLIDE ENGINE CONTAINER */}
      <AnimatePresence mode="wait">
        {!isOverviewMode ? (
          /* ================= FULLSCREEN SLIDE VIEW ================= */
          <motion.div
            key={`slide-${current.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image with Ambient Subtle Ken-Burns Scaling */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 15, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={current.imageUrl}
                alt={current.heading}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center filter brightness-[0.78] contrast-[1.04]"
              />
              {/* Subtle architectural gradient for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35" />
            </motion.div>

            {/* Synchronized Typographic HUD Overlay (.captions-full) */}
            <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end p-8 sm:p-14 lg:p-20 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 sm:space-y-4"
              >
                {/* Subtitle / Sector Tag */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-neutral-300">
                    {current.subtitle}
                  </span>
                  <span className="w-8 h-[1px] bg-white/40" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400">
                    {current.section}
                  </span>
                </div>

                {/* Primary Heading */}
                <h2 className="text-3xl sm:text-5xl lg:text-7xl font-light uppercase tracking-tight text-white leading-none">
                  {current.heading}
                </h2>

                {/* Descriptive Paragraph */}
                <p className="text-sm sm:text-base lg:text-lg font-light text-neutral-300 leading-relaxed max-w-2xl pt-1">
                  {current.description}
                </p>

                {/* Ghost Action Button */}
                <div className="pt-3 pointer-events-auto">
                  {current.isQuickContact ? (
                    <button
                      type="button"
                      onClick={openQuickContact}
                      className="group inline-flex items-center gap-3 text-xs uppercase font-mono tracking-[0.25em] px-6 py-3 border border-white/40 bg-black/30 hover:bg-white hover:text-[#1b1b1e] transition-all duration-300"
                    >
                      <span>{current.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  ) : (
                    <Link
                      href={current.ctaLink}
                      className="group inline-flex items-center gap-3 text-xs uppercase font-mono tracking-[0.25em] px-6 py-3 border border-white/40 bg-black/30 hover:bg-white hover:text-[#1b1b1e] transition-all duration-300"
                    >
                      <span>{current.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* ================= 2.5D OVERVIEW / FILMSTRIP VIEW ================= */
          <motion.div
            key="overview-mode"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-30 bg-[#141416] flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-hidden"
          >
            {/* Top Bar with Exit Button */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400">
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

            {/* Panoramic Horizontal Ribbon Filmstrip */}
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
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 block">
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

            {/* Bottom Scrubber Progress Bar */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
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

      {/* 2. SENSITIVE EDGE HIT-AREAS & CUSTOM CHEVRON CURSORS */}
      {!isOverviewMode && (
        <>
          {/* Left Sensitive Hit Area (.left.back) */}
          <div
            onClick={prevSlide}
            className="absolute left-0 top-0 bottom-0 w-[18%] z-30 cursor-pointer flex items-center justify-start pl-6 sm:pl-10 group"
            aria-label="Previous slide"
          >
            <div
              className={`w-12 h-12 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                mouseSide === 'left' ? 'opacity-100 scale-110 translate-x-1' : 'opacity-0 scale-90'
              }`}
            >
              <ChevronLeft className="w-6 h-6 text-white stroke-1" />
            </div>
          </div>

          {/* Right Sensitive Hit Area (.right.next) */}
          <div
            onClick={nextSlide}
            className="absolute right-0 top-0 bottom-0 w-[18%] z-30 cursor-pointer flex items-center justify-end pr-6 sm:pr-10 group"
            aria-label="Next slide"
          >
            <div
              className={`w-12 h-12 rounded-full border border-white/25 bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                mouseSide === 'right' ? 'opacity-100 scale-110 -translate-x-1' : 'opacity-0 scale-90'
              }`}
            >
              <ChevronRight className="w-6 h-6 text-white stroke-1" />
            </div>
          </div>
        </>
      )}

      {/* 3. BOTTOM SECTION TRACKER & SLIDE COUNTER HUD */}
      {!isOverviewMode && (
        <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-16 z-20 flex items-center gap-6 text-white font-mono text-xs">
          {/* Section Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-black/40 border border-white/15 backdrop-blur-sm">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-300">
              {current.section}
            </span>
          </div>

          {/* Slide Numeric Counter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-light text-white">
              {String(activeSlideIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-neutral-500">/</span>
            <span className="text-xs text-neutral-400">
              {String(totalSlides).padStart(2, '0')}
            </span>
          </div>

          {/* Overview Toggle Button in Bottom HUD */}
          <button
            type="button"
            onClick={() => setOverviewMode(true)}
            className="p-2 border border-white/20 bg-black/30 hover:bg-white hover:text-black transition-colors focus:outline-none cursor-pointer"
            title="Open Panorama Filmstrip Overview"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4. COUNTDOWN / SLIDE PROGRESS STRIP AT BOTTOM */}
      {!isOverviewMode && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
          <motion.div
            key={current.id}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 12, ease: 'linear' }}
            className="h-full bg-white/70"
          />
        </div>
      )}
    </div>
  );
};

export default SliderEngine;
