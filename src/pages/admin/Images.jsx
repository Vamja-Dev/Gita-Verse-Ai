// src/pages/admin/Images.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function Images({ onNavigate }) {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMedia = () => {
    axios.get('http://localhost:8000/api/admin/media')
      .then(res => {
        setMediaList(res.data.media || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch media:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      axios.delete(`http://localhost:8000/api/admin/media/${id}`)
        .then(() => {
          alert("Image deleted successfully.");
          fetchMedia();
        })
        .catch(err => alert("Failed to delete image."));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-white relative min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">IMAGE LIBRARY</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => onNavigate('admin')} 
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold text-sm transition"
          >
            ← Dashboard
          </button>
          <button 
            onClick={() => onNavigate('admin/image-uploader')} 
            className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded font-semibold text-sm transition"
          >
            + UPLOAD IMAGE
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading media library...</div>
      ) : mediaList.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg text-center text-gray-400 shadow">
          No images uploaded yet. Click upload to add chapter artwork or website media.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaList.map((m) => (
            <div key={m._id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow flex flex-col justify-between">
              <div className="h-40 bg-gray-950 flex items-center justify-center overflow-hidden">
                <img src={`http://localhost:8000${m.url}`} alt={m.altText || m.name} className="object-cover h-full w-full" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-md text-amber-400">{m.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">Category: {m.category}</p>
                  {m.chapterNumber && <p className="text-xs text-gray-400">Chapter: {m.chapterNumber}</p>}
                </div>
                <div className="mt-4 flex justify-end gap-2 border-t border-gray-800 pt-3">
                  <button 
                    onClick={() => handleDelete(m._id, m.name)} 
                    className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1.5 rounded font-medium transition"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Go to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}