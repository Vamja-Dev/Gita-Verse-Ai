// src/pages/admin/HomeEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function HomeEditor({ sectionId, onNavigate }) {
  const [formData, setFormData] = useState({ title: '', description: '', images: [] });
  const [newImg, setNewImg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/cms/home')
      .then(res => {
        const found = (res.data.data || []).find(s => s._id === sectionId || s.id === Number(sectionId));
        if (found) {
          setFormData({
            title: found.title || '',
            description: found.description || '',
            images: found.images || []
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load section details:", err);
        setLoading(false);
      });
  }, [sectionId]);

  const handleAddImage = () => {
    if (!newImg.trim()) return;
    setFormData({ ...formData, images: [...formData.images, newImg.trim()] });
    setNewImg('');
  };

  const handleRemoveImage = (index) => {
    const updated = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updated });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/admin/cms/home/${sectionId}`, formData);
      alert("Home section image pool updated successfully & logged!");
      onNavigate('admin/home');
    } catch (err) {
      alert("Failed to update section.");
    }
  };

  if (loading) return <div className="p-8 text-white">Loading home section editor...</div>;

  return (
    <div className="p-8 text-white max-w-4xl mx-auto relative min-h-screen">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-amber-500 tracking-wider">EDIT HOME SECTION POOL</h1>
        <button onClick={() => onNavigate('admin/home')} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold text-sm transition cursor-pointer">← Back to List</button>
      </div>

      <form onSubmit={handleSave} className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-lg space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Section Title</label>
          <input 
            type="text" 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Section Description</label>
          <textarea 
            rows="3"
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Image Paths (Add artwork filenames like /uploads/artwork-1-1.jpg)</label>
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              placeholder="/uploads/artwork-1-1.jpg" 
              value={newImg} 
              onChange={e => setNewImg(e.target.value)} 
              className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
            />
            <button type="button" onClick={handleAddImage} className="bg-green-600 hover:bg-green-700 px-6 rounded font-bold cursor-pointer transition">Add</button>
          </div>
          <ul className="space-y-2">
            {formData.images.map((img, idx) => (
              <li key={idx} className="flex justify-between items-center bg-gray-800 p-3 rounded border border-gray-700">
                <span className="text-sm text-gray-300">{idx + 1}. {img}</span>
                <button type="button" onClick={() => handleRemoveImage(idx)} className="text-red-400 hover:text-red-300 text-xs font-bold cursor-pointer">Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded font-bold transition cursor-pointer">Save Changes to Live Website</button>
      </form>
      <ScrollToTopButton />
    </div>
  );
}