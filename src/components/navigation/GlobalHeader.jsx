import React, { useState } from 'react';
import Logo from './Logo';
import MenuButton from './MenuButton';
import SideMenu from './SideMenu';
import MenuOverlay from './MenuOverlay';
import PageThemeManager from './PageThemeManager';
import { usePageTheme } from '../../hooks/usePageTheme';

export default function GlobalHeader({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = usePageTheme();

  return (
    <PageThemeManager isOpen={isMenuOpen}>
      {/* Absolute Minimal Header */}
      <header className="absolute top-0 left-0 w-full z-30 px-6 md:px-16 py-6 flex items-center justify-between pointer-events-auto">
        <Logo />
        <MenuButton 
          isOpen={isMenuOpen} 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          themeColor={theme.color}
          themeGlow={theme.glow}
        />
      </header>

      {/* Slide-in Menu & Overlay */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Page Content */}
      <div className="w-full min-h-screen">
        {children}
      </div>
    </PageThemeManager>
  );
}