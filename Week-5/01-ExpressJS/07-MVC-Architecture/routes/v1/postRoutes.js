/*
  routes/v1/postRoutes.js — Post Routes
  =========================================
  Public read routes + protected write routes.
  POST and PATCH support optional image uploads.
  DELETE is protected by ownership middleware.
*/

const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postController");
const { verifyToken } = require("../../middleware/auth");
const { requirePostOwner } = require("../../middleware/ownership");
const upload = require("../../middleware/upload");

// GET /api/v1/posts — public — supports pagination, search, sort
router.get("/", postController.getAllPosts);

// GET /api/v1/posts/:id — public
router.get("/:id", postController.getPostById);

// POST /api/v1/posts — logged-in users only — supports optional image upload
router.post("/", verifyToken, upload.single("image"), postController.createPost);

// PATCH /api/v1/posts/:id — owner or admin only
router.patch("/:id", verifyToken, requirePostOwner, upload.single("image"), postController.updatePost);

// DELETE /api/v1/posts/:id — owner or admin only
router.delete("/:id", verifyToken, requirePostOwner, postController.deletePost);

module.exports = router;