// src/pages/admin/ImageUploader.jsx
import React, { useState } from 'react';

export default function ImageUploader({ onNavigate }) {
  const [imageName, setImageName] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    alert("Image uploaded and metadata linked successfully!");
    onNavigate('admin/images');
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upload Image</h1>
        <button onClick={() => onNavigate('admin/images')} className="bg-gray-700 px-4 py-2 rounded text-sm">Back</button>
      </div>
      <form onSubmit={handleUpload} className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Choose File</label>
          <input type="file" className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Image Name</label>
          <input 
            type="text" 
            value={imageName} 
            onChange={(e) => setImageName(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            placeholder="Chapter 1 Artwork"
          />
        </div>
        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 py-3 rounded font-bold">
          UPLOAD TO SERVER
        </button>
      </form>
    </div>
  );
}