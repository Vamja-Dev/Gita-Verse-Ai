import React, { useState, useEffect } from 'react';
import { Bookmark, Trash2, ExternalLink } from 'lucide-react';
import Background from '../components/Background';

export default function UserDashboard({ onNavigate }) {
  const [savedShlokas, setSavedShlokas] = useState([]);
  const userName = localStorage.getItem('gitaverse_user_name') || 'Seeker of Wisdom';
  const userEmail = localStorage.getItem('gitaverse_user_email') || 'guest';

  // Load user-specific saved shlokas on mount
  useEffect(() => {
    if (userEmail && userEmail !== 'guest') {
      const storageKey = `gitaverse_saved_shlokas_${userEmail}`;
      const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
      setSavedShlokas(saved);
    }
  }, [userEmail]);

  // Handle removing a bookmark
  const handleRemoveBookmark = (shlokaId) => {
    const storageKey = `gitaverse_saved_shlokas_${userEmail}`;
    const updated = savedShlokas.filter(item => item.id !== shlokaId);
    setSavedShlokas(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  // Navigate directly to the specific shloka detail view
  const handleNavigateToShloka = (chapterId, shlokaNumber) => {
    if (onNavigate) {
      localStorage.setItem('gitaverse_opened_from_dashboard', 'true');
      onNavigate('shloka-detail-direct', {
        chapterNumber: Number(chapterId),
        shlokaNumber: Number(shlokaNumber)
      });
    }
  };

  return (
    <main className="relative w-full min-h-screen text-slate-100 font-serif overflow-x-hidden bg-[#06040a]">
      <Background />

      <div className="relative z-20 pt-28 pb-24 px-6 md:px-16 max-w-5xl mx-auto space-y-10">

        {/* Profile Card Header */}
        <div className="bg-[#0d0914]/90 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-8 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 text-3xl font-serif">
              ॐ
            </div>
            <div>
              <h1 className="text-2xl font-serif text-amber-100">{userName}</h1>
              <span className="text-xs font-sans text-amber-400 uppercase tracking-widest">Saved Sanctuary • {savedShlokas.length} Shlokas Bookmarked</span>
            </div>
          </div>
        </div>

        {/* Saved Shlokas Section */}
        <div className="bg-[#0d0914]/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
            <div className="flex items-center gap-3">
              <Bookmark className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-serif text-amber-200">Your Saved Shlokas</h2>
            </div>
            <span className="text-xs font-sans text-amber-400/70">{savedShlokas.length} Items</span>
          </div>

          {savedShlokas.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-amber-200/50 font-serif text-lg">No shlokas bookmarked yet.</p>
              <p className="text-xs font-sans text-slate-400">Explore chapters and click the save button on any verse to add it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {savedShlokas.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#160f22]/80 border border-amber-500/20 hover:border-amber-500/50 transition-all rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group shadow-lg"
                >
                  <div className="space-y-1 cursor-pointer flex-1" onClick={() => handleNavigateToShloka(item.chapterId, item.shlokaId)}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-sans font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                        Chapter {item.chapterId} • Verse {item.shlokaId}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif text-amber-100 group-hover:text-amber-300 transition-colors mt-2">
                      {item.title || `Bhagavad Gita Chapter ${item.chapterId}, Verse ${item.shlokaId}`}
                    </h3>
                    <p className="text-xs font-sans text-slate-300 line-clamp-2 italic">
                      "{item.translation || item.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    <button
                      onClick={() => handleNavigateToShloka(item.chapterId, item.shlokaId)}
                      className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-sans"
                      title="Go to Verse"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="hidden sm:inline">View</span>
                    </button>
                    <button
                      onClick={() => handleRemoveBookmark(item.id)}
                      className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 transition-colors cursor-pointer"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}