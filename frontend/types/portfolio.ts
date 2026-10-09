/**
 * Core Domain Types for Minale + Mann Architectural Studio
 * Directly aligned with MySQL CMS relational schema from Sprint 1
 */

export type CategoryType = 'residential' | 'commercial' | 'heritage' | 'hospitality';

export type AspectRatioType = 'landscape' | 'portrait' | 'square' | 'panoramic';

export interface Category {
  id: number;
  name: string;
  slug: string;
  type: CategoryType;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  display_order: number;
  caption?: string;
  aspect_ratio: AspectRatioType;
  created_at?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Service {
  id: number;
  parent_id?: number | null;
  title: string;
  slug: string;
  tagline?: string;
  short_description: string;
  full_description: string;
  scope_of_work?: string[];
  process?: ProcessStep[];
  related_category_slug?: string;
  hero_image_url?: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
  children?: Service[];
}

export interface ProjectSpecs {
  sector: string;
  location: string;
  completion: string;
  scope: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  client_name?: string;
  description: string;
  concept_narrative?: string;
  main_image_url: string;
  location: string;
  completion_year: number;
  is_featured: boolean;
  specs: ProjectSpecs;
  category?: Category;
  gallery: ProjectImage[];
  created_at?: string;
  updated_at?: string;
}
