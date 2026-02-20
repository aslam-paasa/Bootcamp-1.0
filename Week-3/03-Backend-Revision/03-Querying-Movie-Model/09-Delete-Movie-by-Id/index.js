/**
 * Learn to delete data:
 * Q. Delete a Movie by ID:
 * => Create a function deleteMovie that accepts a movie ID and deletes
 *    the movie with the provided ID.
 * 
 * Note: This is reference code:
 * 
        async function deleteCatById(catId) {
            try {
                const deletedCat = await Cat.findByIdAndDelete(catId)
                if (deletedCat) {
                    console.log('Deleted cat:', deletedCat)
                } else {
                    console.log('Cat not found')
                }
            } catch (error) {
                console.error('Error deleting cat:', error)
            }
        }
        // Example usage:
        deleteCatById('your-cat-id')  
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
 * Delete Movie by Id:
*/
async function deleteMovie(movieId) {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(movieId)
        console.log('Deleted movie:', deletedMovie)
    } catch (error) {
        throw error
    }
}


/**
 * Call the function with a movie ID and log the result:
 * */
deleteMovie('your-movie-id-here');


