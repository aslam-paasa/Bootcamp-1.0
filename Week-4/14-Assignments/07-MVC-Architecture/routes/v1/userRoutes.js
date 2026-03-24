/*
  routes/v1/userRoutes.js — User Routes
  =========================================
  Admin-protected user management routes.
  PATCH /users/:id allows avatar upload via multer.
*/

const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const { verifyToken, authorise } = require("../../middleware/auth");
const upload = require("../../middleware/upload");

// GET /api/v1/users — admin only — supports pagination, search, filter, sort
router.get("/", verifyToken, authorise("admin"), userController.getAllUsers);

// GET /api/v1/users/:id — admin only
router.get("/:id", verifyToken, authorise("admin"), userController.getUserById);

// PATCH /api/v1/users/:id — admin or the user themselves
// upload.single("avatar") runs before controller to handle optional file upload
router.patch("/:id", verifyToken, upload.single("avatar"), userController.updateUser);

// DELETE /api/v1/users/:id — admin only
router.delete("/:id", verifyToken, authorise("admin"), userController.deleteUser);

module.exports = router;