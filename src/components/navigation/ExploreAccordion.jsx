import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Compass } from 'lucide-react';
import { exploreSubmenus } from '../../data/menuItems';

export default function ExploreAccordion({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="w-full flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3.5 px-4 rounded-xl text-amber-100 font-serif text-lg tracking-wide hover:bg-amber-600/10 menu-item-hover transition-all group"
      >
        <div className="flex items-center gap-3">
          <Compass className="text-amber-400 group-hover:scale-110 transition-transform" size={20} />
          <span>Explore</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={18} className="text-amber-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden pl-6 pr-2 flex flex-col gap-4 py-2 border-l border-amber-600/30 ml-4 my-1"
          >
            {/* Scriptures */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-sans tracking-widest text-amber-500 font-bold mb-1">Scriptures</span>
              {exploreSubmenus.scriptures.map((item) => {
                const IconComponent = item.icon;
                const active = location.pathname === item.path;
                return (
                  <div
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm font-serif cursor-pointer transition-all ${
                      active ? 'bg-amber-600/20 text-amber-300 font-bold' : 'text-amber-200/70 hover:text-amber-100 hover:bg-amber-600/10'
                    }`}
                  >
                    <IconComponent size={15} className="text-amber-400" />
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Discover */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-sans tracking-widest text-amber-500 font-bold mb-1">Discover</span>
              {exploreSubmenus.discover.map((item) => {
                const IconComponent = item.icon;
                const active = location.pathname === item.path;
                return (
                  <div
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm font-serif cursor-pointer transition-all ${
                      active ? 'bg-amber-600/20 text-amber-300 font-bold' : 'text-amber-200/70 hover:text-amber-100 hover:bg-amber-600/10'
                    }`}
                  >
                    <IconComponent size={15} className="text-amber-400" />
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Spiritual & Tools */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-sans tracking-widest text-amber-500 font-bold mb-1">Practice & Tools</span>
              {[...exploreSubmenus.spiritual, ...exploreSubmenus.tools].map((item) => {
                const IconComponent = item.icon;
                const active = location.pathname === item.path;
                return (
                  <div
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm font-serif cursor-pointer transition-all ${
                      active ? 'bg-amber-600/20 text-amber-300 font-bold' : 'text-amber-200/70 hover:text-amber-100 hover:bg-amber-600/10'
                    }`}
                  >
                    <IconComponent size={15} className="text-amber-400" />
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}