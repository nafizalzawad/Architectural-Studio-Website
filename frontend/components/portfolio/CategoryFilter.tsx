'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface FilterOption {
  name: string;
  slug: string;
  count?: number;
}

interface CategoryFilterProps {
  categories: FilterOption[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <nav
      aria-label="Portfolio Category Filter"
      className="w-full flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-4 border-y border-white/10"
    >
      <ul className="flex items-center gap-6 sm:gap-10 whitespace-nowrap px-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;

          return (
            <li key={cat.slug} className="relative py-2">
              <button
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`group flex items-center gap-2 text-xs sm:text-sm tracking-[0.22em] uppercase transition-colors duration-300 focus:outline-none ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-neutral-400 font-light hover:text-neutral-200'
                }`}
                aria-pressed={isActive}
              >
                <span>{cat.name}</span>
                {cat.count !== undefined && (
                  <span
                    className={`text-[10px] font-mono transition-colors ${
                      isActive ? 'text-neutral-300' : 'text-neutral-600 group-hover:text-neutral-400'
                    }`}
                  >
                    ({cat.count})
                  </span>
                )}
              </button>

              {/* Framer Motion Active Indicator Underline */}
              {isActive && (
                <motion.div
                  layoutId="activeFilterIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoryFilter;
