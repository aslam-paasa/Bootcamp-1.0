/** 
 * Q. Seeding the data:
 *    To update a MongoDB database using Mongoose by seeding it with
 *    data from JSON file, you can follow these general steps:
 *    1. Read JSON File:
 *       => First create a .json file and put your data in that file.
 *       => Read the JSON data from your JSON file.
 *       => You can use built-in Node.js modules like fs to accomplish 
 *          this.
 *    2. Connect to MongoDB: 
 *       => Use Mongoose to connect to your MongoDB database using the 
 *          mongoose.connect() method.
 *    3. Define Mongoose Models:
 *       => Define the Mongoose models for your data, similar to how you've
 *          defined the Movie model in your previous examples.
 *    4. Seed Data:
 *       => Loop through the JSON data and create instances of your
 *          Mongoose models using the JSON data.
 *    5. Save Data to database:
 *       => For each instance, use the save() method to save the data to
 *          the database.
 * 
 * 
 * Q. How to read a file in NodeJS?
 * => Using 'fs' module.
 * => fs.readFileSync() function will read that json file and store it
 *    in a variable:
 *       const jsonData = fs.readFileSync('./10-movies.json', 'utf-8');
 * => Then parsing jsonData, convert it into json data into object and
 *    store it into a moviesData variable as an object:
 *       const moviesData = JSON.parse(jsonData);
 * 
 * 
 * Q. How do we seed/add data to database?
 * => Seeding data is basically means, read a JSON/Excel file etc in 
 *    NodeJS and add it to the database.
 * => Calling a function called seedDatabase() and in that function
 *    we are saying you are an Array of Objects. And if you are an
 *    array of objects then let me iterate over the object.
 * => When I have the object, we know that every data like title, genre,
 *    etc is there. I have checked myself:
 * 
        for (const movieData of moviesData) {
            const newMovie = new Movie({
                title: movieData.title,
                releaseYear: movieData.releaseYear,
                genre: movieData.genre,
                director: movieData.director,
                actors: movieData.actors,
                language: movieData.language,
                country: movieData.country,
                rating: movieData.rating,
                plot: movieData.plot,
                awards: movieData.awards,
                posterUrl: movieData.posterUrl,
                trailerUrl: movieData.trailerUrl,
            })

 * => I will put all of these data in a 'Movie' model/Schema and then call it
 *    save:
            await newMovie.save()
            console.log(`Movie "${newMovie.title}" seeded.`)
 *
 * Q. Why is this 'Movie' object saved?
 * => Because previously we have already declared 'Movie' as model/Schema:
 *       const Movie = require('./09-movie-Schema');
 * => Movie is a mongoose model called Document.
 * => So, now we are creating 'newMovie' document from existing 'Movie'
 *    model (creating new model with data using the blueprint):
 *    
 *       const newMovie = new Movie({
 *            => document model
 *            => ...
 *            => ...
 *       }
 * => And when we create new document, we save it:
 *       await newMovie.save();
 * => This basically saves it to the database. And this ".save()" basically
 *    goes ahead and saves it to the mentioned database.
 * => And once it is saved, we are saying:
 *       console.log(`Movie "${newMovie.title}" seeded.`);
 *       console.log('Database seeding complete.')
 * => But if there is an error:
 *       console.error('Error seeding database:', error)
 * => And finally disconnecting the database, once all the process is done:
 *       mongoose.disconnect();
 * 
 * */

/**
 * Importing mongoose & fs module:
*/
const mongoose = require('mongoose');
const fs = require('fs');

/**
 * Assuming this is the path to your movie model:
*/
const Movie = require('./movie.model');

/**
 * Read JSON File in NodeJS:
*/
const jsonData = fs.readFileSync('./movies.json', 'utf-8');
const moviesData = JSON.parse(jsonData);

/**
 * Connect to MongoDB:
*/
mongoose.connect("mongodb+srv://aslampaasa420:Sy********er@cluster0.goyedz2.mongodb.net/studentDB")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

/**
 * Seed Data:
 * 1. Create new object 'Movie'
 * 2. Save items inside that object
 * 3. To do that, iterate over the data which we have read
*/
async function seedDatabase() {
    try {
        for (const movieData of moviesData) {
            const newMovie = new Movie({
                title: movieData.title,
                releaseYear: movieData.releaseYear,
                genre: movieData.genre,
                director: movieData.director,
                actors: movieData.actors,
                language: movieData.language,
                country: movieData.country,
                rating: movieData.rating,
                plot: movieData.plot,
                awards: movieData.awards,
                posterUrl: movieData.posterUrl,
                trailerUrl: movieData.trailerUrl,
            });

            await newMovie.save();
            console.log(`Movie "${newMovie.title}" seeded.`);
        }
        console.log('Database seeding complete.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.disconnect();
    }
}

/**
 * Calling the seedDatabase function to start seeding:
*/
seedDatabase();

/**
 * When you run the console:
 * => Connected to MongoDB
 * => Movie "Dilwale Dulhania Le Jayenge" seeded.
 * => Movie "Bahubali: The Beginning" seeded.
 * => Movie "Lagaan" seeded.
 * => Movie "Kabhi Khushi Kabhi Gham" seeded.
 * => Movie "PK" seeded.
 * => Movie "Bajrangi Bhaijaan" seeded.
 * => Movie "3 Idiots" seeded.
 * => Movie "Gully Boy" seeded.
 * => Database seeding complete.
*/