/**
 * Learn how to read data:
 * Q. Read a Movie:
 * => Create a function readMovie that accepts the movie title and 
 *    retrieves the movie details from the database.
 * 
 * Note: This is just a sample code:
 * 
        async function getCatByName(catName) {
            try {
                const foundCat = await Cat.findOne({ name: catName })
                if (foundCat) {
                    console.log('Found cat:', foundCat)
                } else {
                    console.log('Cat not found')
                }
            } catch (error) {
                console.error('Error getting cat:', error)
            }
        }
        getCatByName('Whiskers')
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
 * Fetch data:
*/
async function readMovie(movieTitle) {
    try {
        const movie = await Movie.findOne({ title: movieTitle })
        console.log(movie)
    } catch (error) {
        throw error
    }
}


/**
 * Call the function with a movie title and log the result:
*/
readMovie('Dilwale Dulhania Le Jayenge')
