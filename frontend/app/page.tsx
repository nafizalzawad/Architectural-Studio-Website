import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Hero from '@/components/home/Hero';
import ServiceTeasers from '@/components/home/ServiceTeasers';
import { getProjects } from '@/lib/api';

export const revalidate = 60; // Revalidate stale data every 60 seconds

export default async function HomePage() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.filter((p) => p.is_featured).slice(0, 3);

  return (
    <div className="w-full flex flex-col bg-[#0c0d0e] text-white">
      {/* 1. Full Viewport Hero Section */}
      <Hero />

      {/* 2. Studio Ethos & Selected Works Overview */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-12 border-b border-white/10 gap-8">
          <div className="max-w-2xl space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 block">
              Curated Monograph
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight uppercase text-white leading-tight">
              Selected Works
            </h2>
            <p className="text-xs sm:text-sm font-light text-neutral-400 leading-relaxed pt-2">
              A survey of our latest architectural commissions, listed heritage restorations,
              and bespoke turn-key residences throughout London.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white hover:text-neutral-300 transition-colors self-start lg:self-end pb-1 border-b border-white/30 hover:border-white"
          >
            <span>Complete Portfolio</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredProjects.map((project, idx) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group flex flex-col focus:outline-none"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900 border border-white/10 mb-5">
                <Image
                  src={project.main_image_url}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center filter grayscale-[35%] contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10">
                    0{idx + 1} // {project.specs.sector}
                  </span>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base sm:text-lg font-light uppercase tracking-wider text-white group-hover:text-neutral-300 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-neutral-500">
                    {project.completion_year}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-light truncate">
                  {project.location} &bull; {project.specs.scope}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Editorial Philosophy & Services Showcase */}
      <ServiceTeasers />

      {/* 4. Bottom Studio Manifesto & Invitation */}
      <section className="py-24 sm:py-32 border-t border-white/10 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center space-y-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-neutral-500 block">
            The Studio Standard
          </span>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-light uppercase tracking-tight text-white leading-tight">
            Exceptional residences, <br />
            <span className="italic font-serif font-normal text-neutral-400">
              rigorously executed.
            </span>
          </h3>
          <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-xl mx-auto leading-relaxed">
            From initial sketch and planning applications to structural steel and hand-turned joinery,
            we guide clients through a unified, discreet process.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-white text-neutral-900 text-xs uppercase tracking-[0.25em] font-medium hover:bg-neutral-200 transition-colors"
            >
              Explore Portfolio
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-white/20 text-white text-xs uppercase tracking-[0.25em] font-light hover:border-white hover:bg-white/5 transition-colors"
            >
              Inquire With Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
