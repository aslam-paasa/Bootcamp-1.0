/*
  ASSIGNMENT 12 — Error Handling Middleware: Catching Errors Globally
  ====================================================================

  WHAT IS ERROR HANDLING MIDDLEWARE?
  Error handling middleware is a special middleware that catches
  errors from anywhere in your app and handles them in ONE place.

  Without it:
  - If a route crashes → your entire server might crash too
  - Every route would need its own try/catch block
  - Error responses would be inconsistent across routes

  With it:
  - Errors are caught globally in one place
  - Server never crashes from an unhandled error
  - All error responses have a consistent format

  HOW IT IS DIFFERENT FROM REGULAR MIDDLEWARE:
  Regular middleware  → 3 arguments: (req, res, next)
  Error middleware    → 4 arguments: (err, req, res, next)
                                      ↑
                              The extra "err" argument at the
                              START is what makes Express treat
                              it as an error handler.

  HOW ERRORS REACH IT:
  1. throw new Error("something")  inside a route (sync code)
  2. next(err)                     called with an error object

  IMPORTANT: Error handling middleware MUST be placed
  LAST — after all routes and other app.use() calls.

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express
  node assignment-12.js
*/

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

/* ---------------------------------------------------------------
  ROUTES — each demonstrates a different way an error can occur
---------------------------------------------------------------- */

/*
  GET /
  ------
  A normal working route — no errors here.
  Test in browser → http://localhost:3000
*/
app.get("/", (req, res) => {
    res.json({ message: "Home route is working fine!" });
});

/*
  GET /sync-error
  ----------------
  A synchronous error — thrown directly inside the route.
  Express automatically catches sync errors and passes them
  to the error handling middleware.

  Test in browser → http://localhost:3000/sync-error
*/
app.get("/sync-error", (req, res) => {
    throw new Error("Something crashed in a sync route!");
});

/*
  GET /async-error
  -----------------
  An asynchronous error — happens inside an async function.
  Async errors are NOT caught automatically by Express.
  You MUST use try/catch and call next(err) yourself.

  Without try/catch here → server would crash silently!

  Test in browser → http://localhost:3000/async-error
*/
app.get("/async-error", async (req, res, next) => {
    try {
        await Promise.reject(new Error("Something crashed in an async route!"));
    } catch (err) {
        next(err); // pass error to the error handling middleware
    }
});

/*
  GET /not-found
  ---------------
  Simulates a resource not being found.
  We create a custom error with a status code attached,
  then pass it to next() to be handled globally.

  Test in browser → http://localhost:3000/not-found
*/
app.get("/not-found", (req, res, next) => {
    const err = new Error("The resource you are looking for does not exist.");
    err.status = 404;
    next(err); // pass to error handler
});

/*
  POST /users
  ------------
  A real-world example — validation error passed via next(err).

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/users
  - Body → raw → JSON: {} (empty body to trigger the error)
  - Then try with: { "name": "Alice" } to see success
*/
app.post("/users", (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        const err = new Error("name is required in the request body.");
        err.status = 400;
        return next(err); // pass validation error to error handler
    }

    res.status(201).json({ message: "User created!", name });
});

/* ---------------------------------------------------------------
  ERROR HANDLING MIDDLEWARE
  --------------------------
  This MUST come AFTER all routes.
  It has 4 parameters — (err, req, res, next) — this is what
  tells Express this is an error handler, not a normal middleware.

  err.status → a custom status code we may have attached
  err.message → the error message string
  500 → default status code if no custom one was set
---------------------------------------------------------------- */
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    console.error(`[ERROR] ${statusCode} — ${message}`);

    res.status(statusCode).json({
        success: false,
        error: message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});