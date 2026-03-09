/*
  middleware/errorHandler.js — Global Error Handler
  ==================================================
  Catches ALL errors passed via next(err) anywhere in the app.
  Returns a consistent JSON error response every time.
  Must be the LAST middleware registered in app.js.
*/

const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);

    // Mongoose validation error — extract all field messages
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ success: false, errors: messages });
    }

    // Mongoose duplicate key error (e.g. duplicate email)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({ success: false, error: `${field} already exists.` });
    }

    // Mongoose invalid ObjectId (e.g. /users/not-a-valid-id)
    if (err.name === "CastError") {
        return res.status(400).json({ success: false, error: "Invalid ID format." });
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ success: false, error: "Invalid token." });
    }
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ success: false, error: "Token has expired." });
    }

    // Multer file size error
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ success: false, error: "File too large. Max size is 2MB." });
    }

    // Default — unknown server error
    res.status(err.status || 500).json({
        success: false,
        error: err.message || "Internal Server Error",
    });
};

module.exports = errorHandler;