import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { getServices } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Practices & Disciplines | Minale + Mann Architects London',
  description:
    'Comprehensive architectural disciplines: Architectural Design, Planning Applications, Interior Design, Conservation & Heritage, and Turn-key Construction.',
};

export default function ServicesIndexPage() {
  const allServices = getServices();

  return (
    <div className="w-full bg-[#0c0d0e] text-white">
      {/* Services Header */}
      <section className="pt-8 sm:pt-14 pb-12 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full border-b border-white/10">
        <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-neutral-500 block mb-3">
          Studio Practices // London
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight uppercase text-white leading-tight">
          Architectural Disciplines
        </h1>
        <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-xl leading-relaxed mt-4">
          By uniting visionary design, statutory planning consents, master craftsmanship, and turn-key construction beneath one roof, we eliminate contractor friction.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <div className="divide-y divide-white/10">
          {allServices.map((service) => (
            <article
              key={service.slug}
              className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
            >
              <div className="lg:col-span-1 text-2xl font-mono font-light text-neutral-600">
                0{service.id}
              </div>

              <div className="lg:col-span-6 space-y-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-tight text-white group-hover:text-neutral-300 transition-colors">
                  <Link href={`/services/${service.slug}`}>
                    {service.title}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-lg leading-relaxed">
                  {service.short_description}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white group-hover:underline underline-offset-4"
                  >
                    <span>Explore Discipline</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Link href={`/services/${service.slug}`} className="block overflow-hidden border border-white/10">
                  <div className="relative aspect-[16/10] w-full bg-neutral-900">
                    <Image
                      src={service.hero_image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center filter grayscale-[35%] contrast-[1.05] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
