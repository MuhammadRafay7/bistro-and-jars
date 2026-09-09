'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Flame, Droplets, Wind, Play, Pause, RotateCcw, Activity, CheckCircle2, Video, FastForward } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SignatureDrink() {
  const { language, t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Curated 4K ambient video loops for each phase of the signature drink
  const stepsData = [
    {
      num: '01',
      roman: 'I',
      tag: t.signature.step1.tag,
      title: t.signature.step1.title,
      desc: t.signature.step1.desc,
      highlight: t.signature.step1.highlight,
      icon: Flame,
      // High-resolution video loop for roasting & bean selection
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-beans-falling-in-slow-motion-41864-large.mp4',
      fallbackImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
      metrics: [
        { label: 'Origin', value: 'Yirgacheffe, Ethiopia' },
        { label: 'Altitude', value: '2,100 MASL' },
        { label: 'Process', value: 'Anaerobic Washed' },
      ],
      sensorProfile: [
        { name: 'Floral Jasmine', score: 95 },
        { name: 'Natural Sweetness', score: 88 },
        { name: 'Bergamot Brightness', score: 74 },
      ]
    },
    {
      num: '02',
      roman: 'II',
      tag: t.signature.step2.tag,
      title: t.signature.step2.title,
      desc: t.signature.step2.desc,
      highlight: t.signature.step2.highlight,
      icon: Droplets,
      // High-resolution video loop for slow drip extraction / nitro flow
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-machine-making-espresso-41865-large.mp4',
      fallbackImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85',
      metrics: [
        { label: 'Extraction', value: '18-Hour Kyoto Slow Drip' },
        { label: 'Pressure', value: 'Cryo Nitrogen Velvet' },
        { label: 'Acidity', value: '0% Acid Harshness' },
      ],
      sensorProfile: [
        { name: 'Cacao Depth', score: 92 },
        { name: 'Velvet Body', score: 98 },
        { name: 'Crema Density', score: 94 },
      ]
    },
    {
      num: '03',
      roman: 'III',
      tag: t.signature.step3.tag,
      title: t.signature.step3.title,
      desc: t.signature.step3.desc,
      highlight: t.signature.step3.highlight,
      icon: Wind,
      // High-resolution video loop for pouring & velvet finish
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-milk-in-a-coffee-cup-41867-large.mp4',
      fallbackImage: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=85',
      metrics: [
        { label: 'Infusion', value: 'Piedmont Hazelnut' },
        { label: 'Aroma Dome', value: 'Smoked Oakwood Mist' },
        { label: 'Vessel', value: 'Italian Bormioli Jar' },
      ],
      sensorProfile: [
        { name: 'Smoked Wood', score: 90 },
        { name: 'Hazelnut Richness', score: 96 },
        { name: 'Finish Length', score: 95 },
      ]
    }
  ];

  // GSAP ScrollTrigger synchronizing scroll progress with video playback & chapter switching
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const pinSection = pinSectionRef.current;
      if (!pinSection) return;

      ScrollTrigger.create({
        trigger: pinSection,
        start: 'top top',
        end: '+=1800',
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          setVideoProgress(progress);

          if (progress < 0.33) {
            setActiveStep(0);
          } else if (progress < 0.66) {
            setActiveStep(1);
          } else {
            setActiveStep(2);
          }

          // Scrub video current time if video duration is loaded
          const video = videoRef.current;
          if (video && video.duration && !isNaN(video.duration)) {
            const stepRelativeProgress = (progress % 0.33) / 0.33;
            video.currentTime = stepRelativeProgress * video.duration;
          }
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleManualStepChange = (index: number) => {
    setActiveStep(index);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPlayingVideo) {
      videoRef.current.pause();
      setIsPlayingVideo(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlayingVideo(true);
    }
  };

  const currentStepData = stepsData[activeStep];
  const IconComponent = currentStepData.icon;

  return (
    <section
      id="signature"
      ref={containerRef}
      className="relative bg-[#060606] text-[#f5f5f4] border-t border-white/5 overflow-hidden"
    >
      <div
        ref={pinSectionRef}
        className="min-h-screen flex flex-col justify-between py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 hairline-b">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d97706]/10 border border-[#d97706]/30 text-xs tracking-[0.2em] uppercase text-[#f59e0b] mb-3">
              <Video className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Scroll-Driven Video Story</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f5f5f4]">
              {t.signature.title}
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="max-w-md text-xs sm:text-sm text-[#a8a29e] font-light leading-relaxed">
              {t.signature.subtitle}
            </p>
            {/* Live Scrub Telemetry */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#f59e0b]">
              <Activity className="w-3 h-3" />
              <span>GSAP Scrub Sync: {(videoProgress * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 my-5">
          {stepsData.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleManualStepChange(idx)}
                className={`text-left p-3.5 sm:p-5 rounded-2xl transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? 'glass-panel-amber border-[#d97706] bg-[#d97706]/10 shadow-xl shadow-[#d97706]/10'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/15 text-[#a8a29e]'
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

                {/* Progress bar */}
                <div className="w-full h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
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

        {/* Cinematic Video Showcase & Narrative Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-2">
          {/* Left Column: Scroll-Driven Video Canvas */}
          <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border border-[#d97706]/30 shadow-2xl bg-black">
            {/* Cinematic Video Layer */}
            <video
              ref={videoRef}
              key={currentStepData.videoUrl}
              src={currentStepData.videoUrl}
              poster={currentStepData.fallbackImage}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover filter brightness-[0.88] contrast-105 transition-all duration-500"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

            {/* Floating Top Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={toggleVideoPlayback}
                type="button"
                className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono text-[#f59e0b] flex items-center gap-1.5 hover:bg-black transition-colors"
                title="Toggle Video Playback"
              >
                {isPlayingVideo ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                <span>{isPlayingVideo ? 'PLAYING' : 'PAUSED'}</span>
              </button>
            </div>

            {/* Bottom floating telemetry */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#d97706]/40 text-xs text-[#fef3c7]">
                <IconComponent className="w-4 h-4 text-[#f59e0b]" />
                <span className="font-medium">{currentStepData.highlight}</span>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                {currentStepData.metrics.map((m, i) => (
                  <div key={i} className="px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-[10px]">
                    <span className="text-[#a8a29e] block font-mono">{m.label}</span>
                    <span className="text-[#f5f5f4] font-semibold">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Sensory Telemetry */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#f59e0b] tracking-[0.2em] uppercase">
                <span>Phase {currentStepData.roman} of III</span>
                <span>•</span>
                <span>Scroll Scrub Synchronized</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#f5f5f4] font-normal leading-tight">
                {currentStepData.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#a8a29e] font-light leading-relaxed">
                {currentStepData.desc}
              </p>
            </div>

            {/* Sensory Extraction Radar */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#f59e0b]">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Sensory Extraction Profile</span>
                </span>
                <span className="text-[#a8a29e]">Atelier Recipe</span>
              </div>
              <div className="space-y-2">
                {currentStepData.sensorProfile.map((sp, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-[#d6d3d1]">
                      <span>{sp.name}</span>
                      <span className="font-mono text-[#f59e0b]">{sp.score}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] rounded-full transition-all duration-700"
                        style={{ width: `${sp.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flavor spectrum chips */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#78716c] block mb-2">
                {t.signature.tasteNotesTitle}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {t.signature.tasteNotes.map((note, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full text-xs bg-white/[0.03] border border-white/10 text-[#d6d3d1] hover:border-[#d97706]/40 hover:text-[#f59e0b] transition-colors"
                  >
                    ✦ {note}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="pt-4 hairline-t flex items-center justify-between text-xs text-[#78716c]">
          <span>GSAP 3.12 + ScrollTrigger Video Scrubbing</span>
          <span>Bistro & Jars • Signature Storytelling</span>
        </div>
      </div>
    </section>
  );
}
