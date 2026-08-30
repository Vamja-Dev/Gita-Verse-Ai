// src/pages/admin/TimelineAdmin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function TimelineAdmin({ onNavigate }) {
  const [timeline, setTimeline] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTimeline = () => {
    axios.get('http://localhost:8000/api/admin/cms/timeline')
      .then(res => {
        setTimeline(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch timeline:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  const filteredTimeline = timeline.filter(t => 
    (t.name || t.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.theme || t.subtitle || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 text-white max-w-6xl mx-auto relative min-h-screen">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-bold text-amber-500 tracking-wider">TIMELINE MANAGEMENT</h1>
          <p className="text-sm text-gray-400 mt-1">Select any milestone to edit its live content and details</p>
        </div>
        <button 
          onClick={() => onNavigate('admin')} 
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold text-sm transition cursor-pointer"
        >
          ← Dashboard
        </button>
      </div>

      <div className="mb-8">
        <input 
          type="text" 
          placeholder="SEARCH TIMELINE..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
        />
      </div>

      {loading ? (
        <div className="text-gray-400">Loading Timeline database...</div>
      ) : filteredTimeline.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg text-center text-gray-400">
          No matching timeline milestones found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTimeline.map((t, index) => {
            const timelineId = t._id || t.id;
            return (
              <div key={timelineId} className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg flex justify-between items-center transition hover:border-amber-500/40">
                <div className="space-y-1 pr-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-500 font-bold text-lg">{(t.id || index + 1)}=</span>
                    <h2 className="text-xl font-bold text-amber-400">{t.name || t.title}</h2>
                    {t.sanskritName && <span className="text-base text-gray-400 font-serif">({t.sanskritName})</span>}
                  </div>
                  <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider pl-6">{t.theme || t.subtitle}</p>
                  <p className="text-gray-300 text-sm pl-6 line-clamp-1">{t.summary || t.description}</p>
                </div>

                <button 
                  onClick={() => onNavigate(`admin/timeline/${timelineId}/edit`)} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold transition text-sm cursor-pointer shrink-0 shadow"
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      )}

      <ScrollToTopButton />
    </div>
  );
}