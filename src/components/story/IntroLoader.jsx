import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const audioRef = useRef(null);

  const sanskritText = "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥";
  const words = sanskritText.split(' ');

  // ** Word-by-Word Audio Boundary Timestamps (in Seconds) **
  // Your actual audio file is ~12.03s long (the old numbers only went up
  // to 6.4s, which is why words and audio drifted apart).
  // These are estimated proportionally to each word's syllable count
  // (denser words get more time), spread across the real 12.03s clip.
  // This is a best-effort estimate, NOT ear-verified — for a perfect
  // frame-accurate match, open the timestamp_calibrator.html tool I sent
  // earlier, tap along to the real audio, and paste the array it gives you
  // in place of the one below.
  const wordTimestamps = [
    0.35,  // यदा (Word 1)
    1.06,  // यदा (Word 2)
    1.77,  // हि (Word 3)
    2.13,  // धर्मस्य (Word 4)
    3.19,  // ग्लानिर्भवति (Word 5)
    4.97,  // भारत। (Word 6)
    6.04,  // अभ्युत्थानमधर्मस्य (Word 7)
    8.88,  // तदात्मानं (Word 8)
    10.31  // सृजाम्यहम्॥ (Word 9)
  ];

  const handleDismiss = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  // Using the native HTML5 audio timeupdate event which fires continuously during playback
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const currentTime = audioRef.current.currentTime;

    let currentIndex = -1;
    for (let i = 0; i < wordTimestamps.length; i++) {
      if (currentTime >= wordTimestamps[i]) {
        currentIndex = i;
      } else {
        break;
      }
    }
    setActiveWordIndex(currentIndex);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((err) => {
        console.log("Audio autoplay prevented by browser policy:", err);
      });
    }

    // Safety-net fallback only — in case autoplay is blocked and onEnded
    // never fires. Padded a couple seconds past the real ~12s duration
    // instead of the old 7.5s, which was cutting the audio off early.
    const timer = setTimeout(() => {
      handleDismiss();
    }, 14000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06040a] text-amber-100 px-6 overflow-hidden cursor-pointer"
          onClick={handleDismiss}
        >
          {/* Audio element linked to native sync handlers */}
          <audio
            ref={audioRef}
            src="/audio/intoloader-sound.mp3"
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleDismiss}
          />

          {/* Sacred Ambient Lighting Gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-600/15 rounded-full blur-[140px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-[#06040a]/90 to-[#06040a]" />
          </div>

          {/* Central Shloka Container */}
          <div className="relative z-10 max-w-4xl text-center space-y-8">
            <div className="text-2xl md:text-4xl lg:text-5xl font-serif tracking-wide leading-[1.8] flex flex-wrap justify-center gap-x-4">
              {words.map((word, index) => {
                const isRevealed = index <= activeWordIndex;
                return (
                  <span
                    key={index}
                    className={`inline-block font-medium transition-all duration-500 ease-out ${
                      isRevealed
                        ? "text-amber-200 opacity-100 translate-y-0 filter-none [text-shadow:_0_0_30px_rgba(245,158,11,0.9),_0_0_60px_rgba(245,158,11,0.5)] scale-[1.03]"
                        : "text-amber-200/20 opacity-30 translate-y-2 blur-[6px] scale-100"
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

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