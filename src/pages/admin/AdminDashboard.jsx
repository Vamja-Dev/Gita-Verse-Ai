// src/pages/admin/AdminDashboard.jsx
import React from 'react';

export default function AdminDashboard({ onNavigate }) {
  return (
    <div className="p-8 max-w-7xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6 text-amber-500">ADMIN DASHBOARD</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div onClick={() => onNavigate('admin/chapters')} className="bg-gray-900 border border-gray-800 p-6 rounded-lg cursor-pointer hover:border-amber-500 transition">
          <h3 className="text-xl font-bold text-amber-400">Chapters</h3>
          <p className="text-gray-400 text-sm mt-2">Manage 18 Bhagavad Gita chapters, titles, and artwork.</p>
        </div>
        <div onClick={() => onNavigate('admin/shlokas')} className="bg-gray-900 border border-gray-800 p-6 rounded-lg cursor-pointer hover:border-amber-500 transition">
          <h3 className="text-xl font-bold text-amber-400">Shlokas</h3>
          <p className="text-gray-400 text-sm mt-2">Manage 701 shlokas, multilingual translations, and 5 real-life examples.</p>
        </div>
        <div onClick={() => onNavigate('admin/images')} className="bg-gray-900 border border-gray-800 p-6 rounded-lg cursor-pointer hover:border-amber-500 transition">
          <h3 className="text-xl font-bold text-amber-400">Images & Media</h3>
          <p className="text-gray-400 text-sm mt-2">Upload and manage chapter artwork and website media assets.</p>
        </div>
      </div>
    </div>
  );
}