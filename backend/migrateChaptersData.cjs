// backend/migrateChaptersData.cjs
require('dotenv').config();
const { connectToDatabase, closeDatabase } = require('./config/db.cjs');
// Import your frontend chapters dataset
const { chaptersData } = require('../src/data/chaptersData.js');

async function migrateChapters() {
  try {
    console.log('Starting chapters metadata migration...');
    const db = await connectToDatabase();
    const chaptersCollection = db.collection('chapters');

    if (!chaptersData || chaptersData.length === 0) {
      console.log('Error: No chapters data found.');
      process.exit(1);
    }

    // Clear existing chapters collection
    await chaptersCollection.deleteMany({});
    console.log('Cleared existing chapters collection.');

    // Format fields so MongoDB documents match frontend expectations seamlessly
    const formattedChapters = chaptersData.map(chap => ({
      chapter_number: chap.number,
      number: chap.number,
      englishName: chap.englishName,
      sanskritName: chap.sanskritName,
      verses_count: chap.verses_count,
      name: chap.englishName // Fallback property name
    }));

    // Insert into local MongoDB
    const result = await chaptersCollection.insertMany(formattedChapters);
    console.log(`Successfully inserted ${result.insertedCount} chapters into MongoDB!`);

    await closeDatabase();
    console.log('Chapters migration completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Chapters migration failed:', error);
    process.exit(1);
  }
}

migrateChapters();