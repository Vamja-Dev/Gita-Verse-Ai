export function usePageTheme(currentPage) {
  const page = (currentPage || '').toLowerCase();

  switch (true) {
    case page === 'home' || page === '':
      return { label: 'Home', color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.4)' };
    case page.includes('learn') || page.includes('chapter') || page.includes('shloka'):
      return { label: 'Learn', color: '#fde047', glow: 'rgba(253, 224, 71, 0.4)' };
    case page.includes('about'):
      return { label: 'About', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' };
    case page.includes('dashboard'):
      return { label: 'Dashboard', color: '#60a5fa', glow: 'rgba(96, 165, 250, 0.4)' };
    case page.includes('vedas') || page.includes('daily-wisdom'):
      return { label: 'Scriptures', color: '#fb923c', glow: 'rgba(251, 146, 60, 0.4)' };
    case page.includes('meditation'):
      return { label: 'Meditation', color: '#34d399', glow: 'rgba(52, 211, 153, 0.4)' };
    default:
      return { label: 'GitaVerse', color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.4)' };
  }
}