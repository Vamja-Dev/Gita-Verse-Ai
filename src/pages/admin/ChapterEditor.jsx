// src/pages/admin/ChapterEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function ChapterEditor({ chapterNumber, onNavigate }) {
  const [chapter, setChapter] = useState({
    chapter_number: chapterNumber || 1,
    chapter_name: '',
    sanskrit_name: '',
    description: '',
    chapter_image: '',
    shloka_count: 0
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (chapterNumber) {
      setLoading(true);
      axios.get(`http://localhost:8000/api/chapters/`)
        .then(res => {
          const list = res.data.chapters || res.data;
          const found = list.find(ch => Number(ch.chapter_number) === Number(chapterNumber));
          if (found) {
            setChapter({
              chapter_number: found.chapter_number,
              chapter_name: found.name || found.chapter_name || '',
              sanskrit_name: found.slug || found.sanskrit_name || '',
              description: found.meaning?.en || found.summary || found.description || '',
              chapter_image: found.chapter_image || '',
              shloka_count: found.shloka_count || found.verses_count || found.total_verses || 0
            });
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load chapter for editing:", err);
          setLoading(false);
        });
    }
  }, [chapterNumber]);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      chapter_number: Number(chapter.chapter_number),
      name: chapter.chapter_name,
      slug: chapter.sanskrit_name,
      description: chapter.description,
      shloka_count: Number(chapter.shloka_count)
    };

    const request = chapterNumber 
      ? axios.put(`http://localhost:8000/api/chapters/${chapterNumber}`, payload)
      : axios.post(`http://localhost:8000/api/chapters/`, payload);

    request
      .then(() => {
        alert("Chapter saved successfully!");
        setSaving(false);
        onNavigate('admin/chapters');
      })
      .catch(err => {
        console.error("Save error details:", err.response?.data);
        alert(err.response?.data?.detail || "Failed to save chapter.");
        setSaving(false);
      });
  };

  if (loading) return <div className="p-8 text-white">Loading chapter details...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-white relative min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-amber-500">
          {chapterNumber ? `Edit Chapter ${chapterNumber}` : 'Add New Chapter'}
        </h1>
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate('admin')} 
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm font-medium transition cursor-pointer"
          >
            ← Dashboard
          </button>
          <button 
            onClick={() => onNavigate('admin/chapters')} 
            className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm font-medium border border-gray-700 transition cursor-pointer"
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
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Chapter Name</label>
          <input 
            type="text" 
            value={chapter.chapter_name} 
            onChange={(e) => setChapter({...chapter, chapter_name: e.target.value})}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
            placeholder="e.g. Arjuna Vishada Yoga"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Sanskrit Name</label>
          <input 
            type="text" 
            value={chapter.sanskrit_name} 
            onChange={(e) => setChapter({...chapter, sanskrit_name: e.target.value})}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
            placeholder="e.g. arjuna-vishada-yoga"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Shloka Count</label>
          <input 
            type="number" 
            value={chapter.shloka_count} 
            onChange={(e) => setChapter({...chapter, shloka_count: Number(e.target.value)})}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
            required
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
          className="w-full bg-amber-600 hover:bg-amber-700 py-3 rounded font-bold transition cursor-pointer"
        >
          {saving ? 'SAVING...' : 'SAVE CHAPTER'}
        </button>
      </form>

      <ScrollToTopButton />
    </div>
  );
}