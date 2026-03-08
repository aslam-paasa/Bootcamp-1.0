const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validUser = require("../utils/validateUser");
require("dotenv").config();
const { redisClient } = require("../config/redis");
const userAuth = require("../middlewares/userAuth");

const authRouter = express.Router();

/**
 * 1. POST: /register
 *    a. Validate the user data.
 *    b. Hash the password.
 *    c. Create the user in the database.
 *    d. Return the user data.
*/

authRouter.post('/register', async (req, res) => {

    try {
        validUser(req.body);

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        await User.create(req.body);
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


/**
 * 2. POST: /login
 *    a. Check if the user exists in the database.
 *       - If _id is present or not.
 *       - If emailId is present or not.
 *    b. Compare the password with the hashed password.
 *       - If password is correct, return the user data.
 *       - If password is incorrect, throw an error.
 *    c. Create a token using JWT.
 *    d. Send the token and store in a cookie.
 *    e. Login the user.
*/
authRouter.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ emailId: req.body.emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid Credentials"); 
        }

        /**
         * 1. Create a token using JWT
         * 2. Send the token and store in a cookie
         * 3. Login the user
         */
        const token = jwt.sign({ _id: user._id, emailId: user.emailId }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.cookie("token", token);
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * 3. POST: /logout
 *    a. Redis ke database main hum blocked token ko store karenge.
 * 
 * Issue: 
 * - If token is stolen before logout, attacker can still access account
 *   using the old token.
 * - If token never expires, it becomes a major security risk.
 * 
 * Solution: Redis
 * - Store list of invalidated tokens in database
 * - Block access for any requests using these tokens
 * 
 * Q. Iss block token to hum kabtak apne database m rkhnge?
 * => Token jaise hi expire hota hai usse db se delete kar do.
 * => And we use redis to store cache.
 * 
 * Note: We cannot install redis in our local machine. So, we will use a
 *       redis cloud service.
 *       a. Create account on redis cloud.
 *       b. Create a new redis instance.
 *       c. Click on connect to database
 *          - Redis Client: Node.js
 *          - Copy the connection string.
 *       d. Install: npm install redis
 * 
 * Basic Redis Commands:
 * 1. SET: 
 *    - Store the data in key-value pair so, we can find easily.
 *    - We use Hash to store unique data.
 *    - await redisClient.set("key", "value");
 * 
 *      const value = await redisClient.set(`token:${token}`, "blocked");
 *      a. key  : token:<token>
 *      b. value: "blocked"
 * 
 * 2. EXPIRE:
 *    - Set the expiry time for the key.
 *    - await redisClient.expire("key", 1800);
 * 
 * Edge Case:
 * Ek important edge case hai - agar humara JWT token 3 din ka hai, lekin 
 * humne redis mein blocked token ko sirf 30 minute ke liye store karne ka 
 * code likha hai (hardcode kiya hai).
 * Isse ek security issue create ho sakta hai kyunki:
 * 1. User ne logout kiya aur token block ho gaya
 * 2. 30 minute baad wo blocked token redis se delete ho jayega
 * 3. Lekin JWT token abhi bhi 3 din tak valid hai
 * 4. Koi attacker agar uss blocked token ko use kare 30 minute ke baad,
 *    toh usse access mil jayega kyunki ab wo token redis mein blocked nahi hai
 * 
 * Solution:
 * Redis mein token ko utni der tak store karna chahiye jitni der tak JWT 
 * token valid hai. Iske liye hum token ke expiry time ko calculate karenge:
 * 
 * a. Get the token from the cookie.
 *    - const token = req.cookies.token
 * 
 * b. Decode the token to get the expiry time.
 *    - const decodedToken = jwt.decode(token);
 *    - decodedToken.exp contains Unix timestamp in seconds when token expires
 * 
 * c. Store the token in redis with the expiry time.
 *    - await redisClient.set(`token:${token}`, "blocked");
 *    - await redisClient.expireAt(`token:${token}`, decodedToken.exp);
 *      Note: expireAt takes Unix timestamp in seconds
 * 
 * Important Notes:
 * - jwt.decode() returns payload which includes 'exp' (expiry timestamp)
 * - decodedToken.exp is Unix timestamp in seconds since 1970
 * - We use expireAt instead of expire because:
 *   - expire takes seconds from now as argument
 *   - expireAt takes absolute Unix timestamp in seconds
 *   - This ensures token is removed from Redis exactly when JWT expires
 * - This synchronizes Redis blocked token removal with JWT expiry
 * - Prevents security issues from mismatched expiry times
 * 
 * User kuch v bhejega to usse hum directly store nhi karnge apne redis mein,
 * hum pehle user token to authenticate karenge ki wo valid token hai ya nahi.
 * Agar valid token hai toh hum usko req.cookies se nikaal sakte hai.
*/
authRouter.post('/logout', userAuth, async (req, res) => {
    try {
        const token = req.cookies.token;

        const decodedToken = jwt.decode(token); 

        await redisClient.set(`token:${token}`, "blocked");
        // await redisClient.expire(`token:${token}`, 1800);
        await redisClient.expireAt(`token:${token}`, decodedToken.exp);

        res.clearCookie("token"); 
        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})  

module.exports = authRouter;



/**
 * Understanding Access Tokens & Refresh Tokens in Authentication
 * 
 * Problem with Access Tokens (JWT) Only:
 * - Many websites like LinkedIn, Instagram etc keep users logged in indefinitely
 *   unless manually logged out
 * - If token never expires, it becomes a major security risk:
 *   a. If token is stolen, attacker can access account without credentials
 *   b. Even after password change, old token remains valid if no expiry set
 *   c. No way to invalidate compromised tokens
 * 
 * Solution: Two-Token System
 * 1. Access Token:
 *    - Short lived (expires in 30 mins)
 *    - Used for API authentication
 *    - Generated using JWT
 * 
 * 2. Refresh Token:  
 *    - Long lived (valid for 7 days)
 *    - Used to get new access tokens
 *    - Stored securely and can be invalidated
 * 
 * How it Works (Real-world Analogy):
 * - Access Token = Visitor Pass (30 min validity)
 * - Refresh Token = ID Card (7 day validity)
 * 
 * Flow:
 * 1. Initial Login:
 *    Server provides:
 *    - Access Token (30 min)
 *    - Refresh Token (7 days)
 * 
 * 2. Normal Usage:
 *    - Client uses Access Token for API calls
 *    - When Access Token expires after 30 mins:
 *      a. Client sends Refresh Token
 *      b. Server validates and issues new Access Token
 *      c. User stays logged in seamlessly
 * 
 * 3. Security Features:
 *    - Access Token expires quickly (30 mins)
 *    - Refresh Token can be invalidated on:
 *      a. Password change
 *      b. Suspicious activity
 *      c. Manual logout
 * 
 * Security Considerations:
 * - If Refresh Token is stolen:
 *   a. User changes password
 *   b. Server invalidates Refresh Token
 *   c. All sessions are logged out
 *   d. Requires new login with fresh tokens
 * - Access Token automatically expires in 30 mins
 * 
 * Benefits:
 * 1. Better Security:
 *    - Short-lived access tokens
 *    - Ability to revoke refresh tokens
 * 2. Good UX:
 *    - Users stay logged in
 *    - No frequent login prompts
 * 
 * Note:
 * On Password Change:
 * - Refresh Token: Can be immediately invalidated
 * - Access Token : Will expire automatically in 30 mins
*/