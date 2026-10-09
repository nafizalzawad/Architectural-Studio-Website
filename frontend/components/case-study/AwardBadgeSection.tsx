'use client';

import React from 'react';
import { Award, Trophy } from 'lucide-react';

interface AwardBadgeSectionProps {
  headline?: string;
  accolades?: string[];
}

export const AwardBadgeSection: React.FC<AwardBadgeSectionProps> = ({
  headline = 'The Sunday Times British Homes Awards',
  accolades = [
    'Winner: Best Interior Design',
    'Highly Commended: Home Transformation',
    'Shortlisted: International Design & Architecture Awards',
  ],
}) => {
  return (
    <section className="w-full bg-[#1b1b1e] text-white py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-white/10">
      <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Col: Spacer / Subtitle */}
        <div className="hidden lg:block lg:col-span-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-neutral-500">
            Critical Accolades
          </span>
        </div>

        {/* Right Col: White Hairline, Title & Medallions */}
        <div className="lg:col-span-8 space-y-6">
          <div className="w-16 h-[1.5px] bg-white" />
          <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-white leading-none">
            Award Winning
          </h2>

          <div className="space-y-2 text-base sm:text-lg text-neutral-300 font-light">
            <p className="font-medium text-white">{headline}</p>
            <ul className="space-y-1.5 pt-2 font-light text-neutral-400 text-sm sm:text-base">
              {accolades.map((acc, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-white">&ndash;</span>
                  <span>{acc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Graphical Award Badges */}
          <div className="pt-6 flex flex-wrap items-center gap-6">
            <div className="border border-white/20 p-5 bg-white/5 flex items-center gap-4">
              <Trophy className="w-8 h-8 text-white stroke-1" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  British Homes Awards
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-white font-medium">
                  Winner 2018 / 2024
                </span>
              </div>
            </div>

            <div className="border border-white/20 p-5 bg-white/5 flex items-center gap-4">
              <Award className="w-8 h-8 text-white stroke-1" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  Design & Architecture Awards
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-white font-medium">
                  Shortlisted Studio
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardBadgeSection;
