import React from 'react';

const ParticleLayer = () => {
  const particles = Array.from({ length: 25 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes floatParticle {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-100px) translateX(30px); opacity: 0.8; }
          100% { transform: translateY(-200px) translateX(-20px); opacity: 0.2; }
        }
      `}</style>
      {particles.map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `floatParticle ${4 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

export default ParticleLayer;