// src/data/storyData.js
import { shlokasData } from './shlokasData';
import img1 from '../assets/images/artwork-1.jpg';
import img2 from '../assets/images/artwork-2.jpg';
import img3 from '../assets/images/artwork-3.jpg';

const artworkImages = [img1, img2, img3];

// Function to pull 3 unique, different random verses from shlokasData
export const getStoryVerses = () => {
  try {
    const chapterKeys = Object.keys(shlokasData);
    if (chapterKeys.length === 0) return fallbackVerses;

    const generatedVerses = [];
    const usedShlokas = new Set(); // Keeps track to avoid duplicate shlokas
    
    let attempts = 0;
    while (generatedVerses.length < 3 && attempts < 50) {
      attempts++;
      const randomChapterKey = chapterKeys[Math.floor(Math.random() * chapterKeys.length)];
      const chapterVerses = shlokasData[randomChapterKey];
      
      if (chapterVerses && chapterVerses.length > 0) {
        const verse = chapterVerses[Math.floor(Math.random() * chapterVerses.length)];
        const uniqueKey = `${randomChapterKey}_${verse.shloka_number}`;

        if (!usedShlokas.has(uniqueKey)) {
          usedShlokas.add(uniqueKey);
          const i = generatedVerses.length;

          generatedVerses.push({
            id: i + 1,
            chapterNum: randomChapterKey,
            shlokaNum: verse.shloka_number,
            layout: i === 0 ? "center" : i === 1 ? "left" : "right",
            sanskrit: verse.sanskrit,
            realLifeExamples: {
              english: verse.real_life_example?.english || verse.explanations?.english || "Reflect upon this divine teaching in your daily journey.",
              hindi: verse.real_life_example?.hindi || verse.explanations?.hindi || "अपने दैनिक जीवन में इस दिव्य उपदेश का मनन करें।",
              gujarati: verse.real_life_example?.gujarati || verse.explanations?.gujarati || "તમારા દૈનિક જીવનમાં આ દિવ્ય ઉપદેશનું મનન કરો."
            },
            image: artworkImages[i % artworkImages.length]
          });
        }
      }
    }

    return generatedVerses.length === 3 ? generatedVerses : fallbackVerses;
  } catch (err) {
    console.error("Error loading story verses from data:", err);
    return fallbackVerses;
  }
};

const fallbackVerses = [
  {
    id: 1,
    chapterNum: "2",
    shlokaNum: "47",
    layout: "center",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    realLifeExamples: {
      english: "Focus entirely on your present effort and duty without anxiety over future outcomes.",
      hindi: "भविष्य के परिणामों की चिंता किए बिना पूरी तरह से अपने वर्तमान कर्म और कर्तव्य पर ध्यान केंद्रित करें.",
      gujarati: "ભવિષ્યના પરિણામોની ચિંता કર્યા વગર તમારા વર્તમાન કર્મ અને ફરજ પર સંપૂર્ણ ધ્યાન કેન્દ્રિત કરો."
    },
    image: img1
  },
  {
    id: 2,
    chapterNum: "2",
    shlokaNum: "62",
    layout: "left",
    sanskrit: "ध्यायते विषयान्पुंसः सङ्गस्तेषूपजायते। सङ्गात्सं जायते कामः कामात्क्रोधोऽभिजायते॥",
    realLifeExamples: {
      english: "Be mindful of what you dwell on, as excessive attachment naturally leads to frustration and anger.",
      hindi: "आप जिस चीज़ पर अत्यधिक ध्यान केंद्रित करते हैं, उससे आसक्ति और अंततः क्रोध उत्पन्न होता है।",
      gujarati: "તમે જેના પર अत्यधिक ધ્યાન કેન્દ્રિત કરો છો, તેનાથી આસક્તિ અને અંતે ક્રોધ ઉત્પન્ન થાય છે."
    },
    image: img2
  },
  {
    id: 3,
    chapterNum: "4",
    shlokaNum: "8",
    layout: "right",
    sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्। धर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥",
    realLifeExamples: {
      english: "Trust that justice and righteousness will always prevail over negative forces in times of need.",
      hindi: "विश्वास रखें कि आवश्यकता पड़ने पर धर्म और न्याय हमेशा नकारात्मक ताकतों पर विजय प्राप्त करेंगे।",
      gujarati: "વિશ્વાસ રાખો કે જરૂરિયાતના સમયમાં ધર્મ અને ન્યાય હંમેશા નકારાત્મક શક્તિઓ પર વિજય મેળવશે."
    },
    image: img3
  }
];

export const storyVerses = getStoryVerses();