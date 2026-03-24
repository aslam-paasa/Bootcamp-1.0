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
 * Insert movie:
 */
async function createMovie(data) {
    try {
        const query = `
            INSERT INTO movies (
                title,
                release_year,
                genre,
                director,
                actors,
                language,
                country,
                rating,
                plot,
                awards,
                poster_url,
                trailer_url
            ) VALUES (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
            )
            RETURNING *;
        `;

        const values = [
            data.title,
            data.releaseYear,
            data.genre,     // ARRAY
            data.director,
            data.actors,    // ARRAY
            data.language,
            data.country || 'India',
            data.rating ?? 0,
            data.plot,
            data.awards,
            data.posterUrl,
            data.trailerUrl
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    } catch (error) {
        console.error('Error inserting movie:', error);
        throw error;
    }
}

module.exports = {
    createMovie,
    pool
};