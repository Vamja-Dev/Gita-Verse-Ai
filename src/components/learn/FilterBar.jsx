import React from 'react';

export default function FilterBar({ selectedFilter, setSelectedFilter }) {
  const categories = ['All Chapters', 'Karma Yoga', 'Bhakti Yoga', 'Jnana Yoga'];

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 pb-2">
      {categories.map((cat) => {
        const isActive = selectedFilter === cat;
        return (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border ${
              isActive
                ? 'bg-amber-600/30 border-amber-500/60 text-amber-200 shadow-lg shadow-amber-950/50'
                : 'border-amber-900/40 text-amber-200/70 hover:text-amber-100 hover:border-amber-600/40'
            }`}
            style={{
              backgroundColor: isActive ? '#3d2314' : '#2c1810',
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}