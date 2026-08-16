import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, LayoutDashboard } from 'lucide-react';

export default function UserProfile({ user = null, onClose }) {
  const navigate = useNavigate();

  return (
    <div className="p-5 rounded-2xl bg-[#1a0f08]/90 border border-amber-600/30 shadow-xl mb-6 flex flex-col items-center text-center">
      {user ? (
        <>
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 shadow-md mb-3">
            <img src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"} alt="User" className="w-full h-full object-cover" />
          </div>
          <h4 className="text-amber-100 font-serif font-bold text-base">{user.name || "Seeker of Wisdom"}</h4>
          <p className="text-xs text-amber-400/70 font-sans mb-4">{user.email || "seeker@gitaverse.ai"}</p>
          <div className="flex gap-2 w-full">
            <button 
              onClick={() => { navigate('/dashboard'); onClose(); }} 
              className="flex-1 py-2 px-3 rounded-xl bg-amber-600/20 border border-amber-500/40 text-amber-300 text-xs font-sans font-semibold flex items-center justify-center gap-1.5 hover:bg-amber-600 hover:text-slate-950 transition-all"
            >
              <LayoutDashboard size={14} /> Dashboard
            </button>
            <button 
              onClick={() => { /* Handle Logout */ onClose(); }} 
              className="py-2 px-3 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 text-xs font-sans font-semibold flex items-center justify-center gap-1.5 hover:bg-red-900/50 transition-all"
            >
              <LogOut size={14} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-14 h-14 rounded-full bg-[#3d2314] border border-amber-600/40 flex items-center justify-center text-amber-400 mb-3 shadow-inner">
            <User size={26} />
          </div>
          <h4 className="text-amber-100 font-serif font-semibold text-sm mb-1">Welcome, Seeker</h4>
          <p className="text-xs text-amber-200/60 font-sans mb-4">Log in to save your spiritual progress & notes.</p>
          <div className="flex gap-2 w-full">
            <button 
              onClick={() => { navigate('/login'); onClose(); }} 
              className="flex-1 py-2.5 rounded-xl bg-amber-600 text-slate-950 text-xs font-sans font-bold shadow-lg hover:bg-amber-500 transition-all"
            >
              Login
            </button>
            <button 
              onClick={() => { navigate('/register'); onClose(); }} 
              className="flex-1 py-2.5 rounded-xl bg-[#3d2314] border border-amber-600/40 text-amber-200 text-xs font-sans font-semibold hover:border-amber-400 transition-all"
            >
              Register
            </button>
          </div>
        </>
      )}
    </div>
  );
}