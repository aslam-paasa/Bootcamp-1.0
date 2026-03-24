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
 * Update movie by ID
 */
async function updateMovie(movieId, updatedData) {
    try {
        const query = `
            UPDATE movies
            SET
                title = COALESCE($1, title),
                release_year = COALESCE($2, release_year),
                genre = COALESCE($3, genre),
                director = COALESCE($4, director),
                actors = COALESCE($5, actors),
                language = COALESCE($6, language),
                country = COALESCE($7, country),
                rating = COALESCE($8, rating),
                plot = COALESCE($9, plot),
                awards = COALESCE($10, awards),
                poster_url = COALESCE($11, poster_url),
                trailer_url = COALESCE($12, trailer_url),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $13
            RETURNING *;
        `;

        const values = [
            updatedData.title,
            updatedData.releaseYear,
            updatedData.genre,
            updatedData.director,
            updatedData.actors,
            updatedData.language,
            updatedData.country,
            updatedData.rating,
            updatedData.plot,
            updatedData.awards,
            updatedData.posterUrl,
            updatedData.trailerUrl,
            movieId
        ];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            console.log('Movie not found');
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error('Error updating movie:', error);
        throw error;
    }
}

module.exports = {
    updateMovie,
    pool
};