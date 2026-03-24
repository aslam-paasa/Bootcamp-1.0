/*
  middleware/ownership.js — Ownership Guard
  ==========================================
  Checks that the logged-in user is the author of the resource
  they are trying to modify or delete.
  Admins bypass this check — they can manage any resource.
*/

const Post = require("../models/Post");

/*
  requirePostOwner
  -----------------
  Fetches the post, checks if req.user.userId matches post.author.
  Admins always pass — they can delete/edit any post.
  Attaches post to req.post so the route handler can use it directly.
*/
exports.requirePostOwner = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, error: "Post not found." });
        }

        const isOwner = post.author.toString() === req.user.userId.toString();
        const isAdmin = req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ success: false, error: "Access denied. You do not own this post." });
        }

        req.post = post; // attach post to req so controller can use it
        next();
    } catch (err) {
        next(err);
    }
};