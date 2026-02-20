/**
 * 1. Importing Dependencies:
 *    - Express Server Setup
 *    - Mongoose
 *    - User Routes
 *    - Database Connection
 *    - Start Server
 */

import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import db from "./utils/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

/**
 * 2. Load Environment Variables
 */
dotenv.config();

/**
 * 3. Express Server Setup
 */
const app = express();

/**
 * 4. Middleware:
 *    - Cookie parser       : app.use(cookieParser())
 *    - CORS configuration  : cors({
 *    - JSON parser         : app.use(express.json())
 *    - URL-encoded parser  : app.use(express.urlencoded({ extended: true }))
 *    - Static files        : app.use(express.static("public"))
 */

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Match your frontend URL exactly
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    exposedHeaders: ["Set-Cookie", "*"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/**
 * 5. Routes:
 *    - Test route to check cookie handling
 *    - User routes
 */
app.get("/", (req, res) => {
  console.log("=== Cookie Debug ===");
  console.log("Request cookies:", req.cookies);
  console.log("Request headers:", {
    cookie: req.headers.cookie,
    origin: req.headers.origin,
  });

  res.json({
    message: "Hello World",
    cookies: req.cookies,
  });
});

app.use("/api/v1/users", userRoutes);

/**
 * 6. Database Connection
 */
db();

/**
 * 7. Start Server
 */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
