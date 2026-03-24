/*
  middleware/upload.js — Multer File Upload
  ==========================================
  Configures multer for disk storage with file type
  validation and a 2MB size limit.
  Exported as a configured multer instance — use in routes.
*/

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // e.g. 1714500000000-photo.jpg — unique and preserves extension
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"));
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed."), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
});

module.exports = upload;