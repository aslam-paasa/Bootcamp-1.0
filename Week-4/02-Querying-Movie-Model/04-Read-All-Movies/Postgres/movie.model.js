/**
 * Import PostgreSQL:
 */
const { Pool } = require('pg');

/**
 * Create connection:
 */
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movieDB',
    password: 'your_password',
    port: 5432,
});

/**
 * Read all movies (like find())
 */
async function readAllMovies() {
    try {
        const query = `SELECT * FROM movies;`;

        const result = await pool.query(query);

        return result.rows;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

module.exports = {
    readAllMovies,
    pool
};