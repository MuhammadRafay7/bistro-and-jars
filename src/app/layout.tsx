import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bistro & Jars | Specialty Coffee Bar & Atelier • Belgrade',
  description: 'A dark, tactile sanctuary in Belgrade. Single-origin micro-lots, 18-hour cold drip extraction, and artisanal culinary creations in glass jars. Inquire via WhatsApp.',
  keywords: ['Bistro and Jars', 'Belgrade Specialty Coffee', 'Coffee Bar Dorcol', 'Kyoto Cold Drip', 'Specialty Coffee Serbia'],
  openGraph: {
    title: 'Bistro & Jars — Editorial Specialty Coffee Bar',
    description: 'Bilingual presentation site and QR-code menu for Belgrade coffee atelier.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className={`${cormorant.variable} ${plusJakarta.variable} dark scroll-smooth`}>
      <body className="bg-[#0a0a0a] text-[#f5f5f4] antialiased selection:bg-[#d97706]/30 selection:text-[#fef3c7] min-h-screen font-sans overflow-x-hidden">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
