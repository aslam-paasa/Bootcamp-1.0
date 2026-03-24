/*
  ASSIGNMENT 28 — API Versioning: /api/v1/ Structure
  ====================================================

  WHAT IS API VERSIONING?
  API versioning means giving your API a version number in the URL.
  Instead of: /users
  You use:    /api/v1/users

  WHY DO WE NEED IT?
  Your API is a CONTRACT between your server and your clients
  (React app, mobile app, third-party developers).

  Imagine you change your /users response to remove a field
  that your mobile app depends on → the mobile app BREAKS.

  With versioning:
  → Old clients keep using /api/v1/users (unchanged forever)
  → New clients use      /api/v2/users  (with new changes)
  → Both work at the same time — nobody breaks

  REAL WORLD EXAMPLES:
  Stripe API  → https://api.stripe.com/v1/charges
  Twitter API → https://api.twitter.com/2/tweets
  GitHub API  → https://api.github.com/v3/repos

  HOW WE STRUCTURE IT:
  ---------------------
  Each version gets its OWN folder of routes.
  server.js mounts them on different base paths.

  app.use("/api/v1", v1Router) → all v1 routes
  app.use("/api/v2", v2Router) → all v2 routes

  FOLDER STRUCTURE:
  ------------------
  assignment-28/
  ├── server.js
  └── routes/
      ├── v1/
      │   └── userRoutes.js   ← v1 routes (original)
      └── v2/
          └── userRoutes.js   ← v2 routes (updated/improved)

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
  Import route files for each version.
  Each version is completely independent — changing v2
  never affects v1 clients.
*/
const v1UserRoutes = require("./routes/v1/userRoutes");
const v2UserRoutes = require("./routes/v2/userRoutes");

/*
  Mount each version on its own base path.
  All routes inside v1UserRoutes → start with /api/v1
  All routes inside v2UserRoutes → start with /api/v2
*/
app.use("/api/v1", v1UserRoutes);
app.use("/api/v2", v2UserRoutes);

/*
  GET / — API info and available versions
  ----------------------------------------
  A good practice is to show available versions at the root.
  Test in browser → http://localhost:3000
*/
app.get("/", (req, res) => {
    res.json({
        name: "My Express API",
        versions: {
            v1: "/api/v1/users — original response format",
            v2: "/api/v2/users — improved with pagination and extra fields",
        },
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`V1 → http://localhost:${PORT}/api/v1/users`);
    console.log(`V2 → http://localhost:${PORT}/api/v2/users`);
});