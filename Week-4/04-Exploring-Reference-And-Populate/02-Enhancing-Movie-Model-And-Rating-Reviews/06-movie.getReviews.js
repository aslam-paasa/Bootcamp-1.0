/**
 * Module: Reference and Populate (Get First 3 Reviews with User Details)
 * Retrieve the first 3 reviews of a movie.
 * Use NESTED populate() to go:
 *    Movie → reviews → user (inside each review)
 *
 * Without populate → user field shows only ObjectId:
 * { text: 'Loved it!', user: '64abc123...' }
 *
 * With nested populate → user field shows full User data:
 * { text: 'Loved it!', user: { username: 'alice', profilePictureUrl: '...' } }
 *
 * Run AFTER 04-movie.addReview.js.
 * Paste your Movie _id below.
 */

const mongoose = require('mongoose');
const Movie = require('./02-movie.model');

mongoose.connect("mongodb+srv://aslampaasa420:Sy*******er@cluster0.goyedz2.mongodb.net/studentDB")
    .then(() => { console.log('Connected to MongoDB'); })
    .catch(error => { console.error('Error connecting to MongoDB:', error); });

async function getMovieReviewsWithUserDetails(movieId) {
    try {
        /*
         * Nested populate:
         * path: 'reviews'               → populate the reviews array field
         * populate: { path: 'user' }    → inside each review, also populate user
         * select: 'username profilePictureUrl' → only return these two fields
        */
        const movie = await Movie.findById(movieId).populate({
            path: 'reviews',
            populate: {
                path: 'user',
                select: 'username profilePictureUrl',
            },
        });

        /*
         * Slice first 3 reviews and format the result cleanly.
        */
        const first3Reviews = movie.reviews
            .slice(0, 3)
            .map((review) => ({
                reviewText: review.text,
                user: review.user,
            }));

        console.log('First 3 reviews with user details:', JSON.stringify(first3Reviews, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        mongoose.disconnect();
    }
}

/**
 * Paste your Movie _id from 03-seed.js output:
*/
getMovieReviewsWithUserDetails('your-movie-id-here');