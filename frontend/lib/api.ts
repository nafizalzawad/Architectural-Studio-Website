import { Project, Category } from '@/types/portfolio';
import {
  getAllProjects as getMockProjects,
  getProjectBySlug as getMockProjectBySlug,
  getCategories as getMockCategories,
} from './data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || '';

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  service_interest?: string;
  message: string;
  website_hp?: string; // honeypot anti-spam field
}

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  timestamp: string;
  data?: T;
  error?: string;
}

/**
 * Fetch all architectural projects or filter by category slug
 */
export async function getProjects(categorySlug?: string): Promise<Project[]> {
  if (API_BASE_URL) {
    try {
      const endpoint = categorySlug && categorySlug !== 'all'
        ? `${API_BASE_URL}/projects.php?category=${encodeURIComponent(categorySlug)}`
        : `${API_BASE_URL}/projects.php`;

      const res = await fetch(endpoint, {
        next: { revalidate: 60 }, // ISR cache revalidation
      });

      if (res.ok) {
        const json: ApiResponse<Project[]> = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[API Client] REST API fetch failed, falling back to mock dataset:', err);
    }
  }

  // Graceful Fallback to Mock Data
  const mockAll = getMockProjects();
  if (categorySlug && categorySlug !== 'all') {
    return mockAll.filter((p) => p.category?.slug === categorySlug);
  }
  return mockAll;
}

/**
 * Fetch a single project by slug (with associated gallery images)
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/projects.php?slug=${encodeURIComponent(slug)}`, {
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const json: ApiResponse<Project> = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn(`[API Client] Failed to fetch project slug '${slug}', falling back to mock:`, err);
    }
  }

  // Graceful Fallback to Mock Data
  const mock = getMockProjectBySlug(slug);
  return mock || null;
}

/**
 * Fetch all categories with project counts
 */
export async function getCategories(): Promise<Category[]> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/categories.php`, {
        next: { revalidate: 300 },
      });

      if (res.ok) {
        const json: ApiResponse<Category[]> = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[API Client] Failed to fetch categories, falling back to mock:', err);
    }
  }

  return getMockCategories();
}

/**
 * Submit contact / studio inquiry message
 */
export async function sendContactMessage(
  payload: ContactPayload
): Promise<{ success: boolean; message: string; id?: number }> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/contact.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        return {
          success: true,
          message: json.data?.message || 'Thank you. Your inquiry has been transmitted to our London studio.',
          id: json.data?.id,
        };
      } else {
        return {
          success: false,
          message: json.error || 'Failed to submit inquiry. Please try again.',
        };
      }
    } catch (err) {
      console.error('[API Client] Contact transmission error:', err);
      return {
        success: false,
        message: 'Network error connecting to studio servers. Please call or email directly.',
      };
    }
  }

  // Simulated Mock Submission for Local Development
  await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate latency
  return {
    success: true,
    message: 'Thank you for contacting Minale + Mann. Your inquiry has been registered (Local Mock Mode).',
    id: Math.floor(Math.random() * 1000) + 1,
  };
}

export const submitContactForm = sendContactMessage;
