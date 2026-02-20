import express from "express";
import { registerUser, verifyUser, loginUser, getUserProfile, logoutUser, forgotPassword, resetPassword } from "../controller/User.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Dynamic Route:
 * 1. Register User
 * 2. Once registered, send verification email to user
 * 3. Once verified, login user
 * 
*/
router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.get("/me", isLoggedIn, getUserProfile);
router.post("/logout", isLoggedIn, logoutUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;
