const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movieDB',
    password: 'your_password',
    port: 5432,
});

async function createUser(data) {
    const result = await pool.query(
        `INSERT INTO users (email, password, username, profile_picture_url, nickname)
         VALUES ($1,$2,$3,$4,$5)
         RETURNING *`,
        [data.email, data.password, data.username, data.profilePictureUrl, data.nickname]
    );

    return result.rows[0];
}

module.exports = { createUser, pool };