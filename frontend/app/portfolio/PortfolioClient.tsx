'use client';

import React, { useState, useMemo } from 'react';
import CategoryFilter, { FilterOption } from '@/components/portfolio/CategoryFilter';
import ProjectGrid from '@/components/portfolio/ProjectGrid';
import { Project, Category } from '@/types/portfolio';

interface PortfolioClientProps {
  initialProjects: Project[];
  initialCategories: Category[];
}

export default function PortfolioClient({
  initialProjects,
  initialCategories,
}: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Compute category options with dynamic item counts
  const filterOptions: FilterOption[] = useMemo(() => {
    return initialCategories.map((cat) => {
      let count = 0;
      if (cat.slug === 'all') {
        count = initialProjects.length;
      } else {
        count = initialProjects.filter((p) => {
          return p.category?.slug === cat.slug;
        }).length;
      }
      return {
        name: cat.name,
        slug: cat.slug,
        count,
      };
    });
  }, [initialCategories, initialProjects]);

  // Filter projects by active tab
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return initialProjects;
    }
    return initialProjects.filter((p) => p.category?.slug === activeCategory);
  }, [initialProjects, activeCategory]);

  return (
    <div className="w-full bg-[#1b1b1e] text-white min-h-screen">
      {/* Portfolio Header */}
      <section className="pt-8 sm:pt-14 pb-10 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="space-y-4 max-w-3xl">
          <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-neutral-500 block">
            Practice Portfolio // 2024 &ndash; 2026
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight uppercase text-white leading-none">
            Architectural Works
          </h1>
          <p className="text-xs sm:text-sm font-light text-neutral-400 leading-relaxed max-w-2xl pt-2">
            A comprehensive archive of private residences, commercial flagships, and Grade I/II
            listed heritage transformations. Every project reflects our obsession with material
            authenticity and daylight modulation.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="mt-12">
          <CategoryFilter
            categories={filterOptions}
            activeCategory={activeCategory}
            onSelectCategory={(slug) => setActiveCategory(slug)}
          />
        </div>

        {/* Status Counter */}
        <div className="pt-6 pb-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-neutral-500">
          <span>Displaying {filteredProjects.length} Architectural Commissions</span>
          <span className="hidden sm:inline-block">London &bull; Battersea &bull; Global</span>
        </div>
      </section>

      {/* Asymmetrical Masonry Grid Section */}
      <section className="px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full pb-32">
        <ProjectGrid projects={filteredProjects} />
      </section>
    </div>
  );
}
