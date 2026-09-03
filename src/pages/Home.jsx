// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import axios from 'axios';
import CursorRevealSection from '../components/home/CursorRevealSection';
import DailyWisdomCard from '../components/home/DailyWisdomCard';
import ScrollStory from '../components/story/ScrollStory';
import IntroLoader from '../components/story/IntroLoader';

// Fallback core images
import artwork1 from '../assets/images/artwork-1.jpg';
import artwork2 from '../assets/images/artwork-2.jpg';
import artwork3 from '../assets/images/artwork-3.jpg';

export default function Home({ onNavigate }) {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('hasSeenIntro');
  });

  // Keep track of the dynamically selected unique random images for your 3 sections on refresh
  const [randomizedImages, setRandomizedImages] = useState([artwork1, artwork2, artwork3]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/cms/home')
      .then(res => {
        const liveData = res.data.data || [];
        if (liveData.length > 0) {
          // For each home section pool, randomly pick one unique image on every refresh
          const selectedImages = liveData.map(sec => {
            const pool = sec.images && sec.images.length > 0 ? sec.images : [artwork1, artwork2, artwork3];
            const randomIndex = Math.floor(Math.random() * pool.length);
            return pool[randomIndex];
          });
          if (selectedImages.length >= 3) {
            setRandomizedImages([selectedImages[0], selectedImages[1], selectedImages[2]]);
          }
        }
      })
      .catch(err => {
        console.warn("Backend offline for home images, using default core art.");
      });
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setLoading(false);
  };

  if (loading) {
    return <IntroLoader onComplete={handleLoaderComplete} />;
  }

  return (
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

      {/* Passing the dynamically rotated random images down to ScrollStory */}
      <ScrollStory customImages={randomizedImages} />

      <footer className="relative z-20 text-center py-6 text-xs text-amber-200/40 font-sans tracking-widest uppercase bg-slate-950/60 backdrop-blur-md border-t border-amber-500/10">
        © 2026 GitaVerse AI. AI-generated content may contain mistakes

      </footer>
    </motion.main>
  );
}