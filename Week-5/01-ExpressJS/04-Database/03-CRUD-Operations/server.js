/*
  ASSIGNMENT 15 — CRUD Operations: Create, Read, Update, Delete with DB
  =======================================================================

  WHAT IS CRUD?
  CRUD stands for the 4 basic operations you perform on a database:

  C → Create  → save a new document        → POST   /users
  R → Read    → fetch documents             → GET    /users  or  /users/:id
  U → Update  → replace full document        → PUT    /users/:id
             → update specific fields only  → PATCH  /users/:id
  D → Delete  → remove a document           → DELETE /users/:id

  Every backend app you build will use these 4 operations.
  In this assignment we connect them directly to MongoDB via Mongoose.

  MONGOOSE CRUD METHODS:
  -----------------------
  Model.create(data)                        → Create one document
  Model.find()                              → Read ALL documents
  Model.findById(id)                        → Read ONE document by _id
  Model.findByIdAndUpdate(id, data, option)        → PUT   — replaces with new data
  Model.findByIdAndUpdate(id, {$set: data}, option) → PATCH — updates only sent fields
  Model.findByIdAndDelete(id)               → Delete a document by _id

  All Mongoose methods return Promises → always use async/await
  and wrap in try/catch to handle errors.

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express mongoose dotenv
  node assignment-15.js

  .env file:
  MONGO_URI=your_mongodb_connection_string
*/

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("Connection failed:", err.message));

/* ---------------------------------------------------------------
  SCHEMA & MODEL
  ---------------
  Defining the shape of a User document.
  All CRUD operations below will work on the "users" collection.
---------------------------------------------------------------- */
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

/* ---------------------------------------------------------------
  CREATE — POST /users
  ----------------------
  Receives data from req.body and saves it to MongoDB.

  User.create(req.body) does two things:
  1. Validates the data against the schema
  2. Inserts a new document into the "users" collection

  MongoDB automatically adds a unique "_id" field to every document.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/users
  - Body → raw → JSON: { "name": "Alice", "email": "alice@test.com", "age": 25 }
---------------------------------------------------------------- */
app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: "User created!", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/* ---------------------------------------------------------------
  READ ALL — GET /users
  ----------------------
  User.find() fetches ALL documents in the "users" collection.
  Returns an array — empty array [] if no users exist yet.

  Test in browser → http://localhost:3000/users
---------------------------------------------------------------- */
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------------------------------------------------------------
  READ ONE — GET /users/:id
  --------------------------
  User.findById(id) fetches a SINGLE document by its "_id".
  MongoDB generates _id automatically when a document is created.
  It looks like: 64abc123def456789012

  If no document is found → findById returns null.
  We check for null and send a 404 response.

  Test in browser → http://localhost:3000/users/<paste_an_id_here>
---------------------------------------------------------------- */
app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------------------------------------------------------------
  UPDATE — PUT /users/:id
  ------------------------
  PUT replaces the ENTIRE document with whatever you send.
  If you only send { "name": "Alice Updated" } and forget
  to include email and age — those fields get wiped out!

  Use PUT when you are submitting ALL fields of a document
  at once, for example a full form submission.

  The { new: true } option returns the UPDATED document.
  Without it → Mongoose returns the OLD document (before update).

  Test in Postman:
  - Method: PUT
  - URL: http://localhost:3000/users/<paste_an_id_here>
  - Body → raw → JSON: { "name": "Alice Updated", "email": "alice@test.com", "age": 30 }
  - Try sending only { "name": "Alice Updated" } → age resets to 0!
---------------------------------------------------------------- */
app.put("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,         // replaces the whole document with this
            { new: true }     // return the updated document, not the old one
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User replaced (PUT)!", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------------------------------------------------------------
  PARTIAL UPDATE — PATCH /users/:id
  -----------------------------------
  PATCH updates ONLY the fields you send.
  Everything else in the document stays untouched.

  This is done using MongoDB's $set operator:
  { $set: req.body } tells MongoDB:
  "only change the fields inside req.body, leave the rest alone"

  Use PATCH when you want to update one or two fields only.
  This is the most common update method in real REST APIs.

  Before PATCH: { name: "Alice", email: "alice@test.com", age: 25 }
  You send:     { age: 30 }
  After PATCH:  { name: "Alice", email: "alice@test.com", age: 30 }

  Test in Postman:
  - Method: PATCH
  - URL: http://localhost:3000/users/<paste_an_id_here>
  - Body → raw → JSON: { "age": 30 }
  - Only age changes — name and email stay the same!
---------------------------------------------------------------- */
app.patch("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // $set → only update the fields provided
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User partially updated (PATCH)!", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------------------------------------------------------------
  DELETE — DELETE /users/:id
  ---------------------------
  User.findByIdAndDelete(id) finds a document by _id and removes
  it permanently from the database.

  We return the deleted document in the response so the client
  can confirm what was deleted.

  Test in Postman:
  - Method: DELETE
  - URL: http://localhost:3000/users/<paste_an_id_here>
---------------------------------------------------------------- */
app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User deleted!", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});