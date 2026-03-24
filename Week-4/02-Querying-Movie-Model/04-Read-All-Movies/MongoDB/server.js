/**
 * Learn to read all data:
 * Q. Read a Movie:
 * => Create a function readMovie that accepts the movie title and retrieves
 *    the movie details from the database.
 * Note: This is just a reference code. 
 * 
        async function getAllCats() {
            try {
                const allCats = await Cat.find({})
                console.log('All cats:', allCats)
            } catch (error) {
                console.error('Error getting cats:', error)
            }
        }
 *
 * */


/**
 * Importing mongoose:
*/
const mongoose = require('mongoose');


/**
 * Assuming this is the path to your movie model:
*/
const Movie = require('./movie.model.js');


/**
 * Connect to MongoDB:
*/
mongoose.connect("mongodb+srv://aslampaasa420:Sy********er@cluster0.goyedz2.mongodb.net/studentDB", {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});


/**
 * Fetch all movies:
*/
async function readAllMovies() {
    try {
        /**
         * The only thing changing is this function: Movie.find()
        */
        const allMovies = await Movie.find()
        console.log('All movies:', allMovies)
    } catch (error) {
        throw error
    }
}


/**
 * Call the function and log the result:
*/
readAllMovies()
