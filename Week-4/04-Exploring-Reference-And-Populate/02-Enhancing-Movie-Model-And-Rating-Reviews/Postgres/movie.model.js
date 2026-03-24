const { pool } = require('./user.model');

async function createMovie(data) {
    const result = await pool.query(
        `INSERT INTO movies (title, release_year, genre, director, actors, language, rating, plot)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         RETURNING *`,
        [
            data.title,
            data.releaseYear,
            data.genre,
            data.director,
            data.actors,
            data.language,
            data.rating,
            data.plot
        ]
    );

    return result.rows[0];
}

module.exports = { createMovie };