import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, User, X, Eye, BookOpen } from 'lucide-react';
import { charactersData } from '../data/charactersData';

export default function CharacterEncyclopedia({ onNavigate }) {
  const [selectedChar, setSelectedChar] = useState(null);
  const [filterFaction, setFilterFaction] = useState('ALL');

  const characters = charactersData;

  const filteredCharacters = filterFaction === 'ALL'
    ? characters
    : characters.filter(c => c.faction.toUpperCase().includes(filterFaction));

  return (
    <main className="relative w-full min-h-screen text-slate-100 font-serif overflow-x-hidden bg-[#07050d] pb-24 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Modern Cinematic Background with Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0712] via-[#07050d] to-[#040307]" />
        
        {/* Glowing atmospheric orbs for a modern futuristic-spiritual vibe */}
        <div className="absolute top-[10%] left-[20%] w-[550px] h-[550px] rounded-full bg-amber-500/10 blur-[160px]" />
        <div className="absolute top-[40%] right-[10%] w-[650px] h-[650px] rounded-full bg-purple-600/10 blur-[180px]" />
        <div className="absolute bottom-[20%] left-[15%] w-[600px] h-[600px] rounded-full bg-amber-600/5 blur-[200px]" />

        {/* Modern subtle noise/grid texture */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      <div className="relative z-20 pt-36 px-6 md:px-16 max-w-7xl mx-auto space-y-20">

        {/* Header Title Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-sans tracking-widest uppercase backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.15)]">
            <User className="w-4 h-4 text-amber-400" />
            <span>Legendary Figures • Character Encyclopedia</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-amber-100 tracking-wide drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            Souls of the Epic
          </h1>
          <p className="text-sm md:text-base font-sans text-slate-300/80 font-light leading-relaxed">
            Discover the profound roles, philosophies, and destinies of all {characters.length} iconic figures of Mahabharata.
          </p>

          {/* Modern Glassmorphic Faction Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            {['ALL', 'PANDAVA', 'KAURAVA', 'DIVINE'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterFaction(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-sans tracking-widest uppercase transition-all duration-300 cursor-pointer border backdrop-blur-md ${
                  filterFaction === cat
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105'
                    : 'bg-white/[0.03] text-amber-200/70 border-white/10 hover:border-amber-500/40 hover:bg-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Alternating Character Rows with Modern Glass Cards */}
        <div className="space-y-28">
          {filteredCharacters.map((char, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={char.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Modern Image Box with Glow on Hover */}
                <div
                  onClick={() => setSelectedChar(char)}
                  className="relative group w-full lg:w-1/2 rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07050d] via-transparent to-transparent opacity-80 z-10" />
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-[380px] md:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Modern Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-slate-950/60 backdrop-blur-sm">
                    <span className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-sans font-bold text-xs tracking-widest uppercase shadow-[0_0_25px_rgba(245,158,11,0.5)] transform translate-y-2 group-hover:translate-y-0 transition-all">
                      <Eye className="w-4 h-4" /> Unroll Character Scroll
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 z-20 space-y-1.5">
                    <span className="text-xs font-sans text-amber-400 uppercase tracking-widest bg-amber-500/15 backdrop-blur-md px-3.5 py-1 rounded-full border border-amber-500/30">
                      {char.faction}
                    </span>
                    <h3 className="text-3xl font-serif text-amber-100 pt-2">{char.name}</h3>
                  </div>
                </div>

                {/* Content Box */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-sans text-amber-400/90 uppercase tracking-[0.25em] font-semibold">
                      Soul {index + 1} • {char.title}
                    </span>
                    
                    <h2 className="text-3xl md:text-4xl font-serif text-amber-100 tracking-wide flex items-center gap-3 flex-wrap">
                      <span>{char.name}</span>
                      {char.sanskritName && (
                        <span className="text-amber-400/80 font-normal text-2xl md:text-3xl">
                          ({char.sanskritName})
                        </span>
                      )}
                    </h2>

                    <p className="text-sm md:text-base font-sans text-slate-300/80 leading-relaxed font-light">
                      {char.description}
                    </p>
                  </div>

                  {/* Highlighted Key Points for Main Card */}
                  <div className="space-y-3 bg-[#0d0914]/80 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 shadow-xl">
                    <h4 className="text-xs font-sans uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" /> Soul Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {char.highlights?.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs md:text-sm font-sans text-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_8px_#fbbf24]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setSelectedChar(char)}
                    className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold font-sans text-xs tracking-widest uppercase hover:from-amber-400 hover:to-amber-500 transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)]"
                  >
                    Explore Full Profile
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Modern Glassmorphic Detail Modal with Custom 1600x1193 Aspect Ratio Box */}
      <AnimatePresence>
        {selectedChar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedChar(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#100c19] border border-amber-500/30 rounded-3xl p-8 md:p-12 space-y-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] scrollbar-none backdrop-blur-2xl"
            >
              <button
                onClick={() => setSelectedChar(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-amber-400 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-2 border-b border-white/10 pb-6 pr-10">
                <span className="text-xs font-sans text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  {selectedChar.faction}
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-amber-100 pt-2 flex items-baseline gap-3 flex-wrap">
                  <span>{selectedChar.name}</span>
                  {selectedChar.sanskritName && (
                    <span className="text-amber-400 font-normal text-2xl md:text-3xl">
                      ({selectedChar.sanskritName})
                    </span>
                  )}
                </h2>
                <p className="text-sm text-slate-400 font-sans">{selectedChar.title}</p>
              </div>

              {/* Exact 1600x1193 Aspect Ratio Box Matching Your Image Dimensions */}
              <div 
                className="relative w-full rounded-3xl overflow-hidden border border-amber-500/30 bg-[#0d0914] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                style={{ aspectRatio: '1600 / 1193' }}
              >
                <img 
                  src={selectedChar.image} 
                  alt={selectedChar.name} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Abundant Content Paragraphs inside Modal */}
              <div className="space-y-6 font-sans text-slate-300 text-base md:text-lg leading-relaxed font-light">
                {selectedChar.fullDetails?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                {/* Highlighted Key Points Included Inside Modal */}
                <div className="bg-slate-950/60 border border-amber-500/20 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl my-6">
                  <h4 className="text-xs md:text-sm uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" /> Key Milestones & Lineage Highlights
                  </h4>
                  <ul className="space-y-3">
                    {selectedChar.highlights?.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-slate-200">
                        <span className="text-amber-400 mt-1">✦</span> 
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highlighted Gita Connection & Core Philosophy Box */}
                {selectedChar.gitaConnection && (
                  <div className="bg-gradient-to-br from-amber-500/15 via-[#161022] to-purple-900/20 border border-amber-500/40 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl backdrop-blur-md my-6">
                    <div className="flex items-center gap-2 text-amber-400 font-sans font-bold text-xs md:text-sm uppercase tracking-widest">
                      <BookOpen className="w-5 h-5 text-amber-400" />
                      <span>Bhagavad Gita Connection</span>
                    </div>
                    <p className="font-sans text-sm md:text-base text-slate-200 leading-relaxed font-light">
                      {selectedChar.gitaConnection}
                    </p>
                    {selectedChar.keyTeaching && (
                      <div className="border-t border-amber-500/20 pt-4 text-xs md:text-sm font-sans text-amber-300 italic">
                        “{selectedChar.keyTeaching}”
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedChar(null)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold font-sans text-xs tracking-widest uppercase cursor-pointer hover:from-amber-400 hover:to-amber-500 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              >
                Close Profile
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}