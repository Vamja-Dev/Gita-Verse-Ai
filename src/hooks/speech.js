// src/hooks/speech.js
import { stopGlobalAudio } from '../components/GitaAudioPlayer';

class SpeechManager {
  constructor() {
    this.synth = typeof window !== 'undefined' && window.speechSynthesis ? window.speechSynthesis : null;
    this.voices = [];
    this.initialized = false;
    this.currentUtterance = null;
    this.currentAudio = null;
    this.activeId = null;
    // Store subscribers in a Set so multiple buttons can listen independently
    this.subscribers = new Set();

    if (this.synth) {
      this.loadVoices();
      if (typeof this.synth.onvoiceschanged !== 'undefined') {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices() || [];
    this.initialized = true;
  }

  getAvailableVoices() {
    if (!this.voices.length && this.synth) {
      this.voices = this.synth.getVoices() || [];
    }
    return this.voices;
  }

  getBestVoice(languageCode) {
    const voices = this.getAvailableVoices();
    if (!voices.length) return null;

    let targetPrefix = languageCode.split('-')[0].toLowerCase();
    let exactMatch = voices.find(v => v.lang.toLowerCase() === languageCode.toLowerCase());
    if (exactMatch) return exactMatch;

    let prefixMatch = voices.find(v => v.lang.toLowerCase().startsWith(targetPrefix));
    if (prefixMatch) return prefixMatch;

    return voices[0] || null;
  }

  cleanText(text) {
    if (!text || typeof text !== 'string') return '';
    return text.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
  }

  notifySubscribers(id) {
    this.subscribers.forEach(callback => {
      try {
        callback(id);
      } catch (err) {
        console.error("Subscriber callback error:", err);
      }
    });
  }

  stop() {
    try {
      stopGlobalAudio();
    } catch (e) {
      // Ignored
    }

    if (this.synth) {
      this.synth.cancel();
    }
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    this.currentUtterance = null;
    this.activeId = null;
    this.notifySubscribers(null);
  }

  speak(text, language = 'en-IN', speechId = null, onEnd = null) {
    if (this.activeId === speechId) {
      this.stop();
      return;
    }

    this.stop();

    const cleanedText = this.cleanText(text);
    if (!cleanedText) return;

    this.activeId = speechId;
    this.notifySubscribers(this.activeId);

    const handleCompletion = () => {
      if (this.activeId === speechId) {
        this.activeId = null;
        this.notifySubscribers(null);
      }
      if (onEnd) onEnd();
    };

    // Gujarati stream handler
    if (language.startsWith('gu')) {
      try {
        const encodedText = encodeURIComponent(cleanedText);
        const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=gu&client=tw-ob&ttsspeed=0.85`;
        
        const audio = new Audio(audioUrl);
        this.currentAudio = audio;

        audio.onended = handleCompletion;
        audio.onerror = () => {
          this.fallbackBrowserSpeech(cleanedText, 'hi-IN', speechId, handleCompletion);
        };

        audio.play().catch(() => {
          this.fallbackBrowserSpeech(cleanedText, 'hi-IN', speechId, handleCompletion);
        });
        return;
      } catch (e) {
        this.fallbackBrowserSpeech(cleanedText, 'hi-IN', speechId, handleCompletion);
        return;
      }
    }

    this.fallbackBrowserSpeech(cleanedText, language, speechId, handleCompletion);
  }

  fallbackBrowserSpeech(text, language, speechId, onCompletion) {
    if (!this.synth) {
      onCompletion();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.88;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const bestVoice = this.getBestVoice(language);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.onend = onCompletion;
    utterance.onerror = onCompletion;

    this.currentUtterance = utterance;

    setTimeout(() => {
      if (this.currentUtterance === utterance && this.synth) {
        this.synth.speak(utterance);
      }
    }, 50);
  }

  getActiveId() {
    return this.activeId;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    // Immediately call callback with current state so button knows its status on mount
    callback(this.activeId);
    
    return () => {
      this.subscribers.delete(callback);
    };
  }
}

export const speechManager = new SpeechManager();

export const speakText = (text, language, speechId, onEnd) => {
  speechManager.speak(text, language, speechId, onEnd);
};

export const stopSpeaking = () => {
  speechManager.stop();
};

export const getActiveSpeechId = () => {
  return speechManager.getActiveId();
};