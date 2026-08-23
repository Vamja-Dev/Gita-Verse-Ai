// src/components/story/LayoutManager.jsx
import React, { useState } from 'react';
import VerseImage from './VerseImage';
import { motion } from 'framer-motion';

export default function LayoutManager({ verse }) {
  const { layout, sanskrit, explanations, realLifeExamples, image } = verse;
  const [selectedLang, setSelectedLang] = useState('english'); // 'english' | 'hindi' | 'gujarati'

  // Pull real-life example or explanation based on the selected language
  const currentExample = realLifeExamples?.[selectedLang] || realLifeExamples?.english || explanations?.[selectedLang] || explanations?.english || "";

  return (
    <section className="min-h-[85vh] w-full flex items-center justify-center px-6 md:px-16 py-12 relative">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* LAYOUT 1: CENTER ARTWORK */}
        {layout === 'center' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Sanskrit */}
            <div className="lg:col-span-4 text-left space-y-4">
              <h3 className="text-xl md:text-2xl font-serif italic text-amber-100 leading-relaxed [text-shadow:_0_0_20px_rgba(245,158,11,0.4)]">
                "{sanskrit}"
              </h3>
            </div>

            {/* Center Column: Image */}
            <div className="lg:col-span-4 flex justify-center">
              <VerseImage src={image} alt="Bhagavad Gita Verse" layout={layout} />
            </div>

            {/* Right Column: Language Buttons & Real-Life Example Box */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              
              {/* Language Switcher Buttons */}
              <div className="flex items-center justify-center gap-1.5 bg-[#06040a]/60 p-1.5 rounded-2xl border border-amber-500/25">
                {[
                  { id: 'english', label: 'English' },
                  { id: 'hindi', label: 'Hindi' },
                  { id: 'gujarati', label: 'Gujarati' }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLang(lang.id)}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-sans font-bold tracking-wide transition-all cursor-pointer ${
                      selectedLang === lang.id
                        ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                        : 'bg-transparent text-amber-200/70 hover:text-amber-100 hover:bg-amber-600/10'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {/* Real-Life Example Text Box */}
              {currentExample && (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  className="text-sm md:text-base font-sans text-amber-100/90 leading-relaxed font-light border-l-2 border-amber-500/40 pl-5 bg-amber-950/20 py-4 rounded-r-xl backdrop-blur-md shadow-lg space-y-2"
                >
                  <span className="text-[10px] uppercase font-sans font-bold text-amber-400 tracking-widest block">
                    Real-Life Application ({selectedLang.toUpperCase()})
                  </span>
                  <p className="font-serif">{currentExample}</p>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* LAYOUT 2: LEFT ARTWORK */}
        {layout === 'left' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex justify-center">
              <VerseImage src={image} alt="Bhagavad Gita Verse" layout={layout} />
            </div>
            <div className="lg:col-span-6 space-y-6 text-left pl-0 lg:pl-12">
              <h3 className="text-xl md:text-2xl font-serif italic text-amber-100 leading-relaxed [text-shadow:_0_0_20px_rgba(245,158,11,0.4)]">
                "{sanskrit}"
              </h3>

              {/* Language Switcher Buttons */}
              <div className="flex items-center gap-1.5 bg-[#06040a]/60 p-1.5 rounded-2xl border border-amber-500/25 max-w-sm">
                {[
                  { id: 'english', label: 'English' },
                  { id: 'hindi', label: 'Hindi' },
                  { id: 'gujarati', label: 'Gujarati' }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLang(lang.id)}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-sans font-bold tracking-wide transition-all cursor-pointer ${
                      selectedLang === lang.id
                        ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                        : 'bg-transparent text-amber-200/70 hover:text-amber-100 hover:bg-amber-600/10'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="text-sm md:text-base font-sans text-amber-100/90 leading-relaxed font-light border-l-2 border-amber-500/40 pl-5 bg-amber-950/20 py-4 rounded-r-xl backdrop-blur-md shadow-lg space-y-2"
              >
                <span className="text-[10px] uppercase font-sans font-bold text-amber-400 tracking-widest block">
                  Real-Life Application ({selectedLang.toUpperCase()})
                </span>
                <p className="font-serif">{currentExample}</p>
              </motion.div>
            </div>
          </div>
        )}

        {/* LAYOUT 3: RIGHT ARTWORK */}
        {layout === 'right' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-left pr-0 lg:pr-12 order-2 lg:order-1">
              <h3 className="text-xl md:text-2xl font-serif italic text-amber-100 leading-relaxed [text-shadow:_0_0_20px_rgba(245,158,11,0.4)]">
                "{sanskrit}"
              </h3>

              {/* Language Switcher Buttons */}
              <div className="flex items-center gap-1.5 bg-[#06040a]/60 p-1.5 rounded-2xl border border-amber-500/25 max-w-sm">
                {[
                  { id: 'english', label: 'English' },
                  { id: 'hindi', label: 'Hindi' },
                  { id: 'gujarati', label: 'Gujarati' }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLang(lang.id)}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-sans font-bold tracking-wide transition-all cursor-pointer ${
                      selectedLang === lang.id
                        ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                        : 'bg-transparent text-amber-200/70 hover:text-amber-100 hover:bg-amber-600/10'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="text-sm md:text-base font-sans text-amber-100/90 leading-relaxed font-light border-l-2 border-amber-500/40 pl-5 bg-amber-950/20 py-4 rounded-r-xl backdrop-blur-md shadow-lg space-y-2"
              >
                <span className="text-[10px] uppercase font-sans font-bold text-amber-400 tracking-widest block">
                  Real-Life Application ({selectedLang.toUpperCase()})
                </span>
                <p className="font-serif">{currentExample}</p>
              </motion.div>
            </div>
            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
              <VerseImage src={image} alt="Bhagavad Gita Verse" layout={layout} />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}