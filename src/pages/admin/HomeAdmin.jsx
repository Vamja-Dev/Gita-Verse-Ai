// src/pages/admin/HomeAdmin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function HomeAdmin({ onNavigate }) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/cms/home')
      .then(res => {
        setSections(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch home sections:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 text-white max-w-6xl mx-auto relative min-h-screen">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-bold text-amber-500 tracking-wider">HOME SECTIONS MANAGEMENT</h1>
          <p className="text-sm text-gray-400 mt-1">Manage home page rotating image pools and content</p>
        </div>
        <button onClick={() => onNavigate('admin')} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold text-sm transition cursor-pointer">← Dashboard</button>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading Home sections...</div>
      ) : (
        <div className="space-y-4">
          {sections.map((sec, idx) => (
            <div key={sec._id || sec.id} className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex justify-between items-center shadow-lg transition hover:border-amber-500/40">
              <div className="space-y-1 pr-4">
                <div className="flex items-center space-x-3">
                  <span className="text-amber-500 font-bold text-lg">{idx + 1}=</span>
                  <h2 className="text-xl font-bold text-amber-400">{sec.title}</h2>
                </div>
                <p className="text-gray-300 text-sm pl-6">{sec.description}</p>
                <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider pl-6">Images in pool: {sec.images?.length || 0}</p>
              </div>
              <button 
                onClick={() => onNavigate(`admin/home/${sec._id || sec.id}/edit`)} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold transition text-sm cursor-pointer shrink-0 shadow"
              >
                Edit Image Pool
              </button>
            </div>
          ))}
        </div>
      )}
      <ScrollToTopButton />
    </div>
  );
}