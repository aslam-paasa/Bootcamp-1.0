/*
  ASSIGNMENT 23 — Environment Variables: .env Files, Hiding Secrets
  ==================================================================

  WHAT IS AN ENVIRONMENT VARIABLE?
  An environment variable is a value stored OUTSIDE your code
  that your app reads at runtime.

  WHY DO WE NEED THEM?
  Your code contains sensitive information like:
  - Database connection strings (with your username + password)
  - JWT secret keys
  - API keys for services like Stripe, Sendgrid, Cloudinary
  - Port numbers

  If you hardcode these directly in your code and push to GitHub
  → ANYONE can see your database password and access your data!

  SOLUTION:
  Store all secrets in a ".env" file.
  Add ".env" to ".gitignore" so it is NEVER pushed to GitHub.
  Your code reads the values from process.env at runtime.

  HOW IT WORKS:
  --------------
  1. You create a .env file with key=value pairs
  2. dotenv package reads the .env file on startup
  3. It loads all values into process.env
  4. You access them with process.env.KEY_NAME anywhere in your code

  .env file → dotenv → process.env → your code

  FOLDER STRUCTURE:
  ------------------
  assignment-23/
  ├── server.js       ← you are here
  ├── .env            ← create this manually (see instructions below)
  └── .gitignore      ← create this to prevent .env going to GitHub

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express dotenv
  node server.js
*/

/*
  require("dotenv").config() MUST be the very first line
  before any other require() that might use process.env.
  If you call it after, the variables will not be loaded yet.
*/
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

/* ---------------------------------------------------------------
  READING ENVIRONMENT VARIABLES
  ------------------------------
  process.env.KEY_NAME reads the value from your .env file.
  If the key does not exist, it returns undefined.

  Best practice: always provide a FALLBACK value with "||"
  so your app does not crash if a variable is missing.
  This is especially useful when running without a .env file.
---------------------------------------------------------------- */
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_URI || "mongodb://localhost:27017/myapp";
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev";
const APP_NAME = process.env.APP_NAME || "My Express App";

/* ---------------------------------------------------------------
  ROUTES
---------------------------------------------------------------- */

/*
  GET /
  ------
  Uses the APP_NAME variable from .env.
  Test in browser → http://localhost:3000
*/
app.get("/", (req, res) => {
    res.json({ message: `Welcome to ${APP_NAME}!` });
});

/*
  GET /config
  ------------
  Shows which env variables are loaded.
  NEVER expose real secrets in a real app.
  We only show that they are SET (truthy) not what they actually are.

  Test in browser → http://localhost:3000/config
*/
app.get("/config", (req, res) => {
    res.json({
        appName: APP_NAME,
        port: PORT,
        dbConnected: !!DB_URL,      // shows true/false, NOT the actual URL
        jwtSecretSet: !!JWT_SECRET,  // shows true/false, NOT the actual secret
        nodeEnv: process.env.NODE_ENV || "development",
    });
});

app.listen(PORT, () => {
    console.log(`[${APP_NAME}] Server running at http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});