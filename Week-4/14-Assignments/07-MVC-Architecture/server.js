/*
  server.js — Entry Point
  ========================
  This is the ONLY file you run: node server.js
  It boots the app, connects to DB, and starts listening.
  All logic lives in other files — this file just wires everything together.
*/

require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;

// Connect to MongoDB then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`API v1 → http://localhost:${PORT}/api/v1`);
        console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
});