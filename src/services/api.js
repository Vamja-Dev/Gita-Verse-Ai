// frontend/src/services/api.js (or your API helper file)

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function fetchAllShlokas() {
  try {
    const res = await fetch(`${API_BASE_URL}/shlokas`);
    if (!res.ok) throw new Error('Failed to fetch shlokas from backend');
    return await res.json();
  } catch (error) {
    console.error('API Error, falling back to local JS data:', error);
    return null; 
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

export async function deleteUserLog(rowId) {
  try {
    // Note: Use 'auth-logs' (plural) to match the FastAPI router prefix, 
    // and ensure the method is set to DELETE.
    const res = await fetch(`${API_BASE_URL}/auth-logs/id/${rowId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete log from backend');
    return await res.json();
  } catch (error) {
    console.error('API Error deleting user log:', error);
    return null;
  }
}