/**
 * Express server:
 */
const express = require('express');
const app = express();

/**
 * Import model:
 */
const { deleteMovie, pool } = require('./movie.model');

/**
 * Function call:
 */
async function run() {
    try {
        const deletedMovie = await deleteMovie(1);

        if (deletedMovie) {
            console.log('Deleted movie:', deletedMovie);
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