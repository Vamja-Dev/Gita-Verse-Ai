// src/pages/admin/CharactersAdmin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function CharactersAdmin({ onNavigate }) {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCharacters = () => {
    axios.get('http://localhost:8000/api/admin/cms/characters')
      .then(res => {
        setCharacters(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch characters:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const filteredCharacters = characters.filter(c => 
    (c.name || c.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.faction || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.sanskritName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 text-white max-w-6xl mx-auto relative min-h-screen">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-bold text-amber-500 tracking-wider">CHARACTER MANAGEMENT</h1>
          <p className="text-sm text-gray-400 mt-1">Select any character to edit their live profile and details</p>
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
          placeholder="SEARCH CHARACTERS BY NAME, FACTION, OR SANSKRIT..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
        />
      </div>

      {loading ? (
        <div className="text-gray-400">Loading Characters database...</div>
      ) : filteredCharacters.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg text-center text-gray-400">
          No matching characters found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCharacters.map((c, index) => {
            const charId = c._id || c.id;
            return (
              <div key={charId} className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-lg flex justify-between items-center transition hover:border-amber-500/40">
                <div className="space-y-1 pr-4">
                  <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                    <span className="text-amber-500 font-bold text-lg">{(index + 1)}=</span>
                    <h2 className="text-xl font-bold text-amber-400">{c.name || c.title}</h2>
                    {c.sanskritName && <span className="text-base text-gray-400 font-serif">({c.sanskritName})</span>}
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {c.faction || 'GENERAL'}
                    </span>
                  </div>
                  <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider pl-6">{c.title}</p>
                  <p className="text-gray-300 text-sm pl-6 line-clamp-1">{c.description || c.summary}</p>
                </div>

                <button 
                  onClick={() => onNavigate(`admin/characters/${charId}/edit`)} 
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