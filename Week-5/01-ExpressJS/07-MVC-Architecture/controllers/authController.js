/*
  controllers/authController.js — Auth Logic
  ============================================
  Handles register, login, and get-my-profile.
  Controllers contain the BUSINESS LOGIC.
  They receive req, call models, and send res.
  Routes just call these functions — no logic in routes.
*/

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

/*
  Helper — generates a JWT for a given user.
  Payload includes userId and role so middleware can read both.
*/
const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

/* ---------------------------------------------------------------
  POST /api/v1/auth/register
---------------------------------------------------------------- */
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, error: "Email already registered." });
        }

        // Password is hashed by the pre-save hook in the User model
        const user = await User.create({ name, email, password, role });

        // Send welcome email (non-blocking — we don't await so a mail failure won't block the response)
        sendEmail({
            to: email,
            subject: "Welcome!",
            html: `<h2>Welcome, ${name}! 🎉</h2><p>Your account has been created.</p>`,
        }).catch((err) => console.error("Welcome email failed:", err.message));

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err); // pass to global error handler
    }
};

/* ---------------------------------------------------------------
  POST /api/v1/auth/login
---------------------------------------------------------------- */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Email and password are required." });
        }

        // Explicitly select password since select:false in schema hides it
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ success: false, error: "Invalid credentials." });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Invalid credentials." });
        }

        const token = generateToken(user);

        res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (err) {
        next(err);
    }
};

/* ---------------------------------------------------------------
  GET /api/v1/auth/me — get logged-in user's profile
---------------------------------------------------------------- */
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found." });
        }

        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
};