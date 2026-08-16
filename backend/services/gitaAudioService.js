import audioMap from '../../public/audio/audio-map.json';

export function getAudioUrl(shlokaId) {
  // Returns path like "/audio/1_1.wav" based on shlokaId (e.g. "1_1" or "2_47")
  return audioMap[shlokaId] || null;
}