'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MenuItem } from '@/lib/i18n';
import { Search, Sparkles, QrCode, Coffee, Wine, Utensils, Zap, MessageSquare, LayoutGrid, List, Award, Heart } from 'lucide-react';

export default function MenuSection() {
  const { language, t, menuItems, currency, toggleCurrency, formatPrice, setIsReservationOpen } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'editorial'>('grid');
  const [showQrModal, setShowQrModal] = useState(false);

  const categories = [
    { id: 'all', label: t.menu.tabs.all, icon: Sparkles },
    { id: 'espresso', label: t.menu.tabs.espresso, icon: Coffee },
    { id: 'signature', label: t.menu.tabs.signature, icon: Zap },
    { id: 'bites', label: t.menu.tabs.bites, icon: Utensils },
    { id: 'cocktails', label: t.menu.tabs.cocktails, icon: Wine },
  ];

  const tags = [
    { id: 'all', label: t.menu.filterAll },
    { id: 'signature', label: t.menu.filterSig },
    { id: 'vegan', label: t.menu.filterVegan },
    { id: 'gf', label: t.menu.filterGf },
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchTag =
        activeTag === 'all' ||
        (activeTag === 'signature' && item.tags.includes('signature')) ||
        (activeTag === 'vegan' && item.tags.includes('vegan')) ||
        (activeTag === 'gf' && item.tags.includes('gf'));

      const q = searchQuery.toLowerCase().trim();
      const name = (language === 'sr' ? item.nameSr : item.nameEn).toLowerCase();
      const desc = (language === 'sr' ? item.descSr : item.descEn).toLowerCase();
      const matchSearch = !q || name.includes(q) || desc.includes(q);

      return matchCategory && matchTag && matchSearch;
    });
  }, [menuItems, activeCategory, activeTag, searchQuery, language]);

  return (
    <section id="menu" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#080808] border-t border-white/5">
      {/* Background ambient light */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#d97706]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 hairline-b">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs tracking-[0.2em] uppercase text-[#f59e0b]">
              <QrCode className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>{t.menu.badge}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f5f5f4]">
              {t.menu.title}
            </h2>
            <p className="max-w-xl text-xs sm:text-sm text-[#a8a29e] font-light">
              {t.menu.subtitle}
            </p>
          </div>

          {/* Controls: Currency & View Switcher */}
          <div className="flex items-center gap-3">
            {/* View Switcher (Grid vs Editorial List) */}
            <div className="flex items-center p-1 rounded-full glass-panel border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'grid' ? 'bg-[#d97706] text-black font-bold' : 'text-[#a8a29e] hover:text-white'
                }`}
                title="Grid View"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('editorial')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'editorial' ? 'bg-[#d97706] text-black font-bold' : 'text-[#a8a29e] hover:text-white'
                }`}
                title="Editorial Menu List"
                aria-label="Editorial list view"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Currency toggle */}
            <button
              onClick={toggleCurrency}
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 hover:border-[#d97706]/50 text-xs font-semibold text-[#f5f5f4] transition-all"
            >
              <span className="text-[#a8a29e]">{t.menu.currency}:</span>
              <span className="text-[#f59e0b] font-mono font-bold">{currency}</span>
            </button>

            {/* In-Venue QR Code Button */}
            <button
              onClick={() => setShowQrModal(true)}
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel-amber text-[#fef3c7] hover:text-[#f59e0b] text-xs font-semibold tracking-wider uppercase transition-all"
            >
              <QrCode className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>{t.menu.downloadQr}</span>
            </button>
          </div>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="space-y-5">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#d97706] to-[#b45309] text-black font-bold shadow-lg shadow-[#d97706]/20'
                      : 'glass-panel text-[#a8a29e] hover:text-[#f5f5f4] hover:border-white/20'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#f59e0b]'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716c]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.menu.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#d97706] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#78716c] hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {tags.map((tag) => {
                const isActive = activeTag === tag.id;
                return (
                  <button
                    key={tag.id}
                    onClick={() => setActiveTag(tag.id)}
                    type="button"
                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                      isActive
                        ? 'bg-white/15 text-[#fef3c7] border border-[#d97706]/50'
                        : 'bg-white/[0.02] text-[#78716c] hover:text-[#d6d3d1] border border-white/5'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* View Rendering: Grid View vs Editorial Menu List */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center glass-panel rounded-3xl p-8 border border-white/10 space-y-3">
            <Coffee className="w-8 h-8 text-[#78716c] mx-auto opacity-50" />
            <p className="text-sm text-[#a8a29e]">{t.menu.empty}</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveTag('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#f59e0b] underline font-medium"
            >
              Reset filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const name = language === 'sr' ? item.nameSr : item.nameEn;
              const desc = language === 'sr' ? item.descSr : item.descEn;
              const notes = item.notes ? (language === 'sr' ? item.notes.sr : item.notes.en) : null;

              return (
                <div
                  key={item.id}
                  className="group rounded-3xl glass-panel hover:glass-panel-amber p-4 border border-white/10 transition-all duration-400 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60"
                >
                  <div className="space-y-3.5">
                    {/* Image */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black">
                      <img
                        src={item.image}
                        alt={name}
                        className="w-full h-full object-cover filter brightness-[0.88] group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                      {/* Tag badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {item.tags.includes('signature') && (
                          <span className="px-2 py-0.5 rounded-md bg-[#d97706] text-[10px] font-bold text-black uppercase tracking-wider">
                            Signature
                          </span>
                        )}
                        {item.tags.includes('vegan') && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/85 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
                            Vegan
                          </span>
                        )}
                        {item.tags.includes('gf') && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/85 backdrop-blur-md text-[10px] font-bold text-black uppercase tracking-wider">
                            GF
                          </span>
                        )}
                      </div>

                      {/* Price badge */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-[#f59e0b]">
                        {formatPrice(item.priceRsd, item.priceEur)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5 px-1">
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#f5f5f4] group-hover:text-[#f59e0b] transition-colors leading-snug">
                        {name}
                      </h3>
                      <p className="text-xs text-[#a8a29e] font-light leading-relaxed line-clamp-2">
                        {desc}
                      </p>
                    </div>
                  </div>

                  {/* Roaster Notes & WhatsApp Action */}
                  <div className="pt-3.5 mt-3.5 hairline-t flex items-center justify-between text-[11px] px-1">
                    <span className="text-[#78716c] truncate max-w-[190px] font-mono">
                      {notes || 'Bistro & Jars Fresh'}
                    </span>
                    <button
                      onClick={() => setIsReservationOpen(true)}
                      type="button"
                      className="text-[#f59e0b] hover:text-[#fef3c7] font-medium flex items-center gap-1 transition-colors"
                      title="Reserve table / Inquire on WhatsApp"
                    >
                      <MessageSquare className="w-3 h-3 text-[#25D366]" />
                      <span>Order/Table</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Editorial Fine-Dining List View */
          <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/10 space-y-8">
            <div className="space-y-6 divide-y divide-white/5">
              {filteredItems.map((item) => {
                const name = language === 'sr' ? item.nameSr : item.nameEn;
                const desc = language === 'sr' ? item.descSr : item.descEn;
                const notes = item.notes ? (language === 'sr' ? item.notes.sr : item.notes.en) : null;

                return (
                  <div key={item.id} className="pt-6 first:pt-0 group flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-baseline">
                        <h4 className="font-serif text-lg sm:text-xl text-[#f5f5f4] group-hover:text-[#f59e0b] transition-colors font-medium">
                          {name}
                        </h4>
                        <div className="menu-leader hidden sm:block" />
                        <span className="font-mono text-sm sm:text-base font-bold text-[#f59e0b] sm:pl-2 shrink-0">
                          {formatPrice(item.priceRsd, item.priceEur)}
                        </span>
                      </div>
                      <p className="text-xs text-[#a8a29e] font-light leading-relaxed max-w-2xl">
                        {desc}
                      </p>
                      {notes && (
                        <span className="inline-block text-[10px] font-mono text-[#78716c] pt-1">
                          ✦ {notes}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Table QR Card Banner */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel-amber border border-[#d97706]/35 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-black/70 border border-[#d97706]/40 p-2.5 flex items-center justify-center shrink-0">
              <QrCode className="w-full h-full text-[#f59e0b]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl text-[#f5f5f4] font-medium">
                {language === 'sr' ? 'Digitalni Meni za Vaš Sto' : 'Digital Menu for Table Service'}
              </h3>
              <p className="text-xs sm:text-sm text-[#a8a29e] font-light max-w-lg">
                {t.menu.qrPrompt}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowQrModal(true)}
            type="button"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#f59e0b] hover:to-[#d97706] text-black font-bold text-xs tracking-wider uppercase transition-all duration-300 shrink-0 flex items-center justify-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>{t.menu.downloadQr}</span>
          </button>
        </div>
      </div>

      {/* QR Code Pop-up Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in">
          <div className="max-w-sm w-full glass-panel border border-[#d97706]/40 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 text-[#78716c] hover:text-white rounded-full bg-white/5"
            >
              ×
            </button>

            <div className="space-y-1">
              <div className="w-11 h-11 rounded-full bg-[#d97706]/20 border border-[#d97706] flex items-center justify-center mx-auto mb-3">
                <Coffee className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <h4 className="font-serif text-2xl text-[#f5f5f4] font-bold">Bistro & Jars</h4>
              <p className="text-xs text-[#a8a29e] uppercase tracking-widest font-mono">
                Dorćol Table QR Code
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl inline-block shadow-2xl">
              <svg viewBox="0 0 100 100" className="w-44 h-44 mx-auto" fill="#080808">
                <rect width="100" height="100" fill="white" />
                <rect x="10" y="10" width="24" height="24" fill="#080808" />
                <rect x="14" y="14" width="16" height="16" fill="white" />
                <rect x="18" y="18" width="8" height="8" fill="#080808" />

                <rect x="66" y="10" width="24" height="24" fill="#080808" />
                <rect x="70" y="14" width="16" height="16" fill="white" />
                <rect x="74" y="18" width="8" height="8" fill="#080808" />

                <rect x="10" y="66" width="24" height="24" fill="#080808" />
                <rect x="14" y="70" width="16" height="16" fill="white" />
                <rect x="18" y="74" width="8" height="8" fill="#080808" />

                <rect x="40" y="12" width="6" height="6" fill="#080808" />
                <rect x="50" y="12" width="6" height="6" fill="#080808" />
                <rect x="40" y="24" width="10" height="6" fill="#080808" />
                <rect x="54" y="24" width="6" height="12" fill="#080808" />

                <rect x="12" y="42" width="6" height="6" fill="#080808" />
                <rect x="24" y="42" width="14" height="6" fill="#080808" />
                <rect x="44" y="42" width="12" height="12" fill="#d97706" />
                <rect x="62" y="42" width="6" height="16" fill="#080808" />
                <rect x="74" y="42" width="14" height="6" fill="#080808" />

                <rect x="12" y="54" width="16" height="6" fill="#080808" />
                <rect x="34" y="60" width="6" height="16" fill="#080808" />
                <rect x="46" y="60" width="14" height="6" fill="#080808" />
                <rect x="66" y="66" width="10" height="10" fill="#080808" />
                <rect x="80" y="60" width="8" height="14" fill="#080808" />
                <rect x="46" y="74" width="14" height="14" fill="#080808" />
                <rect x="66" y="80" width="22" height="8" fill="#080808" />
              </svg>
            </div>

            <p className="text-xs text-[#a8a29e] font-light">
              Tabletop scan opens instant multilingual menu with origin altitudes, bean fermentation profiles, and direct barista inquiry.
            </p>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-[#f5f5f4] uppercase tracking-wider font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
