/*
  ASSIGNMENT 19 — JWT (JSON Web Tokens): Login Tokens, How Auth Works
  =====================================================================

  THE PROBLEM JWT SOLVES:
  HTTP is STATELESS — every request is independent.
  The server forgets who you are between requests.

  So after logging in, how does the server know it's YOU
  on the next request? It cannot remember!

  THE SOLUTION — JWT:
  After a successful login, the server creates a TOKEN
  and sends it to the client. The client then sends this
  token with EVERY future request. The server reads the
  token to know who is making the request.

  WHAT IS A JWT?
  A JWT is a long encoded string split into 3 parts by dots:
  eyJhbGci.eyJ1c2VySWQiOiI2NC.SflKxwRJSMeKKF2QT4

  Part 1 — Header  : algorithm used to sign the token
  Part 2 — Payload : the actual data (userId, email, role...)
  Part 3 — Signature: proves the token has not been tampered with

  The payload is BASE64 ENCODED — not encrypted!
  Anyone can decode and read it.
  NEVER put passwords or secrets in the JWT payload.

  HOW AUTH WORKS STEP BY STEP:
  ------------------------------
  1. User sends email + password → POST /login
  2. Server checks credentials → if correct:
  3. Server creates a JWT containing the userId
  4. Server sends the JWT back to the client
  5. Client stores it (localStorage or a cookie)
  6. On every future request, client sends:
     Header → Authorization: Bearer <token>
  7. Server reads the token, verifies it, extracts userId
  8. Server knows who the user is — request is allowed

  HOW THE CLIENT SAVES THE TOKEN:
  ---------------------------------
  After login the server returns a token in the response.
  The CLIENT (browser/React/mobile app) is responsible for
  saving it. There are two common ways:

  Option A — localStorage (simple, common for learning):
  --------------------------------------------------------
  localStorage.setItem("token", token)
  → Saved in the browser until manually cleared.
  → Easy to use but slightly less secure (vulnerable to XSS).

  Option B — HTTP-only Cookie (more secure, used in production):
  ---------------------------------------------------------------
  The server sends the token inside a cookie:
  res.cookie("token", token, { httpOnly: true })
  → The browser stores and sends it automatically.
  → JavaScript cannot read it — safer against attacks.

  For this assignment we use localStorage / Postman headers.

  HOW THE CLIENT SENDS THE TOKEN ON EVERY REQUEST:
  --------------------------------------------------
  The client reads the saved token and puts it in the
  Authorization header of every request to a protected route:

  fetch("/profile", {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  })

  The format is ALWAYS:  Authorization: Bearer <token>
                                          ↑
                              the word "Bearer" is required

  HOW THE SERVER PICKS UP AND READS THE TOKEN:
  ---------------------------------------------
  Inside the verifyToken middleware, the server does this:

  Step 1: Read the header
          req.headers["authorization"] → "Bearer eyJhbGci..."

  Step 2: Split by space, take index [1]
          "Bearer eyJhbGci...".split(" ")[1] → "eyJhbGci..."

  Step 3: Verify the token
          jwt.verify(token, secret) → checks it is valid and not expired

  Step 4: Get back the payload
          → { userId: "64abc123..." }

  Step 5: Attach it to req
          req.user = decoded → now every route after this
          can access req.user.userId to know WHO is logged in

  This is how the server identifies the user on every request
  without storing any session — the token carries the identity!

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express mongoose dotenv bcrypt jsonwebtoken
  node assignment-19.js

  .env file:
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_super_secret_key_here
*/

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
---------------------------------------------------------------- */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
});

const User = mongoose.model("User", userSchema);

/* ---------------------------------------------------------------
  HELPER — generateToken
  -----------------------
  jwt.sign(payload, secret, options) creates a JWT.

  payload  → data you want to store inside the token (userId here)
             Keep it small — only store what you need.
  secret   → a private key used to SIGN the token.
             Anyone with this key can create valid tokens,
             so keep it in your .env file and never share it.
  expiresIn→ how long the token is valid.
             After expiry, the token is rejected automatically.
             "7d" = 7 days, "1h" = 1 hour, "30m" = 30 minutes.
---------------------------------------------------------------- */
const generateToken = (userId) => {
    return jwt.sign(
        { userId },                    // payload — what to store in the token
        process.env.JWT_SECRET,        // secret key from .env
        { expiresIn: "7d" }            // token expires in 7 days
    );
};

/* ---------------------------------------------------------------
  MIDDLEWARE — verifyToken (Auth Guard)
  --------------------------------------
  This middleware protects routes that require login.
  It reads the token from the Authorization header,
  verifies it is valid, and attaches the decoded data to req.

  The Authorization header format is:
  Authorization: Bearer eyJhbGci...
                 ↑       ↑
              prefix   the actual token

  We split by " " and take the second part to get the token.

  jwt.verify(token, secret) does two things:
  1. Checks the token has not been tampered with
  2. Checks the token has not expired
  If either fails → it throws an error → we return 401.
  If both pass   → it returns the decoded payload → { userId: "..." }
---------------------------------------------------------------- */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // get the part after "Bearer "

    if (!token) {
        return res.status(401).json({ error: "Access denied. Token missing." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach decoded payload { userId } to req
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

/* ---------------------------------------------------------------
  ROUTES
---------------------------------------------------------------- */

/*
  POST /register
  ---------------
  Registers a new user with a hashed password.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/register
  - Body → raw → JSON:
    { "name": "Alice", "email": "alice@test.com", "password": "hello123" }
*/
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "name, email and password are required." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            message: "Registered successfully!",
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/*
  POST /login
  ------------
  Checks credentials and returns a JWT if valid.
  The client must store this token and send it with future requests.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/login
  - Body → raw → JSON:
    { "email": "alice@test.com", "password": "hello123" }

  Copy the token from the response — you will need it below!
*/
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({ error: "No user found with this email." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        // Credentials are correct — create and return a JWT
        const token = generateToken(user._id);

        res.json({
            message: "Login successful!",
            token,  // send the token to the client
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
  GET /profile
  -------------
  A PROTECTED route — only accessible with a valid JWT.
  verifyToken middleware runs first and checks the token.
  If valid → req.user contains { userId } → we use it to fetch the user.

  Test in Postman:
  - Method: GET
  - URL: http://localhost:3000/profile
  - Headers → Key: Authorization  Value: Bearer <paste_your_token_here>

  ❌ Without token  → 401 Access denied
  ❌ With fake token → 401 Invalid or expired token
  ✅ With valid token → returns your profile data
*/
app.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.json({ message: "Here is your profile!", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
  GET /dashboard
  ---------------
  Another protected route — reusing the same verifyToken middleware.
  Write once, protect as many routes as you need.

  Test in Postman with same Authorization header as /profile.
*/
app.get("/dashboard", verifyToken, (req, res) => {
    res.json({
        message: "Welcome to your dashboard!",
        userId: req.user.userId,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});