import React from 'react';
import { motion } from 'framer-motion';

export default function DivineBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep spiritual radial gradient bloom */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-amber-600/15 via-amber-500/5 to-transparent rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-600/10 via-amber-900/10 to-transparent rounded-full blur-[100px]" />
      
      {/* Subtle divine light rays simulation */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950/60 to-slate-950" />
    </div>
  );
}