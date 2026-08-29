// src/pages/admin/AdminLogin.jsx
import React, { useState } from 'react';

export default function AdminLogin({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple frontend gate for v1; real backend verification can be added here
    if (email && password) {
      onNavigate('admin');
    } else {
      alert('Please enter credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] text-white">
      <form onSubmit={handleLogin} className="bg-gray-900 border border-gray-800 p-8 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-amber-500 text-center">ADMIN LOGIN</h2>
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            placeholder="admin@gitaverse.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 py-3 rounded font-bold transition">
          LOGIN
        </button>
      </form>
    </div>
  );
}