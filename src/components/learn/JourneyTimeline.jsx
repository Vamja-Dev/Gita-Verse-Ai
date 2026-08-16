import React from 'react';

const JourneyTimeline = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 w-full py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-200">The Learning Journey</h2>
        <p className="text-amber-100/60 text-sm mt-1 font-serif italic">Structured progression through the eternal science of yoga</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className="p-6 rounded-xl border border-amber-600/30 flex flex-col gap-2 shadow-xl"
          style={{
            backgroundColor: '#2c1810',
            backgroundImage: 'linear-gradient(to bottom, rgba(44, 24, 16, 0.95), rgba(26, 15, 8, 0.98))'
          }}
        >
          <span className="text-amber-300 font-bold text-lg font-serif">Phase 1</span>
          <h3 className="text-amber-100 font-semibold font-serif">Chapters 1–6</h3>
          <p className="text-amber-200/70 text-sm font-serif">Karma Yoga: The path of selfless action and mastery over the mind.</p>
        </div>
        <div 
          className="p-6 rounded-xl border border-amber-600/30 flex flex-col gap-2 shadow-xl"
          style={{
            backgroundColor: '#2c1810',
            backgroundImage: 'linear-gradient(to bottom, rgba(44, 24, 16, 0.95), rgba(26, 15, 8, 0.98))'
          }}
        >
          <span className="text-amber-300 font-bold text-lg font-serif">Phase 2</span>
          <h3 className="text-amber-100 font-semibold font-serif">Chapters 7–12</h3>
          <p className="text-amber-200/70 text-sm font-serif">Bhakti Yoga: Awakening supreme devotion and experiencing the Divine.</p>
        </div>
        <div 
          className="p-6 rounded-xl border border-amber-600/30 flex flex-col gap-2 shadow-xl"
          style={{
            backgroundColor: '#2c1810',
            backgroundImage: 'linear-gradient(to bottom, rgba(44, 24, 16, 0.95), rgba(26, 15, 8, 0.98))'
          }}
        >
          <span className="text-amber-300 font-bold text-lg font-serif">Phase 3</span>
          <h3 className="text-amber-100 font-semibold font-serif">Chapters 13–18</h3>
          <p className="text-amber-200/70 text-sm font-serif">Jnana Yoga: Discernment between matter, spirit, and ultimate liberation.</p>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;