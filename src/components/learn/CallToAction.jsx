import React from 'react';

const CallToAction = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 w-full text-center">
      <div className="p-10 rounded-2xl bg-gradient-to-b from-amber-500/10 via-slate-900/60 to-slate-900/80 border border-amber-500/30 backdrop-blur-md flex flex-col items-center gap-4">
        <h2 className="text-3xl font-serif font-bold text-amber-100">Ready to Begin Your Transformation?</h2>
        <p className="text-slate-300 max-w-xl text-sm md:text-base">
          Dive straight into Chapter 1 and experience the dialogue that changed the course of human history.
        </p>
        <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all duration-300">
          Start Reading Chapter 1
        </button>
      </div>
    </section>
  );
};

export default CallToAction;