// const { MongoClient } = require('mongodb');

// let db;

// const connectDB = async (uri, dbName) => {
//   try {
//     const client = new MongoClient(uri);
//     await client.connect();
//     db = client.db(dbName);
//     console.log(" MongoDB connected");
//     return db;
//   } catch (err) {
//     console.error(" MongoDB connection error:", err.message);
//     process.exit(1);
//   }
// };

// const getDB = () => {
//   if (!db) throw new Error("DB not connected yet!");
//   return db;
// };

// module.exports = { connectDB, getDB };
const { MongoClient } = require("mongodb");

let cachedClient = null;
let cachedDb = null;

async function connectDB(uri, dbName) {
  if (cachedDb) return cachedDb;

  const client = cachedClient || (await MongoClient.connect(uri));
  cachedClient = client;
  cachedDb = client.db(dbName);
  console.log(" MongoDB connected");
  return cachedDb;
}

function getDB() {
  if (!cachedDb) throw new Error("Database not initialized!");
  return cachedDb;
}

module.exports = { connectDB, getDB };
