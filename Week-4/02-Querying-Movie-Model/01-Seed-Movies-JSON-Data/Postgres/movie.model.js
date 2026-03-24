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
 * Delete all movies (like deleteMany)
 */
async function deleteAllMovies() {
    await pool.query('TRUNCATE TABLE movies RESTART IDENTITY;');
}

/**
 * Bulk insert movies (like insertMany)
 */
async function insertManyMovies(moviesData) {
    try {
        for (const movie of moviesData) {
            await pool.query(
                `INSERT INTO movies (
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
                )`,
                [
                    movie.title,
                    movie.releaseYear,
                    movie.genre,     // ARRAY
                    movie.director,
                    movie.actors,    // ARRAY
                    movie.language,
                    movie.country || 'India',
                    movie.rating ?? 0,
                    movie.plot,
                    movie.awards,
                    movie.posterUrl,
                    movie.trailerUrl
                ]
            );
        }

        return moviesData.length;
    } catch (error) {
        console.error('Error inserting movies:', error);
        throw error;
    }
}

module.exports = {
    deleteAllMovies,
    insertManyMovies,
    pool
};