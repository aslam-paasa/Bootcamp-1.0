/**
 * Learn to fetch all data for a given actor:
 * Q. Read all movies for a given actor
 * => Create a function readMoviesByActor that accepts an actor's name
 *    and retrieves all movies in which the actor has appeared.
 * => This is just a reference code:

        async function getCatsByBreed(breed) {
            try {
                const catsOfBreed = await Cat.find({ breed: breed })
                console.log(`Cats of breed "${breed}":`, catsOfBreed)
            } catch (error) {
                console.error('Error getting cats:', error)
            }
        }
        getCatsByBreed('Persian')
 *
 *
 * Note:
 * => When we want to find:
 *    1. One: Use findOne()
 *    2. All: Use find()
 *    3. All with filters: Use find({ director: directorName }) 
 *       => Whatever we want to search, put it inside the bracket.
 *       => So find all the movies which is directed by the whatever
 *          director name we have passed as an input.
*/


/**
* Importing mongoose:
*/
const mongoose = require('mongoose');


/**
 * Assuming this is the path to your movie model:
*/
const Movie = require('../movie.model.js');


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
 * Fetch all movies of a given actor:
*/
async function readMoviesByActor(actorName) {
    try {
        const moviesByActor = await Movie.find({ actors: actorName })
        console.log('Movies by actor:', moviesByActor)
    } catch (error) {
        throw error
    }
}


/**
 * Call the function with an actor's name and log the result:
*/
readMoviesByActor('Shah Rukh Khan')

