import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, Pause, Music } from 'lucide-react';
import meditationBg from '../assets/images/meditation-bg.png';

export default function Meditation({ onNavigate }) {
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Track list using your exact local filenames
  const musicTracks = [
    { 
      id: 1, 
      title: 'Om Namo Bhagavate Vasudevaya 108', 
      category: 'Divine Mantra', 
      file: '/audio/Om-Namo-Bhagavate-Vasudevaya-108.mp3' 
    },
    { 
      id: 2, 
      title: 'Krishna Flute Sanctuary', 
      category: 'Deep Peace', 
      file: '/audio/Krishna Flute.mp3' 
    },
    { 
      id: 3, 
      title: 'Shri Krishna Govind Hare Murari', 
      category: 'Devotional Flow', 
      file: '/audio/Shri-Krishna-Govind-Hare-Murari.mp3' 
    },
    { 
      id: 4, 
      title: 'Hare Krishna Hare Rama Kirtan', 
      category: 'Kirtan & Joy', 
      file: '/audio/Hare-Krishna-Hare-Rama.mp3' 
    }
  ];

  // Format seconds into MM:SS display format
  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTogglePlay = (track) => {
    if (playingTrackId === track.id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingTrackId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const newAudio = new Audio(track.file);
      audioRef.current = newAudio;

      newAudio.addEventListener('loadedmetadata', () => {
        setDuration(newAudio.duration);
      });

      newAudio.addEventListener('timeupdate', () => {
        setCurrentTime(newAudio.currentTime);
      });

      newAudio.play().then(() => {
        setPlayingTrackId(track.id);
      }).catch((err) => {
        console.log("Audio playback error:", err);
      });

      newAudio.onended = () => {
        setPlayingTrackId(null);
        setCurrentTime(0);
      };
    }
  };

  // Allow seeking through the track by clicking on the progress bar
  const handleSeek = (e, trackId) => {
    if (playingTrackId !== trackId || !audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen text-slate-100 font-serif overflow-x-hidden bg-[#06040a]">
      
      {/* Custom Full-Screen Background Image Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img 
          src={meditationBg} 
          alt="Meditation Sanctuary Background" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-20 pt-36 pb-24 px-6 md:px-16 max-w-7xl mx-auto space-y-16">
        
        {/* Meditation Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-sans tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Sacred Sanctuary • Dhyana Yoga</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-amber-100 tracking-wide [text-shadow:_0_0_30px_rgba(245,158,11,0.5)]">
            Find Inner Stillness & Peace
          </h1>
          <p className="text-sm md:text-base font-sans text-slate-200/90 font-light leading-relaxed drop-shadow-md">
            Immerse your soul in meditative soundscapes and guided breathing circles for timeless yogic contemplation.
          </p>
        </div>

        {/* Sacred Ambient Soundscapes Section */}
        <div className="space-y-6 pb-12">
          <div className="flex items-center gap-2 border-b border-amber-500/20 pb-4">
            <Music className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-serif text-amber-200 tracking-wide">Sacred Ambient Soundscapes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {musicTracks.map((track) => {
              const isPlaying = playingTrackId === track.id;
              const trackProgress = isPlaying && duration > 0 ? (currentTime / duration) * 100 : 0;

              return (
                <div 
                  key={track.id}
                  className="bg-[#0d0914]/75 backdrop-blur-md border border-amber-500/30 hover:border-amber-400/60 rounded-2xl p-6 flex flex-col gap-4 shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-sans text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                        {track.category}
                      </span>
                      <h3 className="text-base font-serif text-amber-100 pt-1">{track.title}</h3>
                    </div>

                    <button
                      onClick={() => handleTogglePlay(track)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all cursor-pointer shrink-0 ${
                        isPlaying
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                          : 'bg-slate-900/80 text-amber-300 border-amber-500/30 hover:border-amber-400'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                  </div>

                  {/* Interactive Progress Bar & Time Counters - ONLY shows when this specific track is playing */}
                  <AnimatePresence>
                    {isPlaying && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-1.5 pt-2 overflow-hidden"
                      >
                        <div 
                          onClick={(e) => handleSeek(e, track.id)}
                          className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden cursor-pointer relative border border-amber-500/20"
                        >
                          <div 
                            className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-150"
                            style={{ width: `${trackProgress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] font-sans text-amber-200/80">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>
        </div>

      </div>

      <footer className="relative z-20 text-center py-6 text-xs text-amber-200/50 font-sans tracking-widest uppercase bg-slate-950/40 backdrop-blur-md border-t border-amber-500/10">
        © 2026 GitaVerse AI. AI-generated content may contain mistakes.
      </footer>
    </main>
  );
}