'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import MenuSection from '@/components/MenuSection';
import ReservationModal from '@/components/ReservationModal';
import PrivacyModal from '@/components/PrivacyModal';
import AtelierAudio from '@/components/AtelierAudio';
import Footer from '@/components/Footer';

export default function DirectMenuPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-[#f5f5f4] selection:bg-[#d97706]/30 selection:text-[#fef3c7] pt-16">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-4 rounded-2xl glass-panel-amber border border-[#d97706]/30 text-xs text-[#fef3c7] flex items-center justify-between">
          <span>☕ In-Venue Table Menu • Bistro & Jars Belgrade</span>
          <a href="/" className="text-[#f59e0b] hover:underline font-semibold">← Return to Full Site</a>
        </div>
      </div>
      <MenuSection />
      <Footer />
      <AtelierAudio />
      <ReservationModal />
      <PrivacyModal />
    </main>
  );
}
