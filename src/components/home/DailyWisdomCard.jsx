// src/components/story/DailyWisdomCard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, ChevronDown, ChevronUp, Share2, Check } from 'lucide-react';
import divineBg from '../../assets/images/divine-bg.png';
import { shlokasData } from '../../data/shlokasData';
import GitaAudioPlayer from '../../components/GitaAudioPlayer';
import SpeechButton from '../../components/SpeechButton';

export default function DailyWisdomCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [randomShloka, setRandomShloka] = useState(null);
  const [selectedLang, setSelectedLang] = useState('english'); // 'english' | 'hindi' | 'gujarati'

  // Pick a random shloka on component mount
  useEffect(() => {
    try {
      const chapterKeys = Object.keys(shlokasData);
      if (chapterKeys.length === 0) return;

      const randomChapterKey = chapterKeys[Math.floor(Math.random() * chapterKeys.length)];
      const verses = shlokasData[randomChapterKey];

      if (verses && verses.length > 0) {
        const verse = verses[Math.floor(Math.random() * verses.length)];
        
        setRandomShloka({
          chapterNum: randomChapterKey,
          shlokaNum: verse.shloka_number,
          chapterLabel: `Chapter ${randomChapterKey}, Verse ${verse.shloka_number}`,
          sanskrit: verse.sanskrit,
          translations: {
            english: verse.translations?.english || "Translation unavailable.",
            hindi: verse.translations?.hindi || verse.translations?.english || "अनुवाद उपलब्ध नहीं है।",
            gujarati: verse.translations?.gujarati || verse.translations?.english || "અનુવાદ ઉપલબ્ધ નથી."
          },
          explanations: {
            english: verse.explanations?.english || verse.real_life_example?.english || "Reflect upon this divine teaching in your daily journey.",
            hindi: verse.explanations?.hindi || verse.real_life_example?.hindi || "अपने दैनिक जीवन में इस दिव्य उपदेश का मनन करें।",
            gujarati: verse.explanations?.gujarati || verse.real_life_example?.gujarati || "તમારા દૈનિક જીવનમાં આ દિવ્ય ઉપદેશનું મનન કરો."
          }
        });
      }
    } catch (err) {
      console.error("Error loading random daily wisdom:", err);
    }
  }, []);

  const wisdom = randomShloka || {
    chapterNum: "2",
    shlokaNum: "47",
    chapterLabel: "Chapter 2, Verse 47",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    translations: {
      english: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
      hindi: "कर्म करने में ही तुम्हारा अधिकार है, उसके फलों में कभी नहीं। अतः तुम कर्म के फल के हेतु मत बनो और तुम्हारी आసక్తి भी अकर्म में न हो।",
      gujarati: "તમને માત્ર કર્મ કરવાનો જ અધિકાર છે, તેના ફળો પર ક્યારેય નહીં. તેથી તમે કર્મફળના હેતુ બનશો નહીં અને અકર્મમાં પણ તમારી આસક્તિ ન હોવી જોઈએ."
    },
    explanations: {
      english: "God Krishna teaches us to focus entirely on our present effort and duty without anxiety over future outcomes.",
      hindi: "भगवान श्रीकृष्ण हमें भविष्य के परिणामों की चिंता किए बिना पूरी तरह से अपने वर्तमान कर्म और कर्तव्य पर ध्यान केंद्रित करना सिखाते हैं.",
      gujarati: "ભગવાન શ્રીકૃષ્ણ આપણને ભવિષ્યના પરિણામોની ચિંતા કર્યા વગર આપણા વર્તમાન કર્મ અને ફરજ પર સંપૂર્ણ ધ્યાન કેન્દ્રિત કરવાનું શીખવે છે."
    }
  };

  // Map selected language to speech synthesis language code
  const getSpeechLanguageCode = () => {
    if (selectedLang === 'hindi') return 'hi-IN';
    if (selectedLang === 'gujarati') return 'gu-IN';
    return 'en-IN';
  };

  const handleShare = async () => {
    const currentTranslation = wisdom.translations[selectedLang] || wisdom.translations.english;
    const currentInsight = wisdom.explanations[selectedLang] || wisdom.explanations.english;

    const shareText = `🙏 Bhagavad Gita (${wisdom.chapterLabel}) 🙏\n\n"${wisdom.sanskrit}"\n\nTranslation (${selectedLang.toUpperCase()}):\n"${currentTranslation}"\n\nInsight:\n${currentInsight}\n\nExplore more on GitaVerse AI ✨`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Divine Wisdom - GitaVerse AI',
          text: shareText,
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') console.log(err);
        else return;
      }
    }

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden my-0 py-20 z-20">
      
      {/* Full-Bleed Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src={divineBg} 
          alt="Divine Chariot Wisdom" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06040a]/90 via-[#06040a]/50 to-[#06040a]/90 pointer-events-none" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none z-10" />

      {/* Centered Content Card */}
      <div className="relative z-20 w-full max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-3xl p-8 md:p-10 bg-[#06040a]/50 border border-amber-500/25 shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-md overflow-hidden group transition-all"
        >
          {/* Header Tag */}
          <div className="flex items-center justify-between mb-6 border-b border-amber-500/20 pb-4">
            <div className="flex items-center gap-2 text-amber-400 font-sans text-xs uppercase tracking-[0.25em] font-bold">
              <Sparkles size={16} className="text-amber-400 animate-pulse" />
              <span>Today's Divine Wisdom</span>
            </div>
            <span className="text-xs font-serif text-amber-200/90 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30">
              {wisdom.chapterLabel}
            </span>
          </div>

          {/* Sanskrit Shloka */}
          <div className="text-center my-6 space-y-2">
            <h3 className="text-amber-100 font-serif text-xl md:text-3xl italic tracking-wide whitespace-pre-line leading-relaxed [text-shadow:_0_0_25px_rgba(245,158,11,0.5)]">
              "{wisdom.sanskrit}"
            </h3>
          </div>

          {/* Action Row: Audio Player, Unveil, Share */}
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <GitaAudioPlayer shlokaId={`${wisdom.chapterNum}_${wisdom.shlokaNum}`} />

            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-sans font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.4)] cursor-pointer transition-all"
            >
              <BookOpen size={16} />
              <span>{isExpanded ? "Close Meaning" : "Unveil Meaning & Insight"}</span>
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </motion.button>

            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer shadow ${
                copied 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.6)]' 
                  : 'bg-[#faebd7] border-[#8c5a3c]/50 text-[#3d2314] hover:bg-[#ecd0a8]'
              }`}
              title={copied ? "Copied to Clipboard!" : "Share Wisdom"}
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            </motion.button>
          </div>

          {/* Expandable Section with 3 Language Selection Buttons */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-8 pt-6 border-t border-amber-500/20 space-y-4 text-left font-sans">
                  
                  {/* LANGUAGE SWITCHER BUTTONS (English, Hindi, Gujarati) */}
                  <div className="flex items-center justify-center gap-2 bg-[#06040a]/40 p-2 rounded-2xl border border-amber-500/25 mb-4">
                    {[
                      { id: 'english', label: 'English' },
                      { id: 'hindi', label: 'Hindi (हिंदी)' },
                      { id: 'gujarati', label: 'Gujarati (ગુજરાતી)' }
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setSelectedLang(lang.id)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-sans font-bold tracking-wide transition-all cursor-pointer ${
                          selectedLang === lang.id
                            ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                            : 'bg-transparent text-amber-200/70 hover:text-amber-100 hover:bg-amber-600/10'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>

                  {/* Translation Box with SpeechButton */}
                  <div className="bg-[#06040a]/60 backdrop-blur-sm p-5 rounded-2xl border border-amber-500/20 shadow-inner">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                        Translation ({selectedLang.toUpperCase()})
                      </h4>
                      <SpeechButton 
                        text={wisdom.translations[selectedLang] || wisdom.translations.english}
                        language={getSpeechLanguageCode()}
                        speechId={`daily-trans-${selectedLang}-${wisdom.shlokaNum}`}
                      />
                    </div>
                    <p className="text-amber-100/90 text-sm md:text-base leading-relaxed font-serif">
                      {wisdom.translations[selectedLang] || wisdom.translations.english}
                    </p>
                  </div>

                  {/* Krishna's Insight Box with SpeechButton */}
                  <div className="bg-[#06040a]/60 backdrop-blur-sm p-5 rounded-2xl border border-amber-500/20 shadow-inner">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                        Krishna's Insight ({selectedLang.toUpperCase()})
                      </h4>
                      <SpeechButton 
                        text={wisdom.explanations[selectedLang] || wisdom.explanations.english}
                        language={getSpeechLanguageCode()}
                        speechId={`daily-exp-${selectedLang}-${wisdom.shlokaNum}`}
                      />
                    </div>
                    <p className="text-amber-200/80 text-xs md:text-sm leading-relaxed font-light">
                      {wisdom.explanations[selectedLang] || wisdom.explanations.english}
                    </p>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

    </section>
  );
}