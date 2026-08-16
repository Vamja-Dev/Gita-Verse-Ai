import React from 'react';
import { motion } from 'framer-motion';

export default function SanskritText({ sanskrit }) {
  const words = sanskrit.split(' ');

  return (
    <div className="space-y-4">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
        className="text-xl md:text-3xl font-serif text-amber-100 tracking-wide leading-[1.8] flex flex-wrap gap-x-3 [text-shadow:_0_0_25px_rgba(245,158,11,0.5),_0_0_50px_rgba(245,158,11,0.2)]"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: "easeOut" } }
            }}
            className="inline-block text-amber-200 font-medium"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}