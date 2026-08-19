import React from 'react';

export default function ChapterCard({ chapter, onClick }) {
  const chapterId = chapter.number || chapter.chapter_number;

  return (
    <div 
      onClick={onClick}
      className="group relative h-full p-6 pl-8 rounded-r-xl rounded-l-md border-y-2 border-r-2 border-amber-800/80 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-amber-950/60 flex flex-col justify-between gap-4 cursor-pointer overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(50, 24, 12, 0.95), rgba(35, 17, 8, 0.98)), radial-gradient(circle at top right, rgba(140, 70, 25, 0.3), transparent)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* 3D BOOK SPINE WITH RIDGE BINDINGS ON THE LEFT */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 border-r-2 border-amber-950 shadow-2xl flex flex-col justify-around py-2">
        {/* Spine Ribs / Raised Bands */}
        <div className="w-full h-1.5 bg-gradient-to-r from-amber-950 via-amber-700 to-amber-950 shadow-md border-y border-amber-950/60" />
        <div className="w-full h-1.5 bg-gradient-to-r from-amber-950 via-amber-700 to-amber-950 shadow-md border-y border-amber-950/60" />
        <div className="w-full h-1.5 bg-gradient-to-r from-amber-950 via-amber-700 to-amber-950 shadow-md border-y border-amber-950/60" />
        <div className="w-full h-1.5 bg-gradient-to-r from-amber-950 via-amber-700 to-amber-950 shadow-md border-y border-amber-950/60" />
        <div className="w-full h-1.5 bg-gradient-to-r from-amber-950 via-amber-700 to-amber-950 shadow-md border-y border-amber-950/60" />
      </div>

      {/* Inner Gold Foil Cover Border Effect */}
      <div className="absolute inset-2 left-8 rounded border border-amber-600/30 pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-center justify-between pl-4">
        <span className="text-xs font-serif font-bold px-3 py-1 rounded bg-amber-950 text-amber-300 border border-amber-600/50 shadow-inner">
          Chapter {chapterId}
        </span>
        <span className="text-xs font-serif text-amber-200/80 italic">
          {chapter.verses_count || chapter.totalShlokas || 40} Shlokas
        </span>
      </div>
      
      {/* Chapter Titles */}
      <div className="my-auto pl-4">
        <h3 className="text-base md:text-lg font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors leading-snug">
          {chapter.englishName || chapter.name}
        </h3>
        <p className="text-xs md:text-sm text-amber-200/70 font-serif mt-1">
          {chapter.sanskritName || chapter.name_meaning}
        </p>
      </div>

      {/* Explore Button */}
      <div className="pl-4">
        <button className="mt-2 w-full py-2.5 rounded-lg bg-amber-950/90 group-hover:bg-amber-500 group-hover:text-slate-950 text-amber-200 border border-amber-600/40 font-serif font-medium text-sm transition-all duration-300 shadow-md">
          Explore Shlokas →
        </button>
      </div>
    </div>
  );
}