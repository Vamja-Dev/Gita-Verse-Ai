import React from 'react';
import ChatBox from './ChatBox';

export default function Hero() {
  const handleSendMessage = (message) => {
    console.log("User Asked:", message);
  };

  return (
    <section className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 max-w-7xl mx-auto pointer-events-auto pt-8">
      {/* Central Hero Header */}
      <div className="text-center mb-8 -mt-10">
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-amber-200 tracking-wider gold-text-glow">
          GitaVerse <span className="text-amber-400">AI</span>
        </h1>
        <p className="text-xs md:text-sm font-sans tracking-widest text-amber-300/80 uppercase mt-2">
          Your Divine AI Guide to the Bhagavad Gita
        </p>
      </div>

      {/* Center Chat Box Container Shifted Slightly Right */}
      <div className="w-full flex justify-center md:translate-x-3">
        <ChatBox onSend={handleSendMessage} />
      </div>
    </section>
  );
}