const cloudinary = require('cloudinary').v2;

/**
 * Cloudinary Configuration:
 * - Moved out of index.js into its own config file (MVC best practice)
 * - Must be required once at app startup
 */
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:    process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

module.exports = cloudinary;