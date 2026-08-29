// src/pages/admin/Shlokas.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function Shlokas({ onNavigate }) {
  const [shlokas, setShlokas] = useState([]);
  const [chapter, setChapter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchShlokas = () => {
    setLoading(true);
    let url = 'http://localhost:8000/api/admin/shlokas?';
    if (chapter) url += `chapter=${chapter}&`;
    if (search) url += `search=${search}&`;

    axios.get(url)
      .then(res => {
        setShlokas(res.data.shlokas || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch shlokas:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchShlokas();
  }, [chapter]);

  return (
    <div className="p-6 max-w-7xl mx-auto text-white relative min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">SHLOKA MANAGEMENT</h1>
        <button 
          onClick={() => onNavigate('admin')} 
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm font-medium transition"
        >
          ← Dashboard
        </button>
      </div>
      
      <div className="flex gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Search Sanskrit or Transliteration..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
        />
        <select 
          value={chapter} 
          onChange={(e) => setChapter(e.target.value)}
          className="p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
        >
          <option value="">All Chapters</option>
          {[...Array(18)].map((_, i) => (
            <option key={i+1} value={i+1}>Chapter {i+1}</option>
          ))}
        </select>
        <button 
          onClick={fetchShlokas} 
          className="bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded font-semibold transition"
        >
          SEARCH
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading shlokas from MongoDB...</div>
      ) : (
        <div className="space-y-3">
          {shlokas.map((s) => (
            <div key={s._id} className="bg-gray-900 border border-gray-800 p-4 rounded flex justify-between items-center shadow">
              <div>
                <span className="text-amber-400 font-bold">Chapter {s.chapter_number}, Verse {s.shloka_number}</span>
                <p className="text-gray-300 text-sm mt-1 line-clamp-1 font-serif">{s.sanskrit}</p>
              </div>
              <button 
                onClick={() => onNavigate(`admin/shlokas/${s._id}/edit`)}
                className="bg-blue-600 hover:bg-blue-700 text-xs px-4 py-2 rounded font-medium transition"
              >
                EDIT
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Floating Go to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}