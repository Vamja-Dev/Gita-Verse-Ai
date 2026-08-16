import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function VerseImage({ src, alt, layout }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePos({ x, y });
  };

  // Determine initial slide direction based on layout for dynamic entry
  const getInitialPosition = () => {
    if (layout === 'left') return { x: -60, opacity: 0, scale: 0.95 };
    if (layout === 'right') return { x: 60, opacity: 0, scale: 0.95 };
    return { y: 50, opacity: 0, scale: 0.95 }; // Center layout
  };

  return (
    <div className="relative group flex items-center justify-center">
      {/* Divine Backglow Aura that pulses behind the image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.4, scale: 1.1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 via-yellow-500/10 to-amber-300/30 rounded-3xl blur-2xl -z-10 pointer-events-none"
      />

      {/* Main Animated Image Container */}
      <motion.div
        initial={getInitialPosition()}
        whileInView={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        animate={{ x: mousePos.x, y: mousePos.y }}
        className="relative w-[340px] h-[460px] md:w-[380px] md:h-[500px] mx-auto rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-amber-500/30 flex-shrink-0 bg-slate-900"
      >
        {/* Golden Light Sweep Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-transparent to-amber-200/25 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

        {/* Artwork with Ken Burns Slow Cinematic Zoom */}
        <motion.img
          src={src}
          alt={alt}
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
    </div>
  );
}