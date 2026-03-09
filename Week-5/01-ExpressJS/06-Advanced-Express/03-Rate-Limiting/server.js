/*
  ASSIGNMENT 26 — Rate Limiting: Preventing Abuse/Spam
  =====================================================

  WHAT IS RATE LIMITING?
  Rate limiting controls how many requests a single client
  (identified by their IP address) can make to your server
  within a given time window.

  WHY DO WE NEED IT?
  Without rate limiting, anyone can:
  - Hit your login route 10,000 times to brute-force a password
  - Spam your /send-otp route and rack up email costs
  - Flood your server with requests and crash it (DDoS attack)
  - Scrape all your data in seconds

  HOW IT WORKS:
  Express-rate-limit tracks how many requests each IP has made.
  When a client hits the limit → it blocks them with a 429 error.
  After the time window resets → they can make requests again.

  Example:
  windowMs: 15 minutes
  max: 100 requests

  → IP "1.2.3.4" can make 100 requests in 15 minutes.
  → On request 101 → blocked with 429 Too Many Requests.
  → After 15 minutes → counter resets → 100 more allowed.

  TYPES OF LIMITERS WE WILL BUILD:
  ----------------------------------
  1. Global limiter   → applies to ALL routes (general protection)
  2. Login limiter    → stricter limit on login (brute-force protection)
  3. OTP limiter      → very strict limit on email/SMS sending routes

  SETUP (run in terminal before starting):
  -----------------------------------------
  npm init -y
  npm install express express-rate-limit
  node assignment-26.js
*/

const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 3000;

app.use(express.json());

/* ---------------------------------------------------------------
  LIMITER 1 — Global Rate Limiter
  ---------------------------------
  Applied to ALL routes using app.use().
  Allows 100 requests per 15 minutes per IP.
  This is a general safety net for the whole API.

  standardHeaders: true  → sends rate limit info in response headers
                           so the client knows how many requests remain
  legacyHeaders: false   → disables the older X-RateLimit headers
---------------------------------------------------------------- */
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
    max: 100,             // max 100 requests per window
    message: { error: "Too many requests. Please try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(globalLimiter); // applies to every route below

/* ---------------------------------------------------------------
  LIMITER 2 — Login Rate Limiter
  --------------------------------
  Much stricter — only 5 login attempts per 15 minutes.
  Prevents brute-force attacks where someone tries thousands
  of password combinations on your login route.

  skipSuccessfulRequests: true → successful logins do NOT count
  toward the limit. Only failed attempts are counted.
  This way a real user logging in normally is never blocked.
---------------------------------------------------------------- */
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,              // only 5 attempts per window
    message: { error: "Too many login attempts. Please try again after 15 minutes." },
    skipSuccessfulRequests: true,           // don't count successful logins
    standardHeaders: true,
    legacyHeaders: false,
});

/* ---------------------------------------------------------------
  LIMITER 3 — OTP / Email Rate Limiter
  ---------------------------------------
  Very strict — only 3 emails per hour per IP.
  Each email costs money. Without this, someone could call
  /send-otp in a loop and drain your email credits.
---------------------------------------------------------------- */
const otpLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3,               // max 3 emails per hour
    message: { error: "Too many OTP requests. Please try again after 1 hour." },
    standardHeaders: true,
    legacyHeaders: false,
});

/* ---------------------------------------------------------------
  ROUTES
---------------------------------------------------------------- */

/*
  GET /
  ------
  Public route — global limiter applies.
  Test in browser → http://localhost:3000
*/
app.get("/", (req, res) => {
    res.json({ message: "API is running. Rate limiting is active!" });
});

/*
  GET /data
  ----------
  Another public route — global limiter applies.
  Test in browser → http://localhost:3000/data
*/
app.get("/data", (req, res) => {
    res.json({ data: [1, 2, 3, 4, 5], message: "Here is some data." });
});

/*
  POST /login — Protected with loginLimiter
  ------------------------------------------
  loginLimiter runs BEFORE the route handler.
  After 5 failed attempts from the same IP → blocked for 15 mins.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/login
  - Body → raw → JSON: { "email": "test@test.com", "password": "wrong" }
  - Send it 6 times → on the 6th attempt you get 429 Too Many Requests
  - Check response headers: RateLimit-Remaining shows how many left
*/
app.post("/login", loginLimiter, (req, res) => {
    const { email, password } = req.body;

    /*
      Fake login check — in a real app this hits the database.
      We return 401 here so the failed attempt counts toward the limit.
    */
    if (password !== "correct123") {
        return res.status(401).json({ error: "Invalid credentials." });
    }

    res.json({ message: "Login successful!" });
});

/*
  POST /send-otp — Protected with otpLimiter
  -------------------------------------------
  Only 3 OTP emails allowed per hour per IP.
  After 3 requests → blocked for 1 hour.

  Test in Postman:
  - Method: POST
  - URL: http://localhost:3000/send-otp
  - Body → raw → JSON: { "email": "test@test.com" }
  - Send it 4 times → on the 4th you get 429
*/
app.post("/send-otp", otpLimiter, (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }

    /*
      In a real app: generate OTP, save to DB, send via nodemailer.
      Here we just simulate it.
    */
    const otp = Math.floor(100000 + Math.random() * 900000);
    res.json({ message: `OTP sent to ${email}!`, otp }); // remove otp from response in production
});

/*
  GET /public
  ------------
  A route with NO extra limiter — only the global one applies.
  Shows that different routes can have different limits.
*/
app.get("/public", (req, res) => {
    res.json({ message: "This route only has the global limit of 100 req/15min." });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});