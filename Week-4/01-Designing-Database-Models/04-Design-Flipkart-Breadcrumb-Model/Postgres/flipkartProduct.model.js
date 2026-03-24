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
    database: 'flipkartDB',
    password: 'your_password',
    port: 5432,
});

/**
 * Function to insert product data:
 */
async function createProduct(data) {
    try {
        const query = `
            INSERT INTO products (
                category,
                product_name,
                product_color,
                product_image,
                price,
                specs,
                reviews
            ) VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *;
        `;

        const values = [
            data.category,
            data.productName,
            data.productColor,
            data.productImage,
            data.price,
            data.specs,     // JSON object
            data.reviews    // JSON object
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    } catch (error) {
        console.error('Error inserting product:', error);
        throw error;
    }
}

/**
 * Export function:
 */
module.exports = {
    createProduct
};