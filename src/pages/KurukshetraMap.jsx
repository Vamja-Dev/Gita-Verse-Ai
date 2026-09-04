// src/pages/KurukshetraMap.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
import axios from 'axios';

// Import map images directly
import mainMapImg from '../assets/images/main-map.png';
import kuruMapImg from '../assets/images/kuru-map.png';
import kuru48KosImg from '../assets/images/kuru-48kros.png';
import kuruJyotisarImg from '../assets/images/kuru-jyotisar.png';
import bgMapImg from '../assets/images/bg-map.png';

const staticMapData = [
  {
    id: 1,
    title: "The Sacred Geography of Kurukshetra",
    subtitle: "Historical Storytelling • Kurukshetra Map",
    description: "Explore the complete sacred geography of Kurukshetra through its ancient sites, pilgrimage routes and historical landmarks.",
    image: mainMapImg
  },
  {
    id: 2,
    title: "Kurukshetra — The Sacred Land",
    subtitle: "HISTORICAL REGION",
    description: "This inset map represents the geography of the major kingdoms involved in the events leading up to the Mahabharata War, including Kuru, Panchal, Matsya, and neighbouring regions. It reflects the political landscape of the time, where diplomacy and alliances shaped the course of history. The map also references Viratnagar in the Matsya kingdom, associated with the crucial discussions between Yudhishthira and Sri Krishna, including the proposal of five villages to the Pandavas in a final effort to avert the great war.",
    highlights: ['Ancient Kuru region', 'Kurukshetra', 'Hastinapur', 'Indraprastha', 'Mathura'],
    image: kuruMapImg
  },
  {
    id: 3,
    title: "48 Kos Kurukshetra Parikrama",
    subtitle: "PILGRIMAGE JOURNEY",
    description: "The 48 Kos Kurukshetra region represents the sacred pilgrimage landscape surrounding Kurukshetra. The map traces the Parikrama Marg and identifies numerous pilgrimage sites, sacred ponds, villages and historical locations along the route.",
    highlights: ['48 Kos Kurukshetra', 'Parikrama Marg', 'Pilgrimage sites', 'Sacred ponds', 'Historical locations'],
    image: kuru48KosImg
  },
  {
    id: 4,
    title: "Jyotisar — The Battlefield of Dharma",
    subtitle: "BHAGAVAD GITA • JYOTISAR",
    description: "Jyotisar is the sacred land where Sri Krishna delivered the message of the Bhagavad Gita to Arjuna before the battle of the Mahabharata, and is one of the many significant sites depicted on this map of Kurukshetra.",
    highlights: ['Jyotisar', 'Bhagavad Gita', 'Krishna and Arjuna', 'Battle of Dharma', 'Kurukshetra'],
    image: kuruJyotisarImg
  }
];

export default function KurukshetraMap({ onNavigate }) {
  const [mapSections, setMapSections] = useState(staticMapData);

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/cms/map')
      .then(res => {
        const liveData = res.data.data || [];
        if (liveData.length > 0) {
          const merged = liveData.map((item, index) => ({
            ...item,
            image: staticMapData[index]?.image || item.image,
            title: item.title || item.name || staticMapData[index]?.title,
            subtitle: item.subtitle || item.theme || staticMapData[index]?.subtitle,
            description: item.description || item.summary || staticMapData[index]?.description,
            highlights: item.highlights || item.keyPoints || staticMapData[index]?.highlights
          }));
          setMapSections(merged);
        }
      })
      .catch(err => {
        console.warn("Backend offline. Falling back to static map view.");
      });
  }, []);

  const topSection = mapSections[0] || staticMapData[0];
  const section1 = mapSections[1] || staticMapData[1];
  const section2 = mapSections[2] || staticMapData[2];
  const section3 = mapSections[3] || staticMapData[3];

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
              <span>{topSection.subtitle}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-[#231204] font-bold tracking-wide">
              {topSection.title}
            </h1>
            <p className="text-xs md:text-sm font-sans text-[#4a2e12] font-medium max-w-xl mx-auto leading-relaxed">
              {topSection.description}
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
                  {section1.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#231204] font-bold tracking-wide">
                  {section1.title}
                </h2>
                <p className="text-sm md:text-base font-sans text-[#38200d] leading-relaxed font-normal">
                  {section1.description}
                </p>
              </div>

              {section1.highlights && (
                <div className="space-y-3 bg-[#f4ebd0]/95 backdrop-blur-xl border border-[#5c3a21]/30 rounded-2xl p-6 shadow-md">
                  <h4 className="text-xs font-sans uppercase tracking-widest text-[#4a2e12] font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#5c3a21]" /> Key Region Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {section1.highlights.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs md:text-sm font-sans text-[#231204] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5c3a21] mt-2 shrink-0 shadow-sm" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                  {section2.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#231204] font-bold tracking-wide">
                  {section2.title}
                </h2>
                <p className="text-sm md:text-base font-sans text-[#38200d] leading-relaxed font-normal">
                  {section2.description}
                </p>
              </div>

              {section2.highlights && (
                <div className="space-y-3 bg-[#f4ebd0]/95 backdrop-blur-xl border border-[#5c3a21]/30 rounded-2xl p-6 shadow-md">
                  <h4 className="text-xs font-sans uppercase tracking-widest text-[#4a2e12] font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#5c3a21]" /> Key Region Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {section2.highlights.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs md:text-sm font-sans text-[#231204] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5c3a21] mt-2 shrink-0 shadow-sm" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                  {section3.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#231204] font-bold tracking-wide">
                  {section3.title}
                </h2>
                <p className="text-sm md:text-base font-sans text-[#38200d] leading-relaxed font-normal">
                  {section3.description}
                </p>
              </div>

              {section3.highlights && (
                <div className="space-y-3 bg-[#f4ebd0]/95 backdrop-blur-xl border border-[#5c3a21]/30 rounded-2xl p-6 shadow-md">
                  <h4 className="text-xs font-sans uppercase tracking-widest text-[#4a2e12] font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#5c3a21]" /> Key Region Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {section3.highlights.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs md:text-sm font-sans text-[#231204] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5c3a21] mt-2 shrink-0 shadow-sm" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

        </div>

      </div>

      <footer className="relative z-20 text-center py-6 text-xs text-[#4a2e12] font-sans tracking-widest uppercase font-semibold bg-[#dfcca7] backdrop-blur-md border-t border-[#5c3a21]/20">
        © 2026 GitaVerse AI. AI-generated content may contain mistakes.

      </footer>
    </main>
  );
}