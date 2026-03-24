/**
 * Express server:
 */
const express = require('express');
const app = express();

/**
 * Import model:
 */
const { updateMovie, pool } = require('./movie.model');

/**
 * Function call:
 */
async function run() {
    try {
        const updatedMovie = await updateMovie(1, {
            rating: 8.5
        });

        if (updatedMovie) {
            console.log('Updated movie:', updatedMovie);
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