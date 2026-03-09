/*
  ASSIGNMENT 18 — Password Hashing: bcrypt — Never Store Plain Passwords
  ========================================================================

  WHY NEVER STORE PLAIN PASSWORDS?
  If someone hacks your database and passwords are stored as plain text:
  "password123" → they can instantly log in as any user!

  The solution is HASHING — converting the password into a
  scrambled string that cannot be reversed back.

  Plain:  "password123"
  Hashed: "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"

  Even if a hacker steals the hash, they cannot reverse it
  back to "password123". It is a ONE-WAY transformation.

  WHAT IS bcrypt?
  bcrypt is an npm package that handles password hashing for you.
  It uses a slow, secure algorithm specifically designed for passwords.

  TWO MAIN METHODS:
  -----------------
  bcrypt.hash(password, saltRounds)
  → Takes a plain password and returns a hashed string.
  → saltRounds controls how many times the password is scrambled.
    10 is the standard — high enough to be secure, not too slow.

  bcrypt.compare(plainPassword, hashedPassword)
  → Compares a plain password with a stored hash.
  → Returns true if they match, false if they do not.
  → You NEVER unhash — you always re-hash and compare.

  FLOW:
  -----
  REGISTER: receive password → hash it → save the hash to DB
  LOGIN:    receive password → compare with stored hash → allow or deny

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express mongoose dotenv bcrypt
  node assignment-18.js

  .env file:
  MONGO_URI=your_mongodb_connection_string
*/

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("Connection failed:", err.message));

/* ---------------------------------------------------------------
  SCHEMA — User
  --------------
  The password field stores the HASH, not the plain password.
  We also use "select: false" on password so it is never
  accidentally returned in GET requests.
---------------------------------------------------------------- */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    /*
      select: false means this field is EXCLUDED from query results
      by default. This prevents accidentally sending the hashed
      password to the client in responses like GET /users.
    */
});

const User = mongoose.model("User", userSchema);

/* ---------------------------------------------------------------
  REGISTER — POST /register
  --------------------------
  Step 1: Receive the plain password from req.body
  Step 2: Hash it with bcrypt.hash()
  Step 3: Save the HASH to the database — never the plain password

  saltRounds = 10 means bcrypt scrambles the password 10 times.
  More rounds = more secure but slightly slower.
  10 is the recommended standard for most apps.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/register
  - Body → raw → JSON:
    { "name": "Alice", "email": "alice@test.com", "password": "hello123" }

  After saving, check MongoDB — you will see the hashed password,
  NOT "hello123". That is what we want!
---------------------------------------------------------------- */
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "name, email and password are required." });
        }

        // Hash the password before saving — NEVER save plain text
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            name,
            email,
            password: hashedPassword, // store the hash, not "hello123"
        });

        res.status(201).json({
            message: "User registered successfully!",
            user: { id: user._id, name: user.name, email: user.email },
            // Notice: we do NOT return the password in the response
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/* ---------------------------------------------------------------
  LOGIN — POST /login
  --------------------
  Step 1: Find the user by email
  Step 2: Use bcrypt.compare() to check if the plain password
          matches the stored hash
  Step 3: Allow or deny access

  bcrypt.compare() re-hashes the incoming password the same way
  and checks if the result matches the stored hash.
  You NEVER need to "decrypt" — bcrypt handles the comparison.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/login

  ✅ Correct credentials:
  { "email": "alice@test.com", "password": "hello123" }

  ❌ Wrong password:
  { "email": "alice@test.com", "password": "wrongpassword" }

  ❌ User does not exist:
  { "email": "nobody@test.com", "password": "hello123" }
---------------------------------------------------------------- */
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "email and password are required." });
        }

        /*
          We use .select("+password") to explicitly include the password
          field in this query — because we set select: false on the schema.
          We need it here to compare with the incoming password.
        */
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({ error: "No user found with this email." });
        }

        /*
          bcrypt.compare(plainPassword, hashedPassword)
          Returns true  → passwords match → login success
          Returns false → passwords do not match → deny access
        */
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        res.json({
            message: "Login successful!",
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
  GET /users
  -----------
  Returns all users. Notice password is NOT included in the
  response because we set "select: false" on the schema.

  Test in browser → http://localhost:3000/users
*/
app.get("/users", async (req, res) => {
    try {
        const users = await User.find(); // password is excluded automatically
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});