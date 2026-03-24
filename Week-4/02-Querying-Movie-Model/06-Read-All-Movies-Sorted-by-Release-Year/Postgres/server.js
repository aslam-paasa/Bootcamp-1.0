/**
 * Express server:
 */
const express = require('express');
const app = express();

/**
 * Import model:
 */
const { readMoviesByReleaseYear, pool } = require('./movie.model');

/**
 * Function call:
 */
async function run() {
    try {
        const movies = await readMoviesByReleaseYear();

        console.log('Movies sorted by release year:', movies);
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