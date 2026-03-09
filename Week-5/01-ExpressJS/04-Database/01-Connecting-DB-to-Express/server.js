/*
  ASSIGNMENT 13 — Mongoose Setup: Connecting DB to Express
  =========================================================

  WHAT IS MONGODB?
  MongoDB is a database that stores data as JSON-like documents
  instead of tables and rows like traditional databases (MySQL).

  Instead of:            MongoDB stores:
  Table → "users"        Collection → "users"
  Row   → one user       Document  → { name: "Alice", age: 25 }

  WHAT IS MONGOOSE?
  Mongoose is an npm package that acts as a bridge between
  your Express app and MongoDB. It makes it easy to:
  - Connect to MongoDB with one line
  - Define the shape of your data (Schema)
  - Perform CRUD operations with simple methods

  WITHOUT Mongoose → you write raw MongoDB queries (harder)
  WITH Mongoose    → you use clean, simple JavaScript methods

  WHERE TO GET MONGODB?
  Use MongoDB Atlas — a free cloud database (no installation needed)
  1. Go to https://mongodb.com/atlas
  2. Sign up for free
  3. Create a cluster → get your connection string (MONGO_URI)
  4. Add it to your .env file

  FOLDER STRUCTURE:
  ------------------
  assignment-13/
  ├── server.js   ← you are here
  └── .env        ← create this manually (do NOT upload to GitHub)

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express mongoose dotenv
  node server.js
*/

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

app.use(express.json());

/* ---------------------------------------------------------------
  STEP 1 — Load environment variables from .env file
  ----------------------------------------------------
  dotenv reads your .env file and loads all key=value pairs
  into process.env so you can access them with process.env.KEY

  Your .env file should look like this:
  MONGO_URI=mongodb+srv://yourname:yourpassword@cluster.mongodb.net/mydb
  PORT=3000

  NEVER hardcode your DB connection string directly in code.
  If you push it to GitHub, anyone can access your database!
---------------------------------------------------------------- */
require("dotenv").config();

/* ---------------------------------------------------------------
  STEP 2 — Connect to MongoDB using Mongoose
  --------------------------------------------
  mongoose.connect() takes your connection string and returns
  a Promise — so we use .then() and .catch() to handle success
  or failure.

  Once connected, every Mongoose model can talk to the database.
  You only need to connect ONCE — at the start of your app.
---------------------------------------------------------------- */
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1); // stop the server if DB fails to connect
    });

/* ---------------------------------------------------------------
  STEP 3 — Listen to Mongoose connection events (optional)
  ----------------------------------------------------------
  Mongoose emits events you can listen to for monitoring
  the state of your database connection at any point.
---------------------------------------------------------------- */
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});

/* ---------------------------------------------------------------
  STEP 4 — Define a Schema and Model
  ------------------------------------
  A Schema defines the SHAPE of your data — what fields exist,
  what type each field is, and any rules (required, unique, etc.)

  A Model is a class built from a Schema.
  You use the Model to CREATE, READ, UPDATE, DELETE documents.

  mongoose.model("User", userSchema)
                  ↑
  This becomes the "users" collection in MongoDB automatically.
  Mongoose lowercases the name and adds an "s" at the end.
---------------------------------------------------------------- */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: 0 },
}, {
    timestamps: true, // automatically adds createdAt and updatedAt fields
});

const User = mongoose.model("User", userSchema);

/* ---------------------------------------------------------------
  ROUTES
  -------
  A simple route to test that the DB connection is working.
  We try to count documents in the User collection.
  If this works without error, the DB is connected.
---------------------------------------------------------------- */

/*
  GET /
  ------
  Test in browser → http://localhost:3000
*/
app.get("/", (req, res) => {
    res.json({ message: "Server and MongoDB are running!" });
});

/*
  GET /db-check
  --------------
  Checks if we can actually talk to the database.
  mongoose.connection.readyState values:
  0 = disconnected
  1 = connected
  2 = connecting
  3 = disconnecting

  Test in browser → http://localhost:3000/db-check
*/
app.get("/db-check", async (req, res) => {
    const state = mongoose.connection.readyState;
    const stateMap = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };

    res.json({
        database: stateMap[state],
        ready: state === 1,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});