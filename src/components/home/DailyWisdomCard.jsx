import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, ChevronDown, ChevronUp, Share2, Check } from 'lucide-react';
import divineBg from '../../assets/images/divine-bg.png';
import { shlokasData } from '../../data/shlokasData';
import GitaAudioPlayer from '../../components/GitaAudioPlayer';

export default function DailyWisdomCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [randomShloka, setRandomShloka] = useState(null);

  // Pick a random shloka on component mount (changes on full page refresh)
  useEffect(() => {
    try {
      // Collect all available chapters that have shlokas
      const chapterKeys = Object.keys(shlokasData);
      if (chapterKeys.length === 0) return;

      // Pick a random chapter
      const randomChapterKey = chapterKeys[Math.floor(Math.random() * chapterKeys.length)];
      const verses = shlokasData[randomChapterKey];

      if (verses && verses.length > 0) {
        // Pick a random verse from that chapter
        const verse = verses[Math.floor(Math.random() * verses.length)];
        
        setRandomShloka({
          chapterNum: randomChapterKey,
          shlokaNum: verse.shloka_number,
          chapterLabel: `Chapter ${randomChapterKey}, Verse ${verse.shloka_number}`,
          sanskrit: verse.sanskrit,
          transliteration: verse.transliteration || "Transliteration data coming soon...",
          translation: verse.translations?.english || "Translation unavailable.",
          explanation: verse.explanations?.english || verse.real_life_example?.english || "Reflect upon this divine teaching in your daily journey."
        });
      }
    } catch (err) {
      console.error("Error loading random daily wisdom:", err);
    }
  }, []);

  const handleShare = () => {
    if (!randomShloka) return;
    navigator.clipboard.writeText(`"${randomShloka.sanskrit}" - Bhagavad Gita (${randomShloka.chapterLabel}): ${randomShloka.translation}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Fallback if data is loading or empty
  const wisdom = randomShloka || {
    chapterNum: "2",
    shlokaNum: "47",
    chapterLabel: "Chapter 2, Verse 47",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "Karmanye vadhikaraste ma phaleshu kadachana...",
    translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
    explanation: "God Krishna teaches us to focus entirely on our present effort and duty."
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden my-0 py-20 z-20">
      
      {/* Full-Bleed Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src={divineBg} 
          alt="Divine Chariot Wisdom" 
          className="w-full h-full object-cover object-center"
        />
        
        {/* Seamless Blend Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06040a]/90 via-[#06040a]/50 to-[#06040a]/90 pointer-events-none" />
      </div>

      {/* Ambient background golden glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none z-10" />

      {/* Centered Content Card */}
      <div className="relative z-20 w-full max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-3xl p-8 md:p-10 bg-[#06040a]/50 border border-amber-500/25 shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-md overflow-hidden group transition-all"
        >
          {/* Header Tag */}
          <div className="flex items-center justify-between mb-6 border-b border-amber-500/20 pb-4">
            <div className="flex items-center gap-2 text-amber-400 font-sans text-xs uppercase tracking-[0.25em] font-bold">
              <Sparkles size={16} className="text-amber-400 animate-pulse" />
              <span>Today's Divine Wisdom</span>
            </div>
            <span className="text-xs font-serif text-amber-200/90 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30">
              {wisdom.chapterLabel}
            </span>
          </div>

          {/* Sanskrit Shloka */}
          <div className="text-center my-6 space-y-2">
            <h3 className="text-amber-100 font-serif text-xl md:text-3xl italic tracking-wide whitespace-pre-line leading-relaxed [text-shadow:_0_0_25px_rgba(245,158,11,0.5)]">
              "{wisdom.sanskrit}"
            </h3>
          </div>

          {/* Action Row: Real Audio Player Component (Left), Unveil Button (Center), Share Button (Right) */}
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            
            {/* Real Audio Recitation Player Button using your exact extracted audio files */}
            <GitaAudioPlayer shlokaId={`${wisdom.chapterNum}_${wisdom.shlokaNum}`} />

            {/* Action Button to Unveil */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-sans font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.4)] cursor-pointer transition-all"
            >
              <BookOpen size={16} />
              <span>{isExpanded ? "Hide Meaning" : "Unveil Meaning & Insight"}</span>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </motion.button>

            {/* Share / Copy Button */}
            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center shadow-lg ${
                copied 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.6)]' 
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
              }`}
              title={copied ? "Copied to Clipboard!" : "Share Wisdom"}
            >
              {copied ? <Check size={18} /> : <Share2 size={18} />}
            </motion.button>

          </div>

          {/* Expandable Transliteration, Translation & Explanation Card */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-8 pt-6 border-t border-amber-500/20 space-y-4 text-left font-sans">
                  
                  {/* Transliteration Box */}
                  <div className="bg-[#06040a]/60 backdrop-blur-sm p-5 rounded-2xl border border-amber-500/20 shadow-inner">
                    <h4 className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Transliteration</h4>
                    <p className="text-amber-200/90 text-sm md:text-base leading-relaxed italic font-sans">
                      {wisdom.transliteration}
                    </p>
                  </div>

                  {/* Translation Box */}
                  <div className="bg-[#06040a]/60 backdrop-blur-sm p-5 rounded-2xl border border-amber-500/20 shadow-inner">
                    <h4 className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Translation</h4>
                    <p className="text-amber-100/90 text-sm md:text-base leading-relaxed font-serif">
                      {wisdom.translation}
                    </p>
                  </div>

                  {/* Krishna's Insight Box */}
                  <div className="bg-[#06040a]/60 backdrop-blur-sm p-5 rounded-2xl border border-amber-500/20 shadow-inner">
                    <h4 className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">Krishna's Insight</h4>
                    <p className="text-amber-200/80 text-xs md:text-sm leading-relaxed font-light">
                      {wisdom.explanation}
                    </p>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

    </section>
  );
}