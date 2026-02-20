/**
 * 2. Update the previously made Car Model to include a reference
 *    to the Maker Model:
 * => When we buy a car: Maruti
 *    (a) model
 *    (b) year
 *    (c) maker: Maruti
 *        This will refer to 'Maker' schema
 *        (a) makerName
 *        (b) logo
 *        (c) tagline
 * => Basically we have two such model i.e. Maker & Car.
 * 
 * Q. How do we connect Car Model to Maker Model?
 * => We have already created a 'Maker' model in makerSchema. And to
 *    connect this model with Car Model, we will use reference syntax:
 *    i. ref: 'Maker'
 * 
 * Q. How carSchema will know that we are referring to 'Maker'?
 * => ref: 'Maker'
*/

/**
* Importing mongoose:
*/
const mongoose = require('mongoose');
const Maker = require('./maker');

/**
 * Creating Schema for our Car Model:
*/
const carSchema = new mongoose.Schema({
    model: String,
    year: Number,
    maker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Maker',
    },
})



/**
 * When we define this, it gives us an object on which save() is a
 * defined function:
*/
const Car = mongoose.model('Car', carSchema)

module.exports = Maker;