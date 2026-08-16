import React from 'react';
import CosmicGradient from './CosmicGradient';
import MandalaLayer from './MandalaLayer';
import StarsLayer from './StarLayer';
import FogLayer from './FogLayer';
import ParticleLayer from './ParticleLayer';
import LightRays from './LightRays';
import FloatingSanskrit from './FloatingSanskrit';

const BackgroundManager = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft warm vignette gradient that doesn't hide the layers */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40" 
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(140, 80, 40, 0.25) 0%, rgba(26, 15, 8, 0.8) 100%)`
        }}
      />
      
      {/* All original animated background layers fully visible */}
      <div className="absolute inset-0 z-0">
        <CosmicGradient />
        <MandalaLayer />
        <StarsLayer />
        <FogLayer />
        <ParticleLayer />
        <LightRays />
        <FloatingSanskrit />
      </div>
    </div>
  );
};

export default BackgroundManager;