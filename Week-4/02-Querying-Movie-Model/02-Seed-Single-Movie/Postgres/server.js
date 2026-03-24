/**
 * Put everything inside HTTP Server:
 */
const express = require('express');
const app = express();

/**
 * Import movie model:
 */
const { createMovie, pool } = require('./movie.model');

/**
 * Sample data:
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
    posterUrl: 'https://example.com/poster.jpg',
    trailerUrl: 'https://example.com/trailer.mp4',
};

/**
 * Function call:
 */
async function run() {
    try {
        const savedMovie = await createMovie(newMovie);
        console.log('Created movie:', savedMovie);
    } catch (error) {
        console.error(error);
    } finally {
        await pool.end(); // close DB
    }
}

run();

app.listen(3000, () => {
    console.log('Server running on port 3000');
});