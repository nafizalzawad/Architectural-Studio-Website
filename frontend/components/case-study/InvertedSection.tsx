'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InvertedSectionProps {
  title?: string;
  paragraphs?: string[];
}

export const InvertedSection: React.FC<InvertedSectionProps> = ({
  title = 'Architecture',
  paragraphs = [
    'A striking contemporary staircase at the centre is the defining feature of the residence. It connects all floors, creating a vertical tunnel of daylight that cascades from the glazed roof lantern down to the subterranean living quarters, creating a shadowy interplay of texture throughout the day.',
    'The open plan layout of the lower ground floors gives the house a spacious, gallery-like feel. An eight-metre void between lower and ground floor acts as a primary light well, accentuating the vertical expanse between the levels.',
  ],
}) => {
  return (
    <section className="w-full bg-[#1b1b1e] text-white py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-y border-white/10">
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left Col: Minimalist spacing */}
        <div className="hidden lg:block lg:col-span-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-neutral-500">
            Structural Volumetrics
          </span>
        </div>

        {/* Right Col: White Hairline + Title + White Narrative */}
        <div className="lg:col-span-8 space-y-6">
          <div className="w-16 h-[1.5px] bg-white" />
          <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-white leading-none">
            {title}
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-3xl">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvertedSection;
