import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Studio | Minale + Mann Architects London',
  description:
    'Award-winning architectural and design practice based in Battersea, London. Discover our design philosophy, leadership team, and RIBA credentials.',
};

interface TeamMember {
  name: string;
  role: string;
  qualification: string;
  bio: string;
  imageSrc: string;
}

const LEADERSHIP: TeamMember[] = [
  {
    name: 'Sebastian Mann',
    role: 'Co-Founder & Creative Director',
    qualification: 'AA Dip. RIBA ARB',
    bio: 'Educated at the Architectural Association, Sebastian oversees all spatial conceptualization, material selection, and tectonic order. He has directed major residential interventions across prime London and Europe for over two decades.',
    imageSrc:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Elena Minale',
    role: 'Partner & Head of Interior Architecture',
    qualification: 'MA Interior Architecture (RCA)',
    bio: 'Guiding the studio’s bespoke joinery and materiality curation, Elena specializes in monolithic stone sculpting, acoustic lighting integration, and rare material sourcing across European quarries.',
    imageSrc:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85',
  },
  {
    name: 'Julian Sterling',
    role: 'Director of Construction & Heritage',
    qualification: 'BEng CEng MICE MCIOB',
    bio: 'With extensive experience in subterranean London excavation and Grade I/II listed building conservation, Julian bridges architectural blueprints with rigorous on-site fabrication and engineering governance.',
    imageSrc:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85',
  },
];

const ACCREDITATIONS = [
  {
    category: 'Professional Affiliations',
    items: [
      'Royal Institute of British Architects (RIBA Chartered Practice)',
      'Architects Registration Board (ARB UK Registered)',
      'British Institute of Interior Design (BIID Accredited Practice)',
      'Society for the Protection of Ancient Buildings (SPAB Member)',
    ],
  },
  {
    category: 'Selected Awards',
    items: [
      'SBID International Design Awards – Best Residential Architecture (Winner)',
      'RIBA Regional Architectural Awards – Conservation Shortlist',
      'Sunday Times British Homes Awards – Architectural Excellence',
      'FX International Interior Design Awards – Best Private Residence',
    ],
  },
  {
    category: 'Press & Monographs',
    items: [
      'Architectural Digest – "The Minimalist London Masterpiece"',
      'The Sunday Times – "Transforming Industrial Heritage in Battersea"',
      'Elle Decoration – "Monolithic Materials & The Architecture of Light"',
      'Wallpaper* Magazine – "Architects Directory Selected Practice"',
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-[#1b1b1e] text-white">
      {/* 1. Header & Philosophy Statement */}
      <section className="pt-8 sm:pt-14 pb-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full border-b border-white/10">
        <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-neutral-500 block mb-3">
          Studio Monograph // Since 2002
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight uppercase text-white leading-tight mb-8">
          The Studio
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif italic text-neutral-200 font-normal leading-snug">
              &ldquo;Design matters. It dictates how we awaken, how natural light animates our thoughts, and how architectural permanence offers sanctuary.&rdquo;
            </h2>
            <p className="text-xs sm:text-sm font-light text-neutral-400 leading-relaxed max-w-2xl">
              Minale + Mann is an award-winning London practice operating at the convergence of bespoke architecture, haute-couture interior design, and turn-key master construction. By dismantling the artificial boundaries between drawing board and construction site, our studio provides clients with a seamless, singular standard of execution.
            </p>
          </div>

          <div className="lg:col-span-4 border-l border-white/10 pl-8 space-y-3 text-xs text-neutral-400 font-light">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
              Core Principles
            </span>
            <p>&bull; Spatial Purity & Minimal Detailing</p>
            <p>&bull; Daylight as Primary Construction Material</p>
            <p>&bull; Monolithic Stone & Tactile Smoked Timber</p>
            <p>&bull; Total Governance from Sketch to Handover</p>
          </div>
        </div>
      </section>

      {/* 2. Studio Full-Bleed Imagery */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="relative aspect-[16/8] sm:aspect-[2.3/1] w-full overflow-hidden bg-neutral-900 border border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85"
            alt="Minale + Mann London Studio Workshop"
            fill
            sizes="100vw"
            className="object-cover object-center filter grayscale-[35%] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-black/70 px-3 py-1.5 border border-white/10">
              Battersea Park Road Studio // London SW11
            </span>
          </div>
        </div>
      </section>

      {/* 3. Leadership & Studio Grid */}
      <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="pb-12 mb-12 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-2">
              Studio Leadership
            </span>
            <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-white">
              Partners & Directors
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-500">
            London Practice
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {LEADERSHIP.map((member) => (
            <div key={member.name} className="flex flex-col space-y-5 group">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 border border-white/10">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center filter grayscale contrast-[1.1] transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300">
                    {member.qualification}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-light uppercase tracking-wider text-white">
                  {member.name}
                </h3>
                <span className="text-xs font-mono text-neutral-400 block">
                  {member.role}
                </span>
                <p className="text-xs font-light text-neutral-400 leading-relaxed pt-2">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Credentials & Accreditations Grid */}
      <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full border-t border-white/10">
        <div className="pb-12 mb-12 border-b border-white/10">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-2">
            Recognition & Affiliations
          </span>
          <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-white">
            Credentials & Industry Standing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {ACCREDITATIONS.map((section) => (
            <div key={section.category} className="space-y-5">
              <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 border-b border-white/10 pb-3">
                {section.category}
              </h3>
              <ul className="space-y-3.5 text-xs font-light text-neutral-300 leading-relaxed">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-neutral-600 font-mono mt-0.5">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Inquire CTA */}
      <section className="py-20 border-t border-white/10 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 block">
            Studio Engagement
          </span>
          <h3 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-white">
            Initiate A Confidential Consultation
          </h3>
          <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-lg mx-auto leading-relaxed">
            We invite prospective patrons to visit our Battersea studio to review materials and discuss emerging projects.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-neutral-900 text-xs uppercase tracking-[0.25em] font-medium hover:bg-neutral-200 transition-colors"
            >
              <span>Contact Directors</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
