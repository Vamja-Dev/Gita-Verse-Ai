import React from "react";

export default function BackgroundEffects() {
  return (
    <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
      {/* Floating Dust / Divine Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black" />
      
      {/* Animated Light Rays / Fog simulation */}
      <div className="absolute -inset-[100%] opacity-30 animate-spin-slow bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.15),transparent_50%)]" />
    </div>
  );
}