import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';

// Import map images directly
import mainMapImg from '../assets/images/main-map.png';
import kuruMapImg from '../assets/images/kuru-map.png';
import kuru48KosImg from '../assets/images/kuru-48kros.png';
import kuruJyotisarImg from '../assets/images/kuru-jyotisar.png';
import bgMapImg from '../assets/images/bg-map.png';

export default function KurukshetraMap({ onNavigate }) {
  return (
    <main className="relative w-full min-h-screen text-[#2d1806] font-serif overflow-x-hidden bg-[#e8d5b5]">
      {/* Background Image Layer using bg-map.png */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img 
          src={bgMapImg} 
          alt="Parchment Texture Background" 
          className="w-full h-full object-cover opacity-90 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-amber-950/5" />
      </div>

      <div className="relative z-20 pt-24 pb-24 px-6 md:px-16 max-w-7xl mx-auto space-y-28">
        
        {/* HEADER & FIRST SECTION COMBINED: Fits entirely in viewport without forcing initial scroll to see the map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-6"
        >
          {/* Header Info */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3e2714]/15 border border-[#3e2714]/40 text-[#3e2714] text-xs font-sans tracking-widest uppercase font-semibold shadow-sm">
              <Compass className="w-4 h-4 text-[#3e2714]" />
              <span>Historical Storytelling • Kurukshetra Map</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-[#231204] font-bold tracking-wide">
              The Sacred Geography of Kurukshetra
            </h1>
            <p className="text-xs md:text-sm font-sans text-[#4a2e12] font-medium max-w-xl mx-auto leading-relaxed">
              Explore the complete sacred geography of Kurukshetra through its ancient sites, pilgrimage routes and historical landmarks.
            </p>
          </div>

          {/* First Main Map: Perfectly sized to fit above the fold without scrolling */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#5c3a21]/40 bg-[#f4ebd0] shadow-[0_20px_50px_rgba(69,26,3,0.25)] p-2 md:p-3 w-full max-w-sm">
            <div className="relative w-full overflow-hidden rounded-2xl flex items-center justify-center">
              <img 
                src={mainMapImg} 
                alt="Main Kurukshetra Map" 
                className="w-full h-auto block" 
              />
            </div>
          </div>
        </motion.div>

        {/* SCROLL STORYTELLING SECTIONS (Revealed smoothly on scroll below the fold) */}
        <div className="space-y-36 pt-12">
          
          {/* SCROLL STORY 1: KURU / INSET (Image Left, Text Right) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
          >
            <div className="relative w-full lg:w-[50%] overflow-hidden border-2 border-[#5c3a21]/40 bg-[#f4ebd0] shadow-[0_20px_50px_rgba(69,26,3,0.25)] rounded-3xl p-3 md:p-5">
              <div className="relative w-full overflow-hidden rounded-2xl flex items-center justify-center">
                <img src={kuruMapImg} alt="Kuru Region Inset" className="w-full h-auto block" />
              </div>
            </div>

            <div className="w-full lg:w-[46%] space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-sans text-[#5c3a21] uppercase tracking-[0.25em] font-bold">
                  HISTORICAL REGION
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#231204] font-bold tracking-wide">
                  Kurukshetra — The Sacred Land
                </h2>
                <p className="text-sm md:text-base font-sans text-[#38200d] leading-relaxed font-normal">
                  This inset map represents the geography of the major kingdoms involved in the events leading up to the Mahabharata War, including Kuru, Panchal, Matsya, and neighbouring regions. It reflects the political landscape of the time, where diplomacy and alliances shaped the course of history. The map also references Viratnagar in the Matsya kingdom, associated with the crucial discussions between Yudhishthira and Sri Krishna, including the proposal of five villages to the Pandavas in a final effort to avert the great war.
                </p>
              </div>

              <div className="space-y-3 bg-[#f4ebd0]/95 backdrop-blur-xl border border-[#5c3a21]/30 rounded-2xl p-6 shadow-md">
                <h4 className="text-xs font-sans uppercase tracking-widest text-[#4a2e12] font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#5c3a21]" /> Key Region Highlights
                </h4>
                <ul className="space-y-2.5">
                  {['Ancient Kuru region', 'Kurukshetra', 'Hastinapur', 'Indraprastha', 'Mathura'].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs md:text-sm font-sans text-[#231204] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5c3a21] mt-2 shrink-0 shadow-sm" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* SCROLL STORY 2: 48 KOS PARIKRAMA MARG (Text Left, Image Right) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16"
          >
            <div className="relative w-full lg:w-[50%] overflow-hidden border-2 border-[#5c3a21]/40 bg-[#f4ebd0] shadow-[0_20px_50px_rgba(69,26,3,0.25)] rounded-3xl p-3 md:p-5">
              <div className="relative w-full overflow-hidden rounded-2xl flex items-center justify-center">
                <img src={kuru48KosImg} alt="48 Kos Parikrama Marg" className="w-full h-auto block" />
              </div>
            </div>

            <div className="w-full lg:w-[46%] space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-sans text-[#5c3a21] uppercase tracking-[0.25em] font-bold">
                  PILGRIMAGE JOURNEY
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#231204] font-bold tracking-wide">
                  48 Kos Kurukshetra Parikrama
                </h2>
                <p className="text-sm md:text-base font-sans text-[#38200d] leading-relaxed font-normal">
                  The 48 Kos Kurukshetra region represents the sacred pilgrimage landscape surrounding Kurukshetra. The map traces the Parikrama Marg and identifies numerous pilgrimage sites, sacred ponds, villages and historical locations along the route.
                </p>
              </div>

              <div className="space-y-3 bg-[#f4ebd0]/95 backdrop-blur-xl border border-[#5c3a21]/30 rounded-2xl p-6 shadow-md">
                <h4 className="text-xs font-sans uppercase tracking-widest text-[#4a2e12] font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#5c3a21]" /> Key Region Highlights
                </h4>
                <ul className="space-y-2.5">
                  {['48 Kos Kurukshetra', 'Parikrama Marg', 'Pilgrimage sites', 'Sacred ponds', 'Historical locations'].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs md:text-sm font-sans text-[#231204] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5c3a21] mt-2 shrink-0 shadow-sm" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* SCROLL STORY 3: JYOTISAR / BATTLE OF DHARMA (Image Left, Text Right) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
          >
            <div className="relative w-full lg:w-[50%] overflow-hidden border-2 border-[#5c3a21]/40 bg-[#f4ebd0] shadow-[0_20px_50px_rgba(69,26,3,0.25)] rounded-3xl p-3 md:p-5">
              <div className="relative w-full overflow-hidden rounded-2xl flex items-center justify-center">
                <img src={kuruJyotisarImg} alt="Jyotisar Map" className="w-full h-auto block" />
              </div>
            </div>

            <div className="w-full lg:w-[46%] space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-sans text-[#5c3a21] uppercase tracking-[0.25em] font-bold">
                  BHAGAVAD GITA • JYOTISAR
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#231204] font-bold tracking-wide">
                  Jyotisar — The Battlefield of Dharma
                </h2>
                <p className="text-sm md:text-base font-sans text-[#38200d] leading-relaxed font-normal">
                  Jyotisar is the sacred land where Sri Krishna delivered the message of the Bhagavad Gita to Arjuna before the battle of the Mahabharata, and is one of the many significant sites depicted on this map of Kurukshetra.
                </p>
              </div>

              <div className="space-y-3 bg-[#f4ebd0]/95 backdrop-blur-xl border border-[#5c3a21]/30 rounded-2xl p-6 shadow-md">
                <h4 className="text-xs font-sans uppercase tracking-widest text-[#4a2e12] font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#5c3a21]" /> Key Region Highlights
                </h4>
                <ul className="space-y-2.5">
                  {['Jyotisar', 'Bhagavad Gita', 'Krishna and Arjuna', 'Battle of Dharma', 'Kurukshetra'].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs md:text-sm font-sans text-[#231204] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5c3a21] mt-2 shrink-0 shadow-sm" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      <footer className="relative z-20 text-center py-6 text-xs text-[#4a2e12] font-sans tracking-widest uppercase font-semibold bg-[#dfcca7] backdrop-blur-md border-t border-[#5c3a21]/20">
        © 2026 GitaVerse AI. All rights reserved.
      </footer>
    </main>
  );
}