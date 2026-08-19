import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Send, Sparkles } from 'lucide-react';

export default function AIInputBox({ inputQuery, setInputQuery, handleSendMessage }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check browser support for Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US'; // Change to 'hi-IN' if you want to speak in Hindi

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputQuery(transcript);
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
  }, [setInputQuery]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
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

  return (
    <div className="relative w-full max-w-2xl mx-auto p-4 rounded-3xl bg-[#06040a]/80 border border-amber-500/30 backdrop-blur-md shadow-2xl">
      
      {/* Greeting Prompt Header */}
      <div className="flex items-center justify-between mb-3 px-2 text-xs text-amber-200/80 font-sans">
        <span className="flex items-center gap-1.5">
          <Sparkles size={14} className="text-amber-400" />
          Jai Shri Krishna! Ask me about life, karma, purpose, or any verse.
        </span>
      </div>

      {/* Input Field Container */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={isListening ? "Listening to your problem..." : "Ask Krishna anything..."}
          className={`w-full py-3.5 pl-4 pr-24 rounded-2xl bg-[#130f1e] border text-amber-100 placeholder-amber-200/40 font-sans text-sm outline-none transition-all ${
            isListening 
              ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
              : 'border-amber-500/30 focus:border-amber-400'
          }`}
        />

        {/* Action Buttons inside the Input box */}
        <div className="absolute right-2 flex items-center gap-1.5">
          
          {/* Mic / Stop Toggle Button */}
          <button
            type="button"
            onClick={toggleListening}
            title={isListening ? "Stop Listening" : "Speak your problem"}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
              isListening
                ? 'bg-yellow-500 text-slate-950 border-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            {isListening ? <Square size={16} /> : <Mic size={16} />}
          </button>

          {/* Send / Submit Button */}
          <button
            type="button"
            onClick={handleSendMessage}
            className="p-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 border border-amber-400 hover:scale-105 transition-all cursor-pointer shadow-md flex items-center justify-center"
            title="Ask Krishna"
          >
            <Send size={16} />
          </button>

        </div>
      </div>
    </div>
  );
}