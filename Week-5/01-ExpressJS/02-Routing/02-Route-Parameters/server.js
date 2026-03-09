/*
  ASSIGNMENT 5 — Route Parameters: /user/:id — Dynamic URLs
  ===========================================================

  WHAT IS A ROUTE PARAMETER?
  A route parameter is a dynamic part of a URL marked with a colon ":".
  Instead of creating a separate route for every user, you create ONE
  route that handles all of them dynamically.

  WITHOUT route parameters (bad approach):
  app.get("/users/1", ...)
  app.get("/users/2", ...)
  app.get("/users/3", ...)  ← you'd need infinite routes!

  WITH route parameters (correct approach):
  app.get("/users/:id", ...)  ← one route handles ALL of them

  HOW TO ACCESS IT:
  The value is available inside req.params
  URL: /users/42  →  req.params.id  →  "42"

  NOTE: req.params values are always STRINGS.
  Use parseInt() when you need to compare with numbers.

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express
  node assignment-05.js

  Then test in browser → http://localhost:3000/users/1
*/

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

/*
  Fake database — an array of users to work with.
  In real apps this will be fetched from MongoDB.
*/
const users = [
  { id: 1, name: "Alice", email: "alice@test.com" },
  { id: 2, name: "Bob",   email: "bob@test.com"   },
  { id: 3, name: "Carol", email: "carol@test.com" },
];

/*
  Route: GET /users
  ------------------
  Returns all users. No parameter needed here.
  Test in browser → http://localhost:3000/users
*/
app.get("/users", (req, res) => {
  res.json(users);
});

/*
  Route: GET /users/:id
  ----------------------
  ":id" is the route parameter — it matches any value in that position.

  /users/1  →  req.params.id = "1"
  /users/2  →  req.params.id = "2"
  /users/99 →  req.params.id = "99"

  We use parseInt() to convert the string "1" to the number 1
  so we can compare it with the ids in our array.

  Test in browser:
  → http://localhost:3000/users/1
  → http://localhost:3000/users/2
  → http://localhost:3000/users/99  (will return 404)
*/
app.get("/users/:id", (req, res) => {
  const id   = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: `User with id ${id} not found` });
  }

  res.json(user);
});

/*
  Route: GET /posts/:postId/comments/:commentId
  ----------------------------------------------
  You can have MULTIPLE parameters in one route.
  Each one is accessed by its own name inside req.params.

  URL: /posts/5/comments/12
  req.params → { postId: "5", commentId: "12" }

  Test in browser → http://localhost:3000/posts/5/comments/12
*/
app.get("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  res.json({
    message : "Fetched a comment",
    postId  : postId,
    commentId: commentId,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});