import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BackgroundManager from '../components/background/BackgroundManager';
import LearnHero from '../components/learn/LearnHero';
import JourneyTimeline from '../components/learn/JourneyTimeline';
import SearchBar from '../components/learn/SearchBar';
import FilterBar from '../components/learn/FilterBar';
import ChapterGrid from '../components/learn/ChapterGrid';
import { chaptersData as fallbackChaptersData } from '../data/chaptersData'; // Permanent backup fallback

export default function LearnGita({ onNavigate, onSelectChapter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Chapters');
  const [chapters, setChapters] = useState(fallbackChaptersData);
  const [loading, setLoading] = useState(true);

  // Fetch chapters from MongoDB backend API with fallback support
  useEffect(() => {
    async function fetchChaptersFromAPI() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/chapters');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setChapters(data);
          }
        }
      } catch (error) {
        console.warn('Backend API offline, using permanent local JS backup dataset:', error);
        // Keeps fallbackChaptersData automatically
      } finally {
        setLoading(false);
      }
    }

    fetchChaptersFromAPI();
  }, []);

  const filteredChapters = chapters.filter((chapter) => {
    const term = searchTerm ? searchTerm.toLowerCase().trim() : '';
    const chapNum = Number(chapter.number || chapter.chapter_number || 0);
    const engName = (chapter.englishName || chapter.name || '').toLowerCase();
    const sanskritName = (chapter.sanskritName || chapter.name_meaning || '').toLowerCase();

    let matchesFilter = true;
    if (selectedFilter === 'Karma Yoga') {
      matchesFilter = chapNum >= 1 && chapNum <= 6;
    } else if (selectedFilter === 'Bhakti Yoga') {
      matchesFilter = chapNum >= 7 && chapNum <= 12;
    } else if (selectedFilter === 'Jnana Yoga') {
      matchesFilter = chapNum >= 13 && chapNum <= 18;
    } else if (selectedFilter === 'Dhyana Yoga') {
      matchesFilter = chapNum === 6;
    }

    const matchesSearch = 
      !term || 
      String(chapNum) === term ||
      String(chapNum).includes(term) ||
      engName.includes(term) ||
      sanskritName.includes(term);

    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-screen text-[#f4e4bc] font-serif overflow-x-hidden flex flex-col items-center"
      style={{
        backgroundColor: '#1a0f08',
        backgroundImage: `radial-gradient(circle at center, rgba(50, 25, 12, 0.85) 0%, rgba(15, 8, 3, 0.98) 100%)`
      }}
    >
      {/* Fixed Background Manager so it stays locked across scrolling */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundManager />
      </div>

      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-50 w-full"
      >
      </motion.div>

      <main className="relative z-10 flex flex-col gap-12 pb-20 pt-8 w-full items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full flex justify-center">
          <LearnHero />
        </motion.div>

        {/* The Learning Journey Timeline positioned right below hero */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }} className="w-full flex justify-center">
          <JourneyTimeline />
        </motion.div>

        {/* Search and Filters positioned below the 3 boxes */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 md:px-16 w-full flex flex-col gap-6 items-center"
        >
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterBar selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
        </motion.div>

        {/* Chapter Grid Cards */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8 }} className="w-full flex justify-center">
          <ChapterGrid key={searchTerm} chapters={filteredChapters} onSelectChapter={onSelectChapter} />
        </motion.div>
      </main>

      <footer className="relative z-20 w-full text-center py-6 text-xs text-amber-200/50 font-sans tracking-widest uppercase bg-[#140a05]/90 backdrop-blur-md border-t border-amber-600/20">
        © 2026 GitaVerse AI. AI-generated content may contain mistakes.

      </footer>
    </motion.div>
  );
}