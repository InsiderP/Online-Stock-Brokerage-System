const { MongoClient } = require('mongodb');
const logger = require('../logger');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let db;

async function connect() {
  try {
    await client.connect();
    db = client.db(process.env.MONGO_DB || 'stock_brokerage');
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('MongoDB connection error:', err);
    process.exit(-1);
  }
}

function getDb() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

module.exports = {
  connect,
  getDb
}; 