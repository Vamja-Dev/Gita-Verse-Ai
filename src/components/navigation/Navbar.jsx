import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, User, LayoutDashboard, LogOut } from 'lucide-react';
import { primaryMenuItems, exploreSubmenus } from '../../data/menuItems';
import { usePageTheme } from '../../hooks/usePageTheme';
import { saveUserToDatabase } from '../../pages/LoginPage';
import logoImage from '../../assets/logo.png';
import '../../styles/navigation.css';

export default function Navbar({ currentPage, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);

  const userName = localStorage.getItem('gitaverse_user_name') || 'Seeker';
  const userEmail = localStorage.getItem('gitaverse_user_email') || 'N/A';
  const isLoggedIn = userName !== 'Seeker';
  const theme = usePageTheme(currentPage);

  // Hide on scroll down, show on scroll up or when near top
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80 && !isMenuOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  // Reveal navbar when cursor moves to the top of the screen
  const handleMouseMove = (e) => {
    if (e.clientY < 70) {
      setHidden(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSelect = (id) => {
    if (onNavigate) onNavigate(id);
    setIsMenuOpen(false);
    setShowLogoutDropdown(false);
  };

  // Updated Logout handler to save 'Logged Out' status & timestamp to Google Sheet via SheetDB
  const handleLogout = async () => {
    if (userEmail && userEmail !== 'N/A') {
      try {
        await saveUserToDatabase(userName, userEmail, 'N/A', 'Session Activity', 'Logged Out');
      } catch (error) {
        console.error('Error logging logout session:', error);
      }
    }

    // Clear local session storage
    localStorage.removeItem('gitaverse_user_name');
    localStorage.removeItem('gitaverse_user_email');
    
    setShowLogoutDropdown(false);
    setIsMenuOpen(false);
    if (onNavigate) onNavigate('home');
  };

  return (
    <>
      {/* Smart Hide-on-Scroll & Hover-Reveal Header */}
      <motion.div
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-0 w-full z-40 px-6 md:px-16 flex justify-center pointer-events-none"
      >
        <header className="w-full max-w-7xl flex items-center justify-between px-2 py-4 pointer-events-auto">

          {/* Clean Logo on Left */}
          <div
            onClick={() => handleSelect('home')}
            className="flex items-center cursor-pointer group select-none"
          >
            <img
              src={logoImage}
              alt="GitaVerse AI Logo"
              className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]"
            />
          </div>

          {/* Menu Button on Right (Hidden completely on Login Page) */}
          {currentPage !== 'login' && (
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative z-50 w-12 h-12 rounded-2xl bg-[#2c1810]/90 border border-amber-600/40 flex flex-col items-center justify-center gap-1.5 cursor-pointer shadow-xl backdrop-blur-md group"
              style={{ boxShadow: `0 0 20px ${theme.glow}` }}
              aria-label="Toggle Menu"
            >
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-0.5 rounded-full block"
                style={{ backgroundColor: theme.color }}
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="w-5 h-0.5 rounded-full block"
                style={{ backgroundColor: theme.color }}
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-0.5 rounded-full block"
                style={{ backgroundColor: theme.color }}
              />
            </motion.button>
          )}
        </header>
      </motion.div>

      {/* Dark Backdrop Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 pointer-events-auto"
          />
        )}
      </AnimatePresence>

      {/* Right-Side Sliding Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 260 }}
            className="fixed top-0 right-0 z-50 w-full sm:w-[420px] h-screen glass-panel flex flex-col overflow-hidden pointer-events-auto shadow-2xl"
          >
            <div className="flex flex-col h-full p-6 md:p-8 overflow-y-auto overflow-x-hidden scrollbar-none">

              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-amber-600/20 mb-6 shrink-0">
                <div className="flex items-center gap-3">
                  <img src={logoImage} alt="GitaVerse AI Logo" className="h-8 w-auto object-contain" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-[#2c1810] border border-amber-600/40 text-amber-300 flex items-center justify-center shadow-lg cursor-pointer"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* User Profile Box with Clickable Profile Icon to Toggle Logout */}
              <div className="p-5 rounded-2xl bg-[#1a0f08]/90 border border-amber-600/30 shadow-xl mb-6 flex flex-col items-center text-center shrink-0 relative">
                <div
                  onClick={() => isLoggedIn && setShowLogoutDropdown(!showLogoutDropdown)}
                  className={`w-14 h-14 rounded-full bg-[#3d2314] border border-amber-600/40 flex items-center justify-center text-amber-400 mb-3 shadow-inner ${isLoggedIn ? 'cursor-pointer hover:border-amber-400 transition-colors' : ''}`}
                  title={isLoggedIn ? "Click to Logout options" : ""}
                >
                  <User size={26} />
                </div>

                <h4 className="text-amber-100 font-serif font-semibold text-sm mb-1">
                  Welcome, {userName}
                </h4>
                <p className="text-xs text-amber-200/60 font-sans mb-4">Access your dashboard & saved learnings.</p>

                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => handleSelect('dashboard')}
                    className="flex-1 py-2.5 rounded-xl bg-amber-600 text-slate-950 text-xs font-sans font-bold shadow-lg hover:bg-amber-500 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <LayoutDashboard size={14} /> Dashboard
                  </button>
                </div>

                {/* Logout Dropdown Popup on clicking profile icon */}
                {isLoggedIn && showLogoutDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-20 bg-[#2c1810] border border-amber-500/40 rounded-xl p-2 shadow-2xl z-20 w-48"
                  >
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 px-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-900/40 text-xs font-sans font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Navigation List */}
              <div className="flex flex-col gap-2 flex-1 shrink-0">
                {primaryMenuItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = currentPage === item.id;

                  if (item.isAccordion) {
                    return (
                      <div key={item.name} className="flex flex-col">
                        <button
                          onClick={() => setExploreOpen(!exploreOpen)}
                          className={`w-full flex items-center justify-between py-3.5 px-4 rounded-xl font-serif text-lg tracking-wide transition-all group cursor-pointer ${exploreOpen ? 'bg-amber-600/20 text-amber-300 font-bold' : 'text-amber-100 hover:bg-amber-600/10'
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent className="text-amber-400 group-hover:scale-110 transition-transform" size={20} />
                            <span>Explore</span>
                          </div>
                          <motion.div animate={{ rotate: exploreOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown size={18} className="text-amber-400" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {exploreOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden pl-6 pr-2 flex flex-col gap-4 py-2 border-l border-amber-600/30 ml-4 my-1"
                            >
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] uppercase font-sans tracking-widest text-amber-500 font-bold mb-1">Scriptures</span>
                                {exploreSubmenus.scriptures.map((sub) => (
                                  <div
                                    key={sub.name}
                                    onClick={() => handleSelect(sub.id)}
                                    className="py-2 px-3 rounded-lg text-sm font-serif text-amber-200/70 hover:text-amber-100 hover:bg-amber-600/10 cursor-pointer transition-all"
                                  >
                                    {sub.name}
                                  </div>
                                ))}
                              </div>

                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] uppercase font-sans tracking-widest text-amber-500 font-bold mb-1">Discover</span>
                                {exploreSubmenus.discover.map((sub) => (
                                  <div
                                    key={sub.name}
                                    onClick={() => handleSelect(sub.id)}
                                    className="py-2 px-3 rounded-lg text-sm font-serif text-amber-200/70 hover:text-amber-100 hover:bg-amber-600/10 cursor-pointer transition-all"
                                  >
                                    {sub.name}
                                  </div>
                                ))}
                              </div>

                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] uppercase font-sans tracking-widest text-amber-500 font-bold mb-1">Practice & Tools</span>
                                {[...exploreSubmenus.tools].map((sub) => (
                                  <div
                                    key={sub.name}
                                    onClick={() => handleSelect(sub.id)}
                                    className="py-2 px-3 rounded-lg text-sm font-serif text-amber-200/70 hover:text-amber-100 hover:bg-amber-600/10 cursor-pointer transition-all"
                                  >
                                    {sub.name}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.name}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between py-3.5 px-4 rounded-xl font-serif text-lg tracking-wide cursor-pointer transition-all group ${isActive ? 'bg-amber-600/20 text-amber-300 font-bold border-l-4 border-amber-400' : 'text-amber-100 hover:bg-amber-600/10'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="text-amber-400 group-hover:scale-110 transition-transform" size={20} />
                        <span>{item.name}</span>
                      </div>
                      {isActive && <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />}
                    </div>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 mt-6 border-t border-amber-600/20 text-center text-xs text-amber-200/40 font-sans tracking-widest uppercase shrink-0">
                © 2026 GitaVerse AI • Divine Wisdom
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}