import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Background from '../components/Background';

export default function GitaChat() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full min-h-screen text-slate-100 font-serif overflow-x-hidden bg-[#06040a] pb-20"
    >
      {/* Background Video / Atmospheric Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Background />
      </div>

      {/* Main Chat Experience Area (Hero contains the single unified chat interface) */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 pt-0 space-y-10">
        <Hero />
      </div>

      <footer className="relative z-20 text-center py-6 text-xs text-amber-200/40 font-sans tracking-widest uppercase bg-slate-950/60 backdrop-blur-md border-t border-amber-500/10 mt-20">
        © 2026 GitaVerse AI. All rights reserved.
      </footer>
    </motion.div>
  );
}