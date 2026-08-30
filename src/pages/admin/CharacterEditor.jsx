// src/pages/admin/CharacterEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function CharacterEditor({ characterId, onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    sanskritName: '',
    faction: '',
    description: '',
    keyTeaching: '',
    gitaConnection: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/admin/cms/characters`)
      .then(res => {
        const found = (res.data.data || []).find(c => c._id === characterId || c.id === characterId);
        if (found) {
          setFormData({
            name: found.name || found.title || '',
            title: found.title || found.name || '',
            sanskritName: found.sanskritName || '',
            faction: found.faction || '',
            description: found.description || found.summary || '',
            keyTeaching: found.keyTeaching || '',
            gitaConnection: found.gitaConnection || ''
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load character details:", err);
        setLoading(false);
      });
  }, [characterId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        summary: formData.description,
        theme: formData.title
      };
      await axios.put(`http://localhost:8000/api/admin/cms/characters/${characterId}`, payload);
      alert("Character updated successfully! Live website & audit log updated.");
      onNavigate('admin/characters');
    } catch (err) {
      alert("Failed to update character.");
    }
  };

  if (loading) return <div className="p-8 text-white">Loading character editor...</div>;

  return (
    <div className="p-8 text-white max-w-4xl mx-auto relative min-h-screen">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-amber-500 tracking-wider">EDIT CHARACTER</h1>
        <button 
          onClick={() => onNavigate('admin/characters')} 
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold text-sm transition cursor-pointer"
        >
          ← Back to List
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-lg space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Character Name</label>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Title / Subtitle</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Faction (DIVINE / PANDAVA / KAURAVA)</label>
            <input 
              type="text" 
              name="faction" 
              value={formData.faction} 
              onChange={handleChange} 
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500 uppercase"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Description / Summary</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows="4"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Key Teaching</label>
          <input 
            type="text" 
            name="keyTeaching" 
            value={formData.keyTeaching} 
            onChange={handleChange} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Gita Connection</label>
          <textarea 
            name="gitaConnection" 
            value={formData.gitaConnection} 
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