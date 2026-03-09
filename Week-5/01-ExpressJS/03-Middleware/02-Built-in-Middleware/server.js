/*
  ASSIGNMENT 9 — Built-in Middleware: express.json(), express.static()
  =====================================================================

  WHAT IS BUILT-IN MIDDLEWARE?
  Express comes with some middleware already included out of the box.
  You do not need to install anything extra — just call app.use() with them.

  The two most important built-in middleware:

  1. express.json()
     → Reads the JSON body from POST/PUT requests
     → Makes the data available in req.body
     → Without it, req.body is always undefined

  2. express.static()
     → Serves static files (HTML, CSS, images, JS) automatically
     → You point it to a folder, and Express serves everything inside it
     → No need to write individual routes for each file

  FOLDER STRUCTURE FOR THIS ASSIGNMENT:
  ---------------------------------------
  assignment-09/
  ├── server.js       ← you are here
  └── public/
      └── index.html  ← served automatically by express.static()

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express
  node server.js
*/

const express = require("express");
const app = express();
const PORT = 3000;

/* ---------------------------------------------------------------
  BUILT-IN MIDDLEWARE 1 — express.json()
  ----------------------------------------
  Parses incoming requests that have a JSON body.
  It reads the raw body text and converts it into a
  JavaScript object, then puts it on req.body.

  Must be added BEFORE any POST/PUT routes that need req.body.
  Order matters — middleware runs top to bottom!
---------------------------------------------------------------- */
app.use(express.json());

/* ---------------------------------------------------------------
  BUILT-IN MIDDLEWARE 2 — express.static()
  ------------------------------------------
  Serves files from a folder directly to the browser.
  You just tell it which folder to serve from — "public" here.

  When a request comes in, Express first checks if a matching
  file exists in the public folder. If yes, it serves it.
  If no match is found, Express moves on to your routes.

  Examples:
  public/index.html → http://localhost:3000/index.html
  public/style.css  → http://localhost:3000/style.css
  public/logo.png   → http://localhost:3000/logo.png

  Test in browser → http://localhost:3000/index.html
---------------------------------------------------------------- */
app.use(express.static("public"));

/* ---------------------------------------------------------------
  DEMONSTRATING express.json()
  ------------------------------
  This POST route needs req.body to work.
  Without express.json() above, req.body would be undefined.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/data
  - Body → raw → JSON: { "name": "Alice", "age": 25 }
---------------------------------------------------------------- */
app.post("/data", (req, res) => {
    console.log("Received body:", req.body); // thanks to express.json()

    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).json({ error: "name and age are required" });
    }

    res.json({
        message: "Data received successfully!",
        received: { name, age },
    });
});

/*
  GET /
  ------
  A normal route that still works alongside express.static().
  Express checks the public folder first, then falls to routes.
*/
app.get("/api", (req, res) => {
    res.json({ message: "API is working!" });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Static file → http://localhost:${PORT}/index.html`);
    console.log(`API route   → http://localhost:${PORT}/api`);
});