// backend/config/db.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB_NAME || 'gitaverse';

let client;
let dbInstance;

async function connectToDatabase() {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    if (!client) {
      client = new MongoClient(uri);
    }
    
    await client.connect();
    dbInstance = client.db(dbName);
    console.log(`Successfully connected to local MongoDB database: ${dbName}`);
    return dbInstance;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

async function closeDatabase() {
  if (client) {
    await client.close();
    client = null;
    dbInstance = null;
    console.log('MongoDB connection closed.');
  }
}

module.exports = {
  connectToDatabase,
  closeDatabase,
};