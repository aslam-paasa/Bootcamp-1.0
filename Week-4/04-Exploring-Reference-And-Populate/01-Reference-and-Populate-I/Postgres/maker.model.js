const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'carDB',
    password: 'your_password',
    port: 5432,
});

/**
 * Create Maker
 */
async function createMaker(data) {
    const result = await pool.query(
        `INSERT INTO makers (name, logo, tagline)
         VALUES ($1,$2,$3)
         RETURNING *`,
        [data.name, data.logo, data.tagline]
    );

    return result.rows[0];
}

module.exports = {
    createMaker,
    pool
};