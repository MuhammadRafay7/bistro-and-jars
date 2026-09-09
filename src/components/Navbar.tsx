'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Coffee, Globe, MessageSquare, Menu as MenuIcon, X, Sparkles, Clock } from 'lucide-react';

export default function Navbar() {
  const { language, toggleLanguage, t, setIsReservationOpen } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.story, href: '#story' },
    { label: t.nav.signature, href: '#signature' },
    { label: t.nav.menu, href: '#menu' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.atmosphere, href: '#atmosphere' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl shadow-black/80'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-[#d97706]/50 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d97706] to-[#78350f] p-[1px] flex items-center justify-center shadow-lg shadow-[#d97706]/20 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0d0d0d] rounded-full flex items-center justify-center">
                <Coffee className="w-4 h-4 text-[#f59e0b]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#f5f5f4] group-hover:text-[#f59e0b] transition-colors">
                Bistro & Jars
              </span>
              <span className="text-[10px] font-sans tracking-widest text-[#a8a29e] uppercase -mt-0.5">
                Coffee Atelier • Belgrade
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-widest font-medium text-[#a8a29e] hover:text-[#f5f5f4] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#d97706] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Group */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Live Open Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/5 text-[11px] text-[#d6d3d1]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-emerald-400/90">{t.brand.openNow}</span>
              <span className="text-[#78716c]">•</span>
              <span className="text-[#a8a29e]">08:00–23:00</span>
            </div>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-[#f5f5f4] transition-all hover:border-[#d97706]/50 focus:outline-none"
              title="Toggle Serbian / English"
            >
              <Globe className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span className="tracking-wide uppercase">{language === 'sr' ? 'SR 🇷🇸' : 'EN 🇬🇧'}</span>
            </button>

            {/* WhatsApp / Reserve CTA */}
            <button
              onClick={() => setIsReservationOpen(true)}
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#f59e0b] hover:to-[#d97706] text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#d97706]/20 hover:shadow-[#d97706]/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.nav.reserve}</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2.5 lg:hidden">
            {/* Language Toggle for Mobile */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-bold text-[#f5f5f4]"
            >
              <span>{language === 'sr' ? 'SR' : 'EN'}</span>
            </button>

            {/* Quick WhatsApp Action */}
            <button
              onClick={() => setIsReservationOpen(true)}
              type="button"
              className="p-2 rounded-full bg-[#d97706] text-black hover:bg-[#f59e0b] transition-colors"
              aria-label="Reserve via WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg bg-white/[0.06] text-[#f5f5f4] hover:bg-white/[0.1] border border-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 border-b border-white/10 animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-[#a8a29e]">Navigation</span>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                {t.brand.openNow} (08:00 - 23:00)
              </div>
            </div>

            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl text-[#f5f5f4] hover:text-[#f59e0b] transition-colors flex items-center justify-between group"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-sans text-[#78716c] group-hover:text-[#f59e0b]">→</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsReservationOpen(true);
              }}
              type="button"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d97706] to-[#b45309] text-black font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#d97706]/30"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.nav.reserve}</span>
            </button>

            <div className="flex items-center justify-between text-xs text-[#a8a29e] px-1">
              <span>Dorćol, Belgrade</span>
              <button
                onClick={toggleLanguage}
                className="text-[#f59e0b] underline font-medium"
              >
                {language === 'sr' ? 'Switch to English' : 'Prebaci na Srpski'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
