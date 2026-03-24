/**
 * Module: Reference and Populate (Get Top 5 Ratings and Reviews)
 * Retrieve the top 5 ratings of a movie sorted highest first.
 * Pair each rating with its corresponding review.
 *
 * Run AFTER 04-movie.addReview.js.
 * Paste your Movie _id below.
 */

const mongoose = require('mongoose');
const Movie    = require('./02-movie.model');

mongoose.connect("mongodb+srv://aslampaasa420:Sy*******er@cluster0.goyedz2.mongodb.net/studentDB")
    .then(() => { console.log('Connected to MongoDB'); })
    .catch(error => { console.error('Error connecting to MongoDB:', error); });

async function getTopRatingsAndReviews(movieId) {
    try {
        const movie = await Movie.findById(movieId).populate('reviews');

        /*
         * Sort ratings descending — highest rating first.
         * (b - a) = descending, (a - b) = ascending.
        */
        movie.ratings.sort((a, b) => b - a);

        /*
         * Take first 5 and pair each with its corresponding review.
        */
        const top5 = movie.ratings.slice(0, 5).map((rating, index) => ({
            rating,
            review: movie.reviews[index],
        }));

        console.log('Top 5 ratings and reviews:', JSON.stringify(top5, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        mongoose.disconnect();
    }
}

/**
 * Paste your Movie _id from 03-seed.js output:
*/
getTopRatingsAndReviews('your-movie-id-here');