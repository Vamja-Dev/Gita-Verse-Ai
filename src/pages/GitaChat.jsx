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
    </motion.div>
  );
}