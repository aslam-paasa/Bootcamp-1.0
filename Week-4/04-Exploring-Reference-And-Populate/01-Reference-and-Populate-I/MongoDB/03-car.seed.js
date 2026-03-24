/**
 * 3. How can we add data to our Maker model?
 * => Add data to Maker Model and the Car Model with reference
 *    to maker model.
 */

/**
 * Importing mongoose:
*/
const mongoose = require('mongoose');

/**
 * Importing Maker and Car models:
*/
const Maker = require('./maker.model');
const Car   = require('./car.model');

/**
 * Connect to MongoDB:
*/
mongoose.connect("mongodb+srv://aslampaasa420:Sy*******er@cluster0.goyedz2.mongodb.net/studentDB")
    .then(() => { console.log('Connected to MongoDB'); })
    .catch(error => { console.error('Error connecting to MongoDB:', error); });

/**
 * Function to add a Maker and a Car linked to that Maker:
*/
async function addMakerWithCar(makerData) {
    try {
        /**
         * 1. Creating a new Maker:
        */
        const maker    = new Maker(makerData);
        const newMaker = await maker.save();
        console.log('New maker created:', newMaker);

        /**
         * 2. Defining a new Car:
        */
        const carData = {
            model: 'Car Model XL',
            year : 2022,
            /**
             * 3. Using created maker's _id — this is the REFERENCE.
             *    Instead of storing Maker data again, we store just
             *    the _id and point to the Maker document.
            */
            maker: newMaker._id,
        };

        /**
         * 4. Create and save the new Car:
        */
        const car    = new Car(carData);
        const newCar = await car.save();
        console.log('New Car:', newCar);

        return newCar;
    } catch (error) {
        throw error;
    }
}

/**
 * Example usage — adding Toyota as a Maker with a linked Car:
*/
const makerData = {
    name   : 'Toyota',
    logo   : 'https://example.com/toyota-logo.png',
    tagline: 'Quality Cars',
};

addMakerWithCar(makerData);