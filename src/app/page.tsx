'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StoryHook from '@/components/StoryHook';
import SignatureDrink from '@/components/SignatureDrink';
import MenuSection from '@/components/MenuSection';
import GallerySection from '@/components/GallerySection';
import AtmosphereSection from '@/components/AtmosphereSection';
import ReservationModal from '@/components/ReservationModal';
import PrivacyModal from '@/components/PrivacyModal';
import AtelierAudio from '@/components/AtelierAudio';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-[#f5f5f4] selection:bg-[#d97706]/30 selection:text-[#fef3c7] overflow-x-hidden">
      <Navbar />
      <Hero />
      <StoryHook />
      <SignatureDrink />
      <MenuSection />
      <GallerySection />
      <AtmosphereSection />
      <Footer />

      {/* Floating Atelier Audio */}
      <AtelierAudio />

      {/* Global Interactive Modals */}
      <ReservationModal />
      <PrivacyModal />
    </main>
  );
}
