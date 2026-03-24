/**
 * Import PostgreSQL:
 */
const { Pool } = require('pg');

/**
 * Create connection pool:
 */
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'twitterDB',
    password: 'your_password',
    port: 5432,
});

/**
 * Function to insert profile data:
 */
async function createProfile(data) {
    try {
        const query = `
            INSERT INTO profiles (
                full_name,
                username,
                profile_pic_url,
                status_url,
                bio,
                company,
                city,
                country,
                portfolio_url,
                followers_count,
                following_count
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            RETURNING *;
        `;

        const values = [
            data.fullName,
            data.username,
            data.profilePicURL,
            data.statusURL,
            data.bio,
            data.company,
            data.city,
            data.country,
            data.portfolioURL,
            data.followersCount,
            data.followingCount
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    } catch (error) {
        console.error('Error inserting profile:', error);
        throw error;
    }
}

/**
 * Export function:
 */
module.exports = {
    createProfile
};