const express = require('express');
const app = express();

const { createMaker, pool } = require('./maker.model');
const { createCar, getCarWithMakerDetails } = require('./car.model');

async function run() {
    try {
        /**
         * 1. Create Maker
         */
        const maker = await createMaker({
            name: 'Toyota',
            logo: 'https://example.com/toyota-logo.png',
            tagline: 'Quality Cars'
        });

        console.log('Maker created:', maker);

        /**
         * 2. Create Car with reference
         */
        const car = await createCar({
            model: 'Car Model XL',
            year: 2022,
            maker_id: maker.id
        });

        console.log('Car created:', car);

        /**
         * 3. Fetch with JOIN (populate equivalent)
         */
        const fullData = await getCarWithMakerDetails(car.id);

        console.log('Car with maker details:', fullData);

    } catch (error) {
        console.error(error);
    } finally {
        await pool.end();
    }
}

run();

app.listen(3000, () => {
    console.log('Server running on port 3000');
});