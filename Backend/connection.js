
const { MongoClient, ServerApiVersion } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/";

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const databaseName = "chatAppDetail";

const connection = async () => {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    const db = client.db(databaseName);
    return db; // Ensure that you return the database object
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connection;
