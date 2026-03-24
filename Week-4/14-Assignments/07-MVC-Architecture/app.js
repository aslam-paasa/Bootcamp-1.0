/*
  app.js — Express App Setup
  ============================
  Creates and configures the Express app.
  All middleware, routes, and error handlers are registered here.
  Separated from server.js so it is easy to test independently.
*/

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");

const v1Routes = require("./routes/v1");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ─── Security & Utility Middleware ───────────────────────────────────────────
app.use(helmet());       // sets secure HTTP headers
app.use(cors());         // allow cross-origin requests from frontend
app.use(morgan("dev"));  // log every request in the terminal
app.use(express.json()); // parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(cookieParser()); // parse cookies from requests

// ─── Static Files ─────────────────────────────────────────────────────────────
// Serve uploaded files — accessible at /uploads/filename.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Global Rate Limiter ──────────────────────────────────────────────────────
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { error: "Too many requests. Please try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(globalLimiter);

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/v1", v1Routes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.json({
        name: process.env.APP_NAME || "MVC Express API",
        status: "running",
        version: "v1",
        docs: "/api/v1",
    });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
// Catches any URL that did not match any route above
app.use((req, res) => {
    res.status(404).json({ success: false, error: "Route not found." });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// Must be LAST — catches errors thrown anywhere in the app
app.use(errorHandler);

module.exports = app;