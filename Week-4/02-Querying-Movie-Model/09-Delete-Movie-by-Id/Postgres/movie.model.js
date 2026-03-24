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
 * Delete movie by ID
 */
async function deleteMovie(movieId) {
    try {
        const query = `
            DELETE FROM movies
            WHERE id = $1
            RETURNING *;
        `;

        const result = await pool.query(query, [movieId]);

        if (result.rows.length === 0) {
            console.log('Movie not found');
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Error deleting movie:', error);
        throw error;
    }
}

module.exports = {
    deleteMovie,
    pool
};