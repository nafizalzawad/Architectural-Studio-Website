'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface TeaserItem {
  number: string;
  discipline: string;
  quote: string;
  narrative: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
}

const TEASERS: TeaserItem[] = [
  {
    number: '01',
    discipline: 'Architectural Design',
    quote: 'The most important material with which we design, is light.',
    narrative:
      'Spatial purity, structural poise, and environmental sensitivity. We sculpt residences that redefine modern heritage across London’s most prestigious conservation enclaves.',
    imageSrc:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Minale + Mann Contemporary Architecture Pavilion',
    href: '/services/architectural-design',
  },
  {
    number: '02',
    discipline: 'Interior Design',
    quote: 'True luxury is tactile tranquility — the quiet dialogue between raw stone and calibrated shadow.',
    narrative:
      'Custom smoked oak joinery, honed monolithic limestone, and concealed architectural luminaires curated in harmony to deliver serene domestic environments.',
    imageSrc:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Minale + Mann Bespoke Minimalist Interior Architecture',
    href: '/services/interior-design',
  },
  {
    number: '03',
    discipline: 'Create & Construct',
    quote: 'Architectural perfection demands master fabrication under singular studio governance.',
    narrative:
      'By integrating architectural conceptualisation directly with turn-key master construction, we eliminate contractor friction and translate blueprints into physical reality without compromise.',
    imageSrc:
      'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Master Craftsmanship and Precision Construction Site Execution',
    href: '/services/create-construct',
  },
];

export const ServiceTeasers: React.FC = () => {
  return (
    <section className="w-full bg-[#0c0d0e] text-white py-24 sm:py-32 lg:py-40 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between pb-16 border-b border-white/10 gap-6"
        >
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-3">
              Studio Disciplines
            </span>
            <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-white">
              Integrated Architectural Practices
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-sm leading-relaxed">
            From municipal planning consents to artisan interior finishes and turn-key structural delivery.
          </p>
        </motion.div>

        {/* Multi-Section Editorial Scroll Sequence */}
        <div className="divide-y divide-white/10">
          {TEASERS.map((teaser, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.article
                key={teaser.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`py-20 sm:py-28 lg:py-36 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Editorial Quote & Narrative Column (7 cols) */}
                <div
                  className={`lg:col-span-7 flex flex-col justify-between space-y-8 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
                      {teaser.number}
                    </span>
                    <span className="h-[1px] w-8 bg-white/20" />
                    <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-light">
                      {teaser.discipline}
                    </span>
                  </div>

                  <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic font-normal text-neutral-100 leading-[1.2] tracking-tight">
                    &ldquo;{teaser.quote}&rdquo;
                  </blockquote>

                  <p className="text-sm sm:text-base font-light text-neutral-400 leading-relaxed max-w-xl">
                    {teaser.narrative}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={teaser.href}
                      className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white hover:text-neutral-300 transition-colors"
                    >
                      <span>Explore {teaser.discipline}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </div>

                {/* Architectural Photography Column (5 cols) */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Link href={teaser.href} className="group block focus:outline-none">
                    <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden bg-neutral-900 border border-white/10">
                      <Image
                        src={teaser.imageSrc}
                        alt={teaser.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-center filter grayscale-[40%] contrast-[1.08] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                          Discipline // {teaser.number}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-white underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          View Scope
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceTeasers;
