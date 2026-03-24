/**
 * 4. Create a function to retrieve a car and populate
 *    its maker details:
 *
 * Q. What is populate()?
 * => When we save a Car, we only store the maker's _id (ObjectId).
 *    So when we fetch a Car, the maker field shows just an id:
 *    { model: 'Car Model XL', maker: '64abc123...' }
 *
 * => .populate('maker') tells Mongoose:
 *    "Replace that _id with the full Maker document."
 *    Result:
 *    { model: 'Car Model XL', maker: { name: 'Toyota', logo: '...', tagline: '...' } }
 *
 * => This is how two models are CONNECTED and QUERIED together.
 */

/**
 * Importing mongoose:
*/
const mongoose = require('mongoose');

/**
 * Importing Maker and Car models:
 * => Car model must be imported so Mongoose knows about it.
 * => Maker model must also be imported so populate() can find it.
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
 * Function to retrieve a car WITH its maker details using populate():
*/
async function getCarWithMakerDetails(carId) {
    try {
        /*
         * Without populate → maker field shows only an ObjectId:
         * { model: 'Car Model XL', year: 2022, maker: '64abc123...' }
         *
         * With .populate('maker') → maker field is replaced with
         * the full Maker document:
         * { model: 'Car Model XL', year: 2022, maker: { name: 'Toyota', logo: '...', tagline: '...' } }
        */
        const carWithMaker = await Car.findById(carId).populate('maker');
        console.log('Car with maker details:', carWithMaker);
    } catch (error) {
        throw error;
    }
}

/**
 * Example usage — replace with a real Car _id from your database:
 * => Run car.seed.js first, copy the Car _id from the console output,
 *    then paste it below and run this file.
*/
getCarWithMakerDetails('your-car-id-here');