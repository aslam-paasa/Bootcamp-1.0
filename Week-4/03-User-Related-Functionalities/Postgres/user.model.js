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
    database: 'userDB',
    password: 'your_password',
    port: 5432,
});

/**
 * SIGNUP
 */
async function signup(userDetails) {
    const query = `
        INSERT INTO users (
            email, password, profile_picture_url,
            username, nickname, phone_number
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *;
    `;

    const values = [
        userDetails.email,
        userDetails.password,
        userDetails.profilePictureUrl,
        userDetails.username,
        userDetails.nickname,
        userDetails.phoneNumber
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}

/**
 * LOGIN
 */
async function login(email, password) {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    const user = result.rows[0];

    if (user && user.password === password) {
        return user;
    }

    throw new Error('Invalid credentials');
}

/**
 * CHANGE PASSWORD
 */
async function changePassword(email, currentPassword, newPassword) {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    const user = result.rows[0];

    if (user && user.password === currentPassword) {
        const updated = await pool.query(
            `UPDATE users 
             SET password = $1, updated_at = CURRENT_TIMESTAMP
             WHERE email = $2
             RETURNING *`,
            [newPassword, email]
        );

        return updated.rows[0];
    }

    throw new Error('Invalid credentials');
}

/**
 * UPDATE PROFILE PICTURE
 */
async function updateProfilePicture(email, url) {
    const result = await pool.query(
        `UPDATE users
         SET profile_picture_url = $1, updated_at = CURRENT_TIMESTAMP
         WHERE email = $2
         RETURNING *`,
        [url, email]
    );

    if (result.rows.length === 0) throw new Error('User not found');

    return result.rows[0];
}

/**
 * UPDATE CONTACT DETAILS
 */
async function updateContactDetails(email, data) {
    const result = await pool.query(
        `UPDATE users
         SET email = COALESCE($1, email),
             phone_number = COALESCE($2, phone_number),
             updated_at = CURRENT_TIMESTAMP
         WHERE email = $3
         RETURNING *`,
        [data.email, data.phoneNumber, email]
    );

    if (result.rows.length === 0) throw new Error('User not found');

    return result.rows[0];
}

/**
 * FIND USER BY PHONE NUMBER
 */
async function findUserByPhoneNumber(phoneNumber) {
    const result = await pool.query(
        `SELECT * FROM users WHERE phone_number = $1`,
        [phoneNumber]
    );

    return result.rows[0] || null;
}

module.exports = {
    signup,
    login,
    changePassword,
    updateProfilePicture,
    updateContactDetails,
    findUserByPhoneNumber,
    pool
};