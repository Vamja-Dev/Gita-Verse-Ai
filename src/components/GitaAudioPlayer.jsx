import React, { useState, useEffect } from 'react';
import { FaVolumeUp, FaPause } from 'react-icons/fa';

// Track active audio elements globally across components
let globalAudioInstance = null;
let globalActiveUrl = null;
let globalSetStateCallback = null;

export default function GitaAudioPlayer({ shlokaId }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioUrl = `/audio/${shlokaId}.wav`;

  useEffect(() => {
    return () => {
      // Clean up state callback if unmounted while playing
      if (globalSetStateCallback === setIsPlaying && globalAudioInstance && globalAudioInstance.paused) {
        // keep instance alive if needed or let it clean up
      }
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();

    // If this specific shloka is already loaded
    if (globalActiveUrl === audioUrl && globalAudioInstance) {
      if (isPlaying) {
        globalAudioInstance.pause();
        setIsPlaying(false);
      } else {
        globalAudioInstance.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.error("Audio playback error:", err));
      }
      return;
    }

    // Stop any other currently playing audio
    if (globalAudioInstance) {
      globalAudioInstance.pause();
      globalAudioInstance.currentTime = 0;
      if (globalSetStateCallback) {
        globalSetStateCallback(false);
      }
    }

    // Create or reuse audio instance for this shloka
    const audio = new Audio(audioUrl);
    globalAudioInstance = audio;
    globalActiveUrl = audioUrl;
    globalSetStateCallback = setIsPlaying;

    audio.play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.error("Audio playback error:", err);
        setIsPlaying(false);
      });

    audio.onended = () => {
      setIsPlaying(false);
      if (globalAudioInstance === audio) {
        globalAudioInstance = null;
        globalActiveUrl = null;
        globalSetStateCallback = null;
      }
    };
  };

  return (
    <button
      onClick={togglePlay}
      className="flex items-center justify-center p-2.5 rounded-xl bg-[#faebd7] border border-[#8c5a3c]/50 text-[#3d2314] hover:bg-[#ecd0a8] transition-all shadow cursor-pointer"
      title={isPlaying ? "Pause Shloka Audio" : "Play Original Sanskrit Shloka"}
    >
      {isPlaying ? <FaPause className="w-4 h-4 animate-pulse" /> : <FaVolumeUp className="w-4 h-4" />}
    </button>
  );
}

// Global utility export to halt audio from parent pages/modals on unmount/close
export function stopGlobalAudio() {
  if (globalAudioInstance) {
    globalAudioInstance.pause();
    globalAudioInstance.currentTime = 0;
    globalAudioInstance = null;
    globalActiveUrl = null;
    if (globalSetStateCallback) {
      globalSetStateCallback(false);
      globalSetStateCallback = null;
    }
  }
}