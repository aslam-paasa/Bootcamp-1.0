/*
  models/Post.js — Post Model
  ============================
  A post belongs to one User (author reference).
  Demonstrates relationships + populate() from assignment 17.
*/

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Content is required."],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",     // references the User model
            required: true,
        },
        image: { type: String, default: null }, // optional uploaded image
        tags: { type: [String], default: [] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);