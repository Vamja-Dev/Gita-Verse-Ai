import React from 'react';
import { motion } from 'framer-motion';
import ChapterCard from './ChapterCard';

export default function ChapterGrid({ chapters, onSelectChapter }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative z-20 px-6 md:px-16 max-w-7xl mx-auto w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
      >
        {chapters && chapters.map((chapter) => {
          const chapId = chapter.number || chapter.chapter_number;
          return (
            <motion.div key={chapId} variants={cardVariants} className="h-full flex flex-col">
              <div className="h-full flex flex-col w-full">
                <ChapterCard
                  chapter={chapter}
                  onClick={() => onSelectChapter(chapId)}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {(!chapters || chapters.length === 0) && (
        <div className="text-center py-20 space-y-2">
          <p className="text-lg font-serif text-amber-200">No chapters found</p>
          <p className="text-xs font-sans text-slate-400">Try searching with a different keyword or chapter number.</p>
        </div>
      )}
    </section>
  );
}