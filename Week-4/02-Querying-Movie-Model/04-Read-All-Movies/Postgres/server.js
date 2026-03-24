/**
 * Put everything inside HTTP Server:
 */
const express = require('express');
const app = express();

/**
 * Import model:
 */
const { readAllMovies, pool } = require('./movie.model');

/**
 * Function call:
 */
async function run() {
    try {
        const movies = await readAllMovies();

        console.log('All movies:', movies);
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