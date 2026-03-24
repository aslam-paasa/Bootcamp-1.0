/*
  ASSIGNMENT 10 — Custom Middleware: Writing your own (logger, auth guard)
  =========================================================================

  WHAT IS CUSTOM MIDDLEWARE?
  Custom middleware is a function YOU write yourself.
  Just like built-in middleware (express.json), your middleware
  runs between the request and response.

  STRUCTURE OF A MIDDLEWARE FUNCTION:
  ------------------------------------
  const myMiddleware = (req, res, next) => {
    // do something with req or res
    next(); // pass control to the next middleware or route
  };

  The 3 arguments:
  req  → the incoming request (you can read or add data to it)
  res  → the response (you can send a response and STOP the chain)
  next → a function — calling it moves to the next step
         NOT calling it = request gets stuck forever!

  TWO TYPES OF CUSTOM MIDDLEWARE:
  --------------------------------
  1. Global  → app.use(myMiddleware) → runs for EVERY request
  2. Local   → app.get("/route", myMiddleware, handler) → runs for ONE route

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express
  node assignment-10.js
*/

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

/* ---------------------------------------------------------------
  CUSTOM MIDDLEWARE 1 — Logger
  ------------------------------
  Logs every request to the terminal with:
  - The time it happened
  - The HTTP method (GET, POST, etc.)
  - The URL that was requested

  This is GLOBAL middleware — runs for every single request.
  Very useful for debugging and monitoring your server.
---------------------------------------------------------------- */
const logger = (req, res, next) => {
    const time = new Date().toLocaleTimeString();
    const method = req.method;
    const url = req.url;

    console.log(`[${time}] ${method} ${url}`);

    next(); // always call next() in logger, we never want to block
};

app.use(logger); // attach globally — runs for ALL routes

/* ---------------------------------------------------------------
  CUSTOM MIDDLEWARE 2 — Auth Guard
  ----------------------------------
  Protects routes from unauthenticated users.
  Checks for a token in the request headers.

  In real apps this token would be a JWT (covered later).
  For now we just check for a hardcoded token value.

  If the token is missing or wrong → send 401 and STOP.
  If the token is correct → call next() and allow access.

  This is LOCAL middleware — we attach it only to
  specific routes that need protection.
---------------------------------------------------------------- */
const authGuard = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    if (token !== "Bearer mysecrettoken") {
        return res.status(401).json({ error: "Access denied. Invalid token." });
    }

    next(); // token is valid, allow the request to continue
};

/* ---------------------------------------------------------------
  CUSTOM MIDDLEWARE 3 — Request Timer
  -------------------------------------
  Measures how long it takes for a route to respond.
  Attaches a startTime to req when the request comes in.
  After the route sends a response, logs the time taken.

  This uses a clever trick: res.on("finish") is an event
  that fires automatically AFTER the response is sent.
---------------------------------------------------------------- */
const requestTimer = (req, res, next) => {
    const start = Date.now(); // record start time in milliseconds

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`Request to ${req.url} took ${duration}ms`);
    });

    next();
};

app.use(requestTimer); // attach globally

/* ---------------------------------------------------------------
  CUSTOM MIDDLEWARE 4 — Validate Body
  -------------------------------------
  Checks if required fields are present in req.body
  before the route handler runs.

  Instead of repeating validation logic in every route,
  we write it once as middleware and reuse it.
---------------------------------------------------------------- */
const validateUserBody = (req, res, next) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "name and email are required in body." });
    }

    next(); // body is valid, continue to route handler
};

/* ---------------------------------------------------------------
  ROUTES
---------------------------------------------------------------- */

/*
  GET /
  ------
  Public route — no auth needed.
  Logger and requestTimer middleware still run for this route.
*/
app.get("/", (req, res) => {
    res.json({ message: "Public home route. No auth needed." });
});

/*
  GET /dashboard
  ---------------
  Protected route — authGuard runs before the handler.
  If token is missing or wrong → blocked at middleware, never reaches here.

  Test in Postman:
  - Method: GET
  - URL: http://localhost:3000/dashboard
  - WITHOUT header → 401 error
  - WITH header → Key: Authorization, Value: Bearer mysecrettoken → success
*/
app.get("/dashboard", authGuard, (req, res) => {
    res.json({ message: "Welcome to your dashboard! You are authenticated." });
});

/*
  GET /settings
  --------------
  Another protected route — same authGuard middleware reused.
  This shows the power of custom middleware: write once, use anywhere.

  Test in Postman with same Authorization header as above.
*/
app.get("/settings", authGuard, (req, res) => {
    res.json({ message: "These are your settings. Protected route." });
});

/*
  POST /users
  ------------
  Uses validateUserBody middleware to check req.body
  before the route handler runs.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/users
  - Body → raw → JSON: { "name": "Alice", "email": "alice@test.com" }
  - Try sending without name or email → see the validation error
*/
app.post("/users", validateUserBody, (req, res) => {
    res.status(201).json({ message: "User created!", user: req.body });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});