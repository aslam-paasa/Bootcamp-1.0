/*
  ASSIGNMENT 22 — Cookies & Sessions: Alternative Auth Methods
  =============================================================

  SO FAR WE USED JWT — WHY LEARN COOKIES & SESSIONS?
  JWT stores the user info INSIDE the token on the CLIENT side.
  Cookies & Sessions store the user info on the SERVER side.
  Both are valid auth methods — different apps use different ones.

  WHAT IS A COOKIE?
  A cookie is a small piece of data the SERVER sends to the browser.
  The browser AUTOMATICALLY stores it and sends it back
  with EVERY future request to the same server.

  You do not need to manually attach it like JWT headers.
  The browser handles sending it automatically.

  Server → res.cookie("name", "value") → browser stores it
  Browser → sends cookie automatically on every request
  Server  → reads it via req.cookies

  WHAT IS A SESSION?
  A session is data stored on the SERVER that is tied to a user.
  When a user logs in, the server:
  1. Creates a session object in memory (or a database)
  2. Gives it a unique session ID
  3. Sends that session ID to the browser as a COOKIE

  On every future request:
  - Browser sends the session ID cookie
  - Server looks up the session by that ID
  - Server finds the stored user data

  COOKIE vs JWT COMPARISON:
  --------------------------
  JWT (Token-based):
  → User data stored IN the token on the client
  → Server is stateless — does not store anything
  → Token sent manually in Authorization header
  → Good for APIs and mobile apps

  Cookie + Session (Session-based):
  → User data stored ON the server
  → Server must remember every session (stateful)
  → Cookie sent automatically by the browser
  → Good for traditional web apps

  PACKAGES USED:
  ---------------
  cookie-parser  → lets Express read cookies from req.cookies
  express-session → manages sessions automatically

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express mongoose dotenv bcrypt cookie-parser express-session
  node assignment-22.js

  .env file:
  MONGO_URI=your_mongodb_connection_string
  SESSION_SECRET=your_session_secret_here
*/

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());

/*
  cookie-parser middleware
  -------------------------
  Parses cookies from the request and makes them available
  in req.cookies. Without this, req.cookies is undefined.
*/
app.use(cookieParser());

/*
  express-session middleware
  ---------------------------
  Manages sessions automatically.

  secret     → used to sign the session ID cookie (keep in .env)
  resave     → false = do not re-save session if nothing changed
  saveUninitialized → false = do not save empty sessions

  By default, sessions are stored IN MEMORY.
  This means sessions are lost when the server restarts.
  In production, use a session store like connect-mongo to
  save sessions in MongoDB so they survive restarts.
*/
app.use(session({
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,  // JavaScript cannot read this cookie (safer)
        maxAge: 1000 * 60 * 60 * 24, // cookie expires in 24 hours (ms)
    },
}));

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
  MIDDLEWARE — requireSession
  ----------------------------
  Protects routes using session-based auth.
  Instead of checking a JWT token, we check if req.session.userId
  exists — which means the user has logged in.

  If session exists   → user is logged in → next()
  If session is empty → user is not logged in → 401
---------------------------------------------------------------- */
const requireSession = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Not logged in. Please login first." });
    }
    next();
};

/* ---------------------------------------------------------------
  ROUTES
---------------------------------------------------------------- */

/*
  POST /register
  ---------------
  Register a new user. Same as before with hashed password.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/register
  - Body → raw → JSON:
    { "name": "Alice", "email": "alice@test.com", "password": "hello123" }
*/
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });
        res.status(201).json({ message: "Registered!", user: { id: user._id, name: user.name } });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/*
  POST /login/session — Session-based login
  ------------------------------------------
  After verifying credentials, instead of creating a JWT,
  we store the userId directly on the session object:
  req.session.userId = user._id

  express-session then:
  1. Creates a unique session ID
  2. Stores the session data on the server
  3. Sends a "connect.sid" cookie to the browser with the session ID

  From now on, the browser sends that cookie automatically
  and the server can look up the session to find the userId.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/login/session
  - Body → raw → JSON: { "email": "alice@test.com", "password": "hello123" }
  - After login, check Postman cookies tab — you will see "connect.sid"
*/
app.post("/login/session", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) return res.status(404).json({ error: "User not found." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Incorrect password." });

        /*
          Save user info to the session.
          This data lives on the SERVER.
          The browser only gets the session ID (inside the cookie).
        */
        req.session.userId = user._id;
        req.session.name = user.name;

        res.json({ message: "Logged in via session!", name: user.name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
  POST /login/cookie — Cookie-based login (manual)
  --------------------------------------------------
  Instead of using sessions, we store data DIRECTLY in the cookie.
  Here we store the userId as a plain cookie value.

  NOTE: This is simpler but LESS secure than sessions because
  cookie data can be read by the client.
  For sensitive data, always use httpOnly + signed cookies or sessions.

  res.cookie(name, value, options) sends a cookie to the browser.
  httpOnly: true → browser JS cannot read the cookie
  maxAge       → cookie expiry in milliseconds

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/login/cookie
  - Body → raw → JSON: { "email": "alice@test.com", "password": "hello123" }
  - After login, check Postman cookies tab — you will see "userId"
*/
app.post("/login/cookie", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) return res.status(404).json({ error: "User not found." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Incorrect password." });

        /*
          Set a cookie on the response.
          The browser will store this and send it automatically
          with every future request to this server.
        */
        res.cookie("userId", user._id.toString(), {
            httpOnly: true,                   // not readable by browser JS
            maxAge: 1000 * 60 * 60 * 24,   // 24 hours in milliseconds
        });

        res.json({ message: "Logged in via cookie!", name: user.name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
  GET /profile/session — Protected via session
  ---------------------------------------------
  requireSession checks if req.session.userId exists.
  If it does, we use it to fetch the user from the DB.

  The browser sends the session ID cookie automatically —
  you do NOT need to set any Authorization header in Postman.
  Just make sure cookies are enabled in Postman.

  Test in Postman:
  - Login via /login/session first
  - Method: GET
  - URL: http://localhost:3000/profile/session
  - No headers needed — Postman sends the cookie automatically!
*/
app.get("/profile/session", requireSession, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.json({ message: "Session profile", user, sessionData: req.session });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
  GET /profile/cookie — Protected via cookie
  -------------------------------------------
  We read req.cookies.userId which cookie-parser makes available.
  This is the userId we stored in the cookie during login.

  Test in Postman:
  - Login via /login/cookie first
  - Method: GET
  - URL: http://localhost:3000/profile/cookie
  - Cookie is sent automatically by Postman — no header needed!
*/
app.get("/profile/cookie", async (req, res) => {
    try {
        const userId = req.cookies.userId; // read from cookie

        if (!userId) {
            return res.status(401).json({ error: "Not logged in. No cookie found." });
        }

        const user = await User.findById(userId);
        res.json({ message: "Cookie profile", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/*
  POST /logout
  -------------
  Destroy the session and clear all cookies.

  req.session.destroy() removes the session from the server.
  res.clearCookie() tells the browser to delete the cookie.

  After this, any request to a protected route will be blocked.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/logout
  - Then try GET /profile/session → should get 401
*/
app.post("/logout", (req, res) => {
    req.session.destroy(); // remove session from server
    res.clearCookie("connect.sid"); // clear the session cookie
    res.clearCookie("userId");      // clear the manual cookie
    res.json({ message: "Logged out successfully!" });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});