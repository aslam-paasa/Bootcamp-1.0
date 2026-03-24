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
 * Read movies by actor (array filter)
 */
async function readMoviesByActor(actorName) {
    try {
        const query = `
            SELECT * FROM movies
            WHERE $1 = ANY(actors);
        `;

        const result = await pool.query(query, [actorName]);

        return result.rows;
    } catch (error) {
        console.error('Error fetching movies by actor:', error);
        throw error;
    }
}

module.exports = {
    readMoviesByActor,
    pool
};