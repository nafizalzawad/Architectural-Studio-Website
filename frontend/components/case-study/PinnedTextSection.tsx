'use client';

import React from 'react';
import Image from 'next/image';

interface PinnedTextSectionProps {
  title?: string;
  paragraphs?: string[];
  images: { url: string; caption?: string }[];
}

export const PinnedTextSection: React.FC<PinnedTextSectionProps> = ({
  title = 'Interior Design',
  paragraphs = [
    'The backdrop for the interior is kept disciplined throughout the home to accentuate core architectural features. Soft grey lime-washed walls reflect shifting London daylight and instill a sense of calm, while bandsawn European oak flooring adds tactile texture and warmth.',
    'Generous ceiling heights and open expanses of space create an authentic gallery atmosphere. More secluded retreats can be found in the private walnut-lined library, the master dressing suite, and the subterranean wellness spa.',
    'A curated selection of natural materials — including honed Pietra di Fossena marble, patinated bronze, and hand-rubbed timber — harmonizes the imposing structural volumes into an inviting family sanctuary.',
  ],
  images,
}) => {
  return (
    <section className="w-full bg-white text-[#1b1b1e] py-16 sm:py-24 px-6 sm:px-10 lg:px-16 border-b border-neutral-200">
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left Column: Scrolling Image Stack */}
        <div className="lg:col-span-7 space-y-12 sm:space-y-16">
          {images.map((img, idx) => (
            <div key={idx} className="space-y-3">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-neutral-100 border border-neutral-200">
                <Image
                  src={img.url}
                  alt={`${title} view ${idx + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center filter contrast-[1.03]"
                />
              </div>
              {img.caption && (
                <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Right Column: Sticky / Pinned Text Container */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6 self-start">
          <div className="w-12 h-[2px] bg-[#1b1b1e]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 block">
            02 // Spatial Materiality
          </span>
          <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-[#1b1b1e]">
            {title}
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinnedTextSection;
