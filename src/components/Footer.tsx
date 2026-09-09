'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Coffee, MapPin, Clock, MessageSquare, Globe, Heart, Share2 } from 'lucide-react';

export default function Footer() {
  const { language, toggleLanguage, t, setIsReservationOpen, setIsPrivacyOpen } = useLanguage();

  return (
    <footer className="relative bg-[#050505] text-[#a8a29e] border-t border-white/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Top subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#d97706]/40 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d97706] to-[#78350f] p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0d0d0d] rounded-full flex items-center justify-center">
                  <Coffee className="w-4 h-4 text-[#f59e0b]" />
                </div>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#f5f5f4]">
                Bistro & Jars
              </span>
            </div>
            <p className="text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#d97706] hover:text-black text-[#d6d3d1] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <button
                onClick={() => setIsReservationOpen(true)}
                className="w-8 h-8 rounded-full bg-[#25D366]/10 hover:bg-[#25D366] hover:text-black text-[#25D366] flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#f5f5f4] font-semibold">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#story" className="hover:text-[#f59e0b] transition-colors">
                  {t.nav.story}
                </a>
              </li>
              <li>
                <a href="#signature" className="hover:text-[#f59e0b] transition-colors">
                  {t.nav.signature}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#f59e0b] transition-colors">
                  {t.nav.menu}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#f59e0b] transition-colors">
                  {t.nav.gallery}
                </a>
              </li>
              <li>
                <a href="#atmosphere" className="hover:text-[#f59e0b] transition-colors">
                  {t.nav.atmosphere}
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#f5f5f4] font-semibold">
              {t.footer.hoursTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>{t.footer.weekdays}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>{t.footer.weekends}</span>
              </li>
              <li className="text-[11px] text-emerald-400/90 pt-1">
                ● In-house kitchen open all day
              </li>
            </ul>
          </div>

          {/* Atelier Address */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#f5f5f4] font-semibold">
              {t.footer.locationTitle}
            </h4>
            <p className="text-xs leading-relaxed flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#f59e0b] mt-0.5 shrink-0" />
              <span>Kralja Petra 44, Dorćol, 11000 Beograd, Srbija</span>
            </p>
            <button
              onClick={() => setIsReservationOpen(true)}
              className="mt-2 text-xs text-[#25D366] hover:underline flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge: +381 64 987 6543</span>
            </button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716c]">
          <p>© {new Date().getFullYear()} Bistro & Jars. {t.footer.rights}</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-[#f59e0b] transition-colors"
            >
              {t.nav.privacy}
            </button>
            <span>•</span>
            <button
              onClick={toggleLanguage}
              className="text-[#f59e0b] hover:underline flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'sr' ? 'English Version' : 'Srpski Jezik'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
