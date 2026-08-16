import React from 'react';
import { storyVerses } from '../../data/storyData';
import LayoutManager from './LayoutManager';

export default function ScrollStory() {
  return (
    <div className="relative w-full bg-[#0a0814] text-slate-100 overflow-hidden py-32">
      {/* Sacred Ambient Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Manuscript Verses */}
      <div className="relative z-10 space-y-40">
        {storyVerses.map((verse, index) => (
          <LayoutManager key={verse.id} verse={verse} index={index} />
        ))}
      </div>
    </div>
  );
}