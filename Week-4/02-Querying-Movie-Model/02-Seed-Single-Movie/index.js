/**
 * Learn how to create a data:
 * Q. Create a Movie:
 * => Create a function createMovie that accepts an object containing movie
 *    data and adds a new movie to the database.
 * 
 * Note: Always create in a function like this because if we create these
 *       like functions, then tomorrow we can just replace model objects inside
 *       this with another ORM like MySQL, NoSQL etc. So, the abstraction
 *       helps us to that and when we expose this to http server, we just
 *       call the functions with these data and we will never interact with
 *       the database directly through express. It helps us refactoring
 *       code, testing etc. 
 * 
 * Note: This code is just a syntax:
 * 
 *      async function createCat() {
 *          try {
 *              const newCat = new Cat({
 *                  name: 'Whiskers',
 *                  age: 3,
 *                  breed: 'Persian',
 *                  color: 'White',
 *              });
 *
 *              const savedCat = await newCat.save()
 *              console.log('New cat created:', savedCat)
 *          } catch (error) {
 *              console.error('Error creating cat:', error)
 *          }
 *      }
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
mongoose.connect("mongodb+srv://aslampaasa420:Syn******er@cluster0.goyedz2.mongodb.net/studentDB", {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

/**
 * Define Mongoose models(Movie, Student etc.)
*/

/**
 * Seed Data:
 * 1. Create new object 'Movie'
 * 2. Save items inside that object
 * 3. To do that, iterate over the data which we have read
*/


const newMovie = {
    title: 'New Movie',
    releaseYear: 2023,
    genre: ['Drama'],
    director: 'Director Name',
    actors: ['Actor 1', 'Actor 2'],
    language: 'Hindi',
    country: 'India',
    rating: 7.5,
    plot: 'Plot of the movie',
    awards: 'Awards received',
    posterUrl: '<https://example.com/poster.jpg>',
    trailerUrl: '<https://example.com/trailer.mp4>',
}


async function createMovie(movieData) {
    try {
        const movie = new Movie(movieData)
        const savedMovie = await movie.save()
        console.log('Created movie:', savedMovie)
    } catch (error) {
        throw error
    }
}


// Call the function with the newMovie object and log the result
createMovie(newMovie)

