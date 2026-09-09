'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc3, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AtelierAudio() {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRefs = useRef<any[]>([]);

  // Synthesize ultra-warm relaxing atelier vinyl lounge ambient chords using Web Audio API
  const startAtmosphereAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Warm vinyl low noise / gentle tape hiss
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 0.35; // quiet vinyl warmth
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(420, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, ctx.currentTime);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      whiteNoise.start();

      // Mellow Rhodes / warm jazz chords (Cmaj9 / Fmaj9 frequencies: 130.81Hz, 164.81Hz, 196.00Hz, 246.94Hz, 293.66Hz)
      const freqs = [130.81, 164.81, 196.0, 246.94, 293.66];
      const oscNodes: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle gentle lfo modulation for vinyl pitch drift
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.05, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.8, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.04 / (idx + 1), ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        oscNodes.push(osc);
      });

      oscillatorRefs.current = [whiteNoise, ...oscNodes];
      setIsPlaying(true);
    } catch (e) {
      console.warn('Web Audio playback error:', e);
    }
  };

  const stopAtmosphereAudio = () => {
    try {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlaying(false);
    } catch (e) {
      console.warn('Web Audio stop error:', e);
    }
  };

  const toggleAudio = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopAtmosphereAudio();
    } else {
      startAtmosphereAudio();
    }
  };

  useEffect(() => {
    return () => {
      stopAtmosphereAudio();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center">
      <button
        onClick={toggleAudio}
        type="button"
        className={`group flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-500 shadow-2xl backdrop-blur-2xl ${
          isPlaying
            ? 'bg-[#18181b]/95 border-[#d97706]/60 text-[#fef3c7] shadow-[#d97706]/20'
            : 'bg-[#0e0e10]/85 border-white/10 text-[#a8a29e] hover:text-[#f5f5f4] hover:border-white/20'
        }`}
        title={isPlaying ? 'Mute Atelier Vinyl Lounge Audio' : 'Play Atelier Vinyl Lounge Audio'}
      >
        <div className="relative flex items-center justify-center">
          <Disc3 className={`w-4 h-4 text-[#f59e0b] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#f59e0b] font-semibold">
            {isPlaying ? (language === 'sr' ? 'Zvuk Ateljea Uključen' : 'Atelier Vinyl Live') : (language === 'sr' ? 'Pusti Zvuk Ateljea' : 'Atelier Soundscape')}
          </span>
          <span className="text-[11px] text-[#a8a29e] -mt-0.5 truncate max-w-[130px]">
            {isPlaying ? 'Dorćol Vinyl Jazz' : (language === 'sr' ? 'Analogni jazz & bar' : 'Analog Vinyl & Steam')}
          </span>
        </div>

        {/* Equalizer Bars Simulation */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3 ml-1">
            <span className="w-0.5 h-full bg-[#f59e0b] animate-pulse" style={{ animationDuration: '0.6s' }} />
            <span className="w-0.5 h-2/3 bg-[#f59e0b] animate-pulse" style={{ animationDuration: '0.9s' }} />
            <span className="w-0.5 h-4/5 bg-[#f59e0b] animate-pulse" style={{ animationDuration: '0.4s' }} />
            <span className="w-0.5 h-1/2 bg-[#f59e0b] animate-pulse" style={{ animationDuration: '0.8s' }} />
          </div>
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-[#78716c] group-hover:text-[#f59e0b] transition-colors" />
        )}
      </button>
    </div>
  );
}
