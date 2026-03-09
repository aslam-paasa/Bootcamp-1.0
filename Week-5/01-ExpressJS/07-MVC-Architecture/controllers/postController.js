/*
  controllers/postController.js — Post CRUD Logic
  =================================================
  Full CRUD for posts with ownership protection,
  file uploads (post images), pagination, search, and populate.
*/

const Post = require("../models/Post");

/* ---------------------------------------------------------------
  POST /api/v1/posts — create a post (logged-in users)
---------------------------------------------------------------- */
exports.createPost = async (req, res, next) => {
    try {
        const { title, content, tags } = req.body;

        const postData = {
            title,
            content,
            author: req.user.userId, // always taken from token — never from body
            tags: tags ? tags.split(",").map((t) => t.trim()) : [],
        };

        // If an image was uploaded with the post
        if (req.file) {
            postData.image = `/uploads/${req.file.filename}`;
        }

        const post = await Post.create(postData);
        res.status(201).json({ success: true, post });
    } catch (err) {
        next(err);
    }
};

/* ---------------------------------------------------------------
  GET /api/v1/posts — get all posts (public)
  Supports: ?page ?limit ?search ?sortBy ?order
---------------------------------------------------------------- */
exports.getAllPosts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const sortBy = req.query.sortBy || "createdAt";
        const order = req.query.order || "desc";

        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
            ];
        }

        const skip = (page - 1) * limit;
        const sortOrder = order === "asc" ? 1 : -1;

        const [posts, totalCount] = await Promise.all([
            Post.find(filter)
                .populate("author", "name email avatar") // replace author _id with user data
                .sort({ [sortBy]: sortOrder })
                .skip(skip)
                .limit(limit),
            Post.countDocuments(filter),
        ]);

        res.json({
            success: true,
            meta: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                limit,
                hasNextPage: page < Math.ceil(totalCount / limit),
                hasPrevPage: page > 1,
            },
            posts,
        });
    } catch (err) {
        next(err);
    }
};

/* ---------------------------------------------------------------
  GET /api/v1/posts/:id — get single post (public)
---------------------------------------------------------------- */
exports.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "name email avatar");
        if (!post) return res.status(404).json({ success: false, error: "Post not found." });
        res.json({ success: true, post });
    } catch (err) {
        next(err);
    }
};

/* ---------------------------------------------------------------
  PATCH /api/v1/posts/:id — update post (owner only)
---------------------------------------------------------------- */
exports.updatePost = async (req, res, next) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.image = `/uploads/${req.file.filename}`;
        if (req.body.tags) updateData.tags = req.body.tags.split(",").map((t) => t.trim());

        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!post) return res.status(404).json({ success: false, error: "Post not found." });
        res.json({ success: true, post });
    } catch (err) {
        next(err);
    }
};

/* ---------------------------------------------------------------
  DELETE /api/v1/posts/:id — delete post (owner or admin)
---------------------------------------------------------------- */
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ success: false, error: "Post not found." });
        res.json({ success: true, message: "Post deleted." });
    } catch (err) {
        next(err);
    }
};