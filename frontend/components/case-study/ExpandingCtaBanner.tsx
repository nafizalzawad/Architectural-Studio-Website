'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/types/portfolio';

interface ExpandingCtaBannerProps {
  nextProject: Project;
}

export const ExpandingCtaBanner: React.FC<ExpandingCtaBannerProps> = ({
  nextProject,
}) => {
  return (
    <section className="w-full relative overflow-hidden bg-[#141416]">
      <Link
        href={`/portfolio/${nextProject.slug}`}
        className="group relative block w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden focus:outline-none"
      >
        {/* Background Image with Scale Transformation on Hover */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src={nextProject.main_image_url}
            alt={nextProject.title}
            fill
            sizes="100vw"
            className="object-cover object-center filter grayscale-[30%] contrast-[1.05] transition-all duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />
        </div>

        {/* Floating Centered Caption */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10 space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-neutral-300">
            Next Project // {nextProject.specs.sector}
          </span>
          <h2 className="text-3xl sm:text-6xl lg:text-7xl font-light uppercase tracking-tight text-white group-hover:tracking-wider transition-all duration-500">
            {nextProject.title}
          </h2>
          <div className="pt-2 flex items-center gap-3 text-xs uppercase font-mono tracking-[0.25em] text-white border-b border-white/40 pb-1 group-hover:border-white transition-all">
            <span>Explore Case Study</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </div>
        </div>
      </Link>
    </section>
  );
};

export default ExpandingCtaBanner;
