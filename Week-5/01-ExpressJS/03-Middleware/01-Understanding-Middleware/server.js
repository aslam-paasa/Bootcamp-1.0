/*
  ASSIGNMENT 8 — What is Middleware
  ===================================

  WHAT IS MIDDLEWARE?
  Middleware is a function that runs BETWEEN the request and response.
  It sits in the middle — after the request comes in, but before
  your route handler sends a response.

  FLOW WITHOUT middleware:
  Request → Route Handler → Response

  FLOW WITH middleware:
  Request → Middleware → Route Handler → Response

  You can have MULTIPLE middleware functions running one after another:
  Request → Middleware1 → Middleware2 → Middleware3 → Route → Response

  WHAT CAN MIDDLEWARE DO?
  - Log every incoming request (who visited, when, which URL)
  - Check if the user is logged in before allowing access
  - Parse the request body (express.json() is actually middleware!)
  - Stop the request early and send a response (e.g. block unauthorized users)
  - Modify req or res and pass them forward

  SYNTAX OF A MIDDLEWARE FUNCTION:
  ---------------------------------
  const myMiddleware = (req, res, next) => {
                                    ↑
                          This is the key difference!
                          Middleware has a 3rd argument: next()
                          Calling next() passes control to the
                          next middleware or route handler.
                          If you forget next() → request gets stuck!
  }

  HOW TO USE MIDDLEWARE:
  ----------------------
  app.use(myMiddleware)       → runs for ALL routes
  app.use("/users", myMiddleware) → runs only for /users routes
  app.get("/", myMiddleware, routeHandler) → runs only for this one route

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express
  node assignment-08.js
*/

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

/* ---------------------------------------------------------------
  MIDDLEWARE 1 — Logger
  ----------------------
  Logs every incoming request to the terminal.
  Runs for ALL routes because we use app.use() with no path.

  After logging, it calls next() to pass control
  to the next middleware or the matching route.
---------------------------------------------------------------- */
const logger = (req, res, next) => {
  const time   = new Date().toLocaleTimeString();
  const method = req.method;
  const url    = req.url;
  console.log(`[${time}] ${method} ${url}`);
  next(); // pass control forward — NEVER forget this!
};

app.use(logger); // attach to ALL routes

/* ---------------------------------------------------------------
  MIDDLEWARE 2 — Block a specific IP
  ------------------------------------
  Middleware can also STOP a request from going further.
  If a condition is met, we send a response immediately
  and do NOT call next() — so the route handler never runs.

  Here we simulate blocking a banned IP address.
---------------------------------------------------------------- */
const blockBannedIP = (req, res, next) => {
  const bannedIP = "192.168.1.99";
  const clientIP = req.ip;

  if (clientIP === bannedIP) {
    return res.status(403).json({ error: "Your IP is banned." });
  }

  next(); // IP is fine, continue
};

app.use(blockBannedIP);

/* ---------------------------------------------------------------
  MIDDLEWARE 3 — Attach extra info to req
  -----------------------------------------
  Middleware can ADD data to the req object so that
  route handlers can use it later.

  Here we attach a requestTime to every request.
  Any route can then access req.requestTime.
---------------------------------------------------------------- */
const attachTime = (req, res, next) => {
  req.requestTime = new Date().toISOString(); // add data to req
  next();
};

app.use(attachTime);

/* ---------------------------------------------------------------
  MIDDLEWARE 4 — Route-level Middleware
  ---------------------------------------
  Instead of app.use(), you can pass middleware directly
  into a specific route as a second argument.
  This middleware runs ONLY for that one route.
---------------------------------------------------------------- */
const checkPassword = (req, res, next) => {
  const password = req.headers["x-password"];

  if (password !== "secret123") {
    return res.status(401).json({ error: "Wrong password in header!" });
  }

  next(); // password correct, continue to route handler
};

/* ---------------------------------------------------------------
  ROUTES
---------------------------------------------------------------- */

/*
  GET /
  ------
  Simple home route. The logger and attachTime middleware
  already ran before this, so req.requestTime is available.
*/
app.get("/", (req, res) => {
  res.json({
    message    : "Home route",
    requestTime: req.requestTime,
  });
});

/*
  GET /about
  -----------
  Another normal route. Every middleware above runs before this.
*/
app.get("/about", (req, res) => {
  res.json({ message: "About route", requestTime: req.requestTime });
});

/*
  GET /secret
  ------------
  This route has checkPassword as route-level middleware.
  Only runs if the correct password header is provided.

  Test in Postman:
  - Method: GET
  - URL: http://localhost:3000/secret
  - Headers: Key = x-password, Value = secret123
*/
app.get("/secret", checkPassword, (req, res) => {
  res.json({ message: "You passed the middleware! Here is the secret: 42" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});