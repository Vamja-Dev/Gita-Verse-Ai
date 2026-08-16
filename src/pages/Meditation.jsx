import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, Pause, Volume2, Wind, Sun, Compass, Heart, Music } from 'lucide-react';
import meditationBg from '../assets/images/meditation-bg.png';

export default function Meditation({ onNavigate }) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(null);
  
  // Breathing animation states
  const [breathState, setBreathState] = useState('Inhale');
  const [breathText, setBreathText] = useState('Breathe In deeply...');

  useEffect(() => {
    const cycle = setTimeout(() => {
      if (breathState === 'Inhale') {
        setBreathState('Hold');
        setBreathText('Hold your breath...');
      } else if (breathState === 'Hold') {
        setBreathState('Exhale');
        setBreathText('Release and Exhale...');
      } else {
        setBreathState('Inhale');
        setBreathText('Breathe In deeply...');
      }
    }, 4000);

    return () => clearTimeout(cycle);
  }, [breathState]);

  const musicTracks = [
    { id: 1, title: 'Om chanting 108 Times', duration: '12:45', category: 'Chanting' },
    { id: 2, title: 'Flute of Vrindavan', duration: '20:00', category: 'Deep Peace' },
    { id: 3, title: 'Himalayan Temple Bells', duration: '15:30', category: 'Mindfulness' },
    { id: 4, title: 'Cosmic Pranayama Flow', duration: '10:00', category: 'Pranayama' }
  ];

  return (
    <main className="relative w-full min-h-screen text-slate-100 font-serif overflow-x-hidden bg-[#06040a]">
      
      {/* Custom Full-Screen Background Image Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img 
          src={meditationBg} 
          alt="Meditation Sanctuary Background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-20 pt-36 pb-24 px-6 md:px-16 max-w-7xl mx-auto space-y-16">
        
        {/* Meditation Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-sans tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Sacred Sanctuary • Dhyana Yoga</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-amber-100 tracking-wide [text-shadow:_0_0_30px_rgba(245,158,11,0.5)]">
            Find Inner Stillness & Peace
          </h1>
          <p className="text-sm md:text-base font-sans text-slate-200/90 font-light leading-relaxed drop-shadow-md">
            Immerse your soul in meditative soundscapes and guided breathing circles for timeless yogic contemplation.
          </p>
        </div>

        {/* Sacred Ambient Soundscapes Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-amber-500/20 pb-4">
            <Music className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-serif text-amber-200 tracking-wide">Sacred Ambient Soundscapes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {musicTracks.map((track) => (
              <div 
                key={track.id}
                className="bg-[#0d0914]/65 backdrop-blur-md border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-6 flex items-center justify-between shadow-xl transition-all"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-sans text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">{track.category}</span>
                  <h3 className="text-base font-serif text-amber-100 pt-1">{track.title}</h3>
                  <span className="text-xs font-sans text-slate-300">{track.duration}</span>
                </div>

                <button
                  onClick={() => setIsPlayingMusic(isPlayingMusic === track.id ? null : track.id)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                    isPlayingMusic === track.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                      : 'bg-slate-900/80 text-amber-300 border-amber-500/30 hover:border-amber-400'
                  }`}
                >
                  {isPlayingMusic === track.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Breathing Animation Circle with Extra Bottom Clearance */}
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-[#0d0914]/75 backdrop-blur-md p-8 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-center space-y-8 mb-12">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-600/10 via-transparent to-purple-950/20 pointer-events-none" />
          
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-sans text-amber-400 uppercase tracking-[0.3em]">Guided Pranayama</span>
            <h2 className="text-2xl font-serif text-amber-100">Synchronize Your Breath</h2>
          </div>

          <div className="relative z-10 flex items-center justify-center py-6">
            <motion.div
              animate={{
                scale: breathState === 'Inhale' ? 1.35 : breathState === 'Hold' ? 1.35 : 1,
                opacity: breathState === 'Hold' ? 0.9 : 0.6
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="w-52 h-52 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-amber-600/30 via-amber-400/20 to-purple-600/30 border-2 border-amber-400/60 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.4)]"
            >
              <span className="text-xl md:text-2xl font-serif text-amber-200 uppercase tracking-widest">{breathState}</span>
              <span className="text-xs font-sans text-amber-300/90 pt-2">{breathText}</span>
            </motion.div>
          </div>
        </div>

      </div>

      <footer className="relative z-20 text-center py-6 text-xs text-amber-200/50 font-sans tracking-widest uppercase bg-slate-950/40 backdrop-blur-md border-t border-amber-500/10">
        © 2026 GitaVerse AI. All rights reserved.
      </footer>
    </main>
  );
}