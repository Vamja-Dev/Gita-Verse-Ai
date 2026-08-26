const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function fetchAllShlokas() {
  try {
    const response = await `${API_BASE_URL}/shlokas`;
    // Or standard fetch:
    const res = await fetch(`${API_BASE_URL}/shlokas`);
    if (!res.ok) throw new Error('Failed to fetch shlokas from backend');
    return await res.json();
  } catch (error) {
    console.error('API Error, falling back to local JS data:', error);
    return null; // Your app can fallback to static JS if needed
  }
}

export async function fetchShloka(chapterNumber, shlokaNumber) {
  try {
    const res = await fetch(`${API_BASE_URL}/shlokas/${chapterNumber}/${shlokaNumber}`);
    if (!res.ok) throw new Error('Shloka not found');
    return await res.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}