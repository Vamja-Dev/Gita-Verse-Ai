// src/components/GujaratiAudioPlayer.jsx
import React, { useState, useEffect } from 'react';
import { FaVolumeUp, FaPause } from 'react-icons/fa';
import { stopSpeaking } from '../hooks/speech';

// Global audio state management
let globalGujaratiAudioInstance = null;
let globalActiveAudioUrl = null;
let activeSetIsPlaying = null;

const gujaratiAudioListeners = new Set();

function notifyGujaratiListeners(activeUrl, isPlayingState) {
  gujaratiAudioListeners.forEach(listener => listener(activeUrl, isPlayingState));
}

export default function GujaratiAudioPlayer({ chapter, verse, type, className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioUrl = `/audio/gujarati/ch-${chapter}/ch-${chapter}-${verse}-${type}.mp3`;

  useEffect(() => {
    // Check global status on mount
    setIsPlaying(globalActiveAudioUrl === audioUrl && globalGujaratiAudioInstance && !globalGujaratiAudioInstance.paused);

    const handleStateChange = (activeUrl, playing) => {
      if (activeUrl === audioUrl) {
        setIsPlaying(playing);
      } else {
        setIsPlaying(false);
      }
    };

    gujaratiAudioListeners.add(handleStateChange);
    return () => {
      gujaratiAudioListeners.delete(handleStateChange);
    };
  }, [audioUrl]);

  const togglePlay = (e) => {
    e.stopPropagation();

    if (globalActiveAudioUrl === audioUrl && globalGujaratiAudioInstance) {
      if (isPlaying) {
        globalGujaratiAudioInstance.pause();
        setIsPlaying(false);
        notifyGujaratiListeners(audioUrl, false);
      } else {
        stopSpeaking();
        globalGujaratiAudioInstance.play()
          .then(() => {
            setIsPlaying(true);
            notifyGujaratiListeners(audioUrl, true);
          })
          .catch((err) => console.error("Gujarati audio playback error:", err));
      }
      return;
    }

    // Stop any existing instance instantly
    if (globalGujaratiAudioInstance) {
      globalGujaratiAudioInstance.pause();
      globalGujaratiAudioInstance.currentTime = 0;
      globalGujaratiAudioInstance = null;
      notifyGujaratiListeners(globalActiveAudioUrl, false);
    }

    stopSpeaking();

    const audio = new Audio(audioUrl);
    
    audio.onerror = () => {
      console.warn(`Gujarati audio not found: ${audioUrl}`);
      setIsPlaying(false);
      notifyGujaratiListeners(audioUrl, false);
    };

    globalGujaratiAudioInstance = audio;
    globalActiveAudioUrl = audioUrl;

    audio.play()
      .then(() => {
        setIsPlaying(true);
        notifyGujaratiListeners(audioUrl, true);
      })
      .catch((err) => {
        console.warn(`Gujarati audio file missing or unavailable: ${audioUrl}`);
        setIsPlaying(false);
        notifyGujaratiListeners(audioUrl, false);
      });

    audio.onended = () => {
      setIsPlaying(false);
      notifyGujaratiListeners(audioUrl, false);
      if (globalGujaratiAudioInstance === audio) {
        globalGujaratiAudioInstance = null;
        globalActiveAudioUrl = null;
      }
    };
  };

  return (
    <button
      type="button"
      onClick={togglePlay}
      className={`flex items-center justify-center p-2 rounded-xl bg-[#faebd7] border border-[#8c5a3c]/50 text-[#3d2314] hover:bg-[#ecd0a8] transition-all shadow cursor-pointer ${className}`}
      title={isPlaying ? "Pause Gujarati Audio" : `Play Gujarati ${type}`}
      aria-label="Gujarati audio playback button"
    >
      {isPlaying ? (
        <FaPause className="w-3.5 h-3.5 animate-pulse text-[#3d2314]" />
      ) : (
        <FaVolumeUp className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

export function stopGlobalGujaratiAudio() {
  if (globalGujaratiAudioInstance) {
    globalGujaratiAudioInstance.pause();
    globalGujaratiAudioInstance.currentTime = 0;
    globalGujaratiAudioInstance = null;
    const oldUrl = globalActiveAudioUrl;
    globalActiveAudioUrl = null;
    notifyGujaratiListeners(oldUrl, false);
  }
}