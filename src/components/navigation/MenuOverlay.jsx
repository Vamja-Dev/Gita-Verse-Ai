import React from 'react';
import { motion } from 'framer-motion';

export default function MenuOverlay({ isOpen, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
      className={`fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    />
  );
}