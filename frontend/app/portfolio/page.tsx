import React from 'react';
import PortfolioClient from './PortfolioClient';
import { getProjects, getCategories } from '@/lib/api';

export const revalidate = 60; // Revalidate stale data every 60 seconds

export default async function PortfolioPage() {
  const [initialProjects, initialCategories] = await Promise.all([
    getProjects(),
    getCategories(),
  ]);

  return (
    <PortfolioClient
      initialProjects={initialProjects}
      initialCategories={initialCategories}
    />
  );
}
