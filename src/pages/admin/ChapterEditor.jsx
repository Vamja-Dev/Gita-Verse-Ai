// src/pages/admin/ChapterEditor.jsx
import React, { useState } from 'react';

export default function ChapterEditor({ onNavigate }) {
  const [chapter, setChapter] = useState({
    chapter_number: 1,
    chapter_name: '',
    sanskrit_name: '',
    description: '',
    shloka_count: 0
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert("Chapter details saved successfully!");
    onNavigate('admin/chapters');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chapter Editor</h1>
        <button onClick={() => onNavigate('admin/chapters')} className="bg-gray-700 px-4 py-2 rounded text-sm">Back</button>
      </div>
      <form onSubmit={handleSave} className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Chapter Number</label>
          <input 
            type="number" 
            value={chapter.chapter_number} 
            onChange={(e) => setChapter({...chapter, chapter_number: Number(e.target.value)})}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Chapter Name</label>
          <input 
            type="text" 
            value={chapter.chapter_name} 
            onChange={(e) => setChapter({...chapter, chapter_name: e.target.value})}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            placeholder="e.g. The Yoga of Arjuna's Dejection"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Sanskrit Name</label>
          <input 
            type="text" 
            value={chapter.sanskrit_name} 
            onChange={(e) => setChapter({...chapter, sanskrit_name: e.target.value})}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            placeholder="e.g. Arjuna Vishada Yoga"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Description</label>
          <textarea 
            value={chapter.description} 
            onChange={(e) => setChapter({...chapter, description: e.target.value})}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white h-24"
          />
        </div>
        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 py-3 rounded font-bold">
          SAVE CHAPTER
        </button>
      </form>
    </div>
  );
}