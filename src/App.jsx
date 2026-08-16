import React, { useState } from 'react';
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

  // Always start as false so the intro loader plays fresh on every refresh/reload
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  const handleCompleteIntro = () => {
    setHasSeenIntro(true);
  };

  // Robust router handler supporting direct chapter & target shloka navigation from Dashboard
  const handleUniversalNavigate = (pageOrAction, payload) => {
    if (pageOrAction === 'shloka-detail-direct' && payload) {
      setSelectedChapterNum(payload.chapterNumber);
      setSelectedShlokaNum(payload.shlokaNumber);
      setCurrentPage('chapter-detail');
      return;
    }

    if (pageOrAction === 'chapter' && payload) {
      setSelectedChapterNum(payload.chapterNumber);
      // Only set targetShloka if coming from a dashboard action
      setSelectedShlokaNum(payload.targetShloka || null);
      setCurrentPage('chapter-detail');
    } else {
      // Clear target shloka when navigating anywhere else normally
      setSelectedShlokaNum(null);
      setCurrentPage(pageOrAction);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#1a0f08] overflow-x-hidden">
      {/* Render IntroLoader whenever the page is freshly loaded */}
      {!hasSeenIntro && (
        <IntroLoader onComplete={handleCompleteIntro} />
      )}

      {/* Global Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleUniversalNavigate}
      />

      {/* Main Page Router View */}
      <main className="w-full">
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
              setSelectedShlokaNum(null); // Clear out any residual target shloka
              setCurrentPage('chapter-detail');
            }}
          />
        )}

        {currentPage === 'chapter-detail' && (
          <ChapterDetailView
            chapterNumber={selectedChapterNum}
            targetShloka={selectedShlokaNum}
            backgroundImages={chapterBackgrounds}
            onBack={() => {
              setSelectedShlokaNum(null); // Reset when going back
              setCurrentPage('learn');
            }}
            onNavigate={handleUniversalNavigate}
          />
        )}

        {currentPage === 'meditation' && (
          <Meditation onNavigate={handleUniversalNavigate} onBack={() => setCurrentPage('home')} />
        )}

        {currentPage === 'four-vedas' && (
          <FourVedas onNavigate={handleUniversalNavigate} onBack={() => setCurrentPage('home')} />
        )}

        {currentPage === 'four-yugas' && (
          <FourYugas onNavigate={handleUniversalNavigate} onBack={() => setCurrentPage('home')} />
        )}

        {currentPage === 'timeline' && (
          <MahabharataTimeline onNavigate={handleUniversalNavigate} onBack={() => setCurrentPage('home')} />
        )}

        {currentPage === 'characters' && (
          <CharacterEncyclopedia onNavigate={handleUniversalNavigate} onBack={() => setCurrentPage('home')} />
        )}

        {currentPage === 'map' && (
          <KurukshetraMap onNavigate={handleUniversalNavigate} onBack={() => setCurrentPage('home')} />
        )}

        {currentPage === 'dashboard' && (
          <UserDashboard onNavigate={handleUniversalNavigate} onBack={() => setCurrentPage('home')} />
        )}

        {currentPage === 'about' && (
          <About onNavigate={handleUniversalNavigate} onBack={() => setCurrentPage('home')} />
        )}
      </main>

      {/* Global Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}