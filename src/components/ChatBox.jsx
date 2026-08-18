import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaMicrophone, FaSpinner, FaChevronRight, FaChevronDown } from 'react-icons/fa';

export default function ChatBox({ onSend }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseResult, setResponseResult] = useState(null);

  // Collapsible dropdown states for translations & explanations
  const [showTransEnglish, setShowTransEnglish] = useState(false);
  const [showTransHindi, setShowTransHindi] = useState(false);
  const [showTransGujarati, setShowTransGujarati] = useState(false);
  
  const [showExpEnglish, setShowExpEnglish] = useState(false);
  const [showExpHindi, setShowExpHindi] = useState(false);
  const [showExpGujarati, setShowExpGujarati] = useState(false);

  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userQuery = input.trim();
    if (!userQuery || isLoading) return;

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
      if (data.success && onSend) {
        onSend(data);
      }
    } catch (err) {
      console.error("Backend connection error:", err);
      setResponseResult({ 
        success: false, 
        message: "Could not connect to the spiritual backend server. Please make sure FastAPI (py backend/main.py) is running." 
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

  return (
    <div className="w-full relative flex flex-col items-center">
      {/* 
        STATIONARY CHATBOX CONTAINER:
        Kept in its exact layout position with zero vertical layout shifting.
      */}
      <div className="w-full flex justify-center z-30">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[430px] glass-panel rounded-2xl p-5 relative shadow-2xl border border-amber-500/20 bg-[#120a05]/85 backdrop-blur-md"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="relative pl-2">
              <span className="text-amber-400/25 text-3xl font-serif absolute -top-2 left-0 select-none">“</span>
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
              placeholder={isLoading ? "Seeking guidance from the Gita..." : "Ask Krishna anything..."}
              disabled={isLoading}
              className="w-full bg-slate-950/20 border border-amber-500/30 rounded-xl py-3 px-4 pr-20 text-xs text-amber-100 placeholder-amber-200/40 focus:outline-none focus:border-amber-400/80 transition-all backdrop-blur-sm resize-none overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-h-[42px] max-h-[140px]"
            />

            <div className="absolute right-2.5 flex items-center space-x-1.5">
              <button
                type="button"
                className="p-1 text-amber-200/50 hover:text-amber-400 transition-colors"
                title="Voice Input"
              >
                <FaMicrophone className="w-3.5 h-3.5" />
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-full hover:scale-105 transition-transform shadow-md disabled:opacity-50 flex items-center justify-center w-8 h-8 flex-shrink-0"
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

      {/* --- ABSOLUTE RESPONSE CONTAINER --- 
          Positioned below the chat box using absolute coordinates so the chat box container 
          never moves up, down, or changes state when the response pops in.
      */}
      <div className="absolute top-[170px] left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 pb-24 z-20 pointer-events-none">
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
                        {/* English Translation */}
                        <div className="border border-amber-500/20 rounded-xl overflow-hidden bg-black/30">
                          <button 
                            onClick={() => setShowTransEnglish(!showTransEnglish)}
                            className="w-full flex items-center justify-between p-3 text-left text-amber-200 hover:bg-amber-500/10 font-semibold font-sans text-xs transition-colors"
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

                        {/* Hindi Translation */}
                        <div className="border border-amber-500/20 rounded-xl overflow-hidden bg-black/30">
                          <button 
                            onClick={() => setShowTransHindi(!showTransHindi)}
                            className="w-full flex items-center justify-between p-3 text-left text-amber-200 hover:bg-amber-500/10 font-semibold font-sans text-xs transition-colors"
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

                        {/* Gujarati Translation */}
                        <div className="border border-amber-500/20 rounded-xl overflow-hidden bg-black/30">
                          <button 
                            onClick={() => setShowTransGujarati(!showTransGujarati)}
                            className="w-full flex items-center justify-between p-3 text-left text-amber-200 hover:bg-amber-500/10 font-semibold font-sans text-xs transition-colors"
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
                        {/* English Explanation */}
                        <div className="border border-amber-500/20 rounded-xl overflow-hidden bg-black/30">
                          <button 
                            onClick={() => setShowExpEnglish(!showExpEnglish)}
                            className="w-full flex items-center justify-between p-3 text-left text-amber-200 hover:bg-amber-500/10 font-semibold font-sans text-xs transition-colors"
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

                        {/* Hindi Explanation */}
                        <div className="border border-amber-500/20 rounded-xl overflow-hidden bg-black/30">
                          <button 
                            onClick={() => setShowExpHindi(!showExpHindi)}
                            className="w-full flex items-center justify-between p-3 text-left text-amber-200 hover:bg-amber-500/10 font-semibold font-sans text-xs transition-colors"
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

                        {/* Gujarati Explanation */}
                        <div className="border border-amber-500/20 rounded-xl overflow-hidden bg-black/30">
                          <button 
                            onClick={() => setShowExpGujarati(!showExpGujarati)}
                            className="w-full flex items-center justify-between p-3 text-left text-amber-200 hover:bg-amber-500/10 font-semibold font-sans text-xs transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              {showExpGujarati ? <FaChevronDown className="w-3 h-3 text-amber-400" /> : <FaChevronRight className="w-3 h-3 text-amber-400" />}
                              Gujarati Explanation (ગુજરાતી સ્પष्टीકરણ)
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
    </div>
  );
}