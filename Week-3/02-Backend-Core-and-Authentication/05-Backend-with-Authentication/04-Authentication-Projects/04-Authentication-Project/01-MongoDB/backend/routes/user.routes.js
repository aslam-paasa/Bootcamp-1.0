/**
 * 1. Importing Dependencies for User Routes & Authentication Middleware
 *    - Express
 *    - User Controller
 *    - Middleware
 */
import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  verifyUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * 2. User Routes
 */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isLoggedIn, getMe);
router.get("/verify/:token", verifyUser);
router.get("/logout", isLoggedIn, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

/**
 * 3. Export User Routes
 */
export default router;