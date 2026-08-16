import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/')} 
      className="flex items-center gap-3 cursor-pointer group select-none"
    >
      <div className="w-10 h-10 rounded-xl bg-[#2c1810] border border-amber-600/40 flex items-center justify-center text-amber-400 group-hover:border-amber-400 transition-all shadow-lg">
        <span className="text-xl font-serif">ॐ</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm md:text-base font-serif font-bold tracking-widest text-amber-200 group-hover:text-amber-400 transition-colors">
          GitaVerse <span className="text-xs text-amber-500 font-sans tracking-normal">AI</span>
        </span>
      </div>
    </div>
  );
}