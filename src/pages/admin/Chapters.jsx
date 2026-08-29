// src/pages/admin/Chapters.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function Chapters({ onNavigate }) {
  const [chapters, setChapters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/chapters/');
      setChapters(response.data);
    } catch (err) {
      console.error('Failed to fetch chapters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (chapterNumber) => {
    if (window.confirm(`Are you sure you want to delete Chapter ${chapterNumber}?`)) {
      try {
        await axios.delete(`http://localhost:8000/api/chapters/${chapterNumber}`);
        fetchChapters();
      } catch (err) {
        console.error('Failed to delete chapter:', err);
        alert('Error deleting chapter.');
      }
    }
  };

  const filteredChapters = chapters.filter(chap => 
    chap.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chap.chapter_number?.toString().includes(searchQuery)
  );

  return (
    <div className="p-8 text-white min-h-screen relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-amber-500">CHAPTER MANAGEMENT</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => onNavigate('admin')} 
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-bold transition"
          >
            ← Dashboard
          </button>
          <button 
            onClick={() => onNavigate('admin/chapter-editor')} 
            className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded font-bold transition"
          >
            + Add Chapter
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="SEARCH CHAPTER BY NAME OR NUMBER..." 
          className="w-full p-3 bg-gray-900 border border-gray-800 rounded text-white"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-10">Loading chapters from database...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChapters.map((chap) => {
            const shlokaCount = chap.shloka_count || chap.verses_count || chap.total_verses || chap.versesCount || 0;
            const description = chap.meaning?.en || chap.summary || chap.description || '';

            return (
              <div key={chap.chapter_number} className="bg-gray-900 border border-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                      Chapter {chap.chapter_number}
                    </span>
                    <span className="bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded">
                      {shlokaCount} Shlokas
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-amber-400 mb-3 leading-snug">
                    {chap.name}
                  </h3>
                  {description && (
                    <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                      {description}
                    </p>
                  )}
                </div>
                <div className="flex justify-end space-x-2 pt-4 border-t border-gray-800">
                  <button 
                    onClick={() => onNavigate(`admin/chapters/${chap.chapter_number}/edit`)} 
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm font-bold transition"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(chap.chapter_number)} 
                    className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm font-bold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Go to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}