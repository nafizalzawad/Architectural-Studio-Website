import React from 'react';
import SliderEngine from '@/components/home/SliderEngine';

export const revalidate = 60; // ISR revalidation

export default function HomePage() {
  return (
    <main className="w-full h-[100dvh] overflow-hidden bg-[#141416] text-white">
      {/* Authentic Fullscreen Architectural Panoramic Slider */}
      <SliderEngine />
    </main>
  );
}
