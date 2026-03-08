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
 * Seed All movies.data.json data:
*/


async function createMovie() {
    try {
        const moviesData = require('./movie.data.json');

        // Clear existing movies
        await Movie.deleteMany({});

        // Insert all movies at once
        const result = await Movie.insertMany(moviesData);
        console.log(`Successfully seeded ${result.length} movies`);

        return result;
    } catch (error) {
        console.error('Error seeding movies:', error);
        throw error;
    }
}


// Call the function with the newMovie object and log the result
createMovie(newMovie)

