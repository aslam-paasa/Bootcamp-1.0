/*
  ASSIGNMENT 17 — Relationships: Referencing Documents (populate)
  ================================================================

  WHAT ARE RELATIONSHIPS?
  In real apps, data is connected to other data.
  For example:
  - A User can have many Posts
  - A Post belongs to one User
  - A Post can have many Comments

  This is called a RELATIONSHIP between collections.

  HOW DOES MONGODB HANDLE RELATIONSHIPS?
  Instead of copying all user data inside every post,
  we store just the USER'S _id inside the post document.
  This is called REFERENCING.

  Post document in MongoDB:
  {
    title : "My First Post",
    author: "64abc123def456789012"   ← just the User's _id
  }

  WHAT IS populate()?
  populate() is a Mongoose method that REPLACES the stored _id
  with the actual full document it points to.

  Without populate():
  { title: "My First Post", author: "64abc123def456789012" }

  With populate("author"):
  { title: "My First Post", author: { name: "Alice", email: "alice@test.com" } }

  Think of it like: populate() follows the reference and
  fetches the actual data for you automatically.

  OUR RELATIONSHIP IN THIS ASSIGNMENT:
  User  →  has many  →  Posts
  Post  →  belongs to  →  one User

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express mongoose dotenv
  node assignment-17.js

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
  SCHEMA 1 — User
  ----------------
  A simple user schema. Nothing special here —
  this is the document that Post will REFERENCE.
---------------------------------------------------------------- */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

/* ---------------------------------------------------------------
  SCHEMA 2 — Post
  ----------------
  The "author" field stores a REFERENCE to a User document.

  type: mongoose.Schema.Types.ObjectId
  → tells Mongoose this field holds a MongoDB _id (not a string)

  ref: "User"
  → tells Mongoose WHICH collection to look in when we populate()
  → "User" refers to the model name we used in mongoose.model("User", ...)

  When saved, author looks like: "64abc123def456789012"
  When populated, author becomes: { name: "Alice", email: "..." }
---------------------------------------------------------------- */
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId, // stores a MongoDB _id
        ref: "User",                          // reference to the User model
        required: true,
    },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

/* ---------------------------------------------------------------
  ROUTES
---------------------------------------------------------------- */

/*
  POST /users
  ------------
  Creates a new user. After creating, copy the _id from the
  response — you will need it to create a post.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/users
  - Body → raw → JSON: { "name": "Alice", "email": "alice@test.com" }
*/
app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: "User created!", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/*
  POST /posts
  ------------
  Creates a new post linked to a user via their _id.
  The "author" field must be a valid User _id from the database.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/posts
  - Body → raw → JSON:
    {
      "title"  : "My First Post",
      "content": "This is the content of my post.",
      "author" : "<paste_user_id_here>"
    }
*/
app.post("/posts", async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json({ message: "Post created!", post });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/*
  GET /posts
  -----------
  Returns all posts WITHOUT populate.
  The author field will show only the raw _id.

  Test in browser → http://localhost:3000/posts
  Notice: author is just an id like "64abc123..."
*/
app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
  GET /posts/populated
  ---------------------
  Returns all posts WITH populate.
  .populate("author") replaces the stored _id with
  the full User document it points to.

  You can also select specific fields to populate:
  .populate("author", "name email") → only returns name and email
  instead of the entire user document.

  Test in browser → http://localhost:3000/posts/populated
  Notice: author is now a full object { name: "Alice", email: "..." }
*/
app.get("/posts/populated", async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "name email");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
  GET /posts/:id/populated
  -------------------------
  Returns a SINGLE post with its author fully populated.

  Test in browser → http://localhost:3000/posts/<post_id>/populated
*/
app.get("/posts/:id/populated", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "name email");

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});