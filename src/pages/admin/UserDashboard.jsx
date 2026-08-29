// src/pages/admin/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollToTopButton from './ScrollToTopButton';

export default function UserDashboard({ onNavigate }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = () => {
    axios.get('http://localhost:8000/api/auth-logs')
      .then(res => {
        setLogs(res.data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load logs:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete log ID ${id}?`)) {
      // Fixed: changed axios.get to axios.delete
      axios.delete(`http://localhost:8000/api/auth-logs/id/${id}`)
        .then(() => {
          alert("Log deleted successfully.");
          fetchLogs();
        })
        .catch(err => alert("Failed to delete log."));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-white relative min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">USER ACTIVITY & AUTH LOGS</h1>
        <button 
          onClick={() => onNavigate('admin')} 
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm font-medium transition cursor-pointer"
        >
          ← Dashboard
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading user activity logs...</div>
      ) : logs.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg text-center text-gray-400 shadow">
          No user activity logs found.
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 text-gray-300 text-xs uppercase tracking-wider">
                  <th className="p-3">ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-sm">
                {logs.map((log, index) => (
                  <tr key={log.ID || index} className="hover:bg-gray-800/50">
                    <td className="p-3 font-mono text-amber-400">{log.ID}</td>
                    <td className="p-3 text-gray-300">{log.Date}</td>
                    <td className="p-3 font-semibold">{log.Name}</td>
                    <td className="p-3 text-gray-300">{log.Email}</td>
                    <td className="p-3">
                      <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded text-xs">
                        {log.Method}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded text-xs font-semibold ${
                        log.Status === 'Logged In' ? 'bg-green-900 text-green-200' : 'bg-amber-900 text-amber-200'
                      }`}>
                        {log.Status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => handleDelete(log.ID)}
                        className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1.5 rounded font-medium transition cursor-pointer"
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Floating Go to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}