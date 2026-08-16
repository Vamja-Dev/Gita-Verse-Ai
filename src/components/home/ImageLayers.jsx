import React, { useState, useEffect, useRef, useCallback } from "react";

export default function ImageLayers() {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isInside, setIsInside] = useState(false);
  const requestRef = useRef(null);
  const targetPos = useRef({ x: -500, y: -500 });
  const currentPos = useRef({ x: -500, y: -500 });

  // Smooth lerp for buttery cursor mask movement
  const animate = useCallback(() => {
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.12;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.12;

    setMousePos({ x: currentPos.current.x, y: currentPos.current.y });
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (!isInside) setIsInside(true);
  };

  const handleMouseLeave = () => {
    setIsInside(false);
    targetPos.current = { x: -500, y: -500 };
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* LAYER 1: Base 4K Artwork (Temple / Forest / Night Scene) */}
      <div className="absolute inset-0 w-full h-full z-10">
        <img
          src="/assets/images/bg-image-1.png"
          alt="Sacred Temple Night"
          className="w-full h-full object-cover filter brightness-90 contrast-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      </div>

      {/* LAYER 2: Hidden 4K Artwork (God Krishna / Cosmic Divine Glow) revealed via Mask */}
      <div
        className="absolute inset-0 w-full h-full z-20 transition-opacity duration-700 ease-out"
        style={{
          opacity: isInside ? 1 : 0,
          maskImage: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 85%)`,
          WebkitMaskImage: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 85%)`,
        }}
      >
        <img
          src="/assets/images/bg-image-2.png"
          alt="God Krishna Cosmic Manifestation"
          className="w-full h-full object-cover scale-105 transform transition-transform duration-1000"
          loading="eager"
        />
        {/* Divine Golden Light Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-yellow-300/10 mix-blend-overlay" />
      </div>

      {/* Golden Edge Glow Ring around Mask */}
      {isInside && (
        <div
          className="absolute pointer-events-none z-30 rounded-full border border-amber-400/60 shadow-[0_0_40px_10px_rgba(251,191,36,0.4)]"
          style={{
            width: "360px",
            height: "360px",
            transform: "translate(-50%, -50%)",
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />
      )}
    </div>
  );
}