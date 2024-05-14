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

app.get("/api/characters", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("characters");
    const characters = await collection.find({}).toArray();
    res.json(characters);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Could not get characters");
  }
});

app.get("/api/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params.id)
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("characters");
    const characters = await collection
      .findOne({id: parseInt(id)})
      
    console.log(characters)
    res.json(characters);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Could not get character by id");
  }
});

app.get("/api/characters/:id/planet", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    let collection = db.collection("characters");
    const characters = await collection.findOne({ id: parseInt(id) });
    collection = db.collection("planets");
    const planetId = characters.homeworld
    const planet = await collection.findOne({ id: parseInt(planetId) });
    console.log(planet);
    res.json(planet);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Could not get character by id");
  }
});

app.get("/api/planets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("planets");
    const planets = await collection.findOne({ id: parseInt(id) });
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Could not get planets by id");
  }
});

app.get("/api/films/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("films");
    const films = await collection.findOne({ id: parseInt(id) });
    res.json(films);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Could not get film by id");
  }
});

app.get("/api/planets", async (req, res) => {
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

app.get("/api/films", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("films");
    const films = await collection.find({}).toArray();
    res.json(films);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Could not get characters");
  }
});


app.get("/api/films/:id/characters", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    let collection = db.collection("films_characters");
    const film_characters = await collection.find({film_id: parseInt(id)}).toArray();
    let result = []
    film_characters.map(
        (char) => 
    result = [...result, char.character_id]
)   
    let char_array = []
    console.log(result)
    collection = db.collection("characters");
    for(var i in result){
  
    let currCharacter = await collection
      .findOne({ id: parseInt(result[i]) })
        char_array = [...char_array, currCharacter]
    }
    
    res.json(char_array);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Could not get characters");
  }
});

app.get("/api/films/:id/planets", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    let collection = db.collection("films_planets");
    const film_planets = await collection
      .find({ film_id: parseInt(id) })
      .toArray();
    let result = [];
    film_planets.map((planet) => (result = [...result, planet.planet_id]));
    let planets_array = [];
    console.log(result);
    collection = db.collection("planets");
    for (var i in result) {
      let currPlanet = await collection.findOne({ id: parseInt(result[i]) });
      planets_array = [...planets_array, currPlanet];
    }
    console.log(planets_array)
    res.json(planets_array);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Could not get planets from film id");
  }
});

app.get("/api/characters/:id/films", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    let collection = db.collection("films_characters");
    const character_films = await collection
      .find({ character_id: parseInt(id) })
      .toArray();
    let result = [];
    character_films.map((film) => (result = [...result, film.film_id]));
    let films_array = [];
    console.log(result);
    collection = db.collection("films");
    for (var i in result) {
      let currFilm = await collection.findOne({ id: parseInt(result[i]) });
      films_array = [...films_array, currFilm];
    }
    console.log(films_array);
    res.json(films_array);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Could not get planets from film id");
  }
});

app.get("/api/planets/:id/films", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    let collection = db.collection("films_planets");
    const planet_films = await collection
      .find({ planet_id: parseInt(id) })
      .toArray();
    let result = [];
    planet_films.map((film) => (result = [...result, film.film_id]));
    let films_array = [];
    console.log(result);
    collection = db.collection("films");
    for (var i in result) {
      let currFilm = await collection.findOne({ id: parseInt(result[i]) });
      films_array = [...films_array, currFilm];
    }
    console.log(films_array);
    res.json(films_array);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Could not get planets from film id");
  }
});

app.get("/api/planets/:id/characters", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    let collection = db.collection("characters");
    const characters = await collection
      .find({ homeworld: parseInt(id) })
      .toArray();

    res.json(characters);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Could not get planets from film id");
  }
});