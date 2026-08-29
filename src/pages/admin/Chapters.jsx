// src/pages/admin/Chapters.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Chapters({ onNavigate }) {
  const [chapters, setChapters] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchChapters = () => {
    axios.get('http://localhost:8000/api/chapters')
      .then(res => {
        setChapters(res.data.chapters || res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load chapters:", err);
        setError("Failed to load chapters from MongoDB.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  const handleDelete = (chapterNumber) => {
    if (window.confirm(`Are you sure you want to delete Chapter ${chapterNumber}?`)) {
      axios.delete(`http://localhost:8000/api/admin/chapters/${chapterNumber}`)
        .then(() => {
          alert("Chapter deleted successfully.");
          fetchChapters();
        })
        .catch(err => {
          alert(err.response?.data?.detail || "Failed to delete chapter.");
        });
    }
  };

  const filteredChapters = chapters.filter(ch => 
    ch.chapter_name?.toLowerCase().includes(search.toLowerCase()) ||
    ch.chapter_number?.toString().includes(search)
  );

  if (loading) return <div className="p-6 text-white">Loading chapters...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CHAPTER MANAGEMENT</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate('admin')} 
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold text-sm transition"
          >
            ← Dashboard
          </button>
          <button 
            onClick={() => onNavigate('admin/chapter-editor')} 
            className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded font-semibold text-sm transition"
          >
            + ADD CHAPTER
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-900 text-red-200 rounded">{error}</div>}

      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search chapter by name or number..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.map((ch) => (
          <div key={ch.chapter_number} className="bg-gray-900 border border-gray-800 p-5 rounded-lg shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-amber-400 font-semibold text-lg">Chapter {ch.chapter_number}</span>
                <span className="text-xs bg-gray-800 px-2.5 py-1 rounded text-gray-300">
                  {ch.shloka_count || 0} Shlokas
                </span>
              </div>
              <h4 className="text-xl font-bold mt-2">{ch.chapter_name}</h4>
              <p className="text-gray-400 text-sm italic mt-1">{ch.sanskrit_name}</p>
              <p className="text-gray-300 text-sm mt-3 line-clamp-3">{ch.description}</p>
            </div>
            <div className="mt-5 flex justify-end gap-2 border-t border-gray-800 pt-3">
              <button 
                onClick={() => onNavigate('admin/chapter-editor')}
                className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1.5 rounded font-medium transition"
              >
                EDIT
              </button>
              <button 
                onClick={() => handleDelete(ch.chapter_number)}
                className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1.5 rounded font-medium transition"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}