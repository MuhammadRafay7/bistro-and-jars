'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, ShieldCheck } from 'lucide-react';

export default function PrivacyModal() {
  const { t, isPrivacyOpen, setIsPrivacyOpen } = useLanguage();

  if (!isPrivacyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative max-w-lg w-full glass-panel border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          onClick={() => setIsPrivacyOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#a8a29e] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#d97706]/20 border border-[#d97706] flex items-center justify-center text-[#f59e0b]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-[#f5f5f4] font-medium">
              {t.privacy.title}
            </h3>
            <p className="text-[11px] text-[#78716c] font-mono">
              {t.privacy.lastUpdated}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#a8a29e] font-light leading-relaxed">
          <p>{t.privacy.p1}</p>
          <p>{t.privacy.p2}</p>
          <p>{t.privacy.p3}</p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button
            onClick={() => setIsPrivacyOpen(false)}
            className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#f5f5f4] font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            {t.privacy.close}
          </button>
        </div>
      </div>
    </div>
  );
}
