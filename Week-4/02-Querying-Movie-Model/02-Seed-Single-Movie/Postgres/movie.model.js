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
 * Create Movie (same abstraction idea as Mongo)
 */
async function createMovie(movieData) {
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
            movieData.title,
            movieData.releaseYear,
            movieData.genre,   // ARRAY
            movieData.director,
            movieData.actors,  // ARRAY
            movieData.language,
            movieData.country || 'India',
            movieData.rating ?? 0,
            movieData.plot,
            movieData.awards,
            movieData.posterUrl,
            movieData.trailerUrl
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    } catch (error) {
        console.error('Error creating movie:', error);
        throw error;
    }
}

module.exports = {
    createMovie,
    pool
};