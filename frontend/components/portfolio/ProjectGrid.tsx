'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types/portfolio';

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => {
          // Deterministic asymmetrical layout based on project.id
          // Ensures the card's dimensions remain identical across filter changes to eliminate layout jumps
          const layoutSeed = project.id % 4;
          let colSpan = 'lg:col-span-6';
          let aspectRatio = 'aspect-[16/11]';

          if (layoutSeed === 1) {
            colSpan = 'lg:col-span-7';
            aspectRatio = 'aspect-[16/10]';
          } else if (layoutSeed === 2) {
            colSpan = 'lg:col-span-5';
            aspectRatio = 'aspect-[4/5]';
          } else if (layoutSeed === 3) {
            colSpan = 'lg:col-span-6';
            aspectRatio = 'aspect-[16/11]';
          } else {
            colSpan = 'lg:col-span-6';
            aspectRatio = 'aspect-[16/11]';
          }

          return (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`col-span-1 md:col-span-1 ${colSpan} group`}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="flex flex-col focus:outline-none"
                aria-label={`View case study: ${project.title}`}
              >
                {/* Image Container with Hardware-Accelerated 1.05x Hover Dynamics */}
                <div
                  className={`relative w-full ${aspectRatio} overflow-hidden bg-neutral-900 border border-white/10 transform-gpu`}
                >
                  <Image
                    src={project.main_image_url}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
                    className="object-cover object-center filter grayscale-[35%] contrast-[1.05] will-change-transform transform-gpu transition-[transform,filter] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

                  {/* Category Badge - smooth reveal badge */}
                  <div className="absolute top-4 left-4 z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-300 bg-black/70 backdrop-blur-md px-3 py-1.5 border border-white/15">
                      {project.specs.sector}
                    </span>
                  </div>

                  {/* Interactive Icon Top Right */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Text Reveal on Hover (Mobile & Desktop) */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="flex items-end justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                          {project.location} &bull; {project.completion_year}
                        </span>
                        <h3 className="text-base sm:text-xl md:text-2xl font-light uppercase tracking-wider text-white group-hover:text-neutral-200 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-neutral-500 hidden sm:inline-block">
                        View Study &rarr;
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub-Card Metadata bar */}
                <div className="pt-3 pb-1 flex items-center justify-between text-xs text-neutral-400 font-light">
                  <span className="truncate max-w-[80%]">{project.specs.scope}</span>
                  <span className="font-mono text-neutral-500 text-[11px]">
                    0{project.id}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectGrid;
