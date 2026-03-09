/*
  ASSIGNMENT 11 — Third-Party Middleware: cors, morgan, helmet
  =============================================================

  WHAT IS THIRD-PARTY MIDDLEWARE?
  Third-party middleware is middleware written by other developers
  and published on npm. You install it and plug it into your app
  with app.use() — just like built-in middleware.

  We will cover 3 of the most popular ones:

  1. morgan  → Logs every HTTP request in a clean, formatted way
  2. cors    → Allows your frontend (React/Vue) to talk to your backend
  3. helmet  → Adds security headers to protect your app from attacks

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express morgan cors helmet
  node assignment-11.js
*/

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

/* ---------------------------------------------------------------
  THIRD-PARTY MIDDLEWARE 1 — morgan (HTTP Request Logger)
  ---------------------------------------------------------
  morgan automatically logs every incoming request to the terminal.
  It is similar to the custom logger we wrote in assignment 10,
  but much more powerful and configurable.

  morgan has preset log formats:
  "dev"      → colored, concise output — best for development
  "tiny"     → minimal output
  "combined" → full Apache-style log — best for production

  Example "dev" output in terminal:
  GET /users 200 5.123 ms - 85

  Install: npm install morgan
---------------------------------------------------------------- */
const morgan = require("morgan");

app.use(morgan("dev")); // log every request in dev format

/* ---------------------------------------------------------------
  THIRD-PARTY MIDDLEWARE 2 — cors (Cross-Origin Resource Sharing)
  ----------------------------------------------------------------
  CORS is a browser security rule that BLOCKS requests
  coming from a different domain (origin) than your server.

  Example of the problem:
  Your backend  → http://localhost:3000
  Your frontend → http://localhost:5173 (React/Vite)

  The browser sees these as DIFFERENT origins and blocks
  the frontend from calling your backend API.
  This is why you get "CORS error" in the browser console.

  The cors package adds special headers to your response
  that tell the browser: "This origin is allowed — let it through."

  OPTIONS:
  cors()                    → allow ALL origins (open to everyone)
  cors({ origin: "URL" })   → allow ONLY a specific frontend URL

  Install: npm install cors
---------------------------------------------------------------- */
const cors = require("cors");

// Allow ALL origins — fine for development
app.use(cors());

// For production, restrict to your actual frontend URL like this:
// app.use(cors({ origin: "https://my-frontend.com" }));

/* ---------------------------------------------------------------
  THIRD-PARTY MIDDLEWARE 3 — helmet (Security Headers)
  ------------------------------------------------------
  helmet protects your app by setting HTTP response headers
  that guard against common web attacks such as:

  - XSS (Cross-Site Scripting) — injecting malicious scripts
  - Clickjacking — tricking users into clicking hidden elements
  - Sniffing attacks — guessing content types to exploit them

  helmet sets about 14 security headers automatically.
  You do not need to configure anything — just plug it in.
  It is considered a best practice for every Express app.

  Install: npm install helmet
---------------------------------------------------------------- */
const helmet = require("helmet");

app.use(helmet()); // adds all security headers automatically

/* ---------------------------------------------------------------
  ROUTES
  -------
  All three middleware above (morgan, cors, helmet) now run
  automatically for every request before reaching these routes.
---------------------------------------------------------------- */

/*
  GET /
  ------
  Visit in browser and watch morgan log the request in the terminal.
  Check browser DevTools → Network → Response Headers to see
  all the security headers helmet added.
*/
app.get("/", (req, res) => {
    res.json({ message: "Home route — morgan, cors, and helmet are all active!" });
});

/*
  GET /users
  -----------
  This is the kind of route your React frontend would call.
  Without cors middleware, the browser would block this request.
  With cors, it goes through smoothly.
*/
app.get("/users", (req, res) => {
    const users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
    ];
    res.json(users);
});

/*
  POST /data
  -----------
  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/data
  - Body → raw → JSON: { "title": "Hello" }
  - Check terminal for morgan log output
*/
app.post("/data", (req, res) => {
    res.status(201).json({ message: "Data received!", body: req.body });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});