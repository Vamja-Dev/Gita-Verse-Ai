// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/navigation/Navbar';
import ScrollToTop from './UI/ScrollToTop';
import IntroLoader from './components/story/IntroLoader';
import Home from './pages/Home';
import GitaChat from './pages/GitaChat';
import LearnGita from './pages/LearnGita';
import ChapterDetailView from "./components/learn/ChapterDetailView";
import Meditation from './pages/Meditation';
import FourVedas from './pages/FourVedas';
import FourYugas from './pages/FourYugas';
import MahabharataTimeline from './pages/MahabharataTimeline';
import CharacterEncyclopedia from './pages/CharacterEncyclopedia';
import KurukshetraMap from './pages/KurukshetraMap';
import UserDashboard from './pages/UserDashboard';
import About from './pages/About';
import LoginPage from './pages/LoginPage';

// NEW: Admin Panel Imports
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import Chapters from './pages/admin/Chapters';
import ChapterEditor from './pages/admin/ChapterEditor';
import Shlokas from './pages/admin/Shlokas';
import ShlokaEditor from './pages/admin/ShlokaEditor';
import Images from './pages/admin/Images';
import ImageUploader from './pages/admin/ImageUploader';

// Import all 18 chapter images
import chp1 from './assets/images/ch-1.jpg';
import chp2 from './assets/images/ch-2.jpg';
import chp3 from './assets/images/ch-3.jpg';
import chp4 from './assets/images/ch-4.jpg';
import chp5 from './assets/images/ch-5.jpg';
import chp6 from './assets/images/ch-6.jpg';
import chp7 from './assets/images/ch-7.jpg';
import chp8 from './assets/images/ch-8.jpg';
import chp9 from './assets/images/ch-9.jpg';
import chp10 from './assets/images/ch-10.jpg';
import chp11 from './assets/images/ch-11.jpg';
import chp12 from './assets/images/ch-12.jpg';
import chp13 from './assets/images/ch-13.jpg';
import chp14 from './assets/images/ch-14.jpg';
import chp15 from './assets/images/ch-15.jpg';
import chp16 from './assets/images/ch-16.jpg';
import chp17 from './assets/images/ch-17.jpg';
import chp18 from './assets/images/ch-18.jpg';

const chapterBackgrounds = [
  chp1, chp2, chp3, chp4, chp5, chp6,
  chp7, chp8, chp9, chp10, chp11, chp12,
  chp13, chp14, chp15, chp16, chp17, chp18
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedChapterNum, setSelectedChapterNum] = useState(1);
  const [selectedShlokaNum, setSelectedShlokaNum] = useState(null);
  const [selectedShlokaId, setSelectedShlokaId] = useState(null);

  // Always start as false so the intro loader plays fresh on every refresh/reload
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  // Handle URL paths for direct admin panel access on load / refresh
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) {
      setCurrentPage(path.substring(1)); // e.g., 'admin', 'admin/chapters', 'admin/shlokas', etc.
    }

    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleCompleteIntro = () => {
    setHasSeenIntro(true);
  };

  // Robust router handler supporting direct chapter & target shloka navigation from Dashboard and Admin Panel
  const handleUniversalNavigate = (pageOrAction, payload) => {
    // Handle dynamic shloka editor routing: /admin/shlokas/:id/edit
    if (typeof pageOrAction === 'string' && pageOrAction.startsWith('admin/shlokas/') && pageOrAction.endsWith('/edit')) {
      const parts = pageOrAction.split('/');
      setSelectedShlokaId(parts[2]);
      setCurrentPage('admin/shloka-edit');
      window.scrollTo({ top: 0, behavior: 'instant' });
      window.history.pushState({}, '', `/${pageOrAction}`);
      return;
    }

    if (pageOrAction === 'shloka-detail-direct' && payload) {
      setSelectedChapterNum(payload.chapterNumber);
      setSelectedShlokaNum(payload.shlokaNumber);
      setCurrentPage('chapter-detail');
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (pageOrAction === 'chapter' && payload) {
      setSelectedChapterNum(payload.chapterNumber);
      setSelectedShlokaNum(payload.targetShloka || null);
      setCurrentPage('chapter-detail');
    } else {
      setSelectedShlokaNum(null);
      setCurrentPage(pageOrAction);
      // Sync browser URL for admin paths seamlessly
      if (pageOrAction.startsWith('admin')) {
        window.history.pushState({}, '', `/${pageOrAction}`);
      } else if (pageOrAction === 'home') {
        window.history.pushState({}, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Determine if navbar should be hidden on admin views
  const isAdminRoute = currentPage.startsWith('admin');

  return (
    <div className="relative min-h-screen w-full bg-[#1a0f08] overflow-x-hidden">
      {/* Render IntroLoader whenever the page is freshly loaded (Skipped on Admin views) */}
      {!hasSeenIntro && !isAdminRoute && (
        <IntroLoader onComplete={handleCompleteIntro} />
      )}

      {/* Global Navbar (Hidden on Admin screens for clean workspace layout) */}
      {!isAdminRoute && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleUniversalNavigate}
        />
      )}

      {/* Main Page Router View */}
      <main className="w-full">
        {/* ================= ADMIN ROUTES ================= */}
        {currentPage === 'admin' && (
          <AdminDashboard onNavigate={handleUniversalNavigate} />
        )}

        {currentPage === 'admin/login' && (
          <AdminLogin onNavigate={handleUniversalNavigate} />
        )}

        {currentPage === 'admin/chapters' && (
          <Chapters onNavigate={handleUniversalNavigate} />
        )}

        {currentPage === 'admin/chapter-editor' && (
          <ChapterEditor onNavigate={handleUniversalNavigate} />
        )}

        {currentPage === 'admin/shlokas' && (
          <Shlokas onNavigate={handleUniversalNavigate} />
        )}

        {currentPage === 'admin/shloka-edit' && (
          <ShlokaEditor shlokaId={selectedShlokaId} onNavigate={handleUniversalNavigate} />
        )}

        {currentPage === 'admin/images' && (
          <Images onNavigate={handleUniversalNavigate} />
        )}

        {currentPage === 'admin/image-uploader' && (
          <ImageUploader onNavigate={handleUniversalNavigate} />
        )}

        {/* ================= USER WEBSITE ROUTES ================= */}
        {currentPage === 'home' && (
          <Home onNavigate={handleUniversalNavigate} />
        )}

        {currentPage === 'gita-chat' && (
          <GitaChat onNavigate={handleUniversalNavigate} />
        )}

        {currentPage === 'login' && (
          <LoginPage onNavigate={handleUniversalNavigate} />
        )}

        {currentPage === 'learn' && (
          <LearnGita
            onNavigate={handleUniversalNavigate}
            onSelectChapter={(chapNum) => {
              setSelectedChapterNum(chapNum);
              setSelectedShlokaNum(null);
              setCurrentPage('chapter-detail');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
          />
        )}

        {currentPage === 'chapter-detail' && (
          <ChapterDetailView
            chapterNumber={selectedChapterNum}
            targetShloka={selectedShlokaNum}
            backgroundImages={chapterBackgrounds}
            onBack={() => {
              setSelectedShlokaNum(null);
              setCurrentPage('learn');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            onNavigate={handleUniversalNavigate}
          />
        )}

        {currentPage === 'meditation' && (
          <Meditation onNavigate={handleUniversalNavigate} onBack={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'instant' }); }} />
        )}

        {currentPage === 'four-vedas' && (
          <FourVedas onNavigate={handleUniversalNavigate} onBack={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'instant' }); }} />
        )}

        {currentPage === 'four-yugas' && (
          <FourYugas onNavigate={handleUniversalNavigate} onBack={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'instant' }); }} />
        )}

        {currentPage === 'timeline' && (
          <MahabharataTimeline onNavigate={handleUniversalNavigate} onBack={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'instant' }); }} />
        )}

        {currentPage === 'characters' && (
          <CharacterEncyclopedia onNavigate={handleUniversalNavigate} onBack={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'instant' }); }} />
        )}

        {currentPage === 'map' && (
          <KurukshetraMap onNavigate={handleUniversalNavigate} onBack={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'instant' }); }} />
        )}

        {currentPage === 'dashboard' && (
          <UserDashboard onNavigate={handleUniversalNavigate} onBack={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'instant' }); }} />
        )}

        {currentPage === 'about' && (
          <About onNavigate={handleUniversalNavigate} onBack={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'instant' }); }} />
        )}
      </main>

      {/* Global Scroll to Top Button (Hidden on Admin screens) */}
      {!isAdminRoute && <ScrollToTop />}
    </div>
  );
}