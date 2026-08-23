// src/components/SpeechButton.jsx
import React, { useState, useEffect } from 'react';
import { FaVolumeUp, FaPause } from 'react-icons/fa';
import { speechManager, speakText, stopSpeaking } from '../hooks/speech';

export default function SpeechButton({ text, language, speechId, className = '' }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Listen to global speech state changes and check against this specific button's id
    const unsubscribe = speechManager.subscribe((activeId) => {
      setIsActive(activeId === speechId);
    });
    return () => unsubscribe();
  }, [speechId]);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isActive) {
      stopSpeaking();
    } else {
      speakText(text, language, speechId, () => {
        setIsActive(false);
      });
    }
  };

  if (typeof window !== 'undefined' && window.speechSynthesis === undefined) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`flex items-center justify-center p-2 rounded-xl bg-[#faebd7] border border-[#8c5a3c]/50 text-[#3d2314] hover:bg-[#ecd0a8] transition-all shadow cursor-pointer ${className}`}
      title={isActive ? "Pause reading" : "Listen to text"}
      aria-label="Speech audio button"
    >
      {isActive ? (
        <FaPause className="w-3.5 h-3.5 animate-pulse text-[#3d2314]" />
      ) : (
        <FaVolumeUp className="w-3.5 h-3.5" />
      )}
    </button>
  );
}