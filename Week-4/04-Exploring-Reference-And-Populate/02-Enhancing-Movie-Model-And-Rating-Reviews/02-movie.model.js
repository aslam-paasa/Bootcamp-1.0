/**
 * Module: Reference and Populate
 * The Movie model includes a reviews array.
 * Each review stores:
 *   - user: ObjectId reference → points to User model
 *   - text: the written review text
 *
 * Q. How does Movie connect to User?
 * => Inside reviews array, the user field uses:
 *    type: mongoose.Schema.Types.ObjectId
 *    ref: 'User'
 * => This tells Mongoose: "this _id belongs to the User collection".
 * => When we call .populate('reviews.user'), Mongoose replaces
 *    the stored _id with the full User document automatically.
 */

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        releaseYear: { type: Number, required: true },
        genre: [{
            type: String,
            enum: ['Action', 'Drama', 'Comedy', 'Romance', 'Thriller', 'Fantasy', 'Sci-Fi', 'Horror', 'Sports', 'Musical', 'Other'],
        }],
        director: { type: String, required: true },
        actors: [{ type: String }],
        language: { type: String, required: true },
        country: { type: String, default: 'India' },
        rating: { type: Number, min: 0, max: 10, default: 0 },
        plot: String,
        awards: String,
        posterUrl: String,
        trailerUrl: String,

        /*
         * reviews is an array of embedded objects.
         * Each review has:
         *   user → ObjectId reference to User model
         *   text → written review text
         *
         * Stored in DB:
         * reviews: [{ user: ObjectId('64abc...'), text: 'Loved it!' }]
         *
         * After populate():
         * reviews: [{ user: { username: 'alice', profilePictureUrl: '...' }, text: 'Loved it!' }]
        */
        reviews: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                text: String,
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;