// src/pages/MahabharataTimeline.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, X, Eye } from 'lucide-react';
import axios from 'axios';

// Import timeline background asset directly
import timelineBg from '../assets/images/timeline-bg.png';

// Data is imported from the external file as fallback
import { eras as staticEras } from '../data/timelineData';

export default function MahabharataTimeline({ onNavigate }) {
  const [eras, setEras] = useState(staticEras);
  const [selectedEra, setSelectedEra] = useState(null);

  useEffect(() => {
    // Attempt to fetch live database content with dual-mode fallback, mapping fields to static images
    axios.get('http://localhost:8000/api/admin/cms/timeline')
      .then(res => {
        const liveData = res.data.data || [];
        if (liveData.length > 0) {
          const merged = liveData.map((item, index) => ({
            ...item,
            image: staticEras[index]?.image || item.image || item.image_url,
            title: item.title || item.name || staticEras[index]?.title,
            name: item.name || item.title || staticEras[index]?.name,
            subtitle: item.subtitle || item.theme || staticEras[index]?.subtitle,
            description: item.description || item.summary || staticEras[index]?.description,
            keyPoints: item.keyPoints || item.highlights || staticEras[index]?.keyPoints,
            fullDetails: item.fullDetails || item.detailedInfo || staticEras[index]?.fullDetails
          }));
          setEras(merged);
        }
      })
      .catch(err => {
        console.warn("Backend offline. Falling back to static timelineData.");
      });
  }, []);

  return (
    <main className="relative w-full min-h-screen text-slate-100 font-serif overflow-x-hidden bg-[#06040a] pb-24">
      {/* Background Image Container */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img 
          src={timelineBg} 
          alt="Timeline Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06040a]/60 via-transparent to-[#06040a]/80" />
      </div>

      <div className="relative z-20 pt-36 px-6 md:px-16 max-w-7xl mx-auto space-y-20">
        
        {/* Header Title Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-sans tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Epic Journey • Mahabharata Timeline</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-amber-100 tracking-wide [text-shadow:_0_0_30px_rgba(245,158,11,0.5)]">
            Chronicles of the Era
          </h1>
          <p className="text-sm md:text-base font-sans text-slate-300/80 font-light leading-relaxed">
            Scroll through the monumental milestones of the epoch from divine birth to eternal wisdom.
          </p>
        </div>

        {/* Alternating Timeline Rows */}
        <div className="space-y-24">
          {eras.map((era, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={era._id || era.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Container with auto height to adapt fully to the image dimensions without cropping */}
                <div 
                  onClick={() => setSelectedEra(era)}
                  className="relative group w-full lg:w-1/2 overflow-hidden border border-amber-500/30 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer rounded-[2.5rem]"
                >
                  <img 
                    src={era.image} 
                    alt={era.title || era.name}
                    className="w-full h-auto block group-hover:scale-105 transition-transform duration-700 z-0" 
                  />

                  {/* Dark gradient overlay for text readability at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />
                  
                  {/* Hover overlay effect */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-slate-950/40 backdrop-blur-xs">
                    <span className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-sans font-bold text-xs tracking-widest uppercase shadow-xl cursor-pointer">
                      <Eye className="w-4 h-4" /> View Details
                    </span>
                  </div>

                  {/* Title fixed at bottom left of image - Small font size */}
                  <div className="absolute bottom-6 left-8 z-30 space-y-2">
                    <h3 className="text-xl md:text-2xl font-serif text-amber-50 drop-shadow-lg">{era.title || era.name}</h3>
                  </div>
                </div>

                {/* Content Box */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-sans text-amber-400 uppercase tracking-[0.25em] font-semibold">
                        Epoch Milestone 0{index + 1}
                      </span>
                      <span className="text-xs font-sans text-amber-300/70">•</span>
                      <span className="text-[10px] font-sans text-amber-300/80 uppercase tracking-widest font-medium">
                        {era.subtitle || era.theme}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif text-amber-100 tracking-wide flex flex-wrap items-baseline gap-3">
                      <span>{era.title || era.name}</span>
                      {era.sanskritName && <span className="text-xl text-amber-400/80 font-light font-sans">({era.sanskritName})</span>}
                    </h2>
                    <p className="text-sm md:text-base font-sans text-slate-300/90 leading-relaxed font-light">
                      {era.description || era.summary}
                    </p>
                  </div>

                  {/* Highlighted Key Points */}
                  <div className="space-y-3 bg-[#0d0914]/80 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 shadow-xl">
                    <h4 className="text-xs font-sans uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" /> Milestone Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {era.keyPoints?.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs md:text-sm font-sans text-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_8px_#fbbf24]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setSelectedEra(era)}
                    className="px-8 py-3.5 rounded-full bg-amber-500 text-slate-950 font-bold font-sans text-sm tracking-widest uppercase hover:bg-amber-400 transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                  >
                    Explore Full Chronicles
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {selectedEra && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEra(null)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0914] border border-amber-500/40 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl"
            >
              <button
                onClick={() => setSelectedEra(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-2 border-b border-amber-500/20 pb-6">
                <span className="text-xs font-sans text-amber-400 uppercase tracking-widest font-bold">
                  {selectedEra.subtitle || selectedEra.theme} • {selectedEra.sanskritName}
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-amber-100">{selectedEra.title || selectedEra.name}</h2>
              </div>

              {/* Modal Image Area */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-black">
                <img src={selectedEra.image} alt={selectedEra.title || selectedEra.name} className="w-full h-auto block" />
              </div>

              {/* Abundant Content Paragraphs */}
              <div className="space-y-6 font-sans text-slate-300 text-base md:text-lg leading-relaxed font-light">
                {selectedEra.fullDetails?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                {/* Key Milestones */}
                <div className="bg-slate-950/60 border border-amber-500/20 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl my-6">
                  <h4 className="text-xs md:text-sm uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" /> Key Historical & Scriptural Pillars
                  </h4>
                  <ul className="space-y-3">
                    {selectedEra.keyPoints?.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-slate-200">
                        <span className="text-amber-400 mt-1">✦</span> 
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spiritual Significance */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 md:p-8 space-y-4 my-6 shadow-xl">
                  <h4 className="text-xs md:text-sm uppercase tracking-widest text-amber-300 font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" /> Deep Spiritual Significance
                  </h4>
                  <p className="text-sm md:text-base text-amber-100/90 leading-relaxed italic">
                    "{selectedEra.spiritualSignificance}"
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEra(null)}
                className="w-full py-4 rounded-2xl bg-amber-500 text-slate-950 font-bold font-sans text-xs tracking-widest uppercase cursor-pointer hover:bg-amber-400 transition-all shadow-lg"
              >
                Close Chronicle
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}