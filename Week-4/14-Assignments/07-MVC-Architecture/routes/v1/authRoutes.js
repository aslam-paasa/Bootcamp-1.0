/*
  routes/v1/authRoutes.js — Auth Routes
  ========================================
  Routes only wire URLs to controllers.
  No business logic here — that lives in authController.js.
*/

const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");
const { verifyToken } = require("../../middleware/auth");
const { loginLimiter } = require("../../middleware/rateLimiter");

// POST /api/v1/auth/register
router.post("/register", authController.register);

// POST /api/v1/auth/login — rate limited to 5 attempts per 15 min
router.post("/login", loginLimiter, authController.login);

// GET /api/v1/auth/me — get logged-in user's profile (protected)
router.get("/me", verifyToken, authController.getMe);

module.exports = router;