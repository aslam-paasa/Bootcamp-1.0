const express = require("express");
const postController = require("../controllers/post.controller");
const { checkAuthToken } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

// Add Post
router.post("/add-post", checkAuthToken, upload.single("bannerImage"), postController.addPost)

// List Post
router.get("/list-posts", checkAuthToken, postController.listPosts);

// Update Post
router.put("/update-post/:id", checkAuthToken, upload.single("bannerImage"), postController.updatePost);

// Delete Post
router.delete("/delete-post/:id", checkAuthToken, postController.deletePost);

// Single Post
router.get("/:id", checkAuthToken, postController.singlePost);

module.exports = router;