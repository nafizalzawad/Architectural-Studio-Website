'use client';

import React from 'react';
import Image from 'next/image';

interface AsymmetricImagesProps {
  imageLeft: { url: string; caption?: string };
  imageRight: { url: string; caption?: string };
}

export const AsymmetricImages: React.FC<AsymmetricImagesProps> = ({
  imageLeft,
  imageRight,
}) => {
  return (
    <section className="w-full bg-white text-[#1b1b1e] py-16 sm:py-24 px-6 sm:px-10 lg:px-16 border-b border-neutral-200">
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
        {/* Left Column (Padded with top offset for asymmetrical rhythm) */}
        <div className="space-y-3 pt-0 md:pt-14">
          <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
            <Image
              src={imageLeft.url}
              alt={imageLeft.caption || 'Architectural detail'}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center filter contrast-[1.04]"
            />
          </div>
          {imageLeft.caption && (
            <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
              {imageLeft.caption}
            </p>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
            <Image
              src={imageRight.url}
              alt={imageRight.caption || 'Architectural detail'}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center filter contrast-[1.04]"
            />
          </div>
          {imageRight.caption && (
            <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
              {imageRight.caption}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AsymmetricImages;
