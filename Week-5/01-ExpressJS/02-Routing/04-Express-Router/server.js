/*
  ASSIGNMENT 7 — Express Router: Splitting Routes into Separate Files
  ====================================================================

  WHY DO WE SPLIT ROUTES?
  Imagine you have 50+ routes all in one file — it becomes a mess!
  Express Router lets you organize routes into separate files,
  one file per feature (users, products, orders, etc.)

  FOLDER STRUCTURE FOR THIS ASSIGNMENT:
  ---------------------------------------
  assignment-07/
  ├── server.js              ← main file (you are here)
  └── routes/
      ├── userRoutes.js      ← all /users routes live here
      └── productRoutes.js   ← all /products routes live here

  HOW IT WORKS:
  1. In each route file → create a Router, define routes, export it
  2. In server.js → import the router and "mount" it on a base path

  MOUNTING means attaching a router to a base URL:
  app.use("/users", userRouter)
  → Every route inside userRouter now automatically starts with /users

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express
  node server.js
*/

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

/*
  Import the routers from the routes folder.
  require("./routes/userRoutes") loads that file and gets
  whatever was exported from it (our router object).
*/
const userRouter    = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

/*
  Mount the routers on base paths.
  All routes inside userRouter    → start with /users
  All routes inside productRouter → start with /products

  So a route defined as "/" inside userRoutes.js
  becomes GET /users when mounted here.
*/
app.use("/users",    userRouter);
app.use("/products", productRouter);

/*
  Home route — still lives in server.js
  because it doesn't belong to any specific feature.
*/
app.get("/", (req, res) => {
  res.json({
    message : "Welcome! API is running.",
    endpoints: [
      "GET /users",
      "GET /users/:id",
      "POST /users",
      "GET /products",
      "GET /products/:id",
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});