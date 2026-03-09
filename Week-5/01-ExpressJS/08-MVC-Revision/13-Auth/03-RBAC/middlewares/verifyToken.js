const jwt = require('jsonwebtoken');

/**
 * verifyToken Middleware:
 * - Runs before any protected route.
 * - Checks if request has a valid JWT token.
 *
 * How client sends token:
 * - Authorization: Bearer <token>
 *
 * Steps:
 * 1. Extract token from Authorization header.
 * 2. Verify token using JWT_SECRET.
 * 3. If valid → attach decoded data to req.user → call next().
 * 4. If invalid → return 401 Unauthorized.
 *
 * After this middleware:
 * - req.user = { userId: '64abc...', role: 'admin' }
 * - Next middleware or controller can use req.user.role
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if token exists and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    try {
        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded payload to req.user
        req.user = decoded; // { userId, role, iat, exp }

        next();

    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;