'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Flame, Droplets, Wind, Play, Pause, Activity, CheckCircle2, Video, Compass, ChevronRight, Gauge } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SignatureDrink() {
  const { language, t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isPlayingAll, setIsPlayingAll] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const stepsData = [
    {
      num: '01',
      roman: 'I',
      tag: t.signature.step1.tag,
      title: t.signature.step1.title,
      desc: t.signature.step1.desc,
      highlight: t.signature.step1.highlight,
      icon: Flame,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-beans-falling-in-slow-motion-41864-large.mp4',
      fallbackImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
      metrics: [
        { label: 'Origin', value: 'Yirgacheffe, Ethiopia' },
        { label: 'Elevation', value: '2,100 MASL' },
        { label: 'Roast Curve', value: 'Light-Medium Batch' },
      ],
      sensorProfile: [
        { name: 'Floral Jasmine', score: 95 },
        { name: 'Natural Sweetness', score: 88 },
        { name: 'Bergamot Brightness', score: 76 },
      ],
      flavorChips: ['Heirloom Bean', 'Jasmine Flower', 'Candied Citrus', 'Direct Trade'],
    },
    {
      num: '02',
      roman: 'II',
      tag: t.signature.step2.tag,
      title: t.signature.step2.title,
      desc: t.signature.step2.desc,
      highlight: t.signature.step2.highlight,
      icon: Droplets,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-machine-making-espresso-41865-large.mp4',
      fallbackImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85',
      metrics: [
        { label: 'Extraction', value: '18-Hour Kyoto Drip' },
        { label: 'Pressure', value: 'Cryo Nitrogen Charge' },
        { label: 'Astringency', value: '0% Acid Harshness' },
      ],
      sensorProfile: [
        { name: 'Cacao Depth', score: 92 },
        { name: 'Velvet Body', score: 98 },
        { name: 'Crema Density', score: 94 },
      ],
      flavorChips: ['18h Cold Gravity', 'Cryo Nitro Head', 'Dark Cocoa Nibs', 'Zero Bitterness'],
    },
    {
      num: '03',
      roman: 'III',
      tag: t.signature.step3.tag,
      title: t.signature.step3.title,
      desc: t.signature.step3.desc,
      highlight: t.signature.step3.highlight,
      icon: Wind,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-milk-in-a-coffee-cup-41867-large.mp4',
      fallbackImage: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=85',
      metrics: [
        { label: 'Infusion', value: 'Piedmont Hazelnut' },
        { label: 'Aroma Dome', value: 'Smoked Oakwood Mist' },
        { label: 'Vessel', value: 'Bormioli Sealed Jar' },
      ],
      sensorProfile: [
        { name: 'Smoked Oak', score: 90 },
        { name: 'Hazelnut Velvet', score: 96 },
        { name: 'Finish Length', score: 95 },
      ],
      flavorChips: ['Piedmont Nut Mousse', 'Smoked Oak Mist', 'Raw Forest Honey', 'Crystal Jar'],
    }
  ];

  // GSAP ScrollTrigger setup with smooth weighted scrubbing
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const pinSection = pinSectionRef.current;
      const container = containerRef.current;
      if (!pinSection || !container) return;

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=2000',
        pin: pinSection,
        pinSpacing: true,
        scrub: 1.0,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollPercent(Math.round(progress * 100));

          if (progress < 0.33) {
            setActiveStep(0);
          } else if (progress < 0.66) {
            setActiveStep(1);
          } else {
            setActiveStep(2);
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleStepJump = (idx: number) => {
    setActiveStep(idx);
    const container = containerRef.current;
    if (!container) return;

    const targetProgress = idx === 0 ? 0.1 : idx === 1 ? 0.5 : 0.85;
    const containerTop = container.offsetTop;
    const scrollDistance = 2000 * targetProgress;

    window.scrollTo({
      top: containerTop + scrollDistance,
      behavior: 'smooth',
    });
  };

  const toggleAllVideos = () => {
    videoRefs.current.forEach((vid) => {
      if (!vid) return;
      if (isPlayingAll) {
        vid.pause();
      } else {
        vid.play().catch(() => {});
      }
    });
    setIsPlayingAll(!isPlayingAll);
  };

  return (
    <section
      id="signature"
      ref={containerRef}
      className="relative bg-[#050505] text-[#f5f5f4] border-t border-white/5 overflow-hidden"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinSectionRef}
        className="min-h-screen flex flex-col justify-between py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10"
      >
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 hairline-b">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d97706]/15 border border-[#d97706]/35 text-xs tracking-[0.2em] uppercase text-[#f59e0b] mb-2 shadow-lg shadow-[#d97706]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping" />
              <span>Scroll-Driven Cinema</span>
              <span className="text-[#78716c]">|</span>
              <span className="font-mono text-[11px] text-[#fef3c7]">GSAP 60FPS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f5f5f4]">
              {t.signature.title}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-xs sm:max-w-sm text-xs text-[#a8a29e] font-light leading-relaxed hidden sm:block">
              {t.signature.subtitle}
            </p>

            {/* Live Progress Pill */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#d97706]/40 text-xs font-mono text-[#f59e0b]">
              <Activity className="w-3.5 h-3.5 text-[#f59e0b] animate-pulse" />
              <span>STORYLINE: {scrollPercent}%</span>
            </div>
          </div>
        </div>

        {/* Phase Chapter Navigation Tabs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 my-4">
          {stepsData.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleStepJump(idx)}
                className={`text-left p-3 sm:p-4 rounded-2xl transition-all duration-500 border flex flex-col justify-between ${
                  isActive
                    ? 'glass-panel-amber border-[#d97706] bg-[#d97706]/15 shadow-xl shadow-[#d97706]/15 scale-[1.01]'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/15 text-[#a8a29e] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase font-bold ${isActive ? 'text-[#f59e0b]' : 'text-[#78716c]'}`}>
                    PHASE {step.roman}
                  </span>
                  {isActive && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f59e0b] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f59e0b]"></span>
                    </span>
                  )}
                </div>
                <span className={`font-serif text-xs sm:text-base md:text-lg font-medium truncate ${isActive ? 'text-[#f5f5f4]' : 'text-[#a8a29e]'}`}>
                  {step.tag}
                </span>

                {/* Progress bar inside tab */}
                <div className="w-full h-1 bg-white/10 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] transition-all duration-500 ${
                      isActive ? 'w-full' : activeStep > idx ? 'w-full opacity-40' : 'w-0'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Stage: Cross-Fading Cinematic Layers & Narrative Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center flex-1 my-2">
          {/* Left Column: Stacked Seamless Video Canvas */}
          <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border border-[#d97706]/35 shadow-2xl bg-black">
            {/* 3 Pre-rendered Video Layers Stacked (Cross-fading with 0 flashes) */}
            {stepsData.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ease-out transform ${
                    isActive
                      ? 'opacity-100 scale-100 blur-0 z-10'
                      : 'opacity-0 scale-105 blur-sm z-0 pointer-events-none'
                  }`}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                    }}
                    src={step.videoUrl}
                    poster={step.fallbackImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover filter brightness-[0.88] contrast-105"
                  />
                  {/* Dark Cinema Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                </div>
              );
            })}

            {/* Top Right Floating Controls */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                onClick={toggleAllVideos}
                type="button"
                className="px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-mono text-[#f59e0b] flex items-center gap-1.5 hover:bg-black transition-colors shadow-lg"
              >
                {isPlayingAll ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                <span>{isPlayingAll ? 'LIVE 4K' : 'PAUSED'}</span>
              </button>
            </div>

            {/* Bottom Floating Telemetry Bar */}
            <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#d97706]/40 text-xs text-[#fef3c7]">
                <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span className="font-medium">{stepsData[activeStep].highlight}</span>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                {stepsData[activeStep].metrics.map((m, i) => (
                  <div key={i} className="px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[10px]">
                    <span className="text-[#a8a29e] block font-mono">{m.label}</span>
                    <span className="text-[#f5f5f4] font-semibold">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Narrative & Sensory Telemetry */}
          <div className="lg:col-span-5 relative flex flex-col justify-center min-h-[360px]">
            {stepsData.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  className={`transition-all duration-500 ease-out space-y-5 ${
                    isActive
                      ? 'opacity-100 translate-y-0 relative z-10'
                      : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none z-0'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#f59e0b] tracking-[0.2em] uppercase">
                      <span>Phase {step.roman} of III</span>
                      <span>•</span>
                      <span>Extraction Protocol</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#f5f5f4] font-normal leading-tight">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#a8a29e] font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Sensory Profile Radar Card */}
                  <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#f59e0b]">
                      <span className="flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5" />
                        <span>Sensory Extraction Profile</span>
                      </span>
                      <span className="text-[#a8a29e]">Atelier Lab 2026</span>
                    </div>
                    <div className="space-y-2">
                      {step.sensorProfile.map((sp, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-[#d6d3d1]">
                            <span>{sp.name}</span>
                            <span className="font-mono text-[#f59e0b]">{sp.score}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] rounded-full transition-all duration-700 ease-out"
                              style={{ width: isActive ? `${sp.score}%` : '0%' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Flavor Chips */}
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#78716c] block mb-2 font-mono">
                      Flavor Spectrum & Craft Tokens
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {step.flavorChips.map((chip, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full text-xs bg-white/[0.03] border border-white/10 text-[#d6d3d1] hover:border-[#d97706]/50 hover:text-[#f59e0b] transition-colors"
                        >
                          ✦ {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Interactive Timeline Scrubber */}
        <div className="pt-4 hairline-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#78716c]">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="font-mono text-[#f59e0b] text-[11px]">TIMELINE:</span>
            {/* Visual Scrubber Track */}
            <div className="flex-1 sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] rounded-full transition-all duration-150"
                style={{ width: `${Math.max(5, scrollPercent)}%` }}
              />
            </div>
            <span className="font-mono text-[11px] text-[#a8a29e]">{scrollPercent}%</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Scroll naturally or click tabs to scrub chapters</span>
            <span className="text-[#57534e]">|</span>
            <span className="text-[#f59e0b]">Bistro & Jars Atelier</span>
          </div>
        </div>
      </div>
    </section>
  );
}
