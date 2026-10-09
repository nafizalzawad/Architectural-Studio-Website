import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { getProjects, getProjectBySlug } from '@/lib/api';
import { getNextProject } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Revalidate stale data every 60 seconds

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Minale + Mann',
    };
  }

  return {
    title: `${project.title} | Minale + Mann Architects`,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project.slug);

  return (
    <article className="w-full bg-[#0c0d0e] text-white">
      {/* 1. Header & Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-8">
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      {/* 2. Hero Photograph & Title Banner */}
      <section className="w-full px-4 sm:px-8 lg:px-16 max-w-[1720px] mx-auto">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] w-full overflow-hidden bg-neutral-900 border border-white/10">
          <Image
            src={project.main_image_url}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter grayscale-[25%] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-black/30 to-black/30" />

          {/* Floating Case Title */}
          <div className="absolute bottom-6 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-neutral-300 block mb-2 sm:mb-3">
              Case Study // {project.specs.sector}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight uppercase text-white leading-tight max-w-4xl">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* 3. Structured Specs Matrix Bar */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/10 text-neutral-300">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-2">
              Sector
            </span>
            <span className="text-sm sm:text-base font-light text-white tracking-wide">
              {project.specs.sector}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-2">
              Location
            </span>
            <span className="text-sm sm:text-base font-light text-white tracking-wide">
              {project.specs.location}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-2">
              Completion
            </span>
            <span className="text-sm sm:text-base font-light text-white tracking-wide">
              {project.specs.completion}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-2">
              Scope & Disciplines
            </span>
            <span className="text-sm sm:text-base font-light text-white tracking-wide">
              {project.specs.scope}
            </span>
          </div>
        </div>
      </section>

      {/* 4. Narrative Concept Statement */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-3">
              Architectural Concept
            </span>
            <h2 className="text-xl sm:text-2xl font-light uppercase tracking-wide text-neutral-200">
              Purity of form and material permanence.
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-6 text-sm sm:text-base font-light text-neutral-300 leading-relaxed">
            <p className="text-lg sm:text-xl font-light text-white leading-relaxed">
              {project.description}
            </p>
            {project.concept_narrative && (
              <p className="text-neutral-400 font-light">
                {project.concept_narrative}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 5. Asymmetrical Image Gallery (Masonry & Banners) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-24 sm:pb-36">
        <div className="pb-8 border-b border-white/10 mb-12 flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-500">
            Project Visual Documentation
          </span>
          <span className="text-xs font-mono text-neutral-500">
            {project.gallery.length} Plates
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {project.gallery.map((img, idx) => {
            // Determine rhythm based on aspect ratio or alternate index
            // Banners and panoramic images span full 12 columns
            // Detail shots span 6 columns
            const isFullSpan =
              img.aspect_ratio === 'panoramic' ||
              idx === 0 ||
              idx === project.gallery.length - 1;

            const colSpan = isFullSpan ? 'md:col-span-12' : 'md:col-span-6';
            const aspectClass = isFullSpan
              ? 'aspect-[21/10] sm:aspect-[2.3/1]'
              : img.aspect_ratio === 'portrait'
              ? 'aspect-[4/5]'
              : 'aspect-[16/11]';

            return (
              <figure key={img.id} className={`${colSpan} group flex flex-col space-y-3`}>
                <div
                  className={`relative w-full ${aspectClass} overflow-hidden bg-neutral-900 border border-white/10`}
                >
                  <Image
                    src={img.image_url}
                    alt={img.caption || `${project.title} detail`}
                    fill
                    sizes={
                      isFullSpan
                        ? '100vw'
                        : '(max-width: 768px) 100vw, 50vw'
                    }
                    className="object-cover object-center filter grayscale-[30%] contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {img.caption && (
                  <figcaption className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 pt-1 flex items-center justify-between">
                    <span>
                      Plate 0{idx + 1} &bull; {img.caption}
                    </span>
                    <span className="text-neutral-600 hidden sm:inline-block">
                      {img.aspect_ratio}
                    </span>
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </section>

      {/* 6. Project Footer Pagination */}
      <section className="border-t border-white/10 bg-[#08080a] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b border-white/10 gap-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-neutral-500">
              Next Case Study
            </span>
            <Link
              href="/portfolio"
              className="text-xs uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors"
            >
              All Projects &rarr;
            </Link>
          </div>

          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="group mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center focus:outline-none"
          >
            {/* Next Project Text Details */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                {nextProject.specs.sector} &bull; {nextProject.location}
              </span>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-light uppercase tracking-tight text-white group-hover:text-neutral-300 transition-colors leading-tight">
                {nextProject.title}
              </h3>
              <p className="text-xs sm:text-sm font-light text-neutral-400 line-clamp-2 max-w-xl">
                {nextProject.description}
              </p>
              <div className="pt-2 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white border-b border-white/30 group-hover:border-white transition-colors pb-1">
                <span>View Case Study</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Next Project Thumbnail Preview */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 border border-white/10">
                <Image
                  src={nextProject.main_image_url}
                  alt={nextProject.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center filter grayscale-[35%] contrast-[1.05] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
}
