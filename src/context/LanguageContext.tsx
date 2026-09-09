'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, DICTIONARY, MENU_ITEMS, MenuItem } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof DICTIONARY.en;
  menuItems: MenuItem[];
  currency: 'RSD' | 'EUR';
  setCurrency: (c: 'RSD' | 'EUR') => void;
  toggleCurrency: () => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: (open: boolean) => void;
  formatPrice: (priceRsd: number, priceEur: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('sr'); // Default to Serbian per Belgrade home market, easily toggled to English
  const [currency, setCurrency] = useState<'RSD' | 'EUR'>('RSD');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bistro_lang') as Language;
    if (saved && (saved === 'en' || saved === 'sr')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('bistro_lang', lang);
    } catch {}
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'sr' : 'en';
    handleSetLanguage(next);
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'RSD' ? 'EUR' : 'RSD');
  };

  const formatPrice = (priceRsd: number, priceEur: number) => {
    if (currency === 'EUR') {
      return `€${priceEur.toFixed(2)}`;
    }
    return `${priceRsd} RSD`;
  };

  const t = DICTIONARY[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        toggleLanguage,
        t,
        menuItems: MENU_ITEMS,
        currency,
        setCurrency,
        toggleCurrency,
        isReservationOpen,
        setIsReservationOpen,
        isPrivacyOpen,
        setIsPrivacyOpen,
        formatPrice,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
