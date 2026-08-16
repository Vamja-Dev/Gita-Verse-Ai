import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  // Sanskrit text requested (without chapter/verse labels)
  const sanskritText = "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥";
  const words = sanskritText.split(' ');

  useEffect(() => {
    // Automatically finish and dismiss loader after animation completes (~6.5 seconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 6500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06040a] text-amber-100 px-6 overflow-hidden cursor-pointer"
          onClick={() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }}
        >
          {/* Sacred Ambient Lighting Gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-600/15 rounded-full blur-[140px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-[#06040a]/90 to-[#06040a]" />
          </div>

          {/* Central Shloka Container */}
          <div className="relative z-10 max-w-4xl text-center space-y-8">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.3 }
                }
              }}
              className="text-2xl md:text-4xl lg:text-5xl font-serif text-amber-200 tracking-wide leading-[1.8] flex flex-wrap justify-center gap-x-4 [text-shadow:_0_0_30px_rgba(245,158,11,0.6),_0_0_60px_rgba(245,158,11,0.3)]"
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 25, filter: "blur(12px)" },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      filter: "blur(0px)", 
                      transition: { duration: 1.2, ease: "easeOut" } 
                    }
                  }}
                  className="inline-block font-medium"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            {/* Subtle skip / enter hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 4.5, duration: 1 }}
              className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-sans pt-8"
            >
              Click anywhere to enter GitaVerse AI
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}