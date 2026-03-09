/*
  ASSIGNMENT 14 — Defining Schema & Models
  ==========================================

  WHAT IS A SCHEMA?
  A Schema is a BLUEPRINT that defines the shape of your data.
  It tells Mongoose:
  - What fields exist (name, email, age...)
  - What TYPE each field is (String, Number, Boolean...)
  - What RULES apply (required, unique, min, max, default...)

  Think of it like designing a form — you decide what fields
  are on the form before anyone fills it in.

  WHAT IS A MODEL?
  A Model is a CLASS built from a Schema.
  You use the Model to actually talk to the database:
  - User.create()   → insert a new document
  - User.find()     → fetch documents
  - User.findById() → fetch one document

  Mongoose automatically creates a collection in MongoDB
  named after your model — lowercase and pluralised:
  mongoose.model("User", ...)    → "users" collection
  mongoose.model("Product", ...) → "products" collection

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express mongoose dotenv
  node assignment-14.js

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
  SCHEMA FIELD TYPES
  -------------------
  Mongoose supports these built-in types:
  String   → text
  Number   → integers and decimals
  Boolean  → true or false
  Date     → date and time
  Array    → a list of values  e.g. [String]
  ObjectId → a reference to another document (for relationships)
---------------------------------------------------------------- */

/* ---------------------------------------------------------------
  SCHEMA 1 — User
  ----------------
  Defines the shape of a user document in the "users" collection.

  Each field can have:
  type     → the data type (required for every field)
  required → if true, the field MUST be present or save will fail
  unique   → no two documents can have the same value for this field
  default  → value used automatically if none is provided
  trim     → removes extra whitespace from strings
  lowercase→ converts string to lowercase before saving
  min/max  → minimum and maximum values for Numbers or string lengths
---------------------------------------------------------------- */
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,   // must be provided
            trim: true,   // removes spaces like "  Alice  " → "Alice"
        },
        email: {
            type: String,
            required: true,
            unique: true,  // no two users can have the same email
            lowercase: true,  // "Alice@TEST.com" → saved as "alice@test.com"
        },
        age: {
            type: Number,
            min: 0,       // age cannot be negative
            max: 120,
            default: 0,       // used if age is not provided
        },
        isActive: {
            type: Boolean,
            default: true,    // new users are active by default
        },
        tags: {
            type: [String], // an array of strings e.g. ["admin", "editor"]
            default: [],
        },
        createdAt: {
            type: Date,
            default: Date.now, // automatically set to current date/time
        },
    },
    {
        timestamps: true, // auto-adds createdAt and updatedAt to every document
    }
);

/* ---------------------------------------------------------------
  SCHEMA 2 — Product
  -------------------
  Another example schema to show how different data looks.
  Each model maps to its own collection in MongoDB.
---------------------------------------------------------------- */
const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
        category: {
            type: String,
            enum: ["electronics", "clothing", "food", "books"], // only these values are allowed
        },
    },
    {
        timestamps: true,
    }
);

/* ---------------------------------------------------------------
  MODELS
  -------
  A Model is created from a Schema using mongoose.model().
  First argument  → name of the model (becomes collection name)
  Second argument → the schema to use

  "User"    → "users"    collection in MongoDB
  "Product" → "products" collection in MongoDB
---------------------------------------------------------------- */
const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

/* ---------------------------------------------------------------
  ROUTES — testing our schemas work correctly
---------------------------------------------------------------- */

/*
  POST /users
  ------------
  Creates a new user using the User model.
  Mongoose validates the data against the schema before saving.
  If a required field is missing or a rule is broken → error.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/users
  - Body → raw → JSON: { "name": "Alice", "email": "alice@test.com", "age": 25 }
  - Try without "name" → see the validation error
  - Try with "age": -5 → see the min validation error
*/
app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/*
  POST /products
  ---------------
  Creates a new product. The "category" field only accepts
  the values defined in the enum array.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/products
  - Body → raw → JSON: { "title": "Laptop", "price": 999, "category": "electronics" }
  - Try with "category": "toys" → not in enum → validation error
*/
app.post("/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/*
  GET /users
  -----------
  Fetches all users saved in the database.
  Test in browser → http://localhost:3000/users
*/
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});