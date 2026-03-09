/**
 * STATEFUL AUTH (Session Based):
 * - Server stores session data in memory or database.
 * - Client receives a session ID stored in a cookie.
 * - Every request server looks up the session ID to identify user.
 * - Server has to REMEMBER who is logged in.
 *
 * Flow:
 * User Login
 *     ↓
 * Server creates session and stores it in memory/DB
 *     ↓
 * Server sends session ID to client in a cookie
 *     ↓
 * Client sends cookie with every request automatically
 *     ↓
 * Server looks up session ID → finds user data → allows access
 *     ↓
 * User Logout → server destroys session
 *
 * Install:
 * npm i express-session connect-mongo bcrypt
 */

require('dotenv').config();
require('./config/db');

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoute = require('./routes/authRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * express-session Configuration:
 *
 * secret:
 * - Used to sign and encrypt the session ID cookie.
 * - Keep this secret and store in .env.
 * - If attacker knows the secret they can forge session cookies.
 *
 * resave: false
 * - Do not save session back to store if it was not modified.
 * - Prevents unnecessary database writes on every request.
 *
 * saveUninitialized: false
 * - Do not create a session until something is stored in it.
 * - Saves memory and database space.
 * - Session is only created after login (req.session.user is set).
 *
 * store: MongoStore
 * - By default sessions are stored in server memory (RAM).
 * - Problem: if server restarts, all sessions are lost.
 * - Problem: memory fills up with many users.
 * - Solution: store sessions in MongoDB using connect-mongo.
 * - Sessions persist across server restarts.
 * - mongoUrl: same MongoDB connection as your main database.
 * - ttl: time to live in seconds (1 day = 86400 seconds).
 *
 * cookie:
 * - maxAge   : how long cookie lasts (1 day in milliseconds).
 * - httpOnly : cookie cannot be accessed by JavaScript.
 *              Prevents XSS attacks from stealing cookies.
 * - secure   : cookie only sent over HTTPS.
 *              Set to true in production, false in development.
 * - sameSite : protects against CSRF attacks.
 *              'strict' = cookie only sent to same site.
 */
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 86400  // session expires in 1 day
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,  // 1 day in milliseconds
        httpOnly: true,                   // prevent JS access
        secure: false,                  // set true in production (HTTPS)
        sameSite: 'strict'                // prevent CSRF
    }
}));

app.use('/auth', authRoute);

app.use((err, req, res, next) => {
    console.error('Global Error:', err.message);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});

app.listen(PORT, () => {
    console.log(`🚀 Stateful Auth running at port ${PORT}`);
});