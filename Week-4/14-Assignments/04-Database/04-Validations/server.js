/*
  ASSIGNMENT 16 — Validation: Required Fields, Types, Custom Validators
  ======================================================================

  WHAT IS VALIDATION?
  Validation is a set of RULES you define on your Schema.
  Before Mongoose saves any data to MongoDB, it checks these rules.
  If any rule is broken → Mongoose throws a ValidationError
  and the document is NOT saved.

  WHY IS VALIDATION IMPORTANT?
  Without validation, anyone can send bad data to your API:
  - Empty strings as names
  - Negative prices for products
  - Invalid email formats
  - Age of 99999

  Validation protects your database from dirty/invalid data.

  WHERE TO VALIDATE?
  There are two layers of validation:
  1. Schema-level  → Mongoose validates before saving (this assignment)
  2. Route-level   → You manually check req.body before even calling Mongoose

  Both layers together give you the strongest protection.

  TYPES OF MONGOOSE VALIDATORS:
  --------------------------------
  required      → field must be present
  type          → value must be a specific type (String, Number, etc.)
  min / max     → minimum and maximum value for Numbers
  minlength / maxlength → min and max length for Strings
  enum          → value must be one of a specific list
  match         → value must match a regular expression (regex)
  Custom        → a function you write yourself with any logic

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express mongoose dotenv
  node assignment-16.js

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
  SCHEMA WITH FULL VALIDATION
  ----------------------------
  Every field below demonstrates a different type of validator.
  Read the comment above each field to understand what it does.
---------------------------------------------------------------- */
const userSchema = new mongoose.Schema({

    /*
      required → field MUST be present in the data.
      If missing → "Path `name` is required." error.
  
      You can also pass an array [true, "custom message"]
      to customise the error message shown.
    */
    name: {
        type: String,
        required: [true, "Name is required."],
        trim: true,
    },

    /*
      match → validates using a regular expression (regex).
      This regex checks if the email has the "@" and "." pattern.
      If it does not match → validation fails.
  
      required + match together ensure email is present AND valid.
    */
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
    },

    /*
      min / max → only for Number type.
      min ensures age is not negative.
      max ensures age is not unrealistically large.
    */
    age: {
        type: Number,
        min: [1, "Age must be at least 1."],
        max: [120, "Age cannot exceed 120."],
    },

    /*
      minlength / maxlength → only for String type.
      Ensures password is between 6 and 20 characters long.
    */
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password must be at least 6 characters."],
        maxlength: [20, "Password cannot exceed 20 characters."],
    },

    /*
      enum → value must be one of the listed options.
      Sending any other value will fail validation.
    */
    role: {
        type: String,
        enum: {
            values: ["user", "admin", "moderator"],
            message: "Role must be user, admin, or moderator.",
        },
        default: "user",
    },

    /*
      CUSTOM VALIDATOR
      -----------------
      When built-in validators are not enough, you write your own
      using the "validate" property.
  
      validate.validator → a function that receives the value.
                           Return true  → validation passes.
                           Return false → validation fails.
      validate.message   → the error message if validation fails.
  
      Here we check that a username contains only letters and numbers
      (no spaces or special characters).
    */
    username: {
        type: String,
        required: [true, "Username is required."],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9]+$/.test(value); // only letters and numbers allowed
            },
            message: "Username can only contain letters and numbers. No spaces or special characters.",
        },
    },

});

const User = mongoose.model("User", userSchema);

/* ---------------------------------------------------------------
  ROUTES
---------------------------------------------------------------- */

/*
  POST /users
  ------------
  Tries to create a user with the data from req.body.
  Mongoose runs all validators before saving.
  If any validator fails → err.message contains the details.

  Test in Postman — try these bodies one at a time:

  ✅ Valid data (should save):
  {
    "name": "Alice",
    "email": "alice@test.com",
    "age": 25,
    "password": "pass123",
    "username": "alice99"
  }

  ❌ Missing name (required fails):
  { "email": "alice@test.com", "password": "pass123", "username": "alice99" }

  ❌ Invalid email (match fails):
  { "name": "Alice", "email": "notanemail", "password": "pass123", "username": "alice99" }

  ❌ Age too low (min fails):
  { "name": "Alice", "email": "alice@test.com", "age": -5, "password": "pass123", "username": "alice99" }

  ❌ Password too short (minlength fails):
  { "name": "Alice", "email": "alice@test.com", "password": "abc", "username": "alice99" }

  ❌ Invalid role (enum fails):
  { "name": "Alice", "email": "alice@test.com", "password": "pass123", "username": "alice99", "role": "superuser" }

  ❌ Username with special chars (custom validator fails):
  { "name": "Alice", "email": "alice@test.com", "password": "pass123", "username": "alice 99!" }
*/
app.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: "User created successfully!", user });
    } catch (err) {
        /*
          Mongoose ValidationError contains an "errors" object
          with one entry per failing field.
          We extract all the messages and send them back clearly.
        */
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ error: messages });
        }
        res.status(500).json({ error: err.message });
    }
});

/*
  GET /users
  -----------
  Returns all users saved in the database.
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