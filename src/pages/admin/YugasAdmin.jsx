// src/pages/admin/YugasAdmin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function YugasAdmin({ onNavigate }) {
  const [yugas, setYugas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchYugas = () => {
    axios.get('http://localhost:8000/api/admin/cms/yugas')
      .then(res => {
        setYugas(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch yugas:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchYugas();
  }, []);

  const filteredYugas = yugas.filter(y => 
    (y.name || y.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (y.theme || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 text-white max-w-6xl mx-auto relative min-h-screen">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-bold text-amber-500 tracking-wider">YUGA MANAGEMENT</h1>
          <p className="text-sm text-gray-400 mt-1">Select any Yuga to edit its live content and details</p>
        </div>
        <button 
          onClick={() => onNavigate('admin')} 
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded font-semibold text-sm transition cursor-pointer"
        >
          ← Dashboard
        </button>
      </div>

      <div className="mb-8">
        <input 
          type="text" 
          placeholder="SEARCH YUGAS..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
        />
      </div>

      {loading ? (
        <div className="text-gray-400">Loading Yugas database...</div>
      ) : filteredYugas.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg text-center text-gray-400">
          No matching Yugas found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredYugas.map((y, index) => {
            const yugaId = y._id || y.id;
            return (
              <div key={yugaId} className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg flex justify-between items-center transition hover:border-amber-500/40">
                <div className="space-y-1 pr-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-amber-500 font-bold text-lg">{(y.id || index + 1)}=</span>
                    <h2 className="text-xl font-bold text-amber-400">{y.name || y.title}</h2>
                    <span className="text-base text-gray-400 font-serif">({y.sanskritName})</span>
                  </div>
                  <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider pl-6">{y.theme}</p>
                  <p className="text-gray-300 text-sm pl-6 line-clamp-1">{y.summary || y.description}</p>
                </div>

                <button 
                  onClick={() => onNavigate(`admin/yugas/${yugaId}/edit`)} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold transition text-sm cursor-pointer shrink-0 shadow"
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      )}

      <ScrollToTopButton />
    </div>
  );
}