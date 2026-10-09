'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BlueprintMagnifier: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'view1' | 'view2'>('view1');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <section className="w-full bg-[#f8f8f9] text-[#1b1b1e] py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-neutral-200">
      <div className="max-w-[1720px] mx-auto space-y-10">
        {/* Header & View Selector Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-300 pb-6 gap-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 block mb-2">
              03 // Technical Architectural Documentation
            </span>
            <h3 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-[#1b1b1e]">
              Floorplan Schematics
            </h3>
          </div>

          {/* View Selection Buttons (View 1 vs View 2) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('view1')}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-[0.25em] transition-all cursor-pointer ${
                activeTab === 'view1'
                  ? 'bg-[#1b1b1e] text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-300'
              }`}
            >
              View 1: Ground Floor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('view2')}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-[0.25em] transition-all cursor-pointer ${
                activeTab === 'view2'
                  ? 'bg-[#1b1b1e] text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:text-black border border-neutral-300'
              }`}
            >
              View 2: Lower Ground Floor
            </button>
          </div>
        </div>

        {/* Blueprint Canvas with Interactive Lens Magnifier */}
        <div
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          className="relative w-full aspect-[16/10] sm:aspect-[2/1] lg:aspect-[2.3/1] bg-white border border-neutral-300 overflow-hidden shadow-sm flex items-center justify-center p-8 sm:p-14 cursor-crosshair select-none"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'view1' ? (
              /* View 1: Ground Floor Blueprint Schematic */
              <motion.div
                key="view1-svg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex items-center justify-center"
                style={{
                  transform: isZoomed ? 'scale(1.15)' : 'scale(1)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                <svg
                  viewBox="0 0 900 450"
                  className="w-full h-full stroke-neutral-800 fill-none stroke-[1.2]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="50" y="40" width="800" height="370" strokeWidth="2.5" />
                  {/* Living Room & Grand Reception */}
                  <rect x="70" y="60" width="340" height="330" strokeWidth="1.8" />
                  <text x="140" y="230" className="text-xs font-mono fill-neutral-600 stroke-none tracking-widest">
                    FORMAL RECEPTION // 42.4 m²
                  </text>
                  {/* Central Staircase Core */}
                  <rect x="430" y="140" width="100" height="170" strokeWidth="1.5" />
                  <line x1="430" y1="165" x2="530" y2="165" />
                  <line x1="430" y1="190" x2="530" y2="190" />
                  <line x1="430" y1="215" x2="530" y2="215" />
                  <line x1="430" y1="240" x2="530" y2="240" />
                  <line x1="430" y1="265" x2="530" y2="265" />
                  <text x="450" y="235" className="text-[10px] font-mono fill-neutral-700 stroke-none">
                    STAIR VOID
                  </text>
                  {/* Dining and Bespoke Kitchen Island */}
                  <rect x="550" y="60" width="280" height="330" strokeWidth="1.8" />
                  <rect x="610" y="170" width="160" height="80" strokeWidth="1.2" strokeDasharray="3 3" />
                  <text x="635" y="215" className="text-[11px] font-mono fill-neutral-600 stroke-none tracking-wider">
                    VALCHROMAT ISLAND
                  </text>
                </svg>
              </motion.div>
            ) : (
              /* View 2: Lower Ground Floor Subterranean Extension Blueprint */
              <motion.div
                key="view2-svg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex items-center justify-center"
                style={{
                  transform: isZoomed ? 'scale(1.15)' : 'scale(1)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                <svg
                  viewBox="0 0 900 450"
                  className="w-full h-full stroke-neutral-800 fill-none stroke-[1.2]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="50" y="40" width="800" height="370" strokeWidth="2.5" />
                  {/* Subterranean Media Room / Private Vault */}
                  <rect x="70" y="60" width="260" height="330" strokeWidth="1.8" />
                  <text x="110" y="230" className="text-xs font-mono fill-neutral-600 stroke-none tracking-widest">
                    CINEMA & ART VAULT
                  </text>
                  {/* Wellness Spa & Lap Pool Chamber */}
                  <rect x="350" y="60" width="480" height="330" strokeWidth="1.8" />
                  <rect x="400" y="120" width="380" height="180" strokeWidth="1.5" strokeDasharray="4 2" />
                  <text x="500" y="215" className="text-xs font-mono fill-neutral-600 stroke-none tracking-widest">
                    LAP POOL & SAUNA CASING
                  </text>
                  <circle cx="730" cy="90" r="15" strokeWidth="1.5" />
                  <text x="718" y="94" className="text-[9px] font-mono fill-neutral-600 stroke-none">
                    LIGHT
                  </text>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint Overlay */}
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500 border border-neutral-200">
            Hover to magnify architectural elevation
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlueprintMagnifier;
