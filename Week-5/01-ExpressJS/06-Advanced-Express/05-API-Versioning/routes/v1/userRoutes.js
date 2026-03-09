/*
  routes/v1/userRoutes.js — Version 1
  =====================================

  This is the ORIGINAL version of the API.
  Once released, this file should NEVER change in a breaking way.
  Old clients depending on this format will always work.

  V1 response format (simple — just returns the array):
  [
    { id: 1, name: "Alice", email: "alice@test.com" },
    { id: 2, name: "Bob",   email: "bob@test.com"   }
  ]

  Mounted in server.js as: app.use("/api/v1", router)
  So:
  router.get("/users")      → GET /api/v1/users
  router.get("/users/:id")  → GET /api/v1/users/:id
*/

const express = require("express");
const router = express.Router();

/*
  Fake database — same for both versions in this assignment.
  In a real app, both versions would share the same DB/models.
*/
const users = [
    { id: 1, name: "Alice", email: "alice@test.com", age: 25, city: "Delhi" },
    { id: 2, name: "Bob", email: "bob@test.com", age: 30, city: "Mumbai" },
    { id: 3, name: "Carol", email: "carol@test.com", age: 22, city: "Pune" },
];

/*
  GET /api/v1/users
  ------------------
  V1 returns a plain array of users — simple and flat.
  No pagination, no metadata — just the raw data.

  Test in browser → http://localhost:3000/api/v1/users
*/
router.get("/users", (req, res) => {
    res.json(users); // plain array — no wrapping object
});

/*
  GET /api/v1/users/:id
  ----------------------
  V1 returns the user object directly if found,
  or a simple error string if not.

  Test in browser → http://localhost:3000/api/v1/users/1
*/
router.get("/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(user); // returns the user object directly
});

/*
  POST /api/v1/users
  -------------------
  V1 create — accepts name and email only.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/api/v1/users
  - Body → raw → JSON: { "name": "Dave", "email": "dave@test.com" }
*/
router.post("/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "name and email are required." });
    }

    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser); // V1 returns the created user directly
});

module.exports = router;