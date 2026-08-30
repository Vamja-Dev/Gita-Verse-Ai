// src/pages/admin/MapEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function MapEditor({ mapId, onNavigate }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    spiritualSignificance: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/admin/cms/map`)
      .then(res => {
        const found = (res.data.data || []).find(m => m._id === mapId || m.id === Number(mapId));
        if (found) {
          setFormData({
            title: found.title || found.name || '',
            subtitle: found.subtitle || found.theme || '',
            description: found.description || found.summary || '',
            spiritualSignificance: found.spiritualSignificance || ''
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load map details:", err);
        setLoading(false);
      });
  }, [mapId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        name: formData.title,
        summary: formData.description,
        theme: formData.subtitle
      };
      await axios.put(`http://localhost:8000/api/admin/cms/map/${mapId}`, payload);
      alert("Map section updated successfully! Live website & audit log updated.");
      onNavigate('admin/map');
    } catch (err) {
      alert("Failed to update map section.");
    }
  };

  if (loading) return <div className="p-8 text-white">Loading map editor...</div>;

  return (
    <div className="p-8 text-white max-w-4xl mx-auto relative min-h-screen">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-amber-500 tracking-wider">EDIT MAP LANDMARK</h1>
        <button 
          onClick={() => onNavigate('admin/map')} 
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold text-sm transition cursor-pointer"
        >
          ← Back to List
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-lg space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Section Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Subtitle / Tag</label>
          <input 
            type="text" 
            name="subtitle" 
            value={formData.subtitle} 
            onChange={handleChange} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500 uppercase"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Description / Details</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows="5"
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