'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, MessageSquare, Calendar, Clock, Users, MapPin, Sparkles, CheckCircle2, Send, ExternalLink, Code, ShieldCheck, Armchair } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReservationModal() {
  const { language, t, isReservationOpen, setIsReservationOpen } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    zone: 'Coffee Atelier / Espresso Bar',
    requests: '',
  });

  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState<{
    directUrl: string;
    formattedMessage: string;
    mode: string;
  } | null>(null);
  const [showApiInspector, setShowApiInspector] = useState(false);

  if (!isReservationOpen) return null;

  const quickTimes = ['09:00', '11:30', '14:00', '17:00', '19:00', '21:00'];

  const zones = [
    {
      id: 'Coffee Atelier / Espresso Bar',
      name: t.reservation.form.zoneBar,
      tag: 'Front Roasting Bar • High Energy',
    },
    {
      id: 'Dimly Lit Vinyl Lounge',
      name: t.reservation.form.zoneLounge,
      tag: 'Intimate Armchairs • Vinyl Acoustics',
    },
    {
      id: 'Boutique Outdoor Terrace',
      name: t.reservation.form.zoneTerrace,
      tag: 'Dorćol Streetscape • Fresh Air',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          language,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessResult({
          directUrl: data.directUrl,
          formattedMessage: data.formattedMessage,
          mode: data.mode,
        });

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#d97706', '#f59e0b', '#fef3c7', '#25D366'],
          });
        } catch {}
      } else {
        const fallbackMsg = `Reservation for ${formData.name}, ${formData.guests} guests on ${formData.date} at ${formData.time} in ${formData.zone}.`;
        const fallbackUrl = `https://wa.me/381649876543?text=${encodeURIComponent(fallbackMsg)}`;
        setSuccessResult({
          directUrl: fallbackUrl,
          formattedMessage: fallbackMsg,
          mode: 'direct_fallback',
        });
      }
    } catch (err) {
      const fallbackMsg = `Reservation for ${formData.name}, ${formData.guests} guests on ${formData.date} at ${formData.time} in ${formData.zone}.`;
      const fallbackUrl = `https://wa.me/381649876543?text=${encodeURIComponent(fallbackMsg)}`;
      setSuccessResult({
        directUrl: fallbackUrl,
        formattedMessage: fallbackMsg,
        mode: 'network_fallback',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setSuccessResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative max-w-xl w-full glass-panel-amber border border-[#d97706]/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#a8a29e] hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-xs text-[#25D366] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              <span>WhatsApp Direct Concierge</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono">
              ● Limited Tables Available
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f5f4] font-normal">
            {t.reservation.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#a8a29e] font-light">
            {t.reservation.subtitle}
          </p>
        </div>

        {!successResult ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#d6d3d1]">
                  {t.reservation.form.name} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.reservation.form.namePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#d97706] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#d6d3d1]">
                  {t.reservation.form.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t.reservation.form.phonePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#d97706] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#d6d3d1] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>{t.reservation.form.guests}</span>
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-xs text-[#f5f5f4] focus:outline-none focus:border-[#d97706]"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5 People</option>
                  <option value="6+">6+ Guests (VIP Table)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#d6d3d1] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>{t.reservation.form.date}</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-[#f5f5f4] focus:outline-none focus:border-[#d97706]"
                />
              </div>

              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <label className="text-xs font-medium text-[#d6d3d1] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>{t.reservation.form.time}</span>
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#141414] border border-white/10 text-xs text-[#f5f5f4] focus:outline-none focus:border-[#d97706]"
                >
                  {quickTimes.map((tm) => (
                    <option key={tm} value={tm}>
                      {tm}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visual Seating Zone Selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#d6d3d1] flex items-center gap-1.5">
                <Armchair className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>{t.reservation.form.zone}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {zones.map((z) => {
                  const isSelected = formData.zone === z.id;
                  return (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, zone: z.id })}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'border-[#d97706] bg-[#d97706]/15 text-[#fef3c7] shadow-md shadow-[#d97706]/10'
                          : 'border-white/5 bg-white/[0.02] text-[#a8a29e] hover:border-white/20'
                      }`}
                    >
                      <span className="block font-medium text-xs truncate text-[#f5f5f4]">
                        {z.name}
                      </span>
                      <span className="block text-[10px] text-[#78716c] truncate mt-0.5">
                        {z.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#d6d3d1]">
                {t.reservation.form.requests}
              </label>
              <textarea
                rows={2}
                value={formData.requests}
                onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                placeholder={t.reservation.form.requestsPlaceholder}
                className="w-full px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none focus:border-[#d97706] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#2bf075] hover:to-[#25D366] text-black font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#25D366]/20 transition-all duration-300 disabled:opacity-50 hover:scale-[1.01]"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>{t.reservation.form.submitting}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t.reservation.form.submit}</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Confirmation View */
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366] flex items-center justify-center mx-auto text-[#25D366]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="font-serif text-2xl text-[#f5f5f4] font-medium">
                {t.reservation.form.successTitle}
              </h4>
              <p className="text-xs sm:text-sm text-[#a8a29e] font-light max-w-md mx-auto">
                {t.reservation.form.successBody}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/70 border border-white/10 text-left text-xs font-mono text-[#d6d3d1] whitespace-pre-wrap max-h-40 overflow-y-auto">
              {successResult.formattedMessage}
            </div>

            <div className="space-y-3">
              <a
                href={successResult.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5c] text-black font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-2xl shadow-[#25D366]/30 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.reservation.form.openWhatsApp}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSuccessResult(null)}
                type="button"
                className="text-xs text-[#a8a29e] hover:text-white underline"
              >
                Modify details
              </button>
            </div>
          </div>
        )}

        {/* Cloud API Payload Inspector Toggle */}
        <div className="pt-4 hairline-t">
          <button
            onClick={() => setShowApiInspector(!showApiInspector)}
            type="button"
            className="flex items-center justify-between w-full text-[11px] text-[#78716c] hover:text-[#f59e0b] transition-colors"
          >
            <span className="flex items-center gap-1.5 font-mono">
              <Code className="w-3.5 h-3.5" />
              <span>Meta WhatsApp Cloud API JSON Inspector</span>
            </span>
            <span>{showApiInspector ? '▲ Hide' : '▼ View Payload'}</span>
          </button>

          {showApiInspector && (
            <div className="mt-3 p-3 rounded-xl bg-black/80 border border-white/10 text-[10px] font-mono text-[#a8a29e] space-y-1">
              <span className="text-[#f59e0b] block">// POST https://graph.facebook.com/v19.0/{'{PHONE_NUMBER_ID}'}/messages</span>
              <pre className="overflow-x-auto text-emerald-400/90">
{JSON.stringify({
  messaging_product: "whatsapp",
  to: "381649876543",
  type: "text",
  text: {
    body: `☕ Reservation from ${formData.name || 'Marko'} (${formData.guests} guests, ${formData.date} at ${formData.time}, Zone: ${formData.zone})`
  }
}, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
