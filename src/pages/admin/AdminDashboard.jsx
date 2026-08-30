// src/pages/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import ScrollToTopButton from './ScrollToTopButton';

export default function AdminDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState(null);

  const menuItems = [
    { title: 'Chapters', path: 'admin/chapters' },
    { title: 'Shlokas', path: 'admin/shlokas' },
    { title: 'Vedas', path: 'admin/vedas' },
    { title: 'Yugas', path: 'admin/yugas' },
    { title: 'Timeline', path: 'admin/timeline' },
    { title: 'Characters', path: 'admin/characters' },
    { title: 'Map', path: 'admin/map' },
    { title: 'User Logs', path: 'admin/dashboard' }
  ];

  const handleSelect = (path) => {
    setActiveTab(path);
    onNavigate(path);
  };

  return (
    <div className="p-8 text-white min-h-[85vh] max-w-4xl mx-auto relative">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-amber-500 tracking-wider">ADMIN DASHBOARD</h1>
        <button 
          onClick={() => onNavigate('admin-logout')}
          className="bg-red-600/80 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            onClick={() => handleSelect(item.path)}
            className={`bg-gray-900 border p-6 rounded-xl shadow-lg cursor-pointer transition flex items-center justify-between ${
              activeTab === item.path ? 'border-amber-500 bg-gray-800/80' : 'border-gray-800 hover:border-amber-500/50'
            }`}
          >
            <h2 className="text-xl font-bold text-amber-400">{item.title}</h2>
            <span className="text-gray-500 text-xl">→</span>
          </div>
        ))}
      </div>

      <ScrollToTopButton />
    </div>
  );
}