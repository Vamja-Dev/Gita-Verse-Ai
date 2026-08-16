import React from 'react';

const BenefitsSection = () => {
  const benefits = [
    { title: 'Mental Clarity', desc: 'Overcome confusion and anxiety through timeless mental frameworks.' },
    { title: 'Purposeful Living', desc: 'Align your daily actions with higher values and righteous duty.' },
    { title: 'Emotional Equanimity', desc: 'Learn to remain steady amidst success, failure, joy, and sorrow.' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 w-full">
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900/80 via-indigo-950/40 to-slate-900/80 border border-amber-500/20 backdrop-blur-md">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-amber-200 mb-8">
          Why Study the Gita?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="flex flex-col gap-2 text-center md:text-left">
              <h3 className="text-amber-300 font-serif font-semibold text-lg">{b.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;