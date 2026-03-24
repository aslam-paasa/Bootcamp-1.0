const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// ─── REGISTER ─────────────────────────────────────────────────────────────────

/**
 * REGISTER:
 * - POST /auth/register
 * - Body: { name, email, password, role }
 *
 * Steps:
 * 1. Check if email already exists.
 * 2. Hash the password with bcrypt.
 * 3. Save user with hashed password and role.
 * 4. Return success response.
 */
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Step 1: Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Step 2: Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 3: Save new user with role
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'customer'  // default to customer if not provided
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────

/**
 * LOGIN:
 * - POST /auth/login
 * - Body: { email, password }
 *
 * Steps:
 * 1. Find user by email.
 * 2. Compare plain password with hashed password.
 * 3. Generate JWT token with userId and role inside payload.
 * 4. Return token to client.
 *
 * The role is stored inside the token so:
 * - verifyToken can read the role from token.
 * - authorizeRole can check the role without hitting the database.
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Step 1: Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Step 2: Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Step 3: Generate token with role inside payload
        const token = jwt.sign(
            { userId: user._id, role: user.role },  // role stored in token
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Step 4: Return token and user info
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};

module.exports = { register, login };