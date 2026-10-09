import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { getProjects, getProjectBySlug } from '@/lib/api';
import { getNextProject } from '@/lib/data';
import BlueprintBrief from '@/components/case-study/BlueprintBrief';
import AsymmetricImages from '@/components/case-study/AsymmetricImages';
import InvertedSection from '@/components/case-study/InvertedSection';
import PinnedTextSection from '@/components/case-study/PinnedTextSection';
import BlueprintMagnifier from '@/components/case-study/BlueprintMagnifier';
import AwardBadgeSection from '@/components/case-study/AwardBadgeSection';
import ProjectInquiryForm from '@/components/case-study/ProjectInquiryForm';
import ExpandingCtaBanner from '@/components/case-study/ExpandingCtaBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // ISR revalidation

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
    title: `${project.title} | Minale + Mann Architects London`,
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

  // Split gallery images for the editorial sections
  const firstImage = project.gallery[0] || {
    image_url: project.main_image_url,
    caption: 'Facade elevation',
  };
  const secondImage = project.gallery[1] || {
    image_url: project.main_image_url,
    caption: 'Interior daylight void',
  };
  const pinnedImages = project.gallery.slice(2, 5).map((img) => ({
    url: img.image_url,
    caption: img.caption,
  }));

  // Fallback pinned images if gallery is short
  if (pinnedImages.length === 0) {
    pinnedImages.push({
      url: project.main_image_url,
      caption: 'Detailed materiality and custom joinery',
    });
  }

  return (
    <article className="w-full bg-[#1b1b1e] text-white">
      {/* 1. Header & Navigation Breadcrumb Bar */}
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-6 flex items-center justify-between">
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </Link>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
          Case Study // {project.specs.sector}
        </span>
      </div>

      {/* 2. Full-Bleed Hero Photograph & Volumetric Title */}
      <section className="w-full px-4 sm:px-8 lg:px-16 max-w-[1720px] mx-auto">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] w-full overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl group">
          <Image
            src={project.main_image_url}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter contrast-[1.05] transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

          {/* Floating Title HUD */}
          <div className="absolute bottom-6 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12 space-y-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-neutral-300 block">
              {project.specs.location}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight text-white leading-none max-w-5xl">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* 3. Dimensional Specifications Bar */}
      <section className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
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

      {/* 4. Blueprint Schematic & Design Brief Section */}
      <BlueprintBrief
        specs={project.specs}
        conceptTitle="Design Brief"
        conceptNarrative={
          project.concept_narrative ||
          project.description ||
          `${project.title} was designed and built by Minale + Mann, embracing volume, depth, and light as primary architectural tenets.`
        }
      />

      {/* 5. Asymmetric Dual Parallax Plates (Magazine Cadence) */}
      <AsymmetricImages
        imageLeft={{
          url: firstImage.image_url,
          caption: firstImage.caption,
        }}
        imageRight={{
          url: secondImage.image_url,
          caption: secondImage.caption,
        }}
      />

      {/* 6. Inverted Dark Brand Architecture Block (#1b1b1e) */}
      <InvertedSection
        title="Architecture"
        paragraphs={
          project.inverted_section?.paragraphs || [
            'A striking contemporary staircase at the centre is the defining feature of the residence. It connects all floors, creating a vertical tunnel of daylight that cascades from the roof down through four levels, creating a shadowy interplay of texture throughout the day.',
            'The open plan layout of the lower ground floors gives the house a spacious, gallery-like feel. An eight-metre void between lower and ground floor acts as a primary light well, accentuating the vertical expanse between the levels.',
          ]
        }
      />

      {/* 7. Pinned Text with Adjacent Scrolling Photography */}
      <PinnedTextSection
        title="Interior Design"
        paragraphs={
          project.pinned_section?.paragraphs || [
            'The interior backdrop is kept disciplined throughout the home to bring out key structural features. Soft grey walls reflect light and create a sense of calm, while bandsawn timber flooring adds texture and warmth.',
            'High ceilings and open expanses of space create a gallery-like feel. Individual, more secluded retreats can be found in the private study, the guest bedroom suite, and the wellness gym.',
            'The selection of natural finishes — including marble, brass, and hand-troweled micro-cement — harmonizes the imposing architectural details into an inviting family residence.',
          ]
        }
        images={pinnedImages}
      />

      {/* 8. Interactive Floorplan Schematic Magnifier (View 1 vs View 2) */}
      <BlueprintMagnifier />

      {/* 9. Award Recognition Badges */}
      <AwardBadgeSection
        headline={
          project.award_citation?.headline ||
          'The Sunday Times British Homes Awards, 2018 / 2024'
        }
        accolades={
          project.award_citation?.accolades || [
            'Winner: Best Interior Design',
            'Highly Commended: Home Transformation',
            'Shortlisted: International Design & Architecture Awards',
          ]
        }
      />

      {/* 10. Inline Case Study Client Inquiry Form */}
      <ProjectInquiryForm projectTitle={project.title} />

      {/* 11. Expanding Next-Project CTA Banner */}
      <ExpandingCtaBanner nextProject={nextProject} />
    </article>
  );
}
