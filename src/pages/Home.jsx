// src/pages/Home.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import CursorRevealSection from '../components/home/CursorRevealSection';
import DailyWisdomCard from '../components/home/DailyWisdomCard';
import ScrollStory from '../components/story/ScrollStory';
import IntroLoader from '../components/story/IntroLoader';

export default function Home({ onNavigate }) {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('hasSeenIntro');
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setLoading(false);
  };

  if (loading) {
    return <IntroLoader onComplete={handleLoaderComplete} />;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-screen text-slate-100 font-serif overflow-x-hidden bg-[#06040a]"
    >
      <div className="relative w-full h-screen">
        <CursorRevealSection />

        {/* Gita Chat Button anchoring to the chat page */}
        <div className="absolute bottom-8 right-8 z-30">
          <motion.button
            onClick={() => onNavigate && onNavigate('gita-chat')}
            whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(245,158,11,0.8)' }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-sans font-extrabold text-xs tracking-wider uppercase flex items-center gap-2.5 shadow-[0_0_25px_rgba(245,158,11,0.6)] border border-amber-200 cursor-pointer"
          >
            <MessageSquare size={18} />
            <span>Gita Chat</span>
          </motion.button>
        </div>
      </div>

      <section className="relative w-full py-0 px-0 bg-[#06040a]">
        <DailyWisdomCard />
      </section>

      <ScrollStory />

      <footer className="relative z-20 text-center py-6 text-xs text-amber-200/40 font-sans tracking-widest uppercase bg-slate-950/60 backdrop-blur-md border-t border-amber-500/10">
        © 2026 GitaVerse AI. All rights reserved.
      </footer>
    </motion.main>
  );
}