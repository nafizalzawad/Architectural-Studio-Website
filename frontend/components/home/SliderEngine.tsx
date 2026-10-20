'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { ChevronLeft, ChevronRight, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';

export interface SlideItem {
  id: number;
  section: string;
  subtitle: string;
  seoTitle: string;
  heading: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  noCta?: boolean;
  videoUrl: string;
  posterUrl: string;
}

export const slidesData: SlideItem[] = [
  {
    id: 0,
    section: 'Studio',
    subtitle: 'M. A. WAKEEL KHAN & ASSOCIATES',
    seoTitle: 'AN ARCHITECTURAL CONSULTANCY FIRM',
    heading: 'DESIGN MATTERS',
    description:
      'M. A. WAKEEL KHAN & ASSOCIATES IS AN ARCHITECTURE & INTERIOR DESIGN STUDIO BASED IN DHAKA, BANGLADESH',
    noCta: true,
    videoUrl: '/videos/slide-1.mp4',
    posterUrl: '/images/slides/slide-1.jpg',
  },
  {
    id: 1,
    section: 'Residential',
    subtitle: 'RESIDENTIAL',
    seoTitle: 'RESIDENTIAL ARCHITECTS',
    heading: 'ARCHITECTURAL DESIGN',
    description: 'THE MOST IMPORTANT ELEMENTS ARE THE NATURAL ONES',
    ctaText: 'READ MORE',
    ctaLink: '/services/architectural-design?sector=residential',
    videoUrl: '/videos/slide-2.mp4',
    posterUrl: '/images/slides/slide-2.jpg',
  },
  {
    id: 2,
    section: 'Commercial',
    subtitle: 'COMMERCIAL',
    seoTitle: 'COMMERCIAL ARCHITECTS',
    heading: 'ARCHITECTURAL DESIGN',
    description:
      'SHAPING RESPONSIVE ENVIRONMENTS WHERE MATERIALS, CONTEXT AND HUMAN MOVEMENT REMAIN IN CONSTANT DIALOGUE—CREATING MEANINGFUL SPACES THAT EVOLVE WITH PEOPLE, PLACE AND NATURE.',
    ctaText: 'READ MORE',
    ctaLink: '/services/architectural-design?sector=commercial',
    videoUrl: '/videos/slide-3.mp4',
    posterUrl: '/images/slides/slide-3.jpg',
  },
  {
    id: 3,
    section: 'Industrial',
    subtitle: 'INDUSTRIAL',
    seoTitle: 'INDUSTRIAL ARCHITECTS',
    heading: 'ARCHITECTURAL DESIGN',
    description:
      'GREENS, WATER FEATURES, SHADED SPACES AND LANDSCAPED TERRACES SOFTEN THE BUILT ENVIRONMENT WHILE SUPPORTING BIO-DIVERSITY AND IMPROVING THE MICROCLIMATE.',
    ctaText: 'READ MORE',
    ctaLink: '/services/architectural-design?sector=industrial',
    videoUrl: '/videos/slide-4.mp4',
    posterUrl: '/images/slides/slide-4.jpg',
  },
  {
    id: 4,
    section: 'Government Institution',
    subtitle: 'GOVERNMENT INSTITUTION',
    seoTitle: 'INSTITUTIONAL ARCHITECTS',
    heading: 'ARCHITECTURAL DESIGN',
    description:
      'SUSTAINABLE MATERIALS AND GREEN-FOCUSED APPROACH ENSURE LONG-TERM STABILITY AND FUNCTION-MAKING IT A SAFE AND VIBRANT HUB THAT RESPECTS NATURE\'S LIMITS FOR GENERATIONS TO COME.',
    ctaText: 'READ MORE',
    ctaLink: '/services/architectural-design?sector=institutional',
    videoUrl: '/videos/slide-5.mp4',
    posterUrl: '/images/slides/slide-5.jpg',
  },
  {
    id: 5,
    section: 'Residence Interior',
    subtitle: 'RESIDENCE INTERIOR',
    seoTitle: 'RESIDENTIAL INTERIOR ARCHITECTS',
    heading: 'INTERIOR DESIGN',
    description:
      'INTERIOR DESIGN DOES NOT REFER TO \'WHAT TO DO\'-IT ONLY SUGGESTS \'WHAT NOT TO DO\'.',
    ctaText: 'READ MORE',
    ctaLink: '/services/interior-design?sector=residential',
    videoUrl: '/videos/slide-6.mp4',
    posterUrl: '/images/slides/slide-6.jpg',
  },
];

const SLIDE_DURATION_SECONDS = 8.0;

export const SliderEngine: React.FC = () => {
  const {
    isOverviewMode,
    setOverviewMode,
    activeSlideIndex,
    setActiveSlideIndex,
    isSoundMuted,
    toggleSound,
  } = useNavigation();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const totalSlides = slidesData.length;
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const wheelLockRef = useRef<number>(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const hasInteractedRef = useRef<boolean>(false);

  // Touch gesture coordinates
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Responsive screen size detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Forcefully stop and silence all inactive video elements in the DOM
  const silenceInactiveVideos = useCallback((targetIndex: number) => {
    const allVideos = document.querySelectorAll<HTMLVideoElement>('#sliderNav video');
    allVideos.forEach((vid, i) => {
      if (i !== targetIndex) {
        vid.pause();
        vid.muted = true;
        vid.volume = 0;
        vid.currentTime = 0;
      }
    });
  }, []);

  // Navigate functions with instant audio cutoff on outgoing slide
  const nextSlide = useCallback(() => {
    const nextIdx = (activeSlideIndex + 1) % totalSlides;
    silenceInactiveVideos(nextIdx);
    setActiveSlideIndex(nextIdx);
  }, [activeSlideIndex, setActiveSlideIndex, silenceInactiveVideos, totalSlides]);

  const prevSlide = useCallback(() => {
    const prevIdx = (activeSlideIndex - 1 + totalSlides) % totalSlides;
    silenceInactiveVideos(prevIdx);
    setActiveSlideIndex(prevIdx);
  }, [activeSlideIndex, setActiveSlideIndex, silenceInactiveVideos, totalSlides]);

  // Touch Swipe Handlers for mobile ergonomics
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Minimum swipe threshold (45px) with horizontal bias
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Synchronized Video & Sound Management
  useEffect(() => {
    // 1. Strictly pause and mute all inactive videos
    silenceInactiveVideos(activeSlideIndex);

    // 2. Control active video
    if (!isOverviewMode) {
      const activeVid = videoRefs.current[activeSlideIndex];
      if (activeVid) {
        activeVid.currentTime = 0;
        activeVid.muted = isSoundMuted;
        activeVid.volume = isSoundMuted ? 0 : 1.0;

        const playPromise = activeVid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Fallback for browsers requiring initial user interaction
            activeVid.muted = true;
            activeVid.volume = 0;
            activeVid.play().catch(() => {});
          });
        }
      }
    } else {
      // In overview mode, pause everything
      const activeVid = videoRefs.current[activeSlideIndex];
      if (activeVid) {
        activeVid.pause();
        activeVid.muted = true;
        activeVid.volume = 0;
      }
    }
  }, [activeSlideIndex, isOverviewMode, isSoundMuted, silenceInactiveVideos]);

  // Unlock audio policy on first user gesture (click, tap, keydown)
  useEffect(() => {
    const unlockAudioOnGesture = () => {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;

      const activeVid = videoRefs.current[activeSlideIndex];
      if (activeVid && !isSoundMuted && !isOverviewMode) {
        activeVid.muted = false;
        activeVid.volume = 1.0;
        activeVid.play().catch(() => {});
      }
    };

    window.addEventListener('click', unlockAudioOnGesture, { once: true });
    window.addEventListener('touchstart', unlockAudioOnGesture, { once: true });
    window.addEventListener('keydown', unlockAudioOnGesture, { once: true });

    return () => {
      window.removeEventListener('click', unlockAudioOnGesture);
      window.removeEventListener('touchstart', unlockAudioOnGesture);
      window.removeEventListener('keydown', unlockAudioOnGesture);
    };
  }, [activeSlideIndex, isSoundMuted, isOverviewMode]);

  // Watchdog timer: If a video takes longer than 9.0s or ends, safely advance
  useEffect(() => {
    if (isOverviewMode) return;

    const watchdog = setTimeout(() => {
      nextSlide();
    }, 9000);

    return () => clearTimeout(watchdog);
  }, [activeSlideIndex, isOverviewMode, nextSlide]);

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
      silenceInactiveVideos(idx);
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
    const targetIdx = Math.min(totalSlides - 1, Math.floor(ratio * totalSlides));
    silenceInactiveVideos(targetIdx);
    setActiveSlideIndex(targetIdx);
  };

  const current = slidesData[activeSlideIndex];
  const targetScale = isOverviewMode ? (isMobile ? 0.6 : 0.42) : 1;

  return (
    <div
      id="sliderNav"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#141416] text-white select-none touch-pan-y"
    >
      {/* ================= 1. SECTION WRAP (Category indicator above active slide) ================= */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOverviewMode ? 1 : 0,
          y: isOverviewMode ? 0 : -15,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-10 sm:top-14 md:top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="h-3.5 sm:h-5 w-[1.5px] bg-white/70 inline-block" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white font-medium">
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
          ease: [0.76, 0, 0.24, 1], // Smooth Cubic.easeInOut
        }}
        style={{
          transformOrigin: isMobile ? '50vw 42vh' : '50vw 45vh',
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
            const isNext = idx === (activeSlideIndex + 1) % totalSlides;
            return (
              <div
                key={slide.id}
                onClick={() => handleSlideCardClick(idx)}
                className={`w-[100vw] h-[100dvh] shrink-0 relative flex flex-col justify-center items-center transition-all duration-500 ${
                  isOverviewMode ? 'cursor-pointer group' : ''
                }`}
              >
                {/* Media Container with Video Playback and Overview Border */}
                <div
                  className={`relative w-full h-full overflow-hidden transition-all duration-700 ${
                    isOverviewMode
                      ? isSelected
                        ? 'ring-1 ring-white/70 shadow-2xl opacity-100 scale-100'
                        : 'opacity-40 group-hover:opacity-85 scale-95 group-hover:scale-100'
                      : 'opacity-100'
                  }`}
                >
                  <div className="relative w-full h-full">
                    <video
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      src={slide.videoUrl}
                      poster={slide.posterUrl}
                      playsInline
                      muted={idx !== activeSlideIndex || isOverviewMode || isSoundMuted}
                      preload={isSelected || isNext ? 'auto' : 'none'}
                      onEnded={() => {
                        if (idx === activeSlideIndex && !isOverviewMode) {
                          nextSlide();
                        }
                      }}
                      className="w-full h-full object-cover object-center filter contrast-[1.03]"
                    />
                  </div>

                  {/* Editorial Contrast Gradient Overlay (Deepens on mobile for crisp text readability) */}
                  <div
                    className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${
                      isOverviewMode
                        ? isSelected
                          ? 'bg-black/10'
                          : 'bg-black/40 group-hover:bg-black/15'
                        : 'bg-gradient-to-t from-black/85 via-black/30 to-black/35 sm:from-black/60 sm:via-transparent sm:to-black/30'
                    }`}
                  />
                </div>

                {/* .append Label directly underneath each miniature slide in Overview Mode */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isOverviewMode ? (isSelected ? 1 : 0.35) : 0,
                    y: isOverviewMode ? 0 : 20,
                  }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="absolute -bottom-20 sm:-bottom-28 w-full text-center pointer-events-none select-none px-2 sm:px-4"
                >
                  <p className="text-xs sm:text-base font-light uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white truncate max-w-[280px] sm:max-w-none mx-auto">
                    {slide.heading}
                  </p>
                  <span className="text-[9px] sm:text-xs font-light uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/50 mt-0.5 sm:mt-1 block truncate max-w-[260px] sm:max-w-none mx-auto">
                    {slide.subtitle}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ================= 3. CAPTIONS HUD (Overlay bottom-left, responsive across all viewports) ================= */}
      <AnimatePresence>
        {!isOverviewMode && (
          <motion.div
            key={`caption-${current.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.25 } }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-10 sm:bottom-16 md:bottom-20 lg:bottom-24 left-5 sm:left-10 lg:left-20 right-5 sm:right-auto z-20 max-w-3xl pointer-events-none"
          >
            <div className="space-y-2.5 sm:space-y-4">
              {/* Top Subtitle Badge */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white">
                  {current.subtitle}
                </span>
                <span className="h-2.5 sm:h-3 w-[1px] bg-white/40" />
                <span className="text-[9px] sm:text-[11px] font-light uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white/70">
                  {current.seoTitle}
                </span>
              </div>

              {/* Main Editorial Heading: Fully Fluid & Responsive */}
              <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-light uppercase tracking-tight text-white leading-[1.08] sm:leading-none break-words">
                {current.heading}
              </h1>

              {/* Narrative Paragraph */}
              <p className="text-[11px] sm:text-sm md:text-[15px] text-white/90 font-light leading-relaxed max-w-xl pt-0.5 sm:pt-1 uppercase line-clamp-3 sm:line-clamp-none">
                {current.description}
              </p>

              {/* Ghost CTA Button */}
              {!current.noCta && current.ctaText && current.ctaLink && (
                <div className="pt-1 sm:pt-2 pointer-events-auto">
                  <Link
                    href={current.ctaLink}
                    className="group inline-flex items-center gap-2 sm:gap-2.5 text-[10px] sm:text-[11px] uppercase font-mono tracking-[0.2em] sm:tracking-[0.25em] px-4 sm:px-5 py-2 sm:py-2.5 border border-white/50 bg-black/50 backdrop-blur-sm hover:bg-white hover:text-[#1b1b1e] active:scale-95 transition-all duration-300"
                  >
                    <span>{current.ctaText}</span>
                    <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Ambient Sound Controller (Desktop HUD Pill, hidden on mobile where header sound button handles audio) */}
      {!isOverviewMode && (
        <div className="hidden sm:flex absolute bottom-16 md:bottom-20 lg:bottom-24 right-8 sm:right-10 lg:right-20 z-20 pointer-events-auto">
          <button
            type="button"
            onClick={toggleSound}
            className="flex items-center gap-2.5 px-4 py-2 border border-white/30 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:text-white hover:border-white transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            title={isSoundMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
            aria-label={isSoundMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
          >
            {isSoundMuted ? (
              <VolumeX className="w-4 h-4 stroke-[1.5] text-white/60" />
            ) : (
              <Volume2 className="w-4 h-4 stroke-[1.5] text-white animate-pulse" />
            )}
            <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
              {isSoundMuted ? 'Sound Off' : 'Sound On'}
            </span>
          </button>
        </div>
      )}

      {/* ================= 4. OVERVIEW MODE BOTTOM PROGRESS SCRUBBER ================= */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOverviewMode ? 1 : 0,
          y: isOverviewMode ? 0 : 20,
          pointerEvents: isOverviewMode ? 'auto' : 'none',
        }}
        transition={{ duration: 0.45 }}
        className="absolute bottom-6 sm:bottom-10 lg:bottom-14 left-0 right-0 px-5 sm:px-16 lg:px-28 z-30 flex flex-col items-center gap-2.5 sm:gap-3"
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
        <div className="flex items-center justify-between w-full text-[9px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.25em] text-white/50">
          <span>
            {String(activeSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
          <span className="hidden sm:inline">Click project or toggle [ ] to enter</span>
          <span className="truncate max-w-[120px] sm:max-w-none">{current.heading}</span>
        </div>
      </motion.div>

      {/* ================= 5. INTERACTIVE EDGE HIT-AREAS & ARROWS (Desktop only; Mobile uses intuitive touch swipes) ================= */}
      {/* Left Hit-Area */}
      <button
        type="button"
        onClick={prevSlide}
        className={`hidden md:flex absolute left-0 top-0 bottom-0 z-20 focus:outline-none items-center transition-all ${
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
        className={`hidden md:flex absolute right-0 top-0 bottom-0 z-20 focus:outline-none items-center justify-end transition-all ${
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

      {/* ================= 6. SILKY SMOOTH GPU-ACCELERATED PROGRESS BAR ================= */}
      {!isOverviewMode && (
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/10 z-20 pointer-events-none overflow-hidden">
          <motion.div
            key={`progress-bar-${activeSlideIndex}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: SLIDE_DURATION_SECONDS,
              ease: 'linear',
            }}
            style={{ transformOrigin: '0% 50%' }}
            className="w-full h-full bg-white/80 will-change-transform"
          />
        </div>
      )}
    </div>
  );
};

export default SliderEngine;
