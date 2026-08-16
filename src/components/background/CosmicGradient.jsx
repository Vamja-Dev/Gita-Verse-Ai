import React from 'react';
import { motion } from 'framer-motion';

export default function CosmicGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu will-change-transform">
      {/* Static deep brown espresso background base */}
      <div className="absolute inset-0 bg-[#1a0f08]" />

      {/* Hardware-accelerated smooth ambient light using CSS transitions/transforms */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[20%] -left-[20%] w-[70vw] h-[70vw] rounded-full blur-[100px] transform-gpu"
        style={{
          background: 'radial-gradient(circle, rgba(92, 58, 33, 0.45) 0%, rgba(26, 15, 8, 0) 70%)',
        }}
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[20%] -right-[20%] w-[70vw] h-[70vw] rounded-full blur-[120px] transform-gpu"
        style={{
          background: 'radial-gradient(circle, rgba(140, 90, 60, 0.3) 0%, rgba(15, 8, 3, 0) 70%)',
        }}
      />
    </div>
  );
}