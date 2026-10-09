import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { getServices, getServiceBySlug } from '@/lib/data';
import { getProjects } from '@/lib/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allServices = getServices();
  return allServices.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Practice Not Found | Minale + Mann',
    };
  }

  return {
    title: `${service.title} | Minale + Mann Architects`,
    description: service.short_description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Fetch projects related to this discipline
  const allProjects = await getProjects();
  const relatedProjects = allProjects
    .filter((p) => {
      if (service.related_category_slug) {
        return p.category?.slug === service.related_category_slug;
      }
      return true;
    })
    .slice(0, 3);

  return (
    <article className="w-full bg-[#0c0d0e] text-white">
      {/* 1. Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-6">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* 2. Split-Screen Hero */}
      <section className="border-y border-white/10">
        <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[82vh]">
          {/* Left Column: High-Contrast Editorial Typography (7 cols) */}
          <div className="lg:col-span-7 px-6 sm:px-12 lg:px-20 py-16 lg:py-24 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500">
                  Discipline // 0{service.id}
                </span>
                <span className="h-[1px] w-8 bg-white/20" />
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  London Studio
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight uppercase text-white leading-[1.05]">
                {service.title}
              </h1>

              {service.tagline && (
                <p className="text-lg sm:text-2xl font-serif italic text-neutral-300 font-normal leading-relaxed max-w-xl">
                  &ldquo;{service.tagline}&rdquo;
                </p>
              )}

              <p className="text-xs sm:text-sm font-light text-neutral-400 leading-relaxed max-w-xl">
                {service.full_description}
              </p>
            </div>

            {/* Scope of Work Breakdown */}
            {service.scope_of_work && (
              <div className="pt-12 mt-12 border-t border-white/10">
                <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-6">
                  Scope of Architectural Work
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light text-neutral-300">
                  {service.scope_of_work.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Full-Bleed Architectural Photography (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[420px] lg:min-h-full bg-neutral-900 overflow-hidden">
            <Image
              src={service.hero_image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85'}
              alt={service.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center filter grayscale-[30%] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-black/70 backdrop-blur-md px-3 py-1.5 border border-white/10">
                Practice Reference // Plate 0{service.id}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Process & Execution Timeline */}
      {service.process && service.process.length > 0 && (
        <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
          <div className="pb-16 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-3">
                Methodology & Rigour
              </span>
              <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-white">
                Process & Execution
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-md leading-relaxed">
              Every commission proceeds through five distinct milestones to guarantee statutory compliance, cost control, and design integrity.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-white/10 pt-8 border-b border-white/10">
            {service.process.map((step) => (
              <div key={step.step} className="py-8 md:py-0 md:px-6 first:pl-0 last:pr-0 space-y-4">
                <span className="text-2xl sm:text-3xl font-light font-mono text-neutral-500 block">
                  {step.step}
                </span>
                <h3 className="text-sm font-medium uppercase tracking-wider text-white">
                  {step.title}
                </h3>
                <p className="text-xs font-light text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Curated Related Case Studies */}
      <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-12 mb-12 border-b border-white/10 gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-2">
              Featured Case Studies
            </span>
            <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-white">
              Selected {service.title} Works
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors"
          >
            <span>Complete Portfolio</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProjects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group flex flex-col focus:outline-none"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900 border border-white/10 mb-4">
                <Image
                  src={project.main_image_url}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center filter grayscale-[35%] contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 bg-black/70 px-2.5 py-1 border border-white/15">
                    {project.specs.sector}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-light uppercase tracking-wider text-white group-hover:text-neutral-300 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-neutral-500">
                    {project.completion_year}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-light truncate">
                  {project.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Direct Call to Action */}
      <section className="py-20 border-t border-white/10 bg-[#09090b]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 block">
            Commence A Project
          </span>
          <h3 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-white">
            Discuss Your {service.title} Brief
          </h3>
          <p className="text-xs sm:text-sm font-light text-neutral-400 max-w-lg mx-auto leading-relaxed">
            Our directors provide confidential spatial feasibility consultations for prime London properties.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-neutral-900 text-xs uppercase tracking-[0.25em] font-medium hover:bg-neutral-200 transition-colors"
            >
              <span>Consult With Studio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
