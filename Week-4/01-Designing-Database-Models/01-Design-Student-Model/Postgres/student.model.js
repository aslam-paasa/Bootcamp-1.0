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
    database: 'studentDB',
    password: 'your_password',
    port: 5432,
});

/**
 * Function to insert student data:
 */
async function createStudent(data) {
    try {
        const query = `
            INSERT INTO students (
                registration_number,
                student_id,
                student_name,
                student_profile_pic_url,
                father_or_guardian_name,
                standard,
                emergency_contact
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;

        const values = [
            data.registrationNumber,
            data.studentId,
            data.studentName,
            data.studentProfilePicURL || null,
            data.fatherOrGuardianName,
            data.standard,
            data.emergencyContact
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    } catch (error) {
        console.error('Error inserting student:', error);
        throw error;
    }
}

/**
 * Export function:
 */
module.exports = {
    createStudent
};