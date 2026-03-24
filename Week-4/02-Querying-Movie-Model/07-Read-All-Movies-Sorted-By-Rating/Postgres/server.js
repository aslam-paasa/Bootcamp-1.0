/**
 * Express server:
 */
const express = require('express');
const app = express();

/**
 * Import model:
 */
const { readMoviesByRating, pool } = require('./movie.model');

/**
 * Function call:
 */
async function run() {
    try {
        const movies = await readMoviesByRating();

        console.log('Movies sorted by rating:', movies);
    } catch (error) {
        console.error(error);
    } finally {
        await pool.end();
    }
}

run();

app.listen(3000, () => {
    console.log('Server running on port 3000');
});