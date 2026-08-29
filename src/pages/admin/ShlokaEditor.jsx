// src/pages/admin/ShlokaEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ShlokaEditor({ shlokaId, onNavigate }) {
  const [shloka, setShloka] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!shlokaId) return;
    axios.get(`http://localhost:8000/api/admin/shlokas/${shlokaId}`)
      .then(res => {
        setShloka(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load shloka details:", err);
        setLoading(false);
      });
  }, [shlokaId]);

  const handleSave = () => {
    setSaving(true);
    axios.put(`http://localhost:8000/api/admin/shlokas/${shlokaId}`, shloka)
      .then(() => {
        alert("Shloka updated successfully!");
        setSaving(false);
        onNavigate('admin/shlokas');
      })
      .catch(err => {
        alert("Failed to update shloka.");
        setSaving(false);
      });
  };

  if (loading) return <div className="p-6 text-white">Loading shloka editor...</div>;
  if (!shloka) return <div className="p-6 text-red-500">Shloka not found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Shloka {shloka.chapter_number}.{shloka.shloka_number}</h1>
        <button onClick={() => onNavigate('admin/shlokas')} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm font-medium">
          Back to List
        </button>
      </div>

      <div className="space-y-8 bg-gray-900 p-8 rounded-lg border border-gray-800 shadow-xl">
        {/* SECTION 1: CORE TEXT */}
        <div>
          <h3 className="text-lg font-semibold text-amber-400 mb-4">Shloka Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Sanskrit</label>
              <textarea 
                value={shloka.sanskrit || ''} 
                onChange={(e) => setShloka({...shloka, sanskrit: e.target.value})}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white h-24 font-serif"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Transliteration</label>
              <textarea 
                value={shloka.transliteration || ''} 
                onChange={(e) => setShloka({...shloka, transliteration: e.target.value})}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white h-20"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: TRANSLATIONS */}
        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-lg font-semibold text-amber-400 mb-4">Translations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['english', 'hindi', 'gujarati'].map((lang) => (
              <div key={lang}>
                <label className="block text-sm text-gray-300 capitalize mb-1">{lang} Translation</label>
                <textarea 
                  value={shloka.translations?.[lang] || ''}
                  onChange={(e) => setShloka({
                    ...shloka, 
                    translations: { ...shloka.translations, [lang]: e.target.value }
                  })}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white h-32 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: EXPLANATIONS */}
        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-lg font-semibold text-amber-400 mb-4">Explanations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['english', 'hindi', 'gujarati'].map((lang) => (
              <div key={lang}>
                <label className="block text-sm text-gray-300 capitalize mb-1">{lang} Explanation</label>
                <textarea 
                  value={shloka.explanations?.[lang] || ''}
                  onChange={(e) => setShloka({
                    ...shloka, 
                    explanations: { ...shloka.explanations, [lang]: e.target.value }
                  })}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white h-36 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: FIVE REAL LIFE EXAMPLES */}
        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-lg font-semibold text-amber-400 mb-4">Real-Life Examples (5 Examples)</h3>
          {[1, 2, 3, 4, 5].map((exNum) => (
            <div key={exNum} className="mb-6 bg-gray-950 p-4 rounded border border-gray-800">
              <h4 className="text-sm font-bold text-amber-300 mb-3">Example {exNum}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['english', 'hindi', 'gujarati'].map((lang) => (
                  <div key={lang}>
                    <label className="block text-xs text-gray-400 capitalize mb-1">{lang}</label>
                    <textarea 
                      value={shloka.real_life_example?.[exNum]?.[lang] || ''}
                      onChange={(e) => {
                        const updatedExamples = { ...(shloka.real_life_example || {}) };
                        if (!updatedExamples[exNum]) updatedExamples[exNum] = {};
                        updatedExamples[exNum][lang] = e.target.value;
                        setShloka({ ...shloka, real_life_example: updatedExamples });
                      }}
                      className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded text-white h-24 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-800">
          <button onClick={() => onNavigate('admin/shlokas')} className="bg-gray-700 hover:bg-gray-600 px-6 py-2.5 rounded font-semibold text-sm">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saving} className="bg-amber-600 hover:bg-amber-700 px-8 py-2.5 rounded font-semibold text-sm transition">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}