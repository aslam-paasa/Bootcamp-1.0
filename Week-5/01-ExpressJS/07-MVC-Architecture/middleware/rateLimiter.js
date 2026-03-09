/*
  middleware/rateLimiter.js — Rate Limiters
  ==========================================
  Separate limiters for different route sensitivities.
  Imported and applied directly in the route files.
*/

const rateLimit = require("express-rate-limit");

/*
  loginLimiter — 5 attempts per 15 minutes
  Prevents brute-force password attacks on the login route.
  Successful logins do NOT count toward the limit.
*/
exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, error: "Too many login attempts. Try again after 15 minutes." },
    skipSuccessfulRequests: true,
    standardHeaders: true,
    legacyHeaders: false,
});

/*
  otpLimiter — 3 requests per hour
  Prevents abuse of email-sending routes (OTP, password reset).
*/
exports.otpLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: { success: false, error: "Too many OTP requests. Try again after 1 hour." },
    standardHeaders: true,
    legacyHeaders: false,
});