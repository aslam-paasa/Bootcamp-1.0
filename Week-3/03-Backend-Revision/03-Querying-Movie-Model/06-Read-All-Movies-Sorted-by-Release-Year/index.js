/**
 * Learn how to fetch data by sorting:
 * Q. Read all movies sorted by release year:
 * => Create a function readMoviesByReleaseYear that retrieves all movies
 *    from the database and sorts them in ascending order based on their
 *    release years.    
 *
 * Note: If we have less data like 100 to 500 array of objects, we can
 *       do the filter, sort etc in the frontend. But if the array of
 *       objects are bigger then do the sorting, filtering etc in the
 *       backend.
 *    => Frontend calls are faster than backend but if the data is big
 *       and we put a sort of filter on it like pagination, it can
 *       also make our UI unresponsive. So, do deligate balance between
 *       frontend and backend.
 * */


/**
* Importing mongoose:
*/
const mongoose = require('mongoose');


/**
 * Assuming this is the path to your movie model:
*/
const Movie = require('./movie.model');


/**
 * Connect to MongoDB:
*/
mongoose.connect("mongodb+srv://aslampaasa420:Sy********er0.goyedz2.mongodb.net/studentDB", {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});


/**
 * Fetch all movies sorted by rating:
*/
async function readMoviesByReleaseYear() {
    try {
        const moviesByReleaseYear = await Movie.find().sort({ releaseYear: 1 })
        console.log('Movies sorted by release year:', moviesByReleaseYear)
    } catch (error) {
        throw error
    }
}


/**
 * Call the function and log the result:
 * */
readMoviesByReleaseYear()



