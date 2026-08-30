// src/pages/admin/CmsManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function CmsManager({ sectionTitle, sectionKey, onNavigate }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const fetchItems = () => {
    axios.get(`http://localhost:8000/api/admin/cms/${sectionKey}`)
      .then(res => {
        setItems(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch CMS items:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, [sectionKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';

    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', title);
        formData.append('category', sectionTitle);
        const uploadRes = await axios.post('http://localhost:8000/api/admin/media', formData);
        imageUrl = uploadRes.data.url;
      }

      await axios.post(`http://localhost:8000/api/admin/cms/${sectionKey}`, {
        title,
        description,
        image_url: imageUrl
      });

      alert(`${sectionTitle} entry added successfully!`);
      setTitle('');
      setDescription('');
      setFile(null);
      fetchItems();
    } catch (err) {
      alert("Failed to save entry.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/cms/${sectionKey}/${id}`);
        alert("Entry deleted successfully.");
        fetchItems();
      } catch (err) {
        alert("Failed to delete entry.");
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-white relative min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-amber-500">Manage {sectionTitle}</h1>
        <button 
          onClick={() => onNavigate('admin')} 
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold text-sm transition cursor-pointer"
        >
          ← Dashboard
        </button>
      </div>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 p-6 rounded-lg mb-8 space-y-4 shadow-lg">
        <h2 className="text-lg font-bold text-amber-400">Add New {sectionTitle} Item</h2>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Title / Name</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
            placeholder="Enter title..."
            required 
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Description / Content</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500 h-24"
            placeholder="Enter details..."
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Associated Image</label>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white text-sm cursor-pointer"
          />
        </div>
        <button 
          type="submit" 
          className="bg-amber-600 hover:bg-amber-700 py-3 px-6 rounded font-bold transition cursor-pointer w-full"
        >
          Save Entry
        </button>
      </form>

      {/* List Display */}
      <h2 className="text-xl font-bold mb-4 text-amber-400">Existing Entries</h2>
      {loading ? (
        <div className="text-gray-400">Loading entries...</div>
      ) : items.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 p-6 rounded text-gray-400 text-center">No entries found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item._id} className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex justify-between items-start shadow">
              <div className="space-y-1 pr-4">
                <h3 className="font-bold text-amber-400 text-lg">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
                {item.image_url && <p className="text-xs text-amber-500 mt-2">Has linked image</p>}
              </div>
              <button 
                onClick={() => handleDelete(item._id)} 
                className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1.5 rounded transition cursor-pointer shrink-0"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <ScrollToTopButton />
    </div>
  );
}