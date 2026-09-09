'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Disc3, Coffee, Sparkles, Wifi, Clock, MapPin, Phone, MessageSquare } from 'lucide-react';

export default function AtmosphereSection() {
  const { t, setIsReservationOpen } = useLanguage();

  const features = [
    {
      icon: Disc3,
      title: t.atmosphere.feature1Title,
      desc: t.atmosphere.feature1Desc,
    },
    {
      icon: Coffee,
      title: t.atmosphere.feature2Title,
      desc: t.atmosphere.feature2Desc,
    },
    {
      icon: Sparkles,
      title: t.atmosphere.feature3Title,
      desc: t.atmosphere.feature3Desc,
    },
    {
      icon: Wifi,
      title: t.atmosphere.feature4Title,
      desc: t.atmosphere.feature4Desc,
    },
  ];

  return (
    <section id="atmosphere" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d97706]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs tracking-widest uppercase text-[#f59e0b]">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>{t.atmosphere.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f5f5f4]">
            {t.atmosphere.title}
          </h2>
          <p className="text-sm sm:text-base text-[#a8a29e] font-light leading-relaxed">
            {t.atmosphere.subtitle}
          </p>
        </div>

        {/* 4 Atelier Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl glass-panel hover:glass-panel-amber border border-white/10 transition-all duration-300 space-y-4 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#f59e0b]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-[#f5f5f4] font-medium leading-snug">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#a8a29e] font-light leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Location & Quick Inquiry Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl glass-panel-amber border border-[#d97706]/30 shadow-2xl">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f5f4] font-normal">
              Dorćol • Belgrade Atelier & Terrace
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#d6d3d1]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <span>Kralja Petra 44, Dorćol, Belgrade</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <span>Daily 08:00 – 23:00 (Weekends till 00:00)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <span>+381 11 328 9901</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: +381 64 987 6543</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <button
              onClick={() => setIsReservationOpen(true)}
              type="button"
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#f59e0b] hover:to-[#d97706] text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl shadow-[#d97706]/20 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.nav.reserve}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
