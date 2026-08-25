// src/components/ChatBox.jsx
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPaperPlane,
  FaMicrophone,
  FaStop,
  FaSpinner,
  FaChevronRight,
  FaChevronDown,
  FaHistory,
  FaTrash,
  FaTimes,
  FaUserLock,
  FaBookOpen,
} from 'react-icons/fa';

export default function ChatBox({ onSend, onNavigate }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseResult, setResponseResult] = useState(null);
  const [isListening, setIsListening] = useState(false);

  // Chat History States
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);

  // Authentication check from localStorage
  const userEmail = localStorage.getItem('gitaverse_user_email');
  const userName = localStorage.getItem('gitaverse_user_name');
  const isLoggedIn = Boolean(userEmail && userEmail !== 'N/A' && userName && userName !== 'Seeker');
  const historyKey = `gitaverse_chat_history_${userEmail}`;

  // Speech recognition ref
  const recognitionRef = useRef(null);

  // Collapsible dropdown states for translations & explanations
  const [showTransEnglish, setShowTransEnglish] = useState(false);
  const [showTransHindi, setShowTransHindi] = useState(false);
  const [showTransGujarati, setShowTransGujarati] = useState(false);

  const [showExpEnglish, setShowExpEnglish] = useState(false);
  const [showExpHindi, setShowExpHindi] = useState(false);
  const [showExpGujarati, setShowExpGujarati] = useState(false);

  const textareaRef = useRef(null);

  // Load chat history on mount if logged in
  useEffect(() => {
    if (isLoggedIn) {
      const savedHistory = JSON.parse(localStorage.getItem(historyKey)) || [];
      setChatHistory(savedHistory);
    }
  }, [isLoggedIn, historyKey]);

  // Lock body scroll while the history panel is open
  useEffect(() => {
    document.body.style.overflow = showHistoryDrawer ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showHistoryDrawer]);

  // Save successful response to user history
  const saveToHistory = (userQuery, data) => {
    if (!isLoggedIn) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newHistoryItem = {
      id: Date.now(),
      timestamp: `Today • ${timeStr}`,
      prompt: userQuery,
      response: data,
    };

    const existing = JSON.parse(localStorage.getItem(historyKey)) || [];
    const updated = [newHistoryItem, ...existing];
    localStorage.setItem(historyKey, JSON.stringify(updated));
    setChatHistory(updated);
  };

  const handleDeleteHistoryItem = (id, e) => {
    e.stopPropagation();
    const updated = chatHistory.filter((item) => item.id !== id);
    localStorage.setItem(historyKey, JSON.stringify(updated));
    setChatHistory(updated);
  };

  const handleClearAllHistory = () => {
    localStorage.removeItem(historyKey);
    setChatHistory([]);
  };

  // Initialize browser speech recognition on mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (isLoading) return;
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.log("Recognition already active", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userQuery = input.trim();
    if (!userQuery || isLoading) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setInput('');
    setIsLoading(true);
    setResponseResult(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/gita-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userQuery })
      });
      const data = await res.json();

      setResponseResult(data);
      if (data.success) {
        saveToHistory(userQuery, data);
        if (onSend) onSend(data);
      }
    } catch (err) {
      console.error("Backend connection error:", err);
      setResponseResult({
        success: false,
        message: "Could not connect to the spiritual backend server. Please make sure FastAPI is running."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const nextHeight = Math.min(textarea.scrollHeight, 140);
      textarea.style.height = `${nextHeight}px`;
    }
  }, [input]);

  // If user is logged out, strictly show the authentication card
  if (!isLoggedIn) {
    return (
      <div className="w-full flex justify-center z-30 px-4 mt-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[430px] glass-panel rounded-2xl p-6 relative shadow-2xl border border-amber-500/30 bg-[#120a05]/95 backdrop-blur-md text-center space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-amber-500/15 flex items-center justify-center border border-amber-400/40 mx-auto text-amber-300">
            <FaUserLock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-amber-100 font-serif text-base font-bold">Authentication Required</h3>
            <p className="text-xs text-amber-200/70 font-sans leading-relaxed">
              Please log in or sign up to converse with GitaVerse AI and save your spiritual journey history.
            </p>
          </div>
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('login');
              } else {
                window.location.href = '/login';
              }
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-sans font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            Login / Sign Up to Chat
          </button>
        </motion.div>
      </div>
    );
  }

  // History drawer content — rendered through a portal
  const historyDrawer = (
    <AnimatePresence>
      {showHistoryDrawer && (
        <div className="fixed inset-0 z-[999] flex">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative w-full max-w-md h-full bg-[#0d0714] border-r border-amber-500/20 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-amber-500/15 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <FaBookOpen className="w-3.5 h-3.5" />
                </div>
                <span className="text-amber-300 font-serif font-bold text-base tracking-wide">GitaVerse AI</span>
              </div>
              <button
                onClick={() => setShowHistoryDrawer(false)}
                className="w-9 h-9 rounded-full border border-amber-500/40 bg-[#140b06] flex items-center justify-center text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Summary card */}
            <div className="px-6 pt-6 flex-shrink-0">
              <div className="p-5 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3">
                  <FaHistory className="w-4 h-4" />
                </div>
                <p className="text-amber-100 font-serif font-bold text-sm">Your Spiritual History</p>
                <p className="text-amber-200/50 text-[11px] font-sans mt-1">
                  {chatHistory.length} saved {chatHistory.length === 1 ? 'conversation' : 'conversations'}
                </p>
              </div>
            </div>

            {/* History list */}
            <div className="flex-1 overflow-y-auto px-4 pt-5 pb-2">
              {chatHistory.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-16 font-sans">
                  No previous questions saved yet.
                </p>
              ) : (
                <div className="space-y-1">
                  {chatHistory.map((item) => (
                    <div
                      key={item.id}
                      className="w-full px-3 py-3.5 rounded-xl hover:bg-amber-500/10 transition-colors border-b border-amber-500/5 last:border-b-0"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] text-amber-400/60 font-sans mb-1">{item.timestamp}</p>
                          <p className="text-xs text-amber-100 font-serif italic leading-relaxed line-clamp-2">
                            "{item.prompt}"
                          </p>
                          <p className="text-[10px] text-amber-300/70 font-sans font-semibold mt-1.5">
                            Chapter {item.response.primary_shloka?.chapter} • Shloka {item.response.primary_shloka?.shloka_number}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                          className="text-red-400/50 hover:text-red-400 transition-colors cursor-pointer flex-shrink-0 pt-0.5"
                          title="Delete"
                        >
                          <FaTrash size={11} />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          setResponseResult(item.response);
                          setShowHistoryDrawer(false);
                        }}
                        className="mt-2 flex items-center gap-1.5 text-[11px] font-sans font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        View Response
                        <FaChevronRight size={9} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer action */}
            {chatHistory.length > 0 && (
              <div className="px-6 py-5 border-t border-amber-500/15 flex-shrink-0">
                <button
                  onClick={handleClearAllHistory}
                  className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/10 transition-colors cursor-pointer font-sans uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <FaTrash size={11} />
                  Clear All History
                </button>
              </div>
            )}
          </motion.div>

          {/* Transparent click-outside area to close drawer */}
          <div
            className="flex-1 bg-transparent"
            onClick={() => setShowHistoryDrawer(false)}
          />
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-full relative flex flex-col items-center">

      {/* STATIONARY CHATBOX CONTAINER */}
      <div className="w-full flex justify-center z-30 mt-5 md:mt-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[430px] glass-panel rounded-2xl p-5 relative shadow-2xl border border-amber-500/20 bg-[#120a05]/85 backdrop-blur-md"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="relative pl-2">
              <span className="text-amber-400/25 text-3xl font-serif absolute -top-2 left-0 select-none">"</span>
              <p className="text-xs text-amber-100/90 font-sans leading-relaxed font-medium pl-3">
                Jai Shri Krishna! I am GitaVerse AI. Ask me about life, karma, purpose, or any verse from the Bhagavad Gita.
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-400/30 flex-shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
              <span className="text-amber-300 text-xs font-serif font-bold">ॐ</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative flex items-center font-sans">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening to your problem..." : "Ask Krishna anything..."}
              disabled={isLoading}
              className={`w-full bg-slate-950/20 border rounded-xl py-3 px-4 pr-20 text-xs text-amber-100 placeholder-amber-200/40 focus:outline-none transition-all backdrop-blur-sm resize-none overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-h-[42px] max-h-[140px] ${
                isListening
                  ? 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                  : 'border-amber-500/30 focus:border-amber-400/80'
              }`}
            />

            <div className="absolute right-2.5 flex items-center space-x-1.5">
              <button
                type="button"
                onClick={toggleListening}
                disabled={isLoading}
                className={`p-2 rounded-lg transition-all flex items-center justify-center ${
                  isLoading
                    ? 'opacity-40 cursor-not-allowed bg-amber-500/10 border border-amber-500/20 text-amber-200/40'
                    : isListening
                      ? 'bg-amber-500 text-slate-950 border border-amber-300 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.8)] cursor-pointer'
                      : 'text-amber-200/60 hover:text-amber-400 bg-amber-500/10 border border-amber-500/20 cursor-pointer'
                }`}
                title={isLoading ? "Processing response..." : isListening ? "Stop Listening" : "Speak your problem"}
              >
                {isListening ? <FaStop className="w-3 h-3" /> : <FaMicrophone className="w-3.5 h-3.5" />}
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="p-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-full hover:scale-105 transition-transform shadow-md disabled:opacity-50 flex items-center justify-center w-8 h-8 flex-shrink-0 cursor-pointer"
                title="Send Message"
              >
                {isLoading ? (
                  <FaSpinner className="w-3.5 h-3.5 animate-spin text-slate-950" />
                ) : (
                  <FaPaperPlane className="w-3 h-3 font-bold" />
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* --- FIXED CHAT HISTORY BUTTON PLACED AT THE BOTTOM LEFT OF THE SCREEN --- */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setShowHistoryDrawer(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#140b06]/95 border border-amber-500/40 text-amber-300 hover:bg-amber-500/20 text-xs font-sans font-semibold tracking-wider transition-all cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.8)] backdrop-blur-md"
        >
          <FaHistory className="w-3.5 h-3.5 text-amber-400" />
          <span>Chat History ({chatHistory.length})</span>
        </button>
      </div>

      {/* --- ABSOLUTE RESPONSE CONTAINER --- */}
      <div className="absolute top-[175px] left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 pb-24 z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence>
            {responseResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 15 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-[#140b06]/95 border-2 border-amber-500/40 rounded-3xl p-8 text-amber-100 shadow-2xl backdrop-blur-xl font-serif space-y-6"
              >
                {responseResult.success ? (
                  <>
                    {/* ROW 1: Your Situation Banner */}
                    <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-500/20 shadow-inner flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-amber-300 font-semibold font-sans text-xs uppercase tracking-wider">Your Situation: </span>
                        <span className="text-slate-200 italic font-serif text-sm sm:text-base">"{responseResult.user_problem}"</span>
                      </div>
                      <span className="text-amber-400 font-sans text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex-shrink-0">
                        🌿 Divine Insight Active
                      </span>
                    </div>

                    {/* ROW 2: The Sacred Shloka Showcase */}
                    <div className="bg-[#1f1108] p-6 rounded-2xl border border-amber-500/30 text-center space-y-3 shadow-md">
                      <div className="text-amber-400 font-bold font-sans text-xs uppercase tracking-widest">
                        Chapter {responseResult.primary_shloka?.chapter}, Shloka {responseResult.primary_shloka?.shloka_number}
                      </div>
                      <p className="text-amber-200 font-serif text-lg sm:text-xl py-2 leading-relaxed">
                        {responseResult.primary_shloka?.sanskrit}
                      </p>
                    </div>

                    {/* ROW 3: Translations Section */}
                    <div className="bg-slate-950/50 p-6 rounded-2xl border border-amber-500/20 space-y-3">
                      <p className="text-amber-400 font-bold uppercase tracking-wider text-xs font-sans">Translations:</p>

                      <div className="flex flex-col space-y-3">
                        <div className="border border-amber-500/20 rounded-xl overflow-hidden bg-black/30">
                          <button
                            onClick={() => setShowTransEnglish(!showTransEnglish)}
                            className="w-full flex items-center justify-between p-3 text-left text-amber-200 hover:bg-amber-500/10 font-semibold font-sans text-xs transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              {showTransEnglish ? <FaChevronDown className="w-3 h-3 text-amber-400" /> : <FaChevronRight className="w-3 h-3 text-amber-400" />}
                              English Translation
                            </span>
                          </button>
                          {showTransEnglish && (
                            <div className="p-3 pt-0 text-slate-300 font-serif italic text-xs leading-relaxed border-t border-amber-500/10 bg-amber-950/10">
                              "{responseResult.primary_shloka?.translations?.english || 'Translation unavailable.'}"
                            </div>
                          )}
                        </div>

                        <div className="border border-amber-500/20 rounded-xl overflow-hidden bg-black/30">
                          <button
                            onClick={() => setShowTransHindi(!showTransHindi)}
                            className="w-full flex items-center justify-between p-3 text-left text-amber-200 hover:bg-amber-500/10 font-semibold font-sans text-xs transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              {showTransHindi ? <FaChevronDown className="w-3 h-3 text-amber-400" /> : <FaChevronRight className="w-3 h-3 text-amber-400" />}
                              Hindi Translation (हिन्दी)
                            </span>
                          </button>
                          {showTransHindi && (
                            <div className="p-3 pt-0 text-slate-300 font-serif italic text-xs leading-relaxed border-t border-amber-500/10 bg-amber-950/10">
                              "{responseResult.primary_shloka?.translations?.hindi || 'यहाँ हिंदी अनुवाद उपलब्ध है।'}"
                            </div>
                          )}
                        </div>

                        <div className="border border-amber-500/20 rounded-xl overflow-hidden bg-black/30">
                          <button
                            onClick={() => setShowTransGujarati(!showTransGujarati)}
                            className="w-full flex items-center justify-between p-3 text-left text-amber-200 hover:bg-amber-500/10 font-semibold font-sans text-xs transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              {showTransGujarati ? <FaChevronDown className="w-3 h-3 text-amber-400" /> : <FaChevronRight className="w-3 h-3 text-amber-400" />}
                              Gujarati Translation (ગુજરાતી)
                            </span>
                          </button>
                          {showTransGujarati && (
                            <div className="p-3 pt-0 text-slate-300 font-serif italic text-xs leading-relaxed border-t border-amber-500/10 bg-amber-950/10">
                              "{responseResult.primary_shloka?.translations?.gujarati || 'यहाँ गुजराती अनुवाद उपलब्ध है।'}"
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ROW 4: Explanations Section */}
                    <div className="bg-slate-950/50 p-6 rounded-2xl border border-amber-500/20 space-y-3">
                      <p className="text-amber-400 font-bold uppercase tracking-wider text-xs font-sans">Explanations & Commentaries:</p>

                      <div className="flex flex-col space-y-3">
                        <div className="border border-amber-500/20 rounded-xl overflow-hidden bg-black/30">
                          <button
                            onClick={() => setShowExpEnglish(!showExpEnglish)}
                            className="w-full flex items-center justify-between p-3 text-left text-amber-200 hover:bg-amber-500/10 font-semibold font-sans text-xs transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              {showExpEnglish ? <FaChevronDown className="w-3 h-3 text-amber-400" /> : <FaChevronRight className="w-3 h-3 text-amber-400" />}
                              English Explanation
                            </span>
                          </button>
                          {showExpEnglish && (
                            <div className="p-3 pt-0 text-slate-300 font-sans text-xs leading-relaxed border-t border-amber-500/10 bg-amber-950/10">
                              {responseResult.primary_shloka?.explanations?.english || 'Explanation unavailable.'}
                            </div>
                          )}
                        </div>

                        <div className="border border-amber-500/20 rounded-xl overflow-hidden bg-black/30">
                          <button
                            onClick={() => setShowExpHindi(!showExpHindi)}
                            className="w-full flex items-center justify-between p-3 text-left text-amber-200 hover:bg-amber-500/10 font-semibold font-sans text-xs transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              {showExpHindi ? <FaChevronDown className="w-3 h-3 text-amber-400" /> : <FaChevronRight className="w-3 h-3 text-amber-400" />}
                              Hindi Explanation (हिन्दी व्याख्या)
                            </span>
                          </button>
                          {showExpHindi && (
                            <div className="p-3 pt-0 text-slate-300 font-sans text-xs leading-relaxed border-t border-amber-500/10 bg-amber-950/10">
                              {responseResult.primary_shloka?.explanations?.hindi || 'श्रीमद्भगवद्गीता के इस श्लोक का तात्पर्य जीवन में कर्म और विवेक को स्थापित करना है।'}
                            </div>
                          )}
                        </div>

                        <div className="border border-amber-500/20 rounded-xl overflow-hidden bg-black/30">
                          <button
                            onClick={() => setShowExpGujarati(!showExpGujarati)}
                            className="w-full flex items-center justify-between p-3 text-left text-amber-200 hover:bg-amber-500/10 font-semibold font-sans text-xs transition-colors cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              {showExpGujarati ? <FaChevronDown className="w-3 h-3 text-amber-400" /> : <FaChevronRight className="w-3 h-3 text-amber-400" />}
                              Gujarati Explanation (ગુજરાતી સ્પષ્ટીકરણ)
                            </span>
                          </button>
                          {showExpGujarati && (
                            <div className="p-3 pt-0 text-slate-300 font-sans text-xs leading-relaxed border-t border-amber-500/10 bg-amber-950/10">
                              {responseResult.primary_shloka?.explanations?.gujarati || 'શ્રીમદ ભગવદ્ગીતાના આ શ્લોક દ્વારા જીવનમાં શાંતિ અને સત્યનો માર્ગ દર્શાવવામાં આવ્યો છે.'}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ROW 5: Spiritual Connection */}
                    <div className="bg-slate-950/60 p-6 rounded-2xl border border-amber-500/30 space-y-3">
                      <p className="text-amber-400 font-bold uppercase tracking-wider text-xs font-sans">Spiritual Connection:</p>
                      <div className="text-slate-100 leading-relaxed bg-slate-900/90 p-5 rounded-xl border border-amber-500/30 text-sm font-sans shadow-inner">
                        {responseResult.why_relevant}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center space-y-3 font-sans">
                    <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-400/30 text-amber-300 text-lg font-serif">
                      ॐ
                    </div>
                    <p className="text-amber-200 text-sm font-medium tracking-wide">
                      {responseResult.message}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Portal-rendered chat history panel — always mounts on document.body */}
      {typeof document !== 'undefined' && createPortal(historyDrawer, document.body)}

    </div>
  );
}