import express from "express";

import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
//const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
const PORT = 3000;
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/planets", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("planets");
    const planets = await collection.find({}).toArray();
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Could not get planets");
  }
});
