import React from 'react';

const AnimatedQuote = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 w-full">
      <div 
        className="p-6 rounded-2xl border border-amber-600/30 backdrop-blur-md text-center shadow-2xl flex flex-col gap-3"
        style={{
          backgroundColor: '#2c1810',
          backgroundImage: 'linear-gradient(to bottom, rgba(44, 24, 16, 0.95), rgba(26, 15, 8, 0.98))',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(120, 80, 40, 0.2)'
        }}
      >
        <span className="text-amber-300 text-2xl font-serif">ॐ</span>
        <blockquote className="text-amber-100/90 font-serif italic text-lg md:text-xl">
          "You have a right to performed your prescribed duty, but you are not entitled to the fruits of action."
        </blockquote>
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">— Chapter 2, Verse 47</span>
      </div>
    </section>
  );
};

export default AnimatedQuote;