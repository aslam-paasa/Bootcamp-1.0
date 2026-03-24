/**
 * Module: Reference and Populate
 * The User model is the base model that Movie will reference.
 * When a user writes a review on a movie, we store their _id
 * inside the movie's reviews array.
 * populate() will later replace that _id with this full document.
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePictureUrl: String,
        username: {
            type: String,
            required: true,
            unique: true,
        },
        nickname: String,
        phoneNumber: Number,
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);

module.exports = User;