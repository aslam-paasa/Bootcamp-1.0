/**
 * isAuthenticated Middleware:
 * - Checks if the user has an active session.
 * - req.session.user is set during login.
 * - If session exists → allow access.
 * - If no session → return 401 Unauthorized.
 *
 * This is the stateful equivalent of verifyToken in JWT.
 * Instead of verifying a token, we check if session exists.
 */
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        next(); // session exists → allow access
    } else {
        res.status(401).json({ message: 'Not authenticated. Please login.' });
    }
};

module.exports = isAuthenticated;