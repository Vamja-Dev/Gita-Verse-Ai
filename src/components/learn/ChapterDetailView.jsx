import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, AlertCircle, X } from 'lucide-react';
import { shlokasData } from '../../data/shlokasData';
import { chaptersData } from '../../data/chaptersData';
import GitaAudioPlayer, { stopGlobalAudio } from '../../components/GitaAudioPlayer';
import SpeechButton from '../../components/SpeechButton';
import { stopSpeaking } from '../../hooks/speech';

export default function ChapterDetailView({ chapterNumber, onBack, backgroundImages, onNavigate, targetShloka, fromDashboard }) {
    const [searchVerse, setSearchVerse] = useState('');
    const [selectedShloka, setSelectedShloka] = useState(null);
    const [selectedImage, setSelectedImage] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [savedShlokasMap, setSavedShlokasMap] = useState({});

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [chapterNumber]);

    // Stop any playing audio if the user switches chapters or leaves the view
    const handleBackClick = () => {
        stopGlobalAudio();
        stopSpeaking();
        onBack();
    };

    // Helper to close modal, stop audio, and return directly to the dashboard
    const handleCloseModal = () => {
        stopGlobalAudio();
        stopSpeaking();
        setSelectedShloka(null);

        const openedFromDashboard = localStorage.getItem('gitaverse_opened_from_dashboard');
        if (openedFromDashboard === 'true') {
            localStorage.removeItem('gitaverse_opened_from_dashboard');
            if (onNavigate) {
                onNavigate('dashboard');
            }
        }
    };

    // Load user-specific saved shlokas state on mount or change
    const userEmail = localStorage.getItem('gitaverse_user_email');
    const userName = localStorage.getItem('gitaverse_user_name');
    const isLoggedIn = userEmail && userEmail !== 'N/A' && userName && userName !== 'Seeker';

    const verses = shlokasData[chapterNumber] || [];

    // Open target shloka modal ONLY when arriving from dashboard with a targetShloka
    useEffect(() => {
        if (targetShloka && verses.length > 0) {
            const foundVerse = verses.find(v => Number(v.shloka_number) === Number(targetShloka));
            if (foundVerse) {
                setSelectedShloka(foundVerse);
            }
        }
    }, [chapterNumber, targetShloka]);

    useEffect(() => {
        if (isLoggedIn) {
            const storageKey = `gitaverse_saved_shlokas_${userEmail}`;
            const savedList = JSON.parse(localStorage.getItem(storageKey)) || [];
            const map = {};
            savedList.forEach(item => {
                map[item.id] = true;
            });
            setSavedShlokasMap(map);
        } else {
            setSavedShlokasMap({});
        }
    }, [userEmail, isLoggedIn]);

    // Cleanup speech when component unmounts
    useEffect(() => {
        return () => {
            stopSpeaking();
        };
    }, []);

    const chapterInfo = chaptersData.find(c => (c.number || c.chapter_number) === chapterNumber) || {
        englishName: `Chapter ${chapterNumber}`,
        sanskritName: ''
    };

    const filteredVerses = verses.filter(v => {
        const term = searchVerse.toLowerCase().trim();
        if (!term) return true;
        return (
            String(v.shloka_number) === term ||
            v.sanskrit.toLowerCase().includes(term) ||
            v.translations.english.toLowerCase().includes(term)
        );
    });

    // Handle saving / un-saving a shloka
    const handleToggleSaveShloka = (shloka, e) => {
        if (e) e.stopPropagation();

        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        const storageKey = `gitaverse_saved_shlokas_${userEmail}`;
        let savedList = JSON.parse(localStorage.getItem(storageKey)) || [];
        const uniqueId = `ch-${chapterNumber}-vs-${shloka.shloka_number}`;

        const exists = savedList.some(item => item.id === uniqueId);

        if (exists) {
            savedList = savedList.filter(item => item.id !== uniqueId);
            setSavedShlokasMap(prev => ({ ...prev, [uniqueId]: false }));
        } else {
            const newShloka = {
                id: uniqueId,
                chapterId: chapterNumber,
                shlokaId: shloka.shloka_number,
                title: `Chapter ${chapterNumber}, Verse ${shloka.shloka_number}`,
                translation: shloka.translations.english || shloka.sanskrit,
            };
            savedList.push(newShloka);
            setSavedShlokasMap(prev => ({ ...prev, [uniqueId]: true }));
        }

        localStorage.setItem(storageKey, JSON.stringify(savedList));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen w-full text-[#2c1810] font-serif px-4 md:px-16 pt-32 pb-24 overflow-x-hidden flex flex-col items-center"
            style={{
                backgroundColor: '#1a0f08',
                backgroundImage: `radial-gradient(circle at center, rgba(50, 25, 12, 0.85) 0%, rgba(15, 8, 3, 0.98) 100%)`
            }}
        >
            {/* Soft Ambient Chapter Art Glow in Background */}
            <div
                className="absolute inset-0 z-0 opacity-15 bg-cover bg-center filter blur-xl pointer-events-none transition-all duration-700"
                style={{ backgroundImage: `url(${backgroundImages?.[chapterNumber - 1] || ''})` }}
            />

            {/* Top Header Controls */}
            <div className="relative z-20 w-full max-w-5xl flex items-center justify-between mb-8">
                <button
                    onClick={handleBackClick}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2c1810] border border-amber-600/40 text-amber-300 hover:bg-amber-600 hover:text-slate-950 transition-all duration-300 text-sm font-sans font-medium shadow-lg cursor-pointer"
                >
                    ← Back to Chapters
                </button>

                {/* Small Clickable HD Art Box */}
                <div
                    onClick={() => setSelectedImage(true)}
                    className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#2c1810]/90 border border-amber-600/40 backdrop-blur-md shadow-xl cursor-pointer hover:border-amber-400 transition-all group"
                >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-amber-600/50 shadow-inner">
                        <img
                            src={backgroundImages?.[chapterNumber - 1] || ''}
                            alt={`Chapter ${chapterNumber}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-amber-300 font-sans font-semibold hidden sm:inline">
                        Chapter {chapterNumber} Art
                    </span>
                </div>
            </div>

            {/* OPEN BOOK MANUSCRIPT SPREAD CONTAINER */}
            <div
                className="relative z-20 w-full max-w-5xl rounded-2xl p-6 md:p-12 shadow-2xl border-4 border-[#3d2314] mb-20"
                style={{
                    backgroundColor: '#f4e4bc',
                    backgroundImage: `linear-gradient(to right, rgba(244, 228, 188, 0.98), rgba(232, 210, 165, 0.95)), radial-gradient(circle, rgba(180, 140, 90, 0.2) 0%, transparent 80%)`,
                    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), inset 0 0 60px rgba(120, 80, 40, 0.3)'
                }}
            >
                {/* Chapter Title Banner on Parchment with Total Shlokas Count Badge */}
                <div className="relative text-center mb-10 space-y-3 border-b-2 border-[#8c5a3c]/30 pb-6">
                    <div className="absolute top-0 right-0 px-3.5 py-1.5 rounded-xl bg-[#3d2314] border border-amber-500/40 text-amber-200 text-xs font-sans font-bold shadow-md tracking-wider">
                        {chapterInfo.verses_count || verses.length} Shlokas
                    </div>

                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#3d2314] text-amber-200 border border-amber-600/40 font-sans shadow">
                        Chapter {chapterNumber}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-[#2c1810] tracking-wide">
                        {chapterInfo.englishName || chapterInfo.name}
                    </h1>
                    <p className="text-lg text-[#6c4228] font-serif italic">{chapterInfo.sanskritName || chapterInfo.name_meaning}</p>
                </div>

                {/* Shloka Search Bar on Parchment */}
                <div className="max-w-2xl mx-auto mb-10">
                    <input
                        type="text"
                        value={searchVerse}
                        onChange={(e) => setSearchVerse(e.target.value)}
                        placeholder="Search shloka by number (e.g., 1, 2) or keyword..."
                        className="w-full px-5 py-3.5 rounded-xl bg-[#faebd7] border-2 border-[#8c5a3c]/50 text-[#2c1810] placeholder-[#7c5a3c]/70 font-serif text-sm focus:outline-none focus:border-[#5c3a21] shadow-inner"
                    />
                </div>

                {/* Shlokas Displayed as Ancient Manuscript Verses */}
                <div className="grid grid-cols-1 gap-6">
                    {filteredVerses.length > 0 ? (
                        filteredVerses.map((shloka) => {
                            const uniqueId = `ch-${chapterNumber}-vs-${shloka.shloka_number}`;
                            const isSaved = !!savedShlokasMap[uniqueId];

                            return (
                                <motion.div
                                    key={shloka.shloka_number}
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => setSelectedShloka(shloka)}
                                    className="p-6 rounded-xl bg-[#faebd7]/90 border-2 border-[#a67c52] hover:border-[#5c3a21] cursor-pointer shadow-md transition-all flex flex-col gap-3 group relative"
                                >
                                    <div className="flex items-center justify-between text-xs font-sans text-[#7c4a2b]">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold px-3 py-1 rounded bg-[#3d2314] text-amber-200 shadow">
                                                Shloka {shloka.shloka_number}
                                            </span>
                                            <GitaAudioPlayer shlokaId={`${chapterNumber}_${shloka.shloka_number}`} />
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={(e) => handleToggleSaveShloka(shloka, e)}
                                                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-sans font-bold transition-all ${isSaved
                                                    ? 'bg-[#3d2314] text-amber-300 border-amber-500'
                                                    : 'bg-[#faebd7] text-[#5c3a21] border-[#8c5a3c]/40 hover:bg-[#ecd0a8]'
                                                    }`}
                                                title={isSaved ? "Saved in Dashboard" : "Save Shloka"}
                                            >
                                                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-amber-400' : ''}`} />
                                                <span>{isSaved ? 'Saved' : 'Save'}</span>
                                            </button>
                                            <span className="italic group-hover:font-bold text-[#5c3a21] hidden sm:inline">Click to Unroll Scroll 📜</span>
                                        </div>
                                    </div>
                                    <p className="text-lg text-[#2c1810] font-serif text-center py-2 font-bold">
                                        {shloka.sanskrit}
                                    </p>
                                    <p className="text-sm text-[#5c3a21] italic text-center">
                                        "{shloka.translations.english}"
                                    </p>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="text-center py-16 text-[#7c5a3c] text-sm font-sans">
                            No shlokas found for this search or data is pending for this chapter.
                        </div>
                    )}
                </div>
            </div>

            {/* PERFECTLY WIDE-ROLLED SCROLL MODAL ANIMATION */}
            <AnimatePresence>
                {selectedShloka && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            exit={{ scaleY: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                            style={{ transformOrigin: 'center' }}
                            className="relative z-10 w-full max-w-3xl my-auto flex flex-col items-center py-12"
                        >
                            <div className="relative -mb-3 h-14 md:h-16 bg-gradient-to-b from-[#2d1508] via-[#8c5a3c] to-[#1a0c04] border-2 border-[#0a0401] rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.95)] flex justify-between items-center z-30 px-3 w-[calc(100%+5rem)] md:w-[calc(100%+7rem)]">
                                <div className="flex items-center -ml-8 md:-ml-10 pointer-events-none">
                                    <div className="w-4 h-6 bg-[#3d200f] rounded-l border border-black" />
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-[#5c3a21] to-[#8c5a3c] rounded-full border-2 border-black shadow-2xl transform -rotate-12" />
                                </div>
                                <div className="h-3 w-full mx-6 bg-gradient-to-b from-black/70 via-transparent to-white/40 rounded-full" />
                                <div className="flex items-center -mr-8 md:-mr-10 pointer-events-none">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-l from-[#5c3a21] to-[#8c5a3c] rounded-full border-2 border-black shadow-2xl transform rotate-12" />
                                    <div className="w-4 h-6 bg-[#3d200f] rounded-r border border-black" />
                                </div>
                            </div>

                            <div
                                className="relative z-20 w-full px-8 md:px-16 py-10 space-y-6 font-serif shadow-2xl rounded-sm overflow-y-auto scrollbar-none max-h-[75vh]"
                                style={{
                                    backgroundColor: '#f5e5c8',
                                    backgroundImage: `linear-gradient(to bottom, rgba(245, 229, 200, 0.98), rgba(235, 215, 180, 0.98)), radial-gradient(circle, rgba(180, 130, 80, 0.15) 0%, transparent 90%)`,
                                    boxShadow: 'inset 0 0 60px rgba(90, 50, 20, 0.6), 0 25px 50px rgba(0,0,0,0.8)'
                                }}
                            >
                                <button
                                    onClick={handleCloseModal}
                                    className="absolute top-6 right-6 z-50 w-9 h-9 rounded-full bg-[#3d2314] text-amber-200 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all font-sans font-bold shadow-md cursor-pointer"
                                >
                                    ✕
                                </button>

                                <div className="flex items-center justify-between border-b-2 border-[#5c3a21]/30 pb-4 pt-2">
                                    <div>
                                        <span className="text-xs uppercase tracking-widest text-[#7c4a2b] font-sans font-bold">
                                            Chapter {chapterNumber} • {chapterInfo.englishName}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-bold text-[#3d2314] mt-1">
                                            Shloka {selectedShloka.shloka_number}
                                        </h3>
                                    </div>

                                    <div className="flex flex-col items-end gap-2 pr-12 md:pr-0">
                                        <button
                                            onClick={(e) => handleToggleSaveShloka(selectedShloka, e)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-sans font-bold transition-all shadow cursor-pointer ${savedShlokasMap[`ch-${chapterNumber}-vs-${selectedShloka.shloka_number}`]
                                                ? 'bg-[#3d2314] text-amber-300 border-amber-500'
                                                : 'bg-[#faebd7] text-[#5c3a21] border-[#8c5a3c]/50 hover:bg-[#ecd0a8]'
                                                }`}
                                        >
                                            <Bookmark className={`w-4 h-4 ${savedShlokasMap[`ch-${chapterNumber}-vs-${selectedShloka.shloka_number}`] ? 'fill-current text-amber-400' : ''}`} />
                                            <span>{savedShlokasMap[`ch-${chapterNumber}-vs-${selectedShloka.shloka_number}`] ? 'Saved' : 'Save Shloka'}</span>
                                        </button>

                                        <div className="flex justify-end">
                                            <GitaAudioPlayer shlokaId={`${chapterNumber}_${selectedShloka.shloka_number}`} />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center space-y-2 bg-[#ecd0a8]/60 p-5 rounded-xl border border-[#8c5a3c]/40 shadow-inner">
                                    <p className="text-xl md:text-2xl font-bold text-[#2c1810]">{selectedShloka.sanskrit}</p>
                                    <p className="text-xs text-[#6c4228] font-sans italic">{selectedShloka.transliteration}</p>
                                </div>

                                {/* TRANSLATIONS SECTION */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-sans font-bold text-[#7c4a2b] uppercase tracking-wider">Translations</h4>
                                    <div className="grid grid-cols-1 gap-3 text-sm">
                                        <div className="p-3.5 rounded-lg bg-[#ecd0a8]/40 border border-[#8c5a3c]/30">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-[#7c4a2b] font-sans font-bold">English</span>
                                                <SpeechButton 
                                                    text={selectedShloka.translations.english} 
                                                    language="en-IN" 
                                                    speechId={`trans-en-${selectedShloka.shloka_number}`} 
                                                />
                                            </div>
                                            <p className="text-[#3d2314]">{selectedShloka.translations.english}</p>
                                        </div>
                                        <div className="p-3.5 rounded-lg bg-[#ecd0a8]/40 border border-[#8c5a3c]/30">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-[#7c4a2b] font-sans font-bold">Hindi</span>
                                                <SpeechButton 
                                                    text={selectedShloka.translations.hindi} 
                                                    language="hi-IN" 
                                                    speechId={`trans-hi-${selectedShloka.shloka_number}`} 
                                                />
                                            </div>
                                            <p className="text-[#3d2314]">{selectedShloka.translations.hindi}</p>
                                        </div>
                                        <div className="p-3.5 rounded-lg bg-[#ecd0a8]/40 border border-[#8c5a3c]/30">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-[#7c4a2b] font-sans font-bold">Gujarati</span>
                                                <SpeechButton 
                                                    text={selectedShloka.translations.gujarati} 
                                                    language="gu-IN" 
                                                    speechId={`trans-gu-${selectedShloka.shloka_number}`} 
                                                />
                                            </div>
                                            <p className="text-[#3d2314]">{selectedShloka.translations.gujarati}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* EXPLANATIONS SECTION */}
                                <div className="space-y-4 pt-2 pb-2">
                                    <h4 className="text-xs font-sans font-bold text-[#7c4a2b] uppercase tracking-wider">Explanations</h4>
                                    <div className="grid grid-cols-1 gap-3 text-sm">
                                        <div className="p-4 rounded-lg bg-[#e3bc8e]/50 border border-[#8c5a3c]/40 space-y-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-[#7c4a2b] font-sans font-bold">English Explanation</span>
                                                <SpeechButton 
                                                    text={selectedShloka.explanations?.english} 
                                                    language="en-IN" 
                                                    speechId={`exp-en-${selectedShloka.shloka_number}`} 
                                                />
                                            </div>
                                            <p className="text-[#2c1810] text-sm leading-relaxed">{selectedShloka.explanations?.english}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-[#e3bc8e]/50 border border-[#8c5a3c]/40 space-y-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-[#7c4a2b] font-sans font-bold">Hindi Explanation (विस्तृत व्याख्या)</span>
                                                <SpeechButton 
                                                    text={selectedShloka.explanations?.hindi} 
                                                    language="hi-IN" 
                                                    speechId={`exp-hi-${selectedShloka.shloka_number}`} 
                                                />
                                            </div>
                                            <p className="text-[#2c1810] text-sm leading-relaxed">{selectedShloka.explanations?.hindi}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-[#e3bc8e]/50 border border-[#8c5a3c]/40 space-y-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-[#7c4a2b] font-sans font-bold">Gujarati Explanation</span>
                                                <SpeechButton 
                                                    text={selectedShloka.explanations?.gujarati} 
                                                    language="gu-IN" 
                                                    speechId={`exp-gu-${selectedShloka.shloka_number}`} 
                                                />
                                            </div>
                                            <p className="text-[#2c1810] text-sm leading-relaxed">{selectedShloka.explanations?.gujarati}</p>
                                        </div>
                                    </div>

                                    {/* REAL-LIFE EXAMPLES SECTION */}
                                    <h4 className="text-xs font-sans font-bold text-[#7c4a2b] uppercase tracking-wider pt-2">💡 Real-Life Application / Example</h4>
                                    <div className="grid grid-cols-1 gap-3 text-sm">
                                        <div className="p-4 rounded-lg bg-[#ecd0a8]/60 border border-[#8c5a3c]/40 space-y-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-[#7c4a2b] font-sans font-bold">English Example</span>
                                                <SpeechButton 
                                                    text={selectedShloka.real_life_example?.english} 
                                                    language="en-IN" 
                                                    speechId={`exl-en-${selectedShloka.shloka_number}`} 
                                                />
                                            </div>
                                            <p className="text-[#2c1810] text-sm leading-relaxed">{selectedShloka.real_life_example?.english}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-[#ecd0a8]/60 border border-[#8c5a3c]/40 space-y-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-[#7c4a2b] font-sans font-bold">Hindi Example</span>
                                                <SpeechButton 
                                                    text={selectedShloka.real_life_example?.hindi} 
                                                    language="hi-IN" 
                                                    speechId={`exl-hi-${selectedShloka.shloka_number}`} 
                                                />
                                            </div>
                                            <p className="text-[#2c1810] text-sm leading-relaxed">{selectedShloka.real_life_example?.hindi}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-[#ecd0a8]/60 border border-[#8c5a3c]/40 space-y-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-[#7c4a2b] font-sans font-bold">Gujarati Example</span>
                                                <SpeechButton 
                                                    text={selectedShloka.real_life_example?.gujarati} 
                                                    language="gu-IN" 
                                                    speechId={`exl-gu-${selectedShloka.shloka_number}`} 
                                                />
                                            </div>
                                            <p className="text-[#2c1810] text-sm leading-relaxed">{selectedShloka.real_life_example?.gujarati}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative -mt-3 h-14 md:h-16 bg-gradient-to-t from-[#2d1508] via-[#8c5a3c] to-[#1a0c04] border-2 border-[#0a0401] rounded-full shadow-[0_-15px_30px_rgba(0,0,0,0.95)] flex justify-between items-center z-30 px-2 w-[calc(100%+5rem)] md:w-[calc(100%+7rem)]">
                                <div className="flex items-center -ml-8 md:-ml-10 pointer-events-none">
                                    <div className="w-4 h-6 bg-[#3d200f] rounded-l border border-black" />
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-[#5c3a21] to-[#8c5a3c] rounded-full border-2 border-black shadow-2xl transform rotate-12" />
                                </div>
                                <div className="h-3 w-full mx-6 bg-gradient-to-t from-black/70 via-transparent to-white/40 rounded-full" />
                                <div className="flex items-center -mr-8 md:-mr-10 pointer-events-none">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-l from-[#5c3a21] to-[#8c5a3c] rounded-full border-2 border-black shadow-2xl transform -rotate-12" />
                                    <div className="w-4 h-6 bg-[#3d200f] rounded-r border border-black" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- AUTHENTICATION REQUIRED POP-UP MODAL --- */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-[#120a1d] border border-amber-500/40 rounded-3xl p-8 max-w-md w-full shadow-2xl relative space-y-6 text-center">
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="absolute top-6 right-6 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                            <AlertCircle className="w-8 h-8" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-2xl font-serif text-amber-100">Authentication Required</h3>
                            <p className="text-xs font-sans text-slate-300">
                                You must first log in to your account to save shlokas to your personal dashboard sanctuary.
                            </p>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setShowLoginModal(false)}
                                className="flex-1 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-sans font-bold hover:bg-slate-700 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowLoginModal(false);
                                    if (onNavigate) onNavigate('login');
                                }}
                                className="flex-1 py-3 rounded-xl bg-amber-600 border border-amber-500 text-slate-950 text-xs font-sans font-bold hover:bg-amber-500 transition-colors cursor-pointer shadow-lg"
                            >
                                Go to Login
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* FULLSCREEN PREVIEW IMAGE MODAL */}
            <AnimatePresence>
                {selectedImage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(false)}
                            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative z-10 max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden border border-amber-600/40 bg-slate-900 shadow-2xl p-2"
                        >
                            <button
                                onClick={() => setSelectedImage(false)}
                                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 text-amber-300 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all font-sans font-bold shadow-lg cursor-pointer"
                            >
                                ✕
                            </button>
                            <img
                                src={backgroundImages?.[chapterNumber - 1] || ''}
                                alt={`Chapter ${chapterNumber} Full View`}
                                className="w-full h-auto max-h-[82vh] object-contain rounded-2xl"
                            />
                            <div className="text-center py-3 text-sm font-sans font-semibold text-amber-300 uppercase tracking-wider">
                                Chapter {chapterNumber} • {chapterInfo.englishName}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}