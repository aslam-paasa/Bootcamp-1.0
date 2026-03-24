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
 * Read movies sorted by rating (DESC)
 */
async function readMoviesByRating() {
    try {
        const query = `
            SELECT * FROM movies
            ORDER BY rating DESC;
        `;

        const result = await pool.query(query);

        return result.rows;
    } catch (error) {
        console.error('Error fetching movies by rating:', error);
        throw error;
    }
}

module.exports = {
    readMoviesByRating,
    pool
};