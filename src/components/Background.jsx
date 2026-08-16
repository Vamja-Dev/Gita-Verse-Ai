import React, { useState, useRef, useEffect } from 'react';

export default function Background() {
  const [activeVideo, setActiveVideo] = useState(1);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);

  useEffect(() => {
    if (videoRef1.current) videoRef1.current.playbackRate = 0.5;
    if (videoRef2.current) videoRef2.current.playbackRate = 0.5;
    if (videoRef3.current) videoRef3.current.playbackRate = 0.5;
  }, []);

  const handleTimeUpdate = (currentVidNum, nextVidNum, videoRefCurrent, videoRefNext) => {
    if (!videoRefCurrent || !videoRefNext) return;
    const timeLeft = videoRefCurrent.duration - videoRefCurrent.currentTime;
    
    if (timeLeft < 2.0 && activeVideo === currentVidNum) {
      videoRefNext.currentTime = 0;
      videoRefNext.play().catch(() => {});
      setActiveVideo(nextVidNum);
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-slate-950">
      <video
        ref={videoRef1}
        autoPlay
        muted
        playsInline
        preload="auto"
        src="/gita-bg.mp4?v=1"
        onTimeUpdate={() => handleTimeUpdate(1, 2, videoRef1.current, videoRef2.current)}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1200 ease-in-out ${
          activeVideo === 1 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <video
        ref={videoRef2}
        muted
        playsInline
        preload="auto"
        src="/gita-bg.mp4?v=1"
        onTimeUpdate={() => handleTimeUpdate(2, 3, videoRef2.current, videoRef3.current)}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1200 ease-in-out ${
          activeVideo === 2 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <video
        ref={videoRef3}
        muted
        playsInline
        preload="auto"
        src="/gita-bg.mp4?v=1"
        onTimeUpdate={() => handleTimeUpdate(3, 1, videoRef3.current, videoRef1.current)}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1200 ease-in-out ${
          activeVideo === 3 ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="absolute inset-0 bg-slate-950/20 backdrop-brightness-95 pointer-events-none z-10" />
    </div>
  );
}