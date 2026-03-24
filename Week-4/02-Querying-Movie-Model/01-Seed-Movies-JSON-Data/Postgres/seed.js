/**
 * Import modules:
 */
const { deleteAllMovies, insertManyMovies, pool } = require('./movie.model');

/**
 * Seed function:
 */
async function createMovie() {
    try {
        const moviesData = require('./movie.data.json');

        /**
         * Clear existing data (like deleteMany)
         */
        await deleteAllMovies();

        /**
         * Insert all movies (like insertMany)
         */
        const count = await insertManyMovies(moviesData);

        console.log(`Successfully seeded ${count} movies`);
    } catch (error) {
        console.error('Error seeding movies:', error);
    } finally {
        await pool.end(); // close DB connection
    }
}

/**
 * Call function:
 */
createMovie();