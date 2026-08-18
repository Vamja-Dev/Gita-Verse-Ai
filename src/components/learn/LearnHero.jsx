import React from 'react';

const LearnHero = () => {
  return (
    <section className="relative pt-36 pb-12 px-6 text-center max-w-5xl mx-auto flex flex-col items-center gap-6">
      <span className="px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs md:text-sm tracking-[0.3em] uppercase font-semibold">
        Sacred Wisdom Repository
      </span>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 leading-[1.2] py-1 whitespace-nowrap">
        Explore the Bhagavad Gita
      </h1>
      <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed font-sans">
        Embark on an inner journey through 18 chapters of timeless philosophical insight, duty, devotion, and supreme liberation.
      </p>
    </section>
  );
};

export default LearnHero;