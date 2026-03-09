/*
 *  Creating a Server & Listening on a Port
*/

/**
 *  WHAT IS A SERVER?
 *  A server is just a program that runs and WAITS for someone
 *  to send a request. When you visit a URL in your browser,
 *  the browser sends a request → your server responds back.
*/

/**
 *  WHAT IS A PORT?
 *  Your computer has thousands of "doors" called ports.
 *  Each program uses a specific door to communicate.
 *  We use port 3000 for local development.
 *  Think of it like: Your computer = a building, Port = room number.
*/

/**
 *  SETUP (run in terminal before starting):
 *  - npm init -y           → creates package.json
 *  - npm install express   → installs express
 *  - node server.js → runs this file
 *  - Then visit → http://localhost:3000
*/

/*
  "require" is how we import a package in Node.js.
  We are importing Express which we installed via npm.
*/
const express = require("express");

/**
 * express() creates your server app.
 * Everything — routes, settings — goes through this "app" object.
*/
const app = express();

/*
 * PORT is the "door number" our server will listen on.
 * 3000 is a common choice for local development.
*/
const PORT = 3000;

/*
 *  app.get("/", ...) means:
 *  "When someone visits http://localhost:3000/, run this function."
 *
 *  req = the request coming FROM the browser
 *  res = the response we send BACK to the browser
*/
app.get("/", (req, res) => {
  res.send("Server is running on port 3000!");
});

/*
  app.listen() actually STARTS the server.
  It tells your computer: "Open port 3000 and wait for requests."
  The callback function runs once the server is ready.
*/
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});