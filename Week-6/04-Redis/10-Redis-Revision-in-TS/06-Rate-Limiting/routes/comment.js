const express = require("express");
const Comment = require("../models/comments");
const commentRouter = express.Router();

/**
 * POST: Create a new comment
 */
commentRouter.post('/', async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * GET: Get comment by id
 */
commentRouter.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * PATCH: Update a comment
 */
commentRouter.patch('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * DELETE: Delete a comment
 */
commentRouter.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = commentRouter;

/**
 * Comment Schema:
 * {
 *   content: {
 *     type: String,
 *     required: true,
 *     trim: true,
 *     minLength: 1,
 *     maxLength: 1000
 *   },
 *   userId: {
 *     type: mongoose.Schema.Types.ObjectId,
 *     ref: 'User',
 *     required: true
 *   },
 *   postId: {
 *     type: mongoose.Schema.Types.ObjectId, 
 *     ref: 'Post',
 *     required: true
 *   },
 *   createdAt: {
 *     type: Date,
 *     default: Date.now
 *   },
 *   updatedAt: {
 *     type: Date,
 *     default: Date.now
 *   }
 * }
 */