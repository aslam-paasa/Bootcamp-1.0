/*
  middleware/auth.js — Authentication & Authorization
  =====================================================
  verifyToken → checks the JWT is valid (are you logged in?)
  authorise   → checks the user's role  (do you have permission?)
*/

const jwt = require("jsonwebtoken");

/*
  verifyToken
  -----------
  Reads the Bearer token from the Authorization header.
  If valid → attaches decoded payload to req.user and calls next().
  If missing or invalid → returns 401.
*/
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ success: false, error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>" → "<token>"

    if (!token) {
        return res.status(401).json({ success: false, error: "Access denied. Token missing." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, role } — available in all routes after this
        next();
    } catch (err) {
        res.status(401).json({ success: false, error: "Invalid or expired token." });
    }
};

/*
  authorise(...roles)
  -------------------
  Middleware factory — takes allowed roles and returns a middleware.
  Must be used AFTER verifyToken since it reads req.user.role.

  Usage:
  app.get("/admin",    verifyToken, authorise("admin"),              handler)
  app.get("/moderate", verifyToken, authorise("admin","moderator"),  handler)
*/
exports.authorise = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: `Access denied. Required: [${roles.join(", ")}]. Your role: ${req.user.role}`,
            });
        }
        next();
    };
};