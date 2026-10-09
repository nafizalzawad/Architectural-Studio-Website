import React from 'react';
import SliderEngine from '@/components/home/SliderEngine';

export const revalidate = 60; // ISR revalidation

export default function HomePage() {
  return (
    <main className="w-full h-screen overflow-hidden bg-[#1b1b1e] text-white">
      {/* Authentic Fullscreen Architectural Panoramic Slider matching minaleandmann.com */}
      <SliderEngine />
    </main>
  );
}
