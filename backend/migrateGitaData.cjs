// backend/migrateGitaData.cjs
require('dotenv').config();
const { connectToDatabase, closeDatabase } = require('./config/db.cjs');
const { shlokasData } = require('../src/data/shlokasData.js');

async function migrateData() {
  try {
    console.log('Starting Gita data migration from local JS dataset...');
    const db = await connectToDatabase();
    const shlokasCollection = db.collection('shlokas');

    let dataArray = [];

    // Flatten your object structure: { "1": [ {shloka_1}, {shloka_2} ], "2": [...] }
    if (shlokasData && typeof shlokasData === 'object') {
      for (const chapterKey of Object.keys(shlokasData)) {
        const chapterShlokas = shlokasData[chapterKey];
        if (Array.isArray(chapterShlokas)) {
          chapterShlokas.forEach((shloka) => {
            // Ensure chapter_number is attached to each shloka document
            dataArray.push({
              chapter_number: parseInt(chapterKey, 10),
              ...shloka
            });
          });
        }
      }
    }

    console.log(`Extracted total ${dataArray.length} shlokas across chapters for migration.`);

    if (dataArray.length === 0) {
      console.log('Error: No shlokas found to migrate. Check your data structure.');
      process.exit(1);
    }

    // Clear existing collection to avoid duplication on re-runs
    await shlokasCollection.deleteMany({});
    console.log('Cleared existing shlokas collection in local MongoDB.');

    // Insert documents into local MongoDB
    const result = await shlokasCollection.insertMany(dataArray);
    console.log(`Successfully inserted ${result.insertedCount} shlokas into local MongoDB!`);

    // Create unique compound index for fast lookups
    await shlokasCollection.createIndex({ chapter_number: 1, shloka_number: 1 }, { unique: true });
    console.log('Created unique index on chapter_number and shloka_number.');

    await closeDatabase();
    console.log('Migration completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateData();