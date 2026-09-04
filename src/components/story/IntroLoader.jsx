// src/components/story/IntroLoader.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [isExploding, setIsExploding] = useState(false);
  const [isCurtainUp, setIsCurtainUp] = useState(false);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  const sanskritText = "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥";
  const words = sanskritText.split(' ');

  const wordTimestamps = [
    0.35,  // यदा
    1.06,  // यदा
    1.77,  // हि
    2.13,  // धर्मस्य
    3.19,  // ग्लानिर्भवति
    4.97,  // भारत।
    6.04,  // अभ्युत्थानमधर्मस्य
    8.88,  // तदात्मानं
    10.31  // सृजाम्यहम्॥
  ];

  const LANTERN_COUNT = 50;
  const LANTERN_TRAVEL_Y = '-110vh';

  // Significantly extended duration and staggered delays for a luxurious, unhurried float
  const LANTERN_DURATION = 3.2;
  const LANTERN_MAX_DELAY = 1.2;

  const lanterns = useMemo(() => {
    return Array.from({ length: LANTERN_COUNT }).map((_, i) => {
      const spreadFraction = LANTERN_COUNT === 1 ? 0.5 : i / (LANTERN_COUNT - 1);
      const jitter = (Math.random() - 0.5) * 50;
      return {
        id: i,
        xPercent: spreadFraction * 94 + 3,
        xJitter: jitter,
        delay: Math.random() * LANTERN_MAX_DELAY,
        scale: 0.6 + Math.random() * 0.6,
        sway: (Math.random() - 0.5) * 40,
      };
    });
  }, []);

  // Butter-smooth cinematic easing curve (smooth slow start and elegant deceleration)
  const SHARED_EASE = [0.22, 1, 0.36, 1];
  const CURTAIN_DURATION = 2.4;
  const CURTAIN_DELAY = 0.5;

  const handleDismiss = () => {
    if (isExploding) return;
    setIsExploding(true);
    setIsCurtainUp(true);

    if (audioRef.current) {
      fadeIntervalRef.current = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
          audioRef.current.volume -= 0.05;
        } else {
          clearInterval(fadeIntervalRef.current);
          audioRef.current?.pause();
        }
      }, 50);
    }
  };

  const handleCurtainComplete = () => {
    if (!isCurtainUp) return;
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current || isExploding) return;
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
      audio.volume = 1.0;
      audio.play().catch((err) => {
        console.log("Audio autoplay prevented by browser policy:", err);
      });
    }

    const timer = setTimeout(() => {
      handleDismiss();
    }, 14000);

    return () => {
      clearTimeout(timer);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isCurtainUp ? '-100%' : 0 }}
          transition={{
            duration: isCurtainUp ? CURTAIN_DURATION : 0,
            delay: isCurtainUp ? CURTAIN_DELAY : 0,
            ease: SHARED_EASE,
          }}
          onAnimationComplete={handleCurtainComplete}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06040a] text-amber-100 px-6 overflow-hidden cursor-pointer select-none"
          onClick={handleDismiss}
        >
          <audio
            ref={audioRef}
            src="/audio/intoloader-sound.mp3"
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleDismiss}
          />

          {/* Sacred Ambient Lighting Gradients */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-600/15 rounded-full blur-[140px] will-change-transform" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-[#06040a]/90 to-[#06040a]" />
          </div>

          {/* Central Shloka Container */}
          <div className="relative z-10 max-w-4xl text-center space-y-8">
            <motion.div
              animate={isExploding ? { opacity: [1, 1, 0] } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-2xl md:text-4xl lg:text-5xl font-serif tracking-wide leading-[1.8] flex flex-wrap justify-center gap-x-4"
            >
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
            </motion.div>

            {/* Subtle skip / enter hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isExploding ? 0 : 0.6 }}
              transition={{ delay: isExploding ? 0 : 4.5, duration: isExploding ? 0.3 : 1 }}
              className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-sans pt-8"
            >
              Click anywhere to enter GitaVerse AI
            </motion.div>
          </div>

          {/* Majestic, Slow-Floating Lanterns Leading the Smooth Curtain Lift */}
          {isExploding && (
            <div className="absolute inset-0 pointer-events-none z-35 overflow-hidden">
              {lanterns.map((lantern) => (
                <motion.div
                  key={lantern.id}
                  initial={{
                    y: '10vh',
                    x: lantern.xJitter,
                    opacity: 0,
                    scale: lantern.scale * 0.7,
                  }}
                  animate={{
                    y: LANTERN_TRAVEL_Y,
                    x: lantern.xJitter + lantern.sway,
                    opacity: [0, 1, 1, 0],
                    scale: lantern.scale * 1.15,
                  }}
                  transition={{
                    duration: LANTERN_DURATION,
                    delay: lantern.delay,
                    ease: SHARED_EASE,
                  }}
                  className="absolute bottom-0 will-change-transform"
                  style={{
                    left: `${lantern.xPercent}%`,
                    transformOrigin: 'center center',
                  }}
                >
                  {/* Outer soft halo */}
                  <div
                    className="absolute rounded-full bg-amber-400/35 blur-[45px]"
                    style={{
                      width: '180px',
                      height: '180px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                  {/* Lantern body */}
                  <div
                    className="relative rounded-[6px] bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 shadow-[0_0_22px_9px_rgba(245,158,11,0.65)]"
                    style={{ width: '26px', height: '36px' }}
                  >
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-100"
                      style={{
                        width: '9px',
                        height: '13px',
                        filter: 'blur(1px)',
                        boxShadow: '0 0 20px 7px rgba(255,235,180,0.95)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}