// src/pages/admin/AdminLogin.jsx
import React, { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.toLowerCase() === 'admin@gitaverse.com' && password === 'admin123') {
      sessionStorage.setItem('gita_admin_auth', 'true');
      window.location.href = '/admin';
    } else {
      alert('Invalid admin credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] text-white login-container">
      <form onSubmit={handleLogin} className="bg-gray-900 border border-gray-800 p-8 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-amber-500 text-center">Admin Login</h2>
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Password</label>
          <input 
            type={showPassword ? "text" : "password"} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white"
            required
          />
        </div>
        <div className="mb-6 flex items-center">
          <input 
            type="checkbox" 
            id="show-password"
            checked={showPassword} 
            onChange={() => setShowPassword(!showPassword)} 
            className="mr-2 h-4 w-4 accent-amber-600 cursor-pointer"
          />
          <label htmlFor="show-password" className="text-sm text-gray-400 cursor-pointer select-none">
            Show Password
          </label>
        </div>
        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 py-3 rounded font-bold transition">
          Login
        </button>
      </form>
    </div>
  );
}