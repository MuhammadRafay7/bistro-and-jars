'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Camera, Eye, X, Sparkles, ZoomIn, Film } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'coffee' | 'space' | 'jars' | 'evening';
  titleEn: string;
  titleSr: string;
  subtitleEn: string;
  subtitleSr: string;
  cameraMeta: string;
  image: string;
  aspect: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    category: 'coffee',
    titleEn: 'Precision V60 Manual Extraction',
    titleSr: 'Ručna V60 Ekstrakcija',
    subtitleEn: 'Ethiopia Yirgacheffe 2,100m • 93.5°C Pour',
    subtitleSr: 'Etiopija Yirgacheffe 2.100m • 93.5°C Prelivanje',
    cameraMeta: 'Leica M11 • 35mm f/1.4 • Natural Light',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g2',
    category: 'space',
    titleEn: 'The Dimly Lit Atelier Counter',
    titleSr: 'Intimni Šank Ateljea',
    subtitleEn: 'Solid Walnut, Italian Synesso, Vintage Audio',
    subtitleSr: 'Puno orahovo drvo, Synesso mašina, vinil zvuk',
    cameraMeta: 'Hasselblad 500C/M • Kodak Portra 400',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g3',
    category: 'jars',
    titleEn: 'Artisan Chia & Mango Jars',
    titleSr: 'Zanatska Čia i Mango Teglica',
    subtitleEn: 'Overnight organic coconut cream layering',
    subtitleSr: 'Organski kokos krem i svež mango pire',
    cameraMeta: 'Leica SL2-S • 50mm Summilux',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g4',
    category: 'evening',
    titleEn: 'Smoked Bourbon & Cold Brew Old Fashioned',
    titleSr: 'Dimljeni Burbon & Cold Brew Old Fashioned',
    subtitleEn: 'Served under cherrywood aromatic smoke dome',
    subtitleSr: 'Pod staklenim zvonom sa aromom drveta trešnje',
    cameraMeta: 'Sony A7IV • 24-70mm GM II • Amber Flare',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g5',
    category: 'coffee',
    titleEn: 'Latte Art & Velvet Microfoam',
    titleSr: 'Latte Art i Baršunasta Mikro-Pena',
    subtitleEn: 'Single-origin espresso with steamed oat silk',
    subtitleSr: 'Single-origin espreso sa svilenkastim ovsenim mlekom',
    cameraMeta: 'Fuji GFX 100S • 63mm f/2.8',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g6',
    category: 'jars',
    titleEn: 'Layered Kyoto Espresso Tiramisu',
    titleSr: 'Složeni Kyoto Espreso Tiramisu',
    subtitleEn: 'Savoiardi ladyfingers in 18h cold drip',
    subtitleSr: 'Piškote u 18h hladno ceđenom espresu',
    cameraMeta: 'Contax T2 • Carl Zeiss 38mm f/2.8',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80',
    aspect: 'aspect-[4/3]',
  },
];

export default function GallerySection() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const tabs = [
    { id: 'all', label: t.gallery.tabs.all },
    { id: 'coffee', label: t.gallery.tabs.coffee },
    { id: 'space', label: t.gallery.tabs.space },
    { id: 'jars', label: t.gallery.tabs.jars },
    { id: 'evening', label: t.gallery.tabs.evening },
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  return (
    <section id="gallery" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#060606] border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 hairline-b">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs tracking-[0.2em] uppercase text-[#f59e0b]">
              <Camera className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>{t.gallery.badge}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f5f5f4]">
              {t.gallery.title}
            </h2>
            <p className="max-w-xl text-xs sm:text-sm text-[#a8a29e] font-light">
              {t.gallery.subtitle}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#d97706] to-[#b45309] text-black font-bold shadow-md shadow-[#d97706]/20'
                      : 'glass-panel text-[#a8a29e] hover:text-white border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const title = language === 'sr' ? item.titleSr : item.titleEn;
            const subtitle = language === 'sr' ? item.subtitleSr : item.subtitleEn;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-black cursor-pointer shadow-xl hover:border-[#d97706]/50 transition-all duration-500"
              >
                <div className={`w-full ${item.aspect} overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={title}
                    className="w-full h-full object-cover filter brightness-[0.88] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-between p-6">
                  {/* Camera Metadata Badge */}
                  <div className="self-end flex items-center gap-2">
                    <span className="text-[9px] font-mono tracking-widest text-[#a8a29e] px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      {item.cameraMeta}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#f59e0b]">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Captions */}
                  <div className="space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#f59e0b] uppercase block">
                      {item.category.toUpperCase()}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-[#f5f5f4] font-medium leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs text-[#a8a29e] font-light">
                      {subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full glass-panel rounded-3xl overflow-hidden border border-[#d97706]/40 shadow-2xl space-y-4 p-4 sm:p-6"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-[#d97706] hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={language === 'sr' ? selectedImage.titleSr : selectedImage.titleEn}
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <h4 className="font-serif text-xl sm:text-2xl text-[#f5f5f4] font-medium">
                  {language === 'sr' ? selectedImage.titleSr : selectedImage.titleEn}
                </h4>
                <p className="text-xs text-[#a8a29e]">
                  {language === 'sr' ? selectedImage.subtitleSr : selectedImage.subtitleEn}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#a8a29e] font-mono">
                  {selectedImage.cameraMeta}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#d97706]/20 border border-[#d97706] text-xs text-[#f59e0b] font-mono uppercase">
                  {selectedImage.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
