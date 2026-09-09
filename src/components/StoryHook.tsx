'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Flame, Droplet, GlassWater, Compass } from 'lucide-react';

export default function StoryHook() {
  const { t } = useLanguage();

  return (
    <section id="story" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d] border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#d97706]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#b45309]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] tracking-widest uppercase text-[#f59e0b]">
              <Compass className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>{t.storyHook.sectionTag}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#f5f5f4] leading-[1.15]">
              {t.storyHook.heading}
            </h2>

            <div className="space-y-4 text-[#a8a29e] text-base sm:text-lg font-light leading-relaxed">
              <p>{t.storyHook.body1}</p>
              <p>{t.storyHook.body2}</p>
            </div>

            {/* Editorial Quote Box */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border-l-2 border-l-[#d97706] bg-gradient-to-r from-white/[0.03] to-transparent space-y-3">
              <blockquote className="font-serif italic text-lg sm:text-xl text-[#fef3c7] leading-snug">
                {t.storyHook.quote}
              </blockquote>
              <p className="text-xs tracking-widest uppercase text-[#a8a29e] font-sans">
                {t.storyHook.quoteAuthor}
              </p>
            </div>
          </div>

          {/* Right Column: Visual Grid / Atmospheric Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden group aspect-[4/5] border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80"
                  alt="Specialty coffee roasting beans"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center gap-1.5 text-[#f59e0b] text-xs font-semibold mb-1">
                    <Flame className="w-3.5 h-3.5" />
                    <span>In-House Roastery</span>
                  </div>
                  <p className="text-[11px] text-[#d6d3d1]">Small 5kg micro-batches</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-panel-amber border border-[#d97706]/20 flex flex-col justify-between h-40">
                <Droplet className="w-6 h-6 text-[#f59e0b]" />
                <div>
                  <span className="font-serif text-2xl text-[#f5f5f4] font-medium block">93.5°C</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#a8a29e]">Precision Thermo-Stability</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between h-40">
                <GlassWater className="w-6 h-6 text-[#f59e0b]" />
                <div>
                  <span className="font-serif text-2xl text-[#f5f5f4] font-medium block">Bormioli Jars</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#a8a29e]">Italian Sealed Glasscraft</span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden group aspect-[4/5] border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
                  alt="Bistro coffee bar counter and barista"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center gap-1.5 text-[#f59e0b] text-xs font-semibold mb-1">
                    <span>Dorćol Atelier</span>
                  </div>
                  <p className="text-[11px] text-[#d6d3d1]">Belgrade, Serbia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
