import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavigationItem({ item, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const IconComponent = item.icon;
  const isActive = location.pathname === item.path;

  return (
    <div
      onClick={() => { navigate(item.path); onClose(); }}
      className={`w-full flex items-center justify-between py-3.5 px-4 rounded-xl font-serif text-lg tracking-wide cursor-pointer menu-item-hover transition-all group ${
        isActive ? 'bg-amber-600/20 text-amber-300 font-bold border-l-4 border-amber-400' : 'text-amber-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <IconComponent className="text-amber-400 group-hover:scale-110 transition-transform" size={20} />
        <span>{item.name}</span>
      </div>
      {isActive && <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />}
    </div>
  );
}