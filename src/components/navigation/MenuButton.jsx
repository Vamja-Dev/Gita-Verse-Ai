import React from 'react';
import { motion } from 'framer-motion';

export default function MenuButton({ isOpen, onClick, themeColor, themeGlow }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="relative z-50 w-12 h-12 rounded-2xl bg-[#2c1810]/90 border border-amber-600/40 flex flex-col items-center justify-center gap-1.5 cursor-pointer shadow-xl backdrop-blur-md group"
      style={{ boxShadow: `0 0 20px ${themeGlow}` }}
      aria-label="Toggle Menu"
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-5 h-0.5 rounded-full block"
        style={{ backgroundColor: themeColor }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-5 h-0.5 rounded-full block"
        style={{ backgroundColor: themeColor }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-5 h-0.5 rounded-full block"
        style={{ backgroundColor: themeColor }}
      />
    </motion.button>
  );
}