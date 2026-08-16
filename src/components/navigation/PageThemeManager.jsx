import React from 'react';
import { motion } from 'framer-motion';

export default function PageThemeManager({ isOpen, children }) {
  return (
    <motion.div
      animate={{
        scale: isOpen ? 0.98 : 1,
        filter: isOpen ? 'blur(2px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen origin-center"
    >
      {children}
    </motion.div>
  );
}