import React from 'react';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-amber-400/70">
        🔍
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by chapter number (e.g., 1, 13), English name, or Sanskrit..."
        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-amber-600/30 text-amber-100 placeholder-amber-200/50 font-serif text-sm focus:outline-none focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/20 backdrop-blur-xl shadow-xl transition-all"
        style={{
          backgroundColor: '#2c1810',
          backgroundImage: 'linear-gradient(to right, rgba(44, 24, 16, 0.95), rgba(26, 15, 8, 0.98))',
          boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.5)'
        }}
      />
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-amber-300/70 hover:text-amber-200 font-sans tracking-wider uppercase"
        >
          Clear
        </button>
      )}
    </div>
  );
}