import React from 'react';

const LearnHero = () => {
  return (
    <section className="relative pt-32 pb-8 px-4 text-center max-w-4xl mx-auto flex flex-col items-center gap-4">
      <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm tracking-widest uppercase font-medium">
        Sacred Wisdom Repository
      </span>
      <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
        Explore the Bhagavad Gita
      </h1>
      <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
        Embark on an inner journey through 18 chapters of timeless philosophical insight, duty, devotion, and supreme liberation.
      </p>
    </section>
  );
};

export default LearnHero;