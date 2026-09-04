// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import CursorRevealSection from '../components/home/CursorRevealSection';
import DailyWisdomCard from '../components/home/DailyWisdomCard';
import ScrollStory from '../components/story/ScrollStory';
import IntroLoader from '../components/story/IntroLoader';

// Full mixed local artwork pool (3 JPEGs and 9 PNGs)
import artwork1 from '../assets/images/artwork-1.jpg';
import artwork2 from '../assets/images/artwork-2.jpg';
import artwork3 from '../assets/images/artwork-3.jpg';
import artwork4 from '../assets/images/artwork-4.png';
import artwork5 from '../assets/images/artwork-5.png';
import artwork6 from '../assets/images/artwork-6.png';
import artwork7 from '../assets/images/artwork-7.png';
import artwork8 from '../assets/images/artwork-8.png';
import artwork9 from '../assets/images/artwork-9.png';
import artwork10 from '../assets/images/artwork-10.png';
import artwork11 from '../assets/images/artwork-11.png';
import artwork12 from '../assets/images/artwork-12.png';

const localImagePool = [
  artwork1, artwork2, artwork3,
  artwork4, artwork5, artwork6,
  artwork7, artwork8, artwork9,
  artwork10, artwork11, artwork12
];

// Helper function to guarantee 3 completely random, unique images from the pool on every execution
function getRandomUniqueImages(pool, count = 3) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function Home({ onNavigate }) {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('hasSeenIntro');
  });

  // Always compute 3 fresh unique random images directly on every mount/page refresh
  const [randomizedImages, setRandomizedImages] = useState(() => getRandomUniqueImages(localImagePool, 3));

  // Trigger a fresh shuffle every single time the Home page mounts or refreshes
  useEffect(() => {
    setRandomizedImages(getRandomUniqueImages(localImagePool, 3));
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setLoading(false);
  };

  return (
    <>
      {/* The home screen is ALWAYS mounted, even while the intro is playing.
          This is what makes the lantern-curtain reveal in IntroLoader work
          correctly — when that overlay slides up and off, real, fully
          rendered content is already sitting underneath it, so the reveal
          is instant and seamless instead of a blank flash while React
          mounts the home screen for the first time. */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full min-h-screen text-slate-100 font-serif overflow-x-hidden bg-[#06040a]"
      >
        <div className="relative w-full h-screen">
          <CursorRevealSection />

          {/* Gita Chat Button anchoring to the chat page */}
          <div className="absolute bottom-8 right-8 z-30">
            <motion.button
              onClick={() => onNavigate && onNavigate('gita-chat')}
              whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(245,158,11,0.8)' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-sans font-extrabold text-xs tracking-wider uppercase flex items-center gap-2.5 shadow-[0_0_25px_rgba(245,158,11,0.6)] border border-amber-200 cursor-pointer"
            >
              <MessageSquare size={18} />
              <span>Gita Chat</span>
            </motion.button>
          </div>
        </div>

        <section className="relative w-full py-0 px-0 bg-[#06040a]">
          <DailyWisdomCard />
        </section>

        {/* Passing the dynamically rotated random unique images down to ScrollStory */}
        <ScrollStory customImages={randomizedImages} />

        <footer className="relative z-20 text-center py-6 text-xs text-amber-200/40 font-sans tracking-widest uppercase bg-slate-950/60 backdrop-blur-md border-t border-amber-500/10">
          © 2026 GitaVerse AI. AI-generated content may contain mistakes.
        </footer>
      </motion.main>

      {loading && <IntroLoader onComplete={handleLoaderComplete} />}
    </>
  );
}