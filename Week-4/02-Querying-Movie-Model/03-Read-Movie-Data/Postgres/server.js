/**
 * Put everything inside HTTP Server:
 */
const express = require('express');
const app = express();

/**
 * Import model:
 */
const { readMovie, pool } = require('./movie.model');

/**
 * Function call:
 */
async function run() {
    try {
        const movie = await readMovie('Dilwale Dulhania Le Jayenge');

        if (movie) {
            console.log('Found movie:', movie);
        } else {
            console.log('Movie not found');
        }
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