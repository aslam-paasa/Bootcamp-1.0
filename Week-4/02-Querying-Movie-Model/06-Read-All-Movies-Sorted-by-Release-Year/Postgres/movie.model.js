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
 * Read movies sorted by release year
 */
async function readMoviesByReleaseYear() {
    try {
        const query = `
            SELECT * FROM movies
            ORDER BY release_year ASC;
        `;

        const result = await pool.query(query);

        return result.rows;
    } catch (error) {
        console.error('Error fetching sorted movies:', error);
        throw error;
    }
}

module.exports = {
    readMoviesByReleaseYear,
    pool
};