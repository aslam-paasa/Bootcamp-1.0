/**
 * Module: Reference and Populate
 * Before we can add reviews, we need:
 * 1. A User in the database (the reviewer)
 * 2. A Movie in the database (to be reviewed)
 *
 * Run this file FIRST.
 * Copy the User _id and Movie _id from the console output.
 * You will need them in the next files.
 */

const mongoose = require('mongoose');
const User = require('./01-user.model');
const Movie = require('./02-movie.model');

mongoose.connect("mongodb+srv://aslampaasa420:Sy*******er@cluster0.goyedz2.mongodb.net/studentDB")
    .then(() => { console.log('Connected to MongoDB'); })
    .catch(error => { console.error('Error connecting to MongoDB:', error); });

async function seedUserAndMovie() {
    try {
        /**
         * Step 1 — Create a User:
        */
        const newUser = await new User({
            email: 'alice@example.com',
            password: 'password123',
            username: 'alice',
            nickname: 'Ali',
            profilePictureUrl: 'https://example.com/alice.jpg',
        }).save();
        console.log('User created!');
        console.log('User _id:', newUser._id); // copy this

        /**
         * Step 2 — Create a Movie:
        */
        const newMovie = await new Movie({
            title: '3 Idiots',
            releaseYear: 2009,
            genre: ['Comedy', 'Drama'],
            director: 'Rajkumar Hirani',
            actors: ['Aamir Khan', 'R. Madhavan', 'Sharman Joshi'],
            language: 'Hindi',
            rating: 8.4,
            plot: 'Two friends search for their long-lost college buddy.',
        }).save();
        console.log('Movie created!');
        console.log('Movie _id:', newMovie._id); // copy this

    } catch (error) {
        console.error('Seed error:', error.message);
    } finally {
        mongoose.disconnect();
    }
}

seedUserAndMovie();