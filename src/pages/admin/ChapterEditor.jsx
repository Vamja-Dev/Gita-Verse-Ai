// src/pages/admin/ChapterEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChapterEditor({ chapterNumber, onNavigate }) {
  const [chapter, setChapter] = useState({
    chapter_number: 1,
    chapter_name: '',
    sanskrit_name: '',
    description: '',
    chapter_image: '',
    shloka_count: 0
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (chapterNumber) {
      axios.get(`http://localhost:8000/api/chapters`)
        .then(res => {
          const list = res.data.chapters || res.data;
          const found = list.find(ch => ch.chapter_number === Number(chapterNumber));
          if (found) setChapter(found);
        })
        .catch(err => console.error("Failed to load chapter for editing:", err));
    }
  }, [chapterNumber]);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    
    const request = chapterNumber 
      ? axios.put(`http://localhost:8000/api/admin/chapters/${chapter.chapter_number}`, chapter)
      : axios.post(`http://localhost:8000/api/admin/chapters`, chapter);

    request
      .then(() => {
        alert("Chapter saved successfully!");
        setSaving(false);
        onNavigate('admin/chapters');
      })
      .catch(err => {
        alert(err.response?.data?.detail || "Failed to save chapter.");
        setSaving(false);
      });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{chapterNumber ? `Edit Chapter ${chapterNumber}` : 'Add New Chapter'}</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate('admin')} 
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm font-medium transition"
          >
            ← Dashboard
          </button>
          <button 
            onClick={() => onNavigate('admin/chapters')} 
            className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm font-medium border border-gray-700 transition"
          >
            Chapter List
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4 shadow-lg">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Chapter Number</label>
          <input 
            type="number" 
            value={chapter.chapter_number} 
            onChange={(e) => setChapter({...chapter, chapter_number: Number(e.target.value)})}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
            min="1" max="18"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Chapter Name</label>
          <input 
            type="text" 
            value={chapter.chapter_name} 
            onChange={(e) => setChapter({...chapter, chapter_name: e.target.value})}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
            placeholder="e.g. The Yoga of Arjuna's Dejection"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Sanskrit Name</label>
          <input 
            type="text" 
            value={chapter.sanskrit_name} 
            onChange={(e) => setChapter({...chapter, sanskrit_name: e.target.value})}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
            placeholder="e.g. Arjuna Vishada Yoga"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Shloka Count</label>
          <input 
            type="number" 
            value={chapter.shloka_count} 
            onChange={(e) => setChapter({...chapter, shloka_count: Number(e.target.value)})}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Description</label>
          <textarea 
            value={chapter.description} 
            onChange={(e) => setChapter({...chapter, description: e.target.value})}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white h-28 focus:outline-none focus:border-amber-500"
          />
        </div>
        <button 
          type="submit" 
          disabled={saving} 
          className="w-full bg-amber-600 hover:bg-amber-700 py-3 rounded font-bold transition"
        >
          {saving ? 'SAVING...' : 'SAVE CHAPTER'}
        </button>
      </form>
    </div>
  );
}