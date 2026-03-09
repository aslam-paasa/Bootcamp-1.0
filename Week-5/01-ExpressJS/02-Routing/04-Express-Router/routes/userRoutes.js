/*
  routes/userRoutes.js
  =====================

  WHAT IS express.Router()?
  express.Router() creates a MINI version of the app object.
  You define routes on it exactly like you do on "app",
  but these routes are isolated to this file.

  When this router is mounted in server.js with:
  app.use("/users", userRouter)

  Then:
  router.get("/")     → becomes GET /users
  router.get("/:id")  → becomes GET /users/:id
  router.post("/")    → becomes POST /users
*/

const express = require("express");
const router  = express.Router(); // Create a mini router

/*
  Fake database — just for learning purposes.
  In real apps this comes from MongoDB.
*/
const users = [
  { id: 1, name: "Alice", email: "alice@test.com" },
  { id: 2, name: "Bob",   email: "bob@test.com"   },
];

/*
  GET /users
  -----------
  "/" here means the BASE path this router is mounted on.
  Since it's mounted on "/users" in server.js,
  this route responds to GET /users
*/
router.get("/", (req, res) => {
  res.json(users);
});

/*
  GET /users/:id
  ---------------
  Responds to GET /users/1, GET /users/2, etc.
*/
router.get("/:id", (req, res) => {
  const id   = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

/*
  POST /users
  ------------
  Responds to POST /users — creates a new user.
*/
router.post("/", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json({ message: "User created!", user: newUser });
});

/*
  Export the router so server.js can import and use it.
  Without this line, server.js cannot access this router.
*/
module.exports = router;