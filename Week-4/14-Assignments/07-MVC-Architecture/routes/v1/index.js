/*
  routes/v1/index.js — V1 Router
  ================================
  Combines all V1 route files into one router.
  Mounted in app.js as: app.use("/api/v1", v1Routes)

  Final endpoints:
  /api/v1/auth/...
  /api/v1/users/...
  /api/v1/posts/...
*/

const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);

// API v1 info endpoint
router.get("/", (req, res) => {
    res.json({
        version: "v1",
        endpoints: [
            "POST   /api/v1/auth/register",
            "POST   /api/v1/auth/login",
            "GET    /api/v1/auth/me",
            "GET    /api/v1/users",
            "GET    /api/v1/users/:id",
            "PATCH  /api/v1/users/:id",
            "DELETE /api/v1/users/:id",
            "GET    /api/v1/posts",
            "POST   /api/v1/posts",
            "GET    /api/v1/posts/:id",
            "PATCH  /api/v1/posts/:id",
            "DELETE /api/v1/posts/:id",
        ],
    });
});

module.exports = router;