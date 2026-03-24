/*
 *  HTTP Methods — GET, POST, PUT, DELETE
*/

/**
 *  WHAT ARE HTTP METHODS?
 *  When a browser or app talks to your server, it uses HTTP METHODS
 *  to describe WHAT it wants to do with the data.
 *
 *  There are 4 main methods:
 *  - GET    → "Give me some data"         (Read)
 *  - POST   → "Here is new data, save it" (Create)
 *  - PUT    → "Update this existing data" (Update)
 *  - DELETE → "Remove this data"          (Delete)
 *
 *  These 4 together are called CRUD:
 *  - C → Create  (POST)
 *  - R → Read    (GET)
 *  - U → Update  (PUT)
 *  - D → Delete  (DELETE)
 *
 *  Every backend app you ever build is basically just CRUD!
*/

/**
 * SETUP (run in terminal before starting):
 * - npm init -y
 * - npm install express
 * - node server.js
 *
 * To test POST, PUT, DELETE you need Postman or Thunder Client
 * (VS Code extension) — browser can only do GET requests.
*/

const express = require("express");
const app = express();
const PORT = 3000;

/*
  This middleware allows Express to read JSON data
  sent in the request body (needed for POST and PUT).
  Without this, req.body will be undefined.
*/
app.use(express.json());

/*
  A fake database — just an array to store users for now.
  In real apps this will be a MongoDB database.
*/
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
];

/*
  GET /users
  ----------
  Used to FETCH or READ data.
  The browser visits this URL and the server sends back all users.
  You can test this directly in your browser.
*/
app.get("/users", (req, res) => {
    res.json(users);
});

/*
  POST /users
  -----------
  Used to CREATE and save new data.
  The client sends data in the request body → we save it.
  You cannot test this in a browser — use Postman.

  In Postman:
  - Method: POST
  - URL: http://localhost:3000/users
  - Body → raw → JSON: { "name": "Charlie" }
*/
app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
    };
    users.push(newUser);
    res.status(201).json({ message: "User created!", user: newUser });
});

/*
  PUT /users/:id
  --------------
  Used to UPDATE existing data.
  :id is a dynamic value in the URL (e.g. /users/1 updates user 1).
  The client sends new data in the body → we find and update the user.

  In Postman:
  - Method: PUT
  - URL: http://localhost:3000/users/1
  - Body → raw → JSON: { "name": "Alice Updated" }
*/
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name;
    res.json({ message: "User updated!", user });
});

/*
  DELETE /users/:id
  -----------------
  Used to REMOVE data.
  :id tells the server which user to delete.

  In Postman:
  - Method: DELETE
  - URL: http://localhost:3000/users/1
*/
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);
    res.json({ message: "User deleted!", users });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});