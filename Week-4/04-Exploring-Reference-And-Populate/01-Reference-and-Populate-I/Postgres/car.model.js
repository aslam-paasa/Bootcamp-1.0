const { pool } = require('./maker.model');

/**
 * Create Car with reference (maker_id)
 */
async function createCar(data) {
    const result = await pool.query(
        `INSERT INTO cars (model, year, maker_id)
         VALUES ($1,$2,$3)
         RETURNING *`,
        [data.model, data.year, data.maker_id]
    );

    return result.rows[0];
}

/**
 * Get Car with Maker details (JOIN)
 */
async function getCarWithMakerDetails(carId) {
    const result = await pool.query(
        `SELECT 
            cars.id,
            cars.model,
            cars.year,
            makers.id AS maker_id,
            makers.name,
            makers.logo,
            makers.tagline
         FROM cars
         JOIN makers ON cars.maker_id = makers.id
         WHERE cars.id = $1`,
        [carId]
    );

    return result.rows[0] || null;
}

module.exports = {
    createCar,
    getCarWithMakerDetails
};