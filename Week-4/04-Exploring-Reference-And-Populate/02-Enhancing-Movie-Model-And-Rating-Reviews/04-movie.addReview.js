/**
 * Module: Reference and Populate (Add Review to Movie)
 * Now we connect User and Movie by pushing a review into the
 * movie's reviews array. The review stores just the User's _id
 * as a reference — not the full User object.
 *
 * Steps:
 * a. Find the movie by its _id
 * b. Push a new review object: { user: userId, text: reviewText }
 * c. Save the movie
 * d. Fetch again with populate() to see full user details
 *
 * Run AFTER 03-seed.js.
 * Paste the User _id and Movie _id from the seed output below.
 */

const mongoose = require('mongoose');
const Movie = require('./02-movie.model');
const User = require('./01-user.model');

mongoose.connect("mongodb+srv://aslampaasa420:Sy*******er@cluster0.goyedz2.mongodb.net/studentDB")
    .then(() => { console.log('Connected to MongoDB'); })
    .catch(error => { console.error('Error connecting to MongoDB:', error); });

async function addReview(movieId, userId, reviewText) {
    try {
        const movie = await Movie.findById(movieId);

        if (!movie) throw new Error('Movie not found');

        /*
         * Push the review — stores only the userId (_id reference).
         * The actual User data is NOT duplicated here.
        */
        movie.reviews.push({ user: userId, text: reviewText });
        await movie.save();
        console.log('Review saved!');

        /*
         * Now fetch with populate() to confirm the reference works.
         * 'reviews.user' → go into reviews array, find user field, populate it.
         * 'username profilePictureUrl' → only return these fields from User.
        */
        const updatedMovie = await Movie.findById(movieId).populate(
            'reviews.user',
            'username profilePictureUrl',
        );
        console.log('Movie with review:', JSON.stringify(updatedMovie.reviews, null, 2));

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        mongoose.disconnect();
    }
}

/**
 * Paste your real IDs from 03-seed.js output:
*/
addReview(
    'your-movie-id-here',  // paste Movie _id
    'your-user-id-here',   // paste User _id
    'A fantastic movie! Totally loved it.',
);