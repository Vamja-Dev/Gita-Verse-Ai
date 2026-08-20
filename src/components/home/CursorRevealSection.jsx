import React, { useEffect, useRef } from "react";
import videoBase from "../../assets/bg-image-1-png.mp4"; 
import videoReveal from "../../assets/bg-image-2-png.mp4"; 

export default function CursorRevealSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const revealVideoRef = useRef(null);
  const baseVideoRef = useRef(null);
  const secondBaseVideoRef = useRef(null); // Reference for the second base video element

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const revealVid = revealVideoRef.current;
    const baseVid = baseVideoRef.current;
    const secondBaseVid = secondBaseVideoRef.current;
    if (!container || !canvas || !revealVid || !baseVid || !secondBaseVid) return;

    // Slow down playback speed for videos
    revealVid.playbackRate = 0.7;
    baseVid.playbackRate = 0.7;
    secondBaseVid.playbackRate = 0.7;

    const ctx = canvas.getContext('2d');
    const brushRadius = 143;
    const decay = 0.016;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let radius = brushRadius * dpr;
    let cover = document.createElement('canvas');
    let coverCtx = cover.getContext('2d');
    let brush = document.createElement('canvas');
    let brushCtx = brush.getContext('2d');
    let diam = Math.ceil(radius * 2);
    brush.width = brush.height = diam;

    let videoReady = false;

    const checkVideosReady = () => {
      videoReady = true;
      revealVid.play().catch(err => console.log("Autoplay prevented:", err));
      baseVid.play().catch(err => console.log("Autoplay prevented:", err));
      secondBaseVid.play().catch(err => console.log("Autoplay prevented:", err));
      paintCover();
    };

    revealVid.onloadeddata = checkVideosReady;
    baseVid.onloadeddata = checkVideosReady;
    secondBaseVid.onloadeddata = checkVideosReady;

    // Synchronized loop handler for both base video layers at 8 seconds to prevent white screen flashes
    const handleTimeUpdate = () => {
      if (baseVid.currentTime >= 8) {
        baseVid.currentTime = 0;
        baseVid.play().catch(err => {});
      }
      if (secondBaseVid.currentTime >= 8) {
        secondBaseVid.currentTime = 0;
        secondBaseVid.play().catch(err => {});
      }
    };

    baseVid.addEventListener('timeupdate', handleTimeUpdate);
    secondBaseVid.addEventListener('timeupdate', handleTimeUpdate);

    function paintCover(){
      if (!videoReady || !canvas.width || !canvas.height) return;
      cover.width = canvas.width;
      cover.height = canvas.height;
      const cw = cover.width, ch = cover.height;

      const vidWidth = revealVid.videoWidth || 1920;
      const vidHeight = revealVid.videoHeight || 1080;

      const s = Math.min(cw / vidWidth, ch / vidHeight);
      const w = vidWidth * s, h = vidHeight * s;

      coverCtx.clearRect(0, 0, cw, ch);
      coverCtx.drawImage(revealVid, (cw - w) / 2, (ch - h) / 2, w, h);
    }

    function resize(){
      if (!container) return;
      const r = container.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      canvas.style.width = r.width + 'px';
      canvas.style.height = r.height + 'px';
      paintCover();
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const points = [];
    let last = null, idle = 0;

    const handlePointerMove = (e) => {
      const r = container.getBoundingClientRect();
      const x = (e.clientX - r.left) * dpr;
      const y = (e.clientY - r.top) * dpr;
      if (x < -radius || y < -radius || x > canvas.width + radius || y > canvas.height + radius) {
        last = null;
        return;
      }
      if (last) {
        const dx = x - last.x, dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const step = Math.max(radius * 0.3, 1);
        const n = Math.min(Math.ceil(dist / step), 60);
        for (let i = 1; i <= n; i++) {
          points.push({ x: last.x + dx * (i / n), y: last.y + dy * (i / n) });
        }
      } else {
        points.push({ x, y });
      }
      last = { x, y };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    function stamp(x, y){
      const c = diam / 2;
      brushCtx.clearRect(0, 0, diam, diam);
      brushCtx.globalCompositeOperation = 'source-over';
      const g = brushCtx.createRadialGradient(c, c, 0, c, c, c);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.55, 'rgba(255,255,255,0.82)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      brushCtx.fillStyle = g;
      brushCtx.fillRect(0, 0, diam, diam);

      brushCtx.globalCompositeOperation = 'source-in';
      brushCtx.drawImage(cover, x - c, y - c, diam, diam, 0, 0, diam, diam);

      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(brush, x - c, y - c);
    }

    let animationFrameId;
    function tick(){
      animationFrameId = requestAnimationFrame(tick);

      if (videoReady) {
        paintCover();
      }

      const drawing = points.length > 0;

      if (drawing) idle = 0; else { idle++; if (idle > 120 + 1) return; }

      const fade = drawing ? decay : Math.min(decay + idle * 0.004, 0.5);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      if (drawing) {
        for (const p of points) stamp(p.x, p.y);
        points.length = 0;
      } else if (idle === 120) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      if (baseVid) baseVid.removeEventListener('timeupdate', handleTimeUpdate);
      if (secondBaseVid) secondBaseVid.removeEventListener('timeupdate', handleTimeUpdate);
      if (resizeObserver && container) resizeObserver.unobserve(container);
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black select-none"
    >
      {/* Hidden loop video source for the reveal overlay effect */}
      <video
        ref={revealVideoRef}
        src={videoReveal}
        autoPlay
        loop
        muted
        playsInline
        className="hidden"
      />

      <div className="absolute inset-0 z-0" id="liquid">
        {/* BACKDROP — blur layer */}
        <video
          ref={baseVideoRef}
          src={`${videoBase}?cache=blur-layer`}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-2xl brightness-[0.45] saturate-125"
        />

        {/* BASE VIDEO WITH SEPARATE REF */}
        <video
          ref={secondBaseVideoRef}
          id="heroBaseVideo"
          src={`${videoBase}?cache=base-layer`}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-contain object-center"
        />

        {/* Reveal canvas */}
        <canvas
          id="heroCanvas"
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>
    </section>
  );
}