// src/pages/FourVedas.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Scroll, X, Eye } from 'lucide-react';
import axios from 'axios';
import { vedasData as staticVedasData } from '../data/vedasData';
import vedaBg from '../assets/images/veda-bg.png';

export default function FourVedas({ onNavigate }) {
  const [vedas, setVedas] = useState(staticVedasData);
  const [selectedVeda, setSelectedVeda] = useState(null);

  useEffect(() => {
    // Fetch text edits from DB, but map them to the local static images so they never break
    axios.get('http://localhost:8000/api/admin/cms/vedas')
      .then(res => {
        const liveData = res.data.data || [];
        if (liveData.length > 0) {
          // Merge database text contents with local static images to guarantee they show up
          const merged = liveData.map((item, index) => ({
            ...item,
            image: staticVedasData[index]?.image || item.image || item.image_url,
            name: item.name || item.title || staticVedasData[index]?.name,
            summary: item.summary || item.description || staticVedasData[index]?.summary,
            fullDetails: item.fullDetails || staticVedasData[index]?.fullDetails
          }));
          setVedas(merged);
        }
      })
      .catch(err => {
        console.warn("Backend offline. Using local static vedasData with images.");
      });
  }, []);

  return (
    <main className="relative w-full min-h-screen text-slate-100 font-serif px-6 md:px-16 pt-36 pb-24 overflow-x-hidden flex flex-col items-center bg-[#06040a]">
      
      {/* Custom Full-Screen Background Image Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img 
          src={vedaBg} 
          alt="Vedas Background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto space-y-20">
        
        {/* Header Title Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-sans tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-md">
            <Scroll className="w-4 h-4 text-amber-400" />
            <span>Eternal Foundation • The Four Vedas</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-amber-100 tracking-wide [text-shadow:_0_0_30px_rgba(245,158,11,0.5)]">
            The Source of All Knowledge
          </h1>
          <p className="text-sm md:text-base font-sans text-slate-200/90 font-light leading-relaxed drop-shadow-md">
            Explore the primordial pillars of cosmic order, hymns, melodies, and spiritual science.
          </p>
        </div>

        {/* Alternating Veda Rows */}
        <div className="space-y-24">
          {vedas.map((veda, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={veda._id || veda.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image Box */}
                <div 
                  onClick={() => setSelectedVeda(veda)}
                  className="relative group w-full lg:w-1/2 aspect-video rounded-3xl overflow-hidden border border-amber-500/30 bg-[#0d0914] shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06040a] via-transparent to-transparent opacity-80 z-10" />
                  <img 
                    src={veda.image} 
                    alt={veda.name || veda.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-slate-950/60 backdrop-blur-xs">
                    <span className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-sans font-bold text-xs tracking-widest uppercase shadow-xl cursor-pointer">
                      <Eye className="w-4 h-4" /> Unroll Veda Roll
                    </span>
                  </div>

                  {/* Name inside bottom-left of image card */}
                  <div className="absolute bottom-6 left-6 z-20 space-y-1">
                    <h3 className="text-3xl font-serif text-amber-100">
                      {veda.name || veda.title}
                    </h3>
                  </div>
                </div>

                {/* Content Box */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-sans text-amber-400 uppercase tracking-[0.25em] font-semibold">
                      VEDA 0{index + 1} • {veda.theme}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-amber-100 tracking-wide flex items-baseline gap-3">
                      <span>{veda.name || veda.title}</span>
                      <span className="text-2xl text-amber-400/90 font-normal font-serif">({veda.sanskritName})</span>
                    </h2>
                    <p className="text-sm md:text-base font-sans text-slate-200/90 leading-relaxed font-light">
                      {veda.summary || veda.description}
                    </p>
                  </div>

                  {/* Highlighted Bullet Points */}
                  <div className="space-y-3 bg-[#0d0914]/75 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 shadow-xl">
                    <h4 className="text-xs font-sans uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" /> Sacred Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {veda.keyPoints?.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs md:text-sm font-sans text-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_8px_#fbbf24]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setSelectedVeda(veda)}
                    className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold font-sans text-xs tracking-widest uppercase hover:bg-amber-400 transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                  >
                    Explore Complete Veda
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {selectedVeda && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVeda(null)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0914]/95 border border-amber-500/40 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl backdrop-blur-xl"
            >
              <button
                onClick={() => setSelectedVeda(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-2 border-b border-amber-500/20 pb-6">
                <span className="text-xs font-sans text-amber-400 uppercase tracking-widest font-bold">
                  {selectedVeda.theme}
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-amber-100 flex items-baseline gap-3 flex-wrap">
                  <span>{selectedVeda.name || selectedVeda.title}</span>
                  <span className="text-2xl md:text-3xl text-amber-400 font-normal">({selectedVeda.sanskritName})</span>
                </h2>
              </div>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
                <img src={selectedVeda.image} alt={selectedVeda.name || selectedVeda.title} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-6 font-sans text-slate-300 text-base md:text-lg leading-relaxed font-light">
                {selectedVeda.fullDetails?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                <div className="bg-slate-950/60 border border-amber-500/20 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl my-6">
                  <h4 className="text-xs md:text-sm uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" /> Key Sacred Milestones & Highlights
                  </h4>
                  <ul className="space-y-3">
                    {selectedVeda.keyPoints?.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-slate-200">
                        <span className="text-amber-400 mt-1">✦</span> 
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 md:p-8 space-y-4 my-6 shadow-xl">
                  <h4 className="text-xs md:text-sm uppercase tracking-widest text-amber-300 font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" /> Deep Spiritual Significance
                  </h4>
                  <p className="text-sm md:text-base text-amber-100/90 leading-relaxed italic">
                    "{selectedVeda.spiritualSignificance}"
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedVeda(null)}
                className="w-full py-4 rounded-2xl bg-amber-500 text-slate-950 font-bold font-sans text-xs tracking-widest uppercase cursor-pointer hover:bg-amber-400 transition-all shadow-lg"
              >
                Close Veda
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}