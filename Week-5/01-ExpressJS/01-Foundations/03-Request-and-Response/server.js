/**
 * req.body, req.params, req.query, res.send(), res.json()
*/

/**
 *  WHAT ARE req AND res?
 *  Every route handler receives two objects automatically:
 *  - req (request)  → What the CLIENT sent TO your server
 *  - res (response) → What YOU send BACK to the client
 *
 *  Think of it like a waiter in a restaurant:
 *  req = the order the customer gives to the waiter
 *  res = the food the waiter brings back to the customer
 *
 *  INSIDE req you can find 3 important things:
 *  - req.body    → Data sent inside the request (for POST/PUT)
 *  - req.params  → Dynamic values inside the URL  (e.g. /users/:id)
 *  - req.query   → Key=value pairs after "?" in URL (e.g. ?name=john)
 *
 *  INSIDE res you can use:
 *  - res.send()  → Send back plain text or HTML
 *  - res.json()  → Send back JSON data (most common in APIs)
*/

/**
 * SETUP (run in terminal before starting):
 * - npm init -y
 * - npm install express
 * - node server.js
*/

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

/**
 * req.params
 * - When you put a colon in a route like "/users/:id",
 *   the ":id" part becomes a variable.
 * 
 * -  URL: /users/42
 * -  req.params → { id: "42" }
 * 
 * Note: req.params values are always STRINGS,
 *       so use parseInt() if you need a number.
 * 
 * -  Test in browser → http://localhost:3000/users/42
*/

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(`You requested user with ID: ${id}`);
});

/**
  req.query
  ----------
  Query strings appear after "?" in a URL.
  They are optional and used for filtering or searching.

  URL: /search?name=alice&city=delhi
  req.query → { name: "alice", city: "delhi" }

  Test in browser → http://localhost:3000/search?name=alice&city=delhi
---------------------------------------------------------------- */
app.get("/search", (req, res) => {
  const name = req.query.name;
  const city = req.query.city;
  res.send(`Searching for name: ${name}, city: ${city}`);
});

/* ---------------------------------------------------------------
  req.body
  ----------
  When a client sends data via POST or PUT,
  that data lives inside req.body.

  It does NOT appear in the URL — it is hidden inside the request.
  That is why we need express.json() at the top to read it.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/users
  - Body → raw → JSON: { "name": "Alice", "email": "alice@test.com" }
---------------------------------------------------------------- */
app.post("/users", (req, res) => {
  const name  = req.body.name;
  const email = req.body.email;
  res.send(`Received — Name: ${name}, Email: ${email}`);
});

/* ---------------------------------------------------------------
  res.send()
  ----------
  Sends back plain text or HTML to the client.
  Good for simple messages or HTML pages.

  Test in browser → http://localhost:3000/send-demo
---------------------------------------------------------------- */
app.get("/send-demo", (req, res) => {
  res.send("<h1>Hello! This is res.send()</h1>");
});

/* ---------------------------------------------------------------
  res.json()
  ----------
  Sends back a JavaScript object as JSON data.
  This is the standard way to respond in REST APIs.
  Automatically sets Content-Type to application/json.

  Test in browser → http://localhost:3000/json-demo
---------------------------------------------------------------- */
app.get("/json-demo", (req, res) => {
  res.json({
    success: true,
    message: "This is res.json()",
    data: { name: "Alice", age: 25 },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});