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
 * Read movie by title (like findOne)
 */
async function readMovie(movieTitle) {
    try {
        const query = `
            SELECT * FROM movies
            WHERE title = $1
            LIMIT 1;
        `;

        const result = await pool.query(query, [movieTitle]);

        if (result.rows.length === 0) {
            console.log('Movie not found');
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Error reading movie:', error);
        throw error;
    }
}

module.exports = {
    readMovie,
    pool
};