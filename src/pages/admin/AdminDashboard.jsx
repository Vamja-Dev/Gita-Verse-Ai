// src/pages/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import ScrollToTopButton from './ScrollToTopButton';

export default function AdminDashboard({ onNavigate, lastChangeSummary }) {
  const [activeTab, setActiveTab] = useState('admin/chapters');

  const menuItems = [
    { title: 'Chapters', path: 'admin/chapters' },
    { title: 'Shlokas', path: 'admin/shlokas' },
    { title: 'Images & Media', path: 'admin/images' },
    { title: 'User Logs', path: 'admin/dashboard' }
  ];

  const handleSelect = (path) => {
    setActiveTab(path);
    onNavigate(path);
  };

  return (
    <div className="p-8 text-white min-h-[85vh] max-w-7xl mx-auto relative">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-amber-500 tracking-wider">ADMIN DASHBOARD</h1>
        <button 
          onClick={() => onNavigate('admin-logout')}
          className="bg-red-600/80 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="flex flex-col space-y-3 lg:col-span-1">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              onClick={() => handleSelect(item.path)}
              className={`bg-gray-900 border p-5 rounded-xl shadow-lg cursor-pointer transition flex items-center justify-between ${
                activeTab === item.path ? 'border-amber-500 bg-gray-800/80' : 'border-gray-800 hover:border-amber-500/50'
              }`}
            >
              <h2 className="text-lg font-bold text-amber-400">{item.title}</h2>
              <span className="text-gray-500">→</span>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-lg min-h-[400px] flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-bold text-amber-500 mb-2">
            {menuItems.find(i => i.path === activeTab)?.title} Management Panel
          </h2>

          {lastChangeSummary ? (
            <div className="mt-4 p-4 bg-gray-800 border border-amber-500/50 rounded-lg text-left max-w-lg w-full">
              <p className="text-xs uppercase text-amber-400 tracking-wider font-semibold">Latest Edit Log:</p>
              <p className="text-sm mt-1 text-gray-200">{lastChangeSummary}</p>
            </div>
          ) : (
            <p className="text-gray-400 text-sm max-w-md">
              Select an option from the left navigation menu to view, add, or modify records in real-time.
            </p>
          )}
        </div>
      </div>

      {/* Floating Go to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}