const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// ─── REGISTER ─────────────────────────────────────────────────────────────────

/**
 * REGISTER:
 * - POST /auth/register
 * - Body: { name, email, password, role }
 *
 * Steps:
 * 1. Check if email already exists.
 * 2. Hash the password.
 * 3. Save user to database.
 * 4. Return success.
 *
 * No session is created on register.
 * User must login separately after registering.
 */
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Step 1: Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Step 2: Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 3: Save user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'customer'
        });
        await user.save();

        res.status(201).json({ message: 'Registered successfully. Please login.' });

    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};

// ─── LOGIN ─────────────────────────────────────────────────────────────────────

/**
 * LOGIN:
 * - POST /auth/login
 * - Body: { email, password }
 *
 * Steps:
 * 1. Find user by email.
 * 2. Compare password with hash.
 * 3. Create a session and store user data inside it.
 * 4. Return success.
 *
 * req.session.user:
 * - This is where we store the logged in user's data.
 * - express-session automatically saves this to MongoDB
 *   using connect-mongo and sends a session ID cookie
 *   to the client.
 * - The client browser stores the cookie and sends it
 *   automatically with every future request.
 *
 * Session document in MongoDB (sessions collection):
 * {
 *   _id     : 'abc123sessionid',
 *   session : '{"user":{"userId":"64abc","role":"customer"}}',
 *   expires : ISODate('2025-01-20T10:00:00Z')
 * }
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Step 1: Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Step 2: Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Step 3: Create session
        req.session.user = {
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        // Step 4: Return success
        res.status(200).json({
            message: 'Login successful',
            user: req.session.user
        });

    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};

// ─── GET PROFILE ──────────────────────────────────────────────────────────────

/**
 * GET PROFILE:
 * - GET /auth/profile
 * - Protected by isAuthenticated middleware.
 *
 * req.session.user is available because:
 * - isAuthenticated middleware already confirmed session exists.
 * - We just return the user data stored in the session.
 */
const getProfile = (req, res) => {
    res.status(200).json({
        message: 'Profile fetched',
        user: req.session.user
    });
};

// ─── LOGOUT ───────────────────────────────────────────────────────────────────

/**
 * LOGOUT:
 * - POST /auth/logout
 * - Protected by isAuthenticated middleware.
 *
 * req.session.destroy():
 * - Destroys the session on the SERVER side.
 * - Deletes the session document from MongoDB.
 * - Clears the session cookie from the client browser.
 * - After this, the session ID cookie is no longer valid.
 *
 * This is the KEY difference from JWT logout:
 * - JWT logout: client just deletes the token locally.
 *   The token is still valid until it expires naturally.
 * - Session logout: server DESTROYS the session immediately.
 *   The session ID is invalidated instantly on the server.
 */
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed', error: err.message });
        }
        res.clearCookie('connect.sid');  // clear session cookie from browser
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

module.exports = { register, login, getProfile, logout };