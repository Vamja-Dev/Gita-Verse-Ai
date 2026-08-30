// src/pages/admin/YugaEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function YugaEditor({ yugaId, onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    sanskritName: '',
    theme: '',
    summary: '',
    spiritualSignificance: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/admin/cms/yugas`)
      .then(res => {
        const found = (res.data.data || []).find(y => y._id === yugaId || y.id === Number(yugaId));
        if (found) {
          setFormData({
            name: found.name || found.title || '',
            sanskritName: found.sanskritName || '',
            theme: found.theme || '',
            summary: found.summary || found.description || '',
            spiritualSignificance: found.spiritualSignificance || ''
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load yuga details:", err);
        setLoading(false);
      });
  }, [yugaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/admin/cms/yugas/${yugaId}`, formData);
      alert("Yuga updated successfully! Live website & audit log updated.");
      onNavigate('admin/yugas');
    } catch (err) {
      alert("Failed to update Yuga.");
    }
  };

  if (loading) return <div className="p-8 text-white">Loading Yuga editor...</div>;

  return (
    <div className="p-8 text-white max-w-4xl mx-auto relative min-h-screen">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-amber-500 tracking-wider">EDIT YUGA</h1>
        <button 
          onClick={() => onNavigate('admin/yugas')} 
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold text-sm transition cursor-pointer"
        >
          ← Back to List
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-lg space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Yuga Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Sanskrit Name</label>
          <input 
            type="text" 
            name="sanskritName" 
            value={formData.sanskritName} 
            onChange={handleChange} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500 font-serif"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Theme / Subtitle</label>
          <input 
            type="text" 
            name="theme" 
            value={formData.theme} 
            onChange={handleChange} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Summary / Description</label>
          <textarea 
            name="summary" 
            value={formData.summary} 
            onChange={handleChange} 
            rows="4"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Spiritual Significance</label>
          <textarea 
            name="spiritualSignificance" 
            value={formData.spiritualSignificance} 
            onChange={handleChange} 
            rows="3"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded font-bold transition cursor-pointer"
        >
          Save Changes to Live Website
        </button>
      </form>
      <ScrollToTopButton />
    </div>
  );
}