const { pool } = require('./user.model');

/**
 * Add review (like pushing into array)
 */
async function addReview(movieId, userId, text) {
    const result = await pool.query(
        `INSERT INTO reviews (movie_id, user_id, text)
         VALUES ($1,$2,$3)
         RETURNING *`,
        [movieId, userId, text]
    );

    return result.rows[0];
}

/**
 * Get reviews with user details (populate equivalent)
 */
async function getReviewsWithUsers(movieId) {
    const result = await pool.query(
        `SELECT 
            reviews.text,
            users.username,
            users.profile_picture_url
         FROM reviews
         JOIN users ON reviews.user_id = users.id
         WHERE reviews.movie_id = $1`,
        [movieId]
    );

    return result.rows;
}

/**
 * First 3 reviews
 */
async function getFirst3Reviews(movieId) {
    const result = await pool.query(
        `SELECT 
            reviews.text,
            users.username,
            users.profile_picture_url
         FROM reviews
         JOIN users ON reviews.user_id = users.id
         WHERE reviews.movie_id = $1
         LIMIT 3`,
        [movieId]
    );

    return result.rows;
}

module.exports = {
    addReview,
    getReviewsWithUsers,
    getFirst3Reviews
};