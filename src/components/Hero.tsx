'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, ArrowDown, QrCode, Play, MessageSquare, Compass, Shield } from 'lucide-react';

export default function Hero() {
  const { t, setIsReservationOpen } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Ambient gold ember canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      hue: number;
    }[] = [];

    const count = Math.min(width > 768 ? 40 : 18, 45);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        speedY: Math.random() * -0.35 - 0.1,
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.45 + 0.1,
        hue: Math.random() * 15 + 38,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 62%, ${p.opacity})`;
        ctx.shadowBlur = 14;
        ctx.shadowColor = 'rgba(217, 119, 6, 0.4)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080808]">
      {/* Dynamic Cursor Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(217, 119, 6, 0.08), transparent 80%)`,
        }}
      />

      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#d97706]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#78350f]/15 rounded-full blur-[140px]" />

        {/* Dynamic Canvas Particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-60"
        />

        {/* Film grain */}
        <div className="absolute inset-0 bg-grain opacity-50" />

        {/* Soft Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-transparent to-[#080808]" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Luxury Crest Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-[#d97706]/35 text-xs tracking-[0.2em] uppercase text-[#f59e0b] mb-8 shadow-xl shadow-[#d97706]/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping" />
          <span className="font-semibold">{t.hero.badge}</span>
          <span className="text-[#57534e]">|</span>
          <span className="text-[#a8a29e] tracking-widest font-mono text-[11px]">44°49'N 20°27'E</span>
        </div>

        {/* Headline with Roman Display Flair */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#f5f5f4] leading-[1.04] mb-6">
          <span className="block text-crema-gradient">{t.hero.titleLine1}</span>
          <span className="block italic text-gold-gradient font-light mt-1.5">
            {t.hero.titleLine2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#a8a29e] font-sans font-light leading-relaxed mb-12">
          {t.hero.subtitle}
        </p>

        {/* Action Button Group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <a
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#f59e0b] hover:to-[#d97706] text-black font-bold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-2xl shadow-[#d97706]/30 hover:shadow-[#d97706]/50 hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
          >
            <QrCode className="w-4 h-4" />
            <span>{t.hero.ctaMenu}</span>
          </a>

          <a
            href="#signature"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel-amber text-[#fef3c7] hover:text-[#f59e0b] font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 hover:-translate-y-0.5"
          >
            <Play className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
            <span>{t.hero.ctaSignature}</span>
          </a>

          <button
            onClick={() => setIsReservationOpen(true)}
            type="button"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#25D366]/50 text-[#d6d3d1] hover:text-white font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>{t.hero.ctaBook}</span>
          </button>
        </div>

        {/* Luxury Stats Strip */}
        <div className="w-full max-w-3xl grid grid-cols-3 gap-3 sm:gap-6 pt-8 hairline-t">
          <div className="text-center px-2">
            <span className="block font-serif text-2xl sm:text-3xl lg:text-4xl text-[#f59e0b] font-medium">
              {t.hero.stats.stat1Num}
            </span>
            <span className="block text-[10px] sm:text-xs text-[#a8a29e] tracking-[0.15em] uppercase mt-1">
              {t.hero.stats.stat1Label}
            </span>
          </div>

          <div className="text-center px-2 border-x border-white/10">
            <span className="block font-serif text-2xl sm:text-3xl lg:text-4xl text-[#f59e0b] font-medium">
              {t.hero.stats.stat2Num}
            </span>
            <span className="block text-[10px] sm:text-xs text-[#a8a29e] tracking-[0.15em] uppercase mt-1">
              {t.hero.stats.stat2Label}
            </span>
          </div>

          <div className="text-center px-2">
            <span className="block font-serif text-2xl sm:text-3xl lg:text-4xl text-[#f59e0b] font-medium">
              {t.hero.stats.stat3Num}
            </span>
            <span className="block text-[10px] sm:text-xs text-[#a8a29e] tracking-[0.15em] uppercase mt-1">
              {t.hero.stats.stat3Label}
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <a
        href="#story"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#78716c] hover:text-[#f59e0b] transition-colors duration-300 group"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#a8a29e]">
          {t.hero.scrollIndicator}
        </span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:text-[#f59e0b]" />
      </a>
    </section>
  );
}
