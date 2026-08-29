// src/pages/admin/ImageUploader.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function ImageUploader({ onNavigate }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Chapter Artwork');
  const [chapterNumber, setChapterNumber] = useState('');
  const [slotNumber, setSlotNumber] = useState('1');
  const [altText, setAltText] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file || !name) {
      alert("Please select a file and provide a name.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('category', category);
    if (category === 'Chapter Artwork' && chapterNumber) {
      formData.append('chapterNumber', chapterNumber);
    }
    if (category === 'Homepage' && slotNumber) {
      formData.append('slotNumber', slotNumber);
    }
    formData.append('altText', altText);

    setUploading(true);
    axios.post('http://localhost:8000/api/admin/media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        alert("Image uploaded successfully!");
        setUploading(false);
        onNavigate('admin/images');
      })
      .catch(err => {
        alert("Image upload failed.");
        setUploading(false);
      });
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upload Image</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => onNavigate('admin')} 
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm font-medium transition cursor-pointer"
          >
            ← Dashboard
          </button>
          <button 
            onClick={() => onNavigate('admin/images')} 
            className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm font-medium border border-gray-700 transition cursor-pointer"
          >
            Back to Library
          </button>
        </div>
      </div>

      <form onSubmit={handleUpload} className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4 shadow-lg">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Choose File</label>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none cursor-pointer" 
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Image Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
            placeholder="e.g. Homepage Hero Variant 2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
          >
            <option value="Chapter Artwork">Chapter Artwork</option>
            <option value="Homepage">Homepage (Rotating Slot)</option>
            <option value="Character">Character</option>
            <option value="Veda">Veda</option>
            <option value="Yuga">Yuga</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {category === 'Chapter Artwork' && (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Chapter Number (1-18)</label>
            <input 
              type="number" 
              value={chapterNumber} 
              onChange={(e) => setChapterNumber(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
              min="1" max="18"
            />
          </div>
        )}

        {category === 'Homepage' && (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Homepage Slot (1, 2, or 3)</label>
            <select 
              value={slotNumber} 
              onChange={(e) => setSlotNumber(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
            >
              <option value="1">Slot 1 (Hero/Banner Primary)</option>
              <option value="2">Slot 2 (Featured Section Secondary)</option>
              <option value="3">Slot 3 (Background/Ambient Visual)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Upload up to 5 unique images per slot to allow random rotations on homepage visits.</p>
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-400 mb-1">Alt Text</label>
          <input 
            type="text" 
            value={altText} 
            onChange={(e) => setAltText(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-amber-500"
            placeholder="Description of the image"
          />
        </div>
        <button 
          type="submit" 
          disabled={uploading} 
          className="w-full bg-amber-600 hover:bg-amber-700 py-3 rounded font-bold transition cursor-pointer"
        >
          {uploading ? 'UPLOADING...' : 'UPLOAD TO SERVER'}
        </button>
      </form>
    </div>
  );
}