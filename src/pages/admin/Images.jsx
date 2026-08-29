// src/pages/admin/Images.jsx
import React from 'react';

export default function Images({ onNavigate }) {
  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">IMAGE LIBRARY</h1>
        <button onClick={() => onNavigate('admin/image-uploader')} className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded font-semibold text-sm">
          + UPLOAD IMAGE
        </button>
      </div>
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg text-center text-gray-400">
        <p>No custom media uploaded yet. Click upload to add chapter artwork or website media.</p>
      </div>
    </div>
  );
}