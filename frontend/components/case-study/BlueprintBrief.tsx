'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProjectSpecs } from '@/types/portfolio';

interface BlueprintBriefProps {
  specs: ProjectSpecs;
  conceptTitle?: string;
  conceptNarrative: string;
}

export const BlueprintBrief: React.FC<BlueprintBriefProps> = ({
  specs,
  conceptTitle = 'Design Brief',
  conceptNarrative,
}) => {
  return (
    <section className="w-full bg-white text-[#1b1b1e] py-16 sm:py-24 px-6 sm:px-10 lg:px-16 border-b border-neutral-200">
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left Column: Blueprint Schematic & Dimensional Parameters */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative border border-neutral-300 p-8 sm:p-12 bg-[#fcfcfd] overflow-hidden">
            {/* Architectural Blueprint Vector Wireframe Rendering */}
            <div className="w-full aspect-[4/3] flex items-center justify-center relative">
              <svg
                viewBox="0 0 600 450"
                className="w-full h-full stroke-neutral-900 fill-none stroke-[1.2] opacity-85"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Structural Outer Wall Perimeters */}
                <rect x="40" y="40" width="520" height="370" strokeWidth="2.5" />
                <rect x="55" y="55" width="490" height="340" strokeWidth="1" strokeDasharray="4 2" />

                {/* Subterranean Light Wells & Stair Void */}
                <rect x="180" y="55" width="160" height="90" strokeWidth="1.8" />
                <line x1="180" y1="55" x2="340" y2="145" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="340" y1="55" x2="180" y2="145" strokeWidth="0.8" strokeDasharray="2 2" />
                <text x="215" y="105" className="text-[11px] font-mono fill-neutral-600 stroke-none tracking-widest">
                  LIGHT WELL VOID
                </text>

                {/* Central Staircase Core */}
                <g transform="translate(240, 200)">
                  <rect x="0" y="0" width="120" height="150" strokeWidth="1.8" />
                  <line x1="0" y1="20" x2="120" y2="20" />
                  <line x1="0" y1="40" x2="120" y2="40" />
                  <line x1="0" y1="60" x2="120" y2="60" />
                  <line x1="0" y1="80" x2="120" y2="80" />
                  <line x1="0" y1="100" x2="120" y2="100" />
                  <line x1="0" y1="120" x2="120" y2="120" />
                  <line x1="60" y1="10" x2="60" y2="140" strokeWidth="1.5" />
                  <text x="25" y="75" className="text-[9px] font-mono fill-neutral-600 stroke-none">
                    UP 24 RISERS
                  </text>
                </g>

                {/* Lateral Living & Structural Columns */}
                <rect x="40" y="180" width="160" height="230" strokeWidth="1.5" />
                <circle cx="200" cy="180" r="6" className="fill-neutral-900" />
                <circle cx="400" cy="180" r="6" className="fill-neutral-900" />
                <circle cx="200" cy="350" r="6" className="fill-neutral-900" />
                <circle cx="400" cy="350" r="6" className="fill-neutral-900" />

                {/* Technical Dimension Callouts */}
                <line x1="40" y1="25" x2="560" y2="25" strokeWidth="0.8" />
                <line x1="40" y1="18" x2="40" y2="32" strokeWidth="0.8" />
                <line x1="560" y1="18" x2="560" y2="32" strokeWidth="0.8" />
                <text x="270" y="20" className="text-[10px] font-mono fill-neutral-800 stroke-none">
                  18,400 mm
                </text>
              </svg>
            </div>

            {/* Architectural Parameters Summary */}
            <div className="pt-6 border-t border-neutral-300 font-mono text-[11px] uppercase tracking-wider text-neutral-600 space-y-1">
              <p className="font-semibold text-neutral-900">{specs.location}</p>
              <p>{specs.scope}</p>
              <p>{specs.disciplines || 'Minale + Mann Architecture & Interiors'}</p>
              <p className="text-neutral-900 font-medium">
                {specs.square_footage || '3,300 sq ft internal area'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Accent Hairline, Title & Design Brief Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <div className="w-16 h-[2px] bg-[#1b1b1e]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 block">
            01 // Architectural Genesis
          </span>
          <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-[#1b1b1e]">
            {conceptTitle}
          </h2>
          <div className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed space-y-4">
            <p className="text-lg sm:text-xl text-neutral-900 font-normal leading-relaxed">
              {conceptNarrative}
            </p>
            <p>
              The entire process included a full strip out of the main structure of the property, creating a new configuration of the internal volume across all floors. Vast open spaces with strong architectural angles, high ceilings, and calibrated daylight appear throughout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlueprintBrief;
