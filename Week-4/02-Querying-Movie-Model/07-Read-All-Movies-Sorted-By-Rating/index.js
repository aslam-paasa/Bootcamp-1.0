/**
 * Learn to fetch data by sorting:
 * Q. Read all movies sorted by rating:
 * => Create a function readMoviesByRating that retrieves all the movies
 *    from the database and sorts them in descending order based on their
 *    ratings.
 * 
 * Note: This is just a reference code:
 * 
        async function getAllCatsSortedByAge() {
            try {
                const sortedCats = await Cat.find({}).sort({ age: 1 })
                console.log('All cats sorted by age:', sortedCats)
            } catch (error) {
                console.error('Error getting cats:', error)
            }
        }
        getAllCatsSortedByAge()
 *
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
async function readMoviesByRating() {
    try {
        const moviesByRating = await Movie.find().sort({ rating: -1 })
        console.log('Movies sorted by rating:', moviesByRating)
    } catch (error) {
        throw error
    }
}


/**
 * Call the function and log the result:
 * */
readMoviesByRating()


