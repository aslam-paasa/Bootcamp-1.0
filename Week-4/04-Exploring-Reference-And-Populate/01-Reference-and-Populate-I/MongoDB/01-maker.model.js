/**
 * Using Reference between Car and Maker Models:
 * => In this exercise, we'll establish a reference relationship
 *    between the Car Model and the Maker.
 *
 * Q. Define the Maker Model with keys name(String), logo(String) and
 *    tagline(String).
 */

/**
 * Importing mongoose:
*/
const mongoose = require('mongoose');

/**
 * Creating Schema for our Maker Model:
*/
const makerSchema = new mongoose.Schema({
    name   : String,
    logo   : String,
    tagline: String,
});

/**
 * When we define this, it gives us an object on which save() is a
 * defined function:
*/
const Maker = mongoose.model('Maker', makerSchema);

module.exports = Maker;