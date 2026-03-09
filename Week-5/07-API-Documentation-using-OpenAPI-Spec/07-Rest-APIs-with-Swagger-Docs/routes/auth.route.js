const express = require("express");
//const authController = require("../controllers/auth.controller");
const { register, login, profile, logout } = require("../controllers/auth.controller");

const { checkAuthToken, sessionCheckAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

// Register API
//router.post("/register", authController.register);
router.post("/register", register);

// Login API
//router.post("/login", authController.login);
router.post("/login", login);

// Profile API
//router.get("/profile", authController.profile);
router.get("/profile", sessionCheckAuth, profile);

// Logout API
//router.get("/logout", authController.logout);
router.get("/logout", sessionCheckAuth, logout);

module.exports = router;
