/*
  ASSIGNMENT 4 — Basic Routes: Defining URL Endpoints
  =====================================================

  WHAT IS A ROUTE?
  A route is a URL path that your server knows how to respond to.
  When someone visits a specific URL, the matching route runs.

  WHAT IS AN ENDPOINT?
  An endpoint is a combination of:
  - HTTP Method (GET, POST, PUT, DELETE)
  - URL path (/users, /products, /login)

  Together they define ONE specific action your server can perform.

  Examples:
  GET  /users    → fetch all users
  GET  /products → fetch all products
  POST /login    → handle login

  SYNTAX:
  app.METHOD(PATH, HANDLER)
       ↑       ↑       ↑
    get/post  "/users"  function that runs

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express
  node assignment-04.js

  Then visit → http://localhost:3000
*/

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

/*
  Route 1: Home
  --------------
  The "/" path is the root of your server.
  This runs when someone visits http://localhost:3000
*/
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

/*
  Route 2: /about
  ----------------
  A separate page at a different URL path.
  Runs when someone visits http://localhost:3000/about
*/
app.get("/about", (req, res) => {
  res.send("This is the About Page!");
});

/*
  Route 3: /users
  ----------------
  This endpoint returns a list of users as JSON.
  In real apps, this data would come from a database.
  Runs when someone visits http://localhost:3000/users
*/
app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  res.json(users);
});

/*
  Route 4: /contact
  ------------------
  You can define as many routes as you need.
  Each path is unique — no two routes can have the
  same METHOD + PATH combination.
*/
app.get("/contact", (req, res) => {
  res.json({ email: "hello@myapp.com", phone: "123-456-7890" });
});

/*
  Route 5: POST /login
  ---------------------
  Not all routes are GET. This one is POST because
  the client is SENDING data (email + password) to the server.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/login
  - Body → raw → JSON: { "email": "alice@test.com", "password": "1234" }
*/
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.json({ message: `Login received for: ${email}` });
});

/*
  IMPORTANT: Route ORDER matters!
  ---------------------------------
  Express matches routes from TOP to BOTTOM.
  The FIRST matching route wins and stops looking further.
  So always put more specific routes ABOVE general ones.
*/

/*
  404 Route — catches any URL that didn't match above
  ----------------------------------------------------
  app.use() with no path matches EVERY request.
  Since it's placed LAST, it only runs if nothing above matched.
  This is how you handle unknown/invalid URLs gracefully.
*/
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});