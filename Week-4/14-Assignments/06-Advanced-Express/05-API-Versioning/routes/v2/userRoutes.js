/*
  routes/v2/userRoutes.js — Version 2
  =====================================

  This is the IMPROVED version of the API.
  V2 makes BREAKING CHANGES that would have broken V1 clients
  if we had changed V1 instead of creating a new version.

  WHAT CHANGED FROM V1 TO V2:
  ----------------------------
  1. Response is now WRAPPED in a { success, data } envelope
     V1: [{ id:1, name:"Alice" }]
     V2: { success: true, data: [...], meta: { total: 3 } }

  2. GET /users now supports pagination via query strings

  3. POST /users now accepts age and city fields too

  4. Responses include a version field so clients know which
     version served the response

  V1 clients would BREAK if we changed V1 this way —
  that is exactly why we created V2 instead.

  Mounted in server.js as: app.use("/api/v2", router)
  So:
  router.get("/users")     → GET /api/v2/users
  router.get("/users/:id") → GET /api/v2/users/:id
*/

const express = require("express");
const router = express.Router();

/*
  Same fake data — both versions share the same underlying data.
  In a real app this would be the same MongoDB collection.
*/
const users = [
    { id: 1, name: "Alice", email: "alice@test.com", age: 25, city: "Delhi" },
    { id: 2, name: "Bob", email: "bob@test.com", age: 30, city: "Mumbai" },
    { id: 3, name: "Carol", email: "carol@test.com", age: 22, city: "Pune" },
];

/*
  GET /api/v2/users
  ------------------
  V2 IMPROVEMENTS over V1:
  - Response is wrapped in { success, data, meta } envelope
  - Supports ?page and ?limit for pagination
  - meta includes total count and current page info

  Compare with V1 to see the difference clearly.

  Test in browser:
  → http://localhost:3000/api/v2/users
  → http://localhost:3000/api/v2/users?page=1&limit=2
*/
router.get("/users", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const paginated = users.slice(skip, skip + limit);

    /*
      V2 wraps every response in a consistent envelope.
      This is a BREAKING CHANGE from V1 — V1 returned a plain array.
      Old code doing response[0].name would break here.
    */
    res.json({
        success: true,
        version: "v2",           // helps clients confirm which version responded
        data: paginated,      // the actual users for this page
        meta: {
            total: users.length,
            page,
            limit,
            totalPages: Math.ceil(users.length / limit),
        },
    });
});

/*
  GET /api/v2/users/:id
  ----------------------
  V2 wraps single user responses in the same envelope.

  Test in browser → http://localhost:3000/api/v2/users/1
*/
router.get("/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({
            success: false,
            version: "v2",
            error: "User not found",
        });
    }

    res.json({
        success: true,
        version: "v2",
        data: user,    // wrapped in data key — different from V1
    });
});

/*
  POST /api/v2/users
  -------------------
  V2 IMPROVEMENT: accepts age and city fields too.
  V1 only accepted name and email.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/api/v2/users
  - Body → raw → JSON:
    { "name": "Dave", "email": "dave@test.com", "age": 28, "city": "Chennai" }
*/
router.post("/users", (req, res) => {
    const { name, email, age, city } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            version: "v2",
            error: "name and email are required.",
        });
    }

    const newUser = { id: users.length + 1, name, email, age, city };
    users.push(newUser);

    res.status(201).json({
        success: true,
        version: "v2",
        data: newUser,
    });
});

module.exports = router;