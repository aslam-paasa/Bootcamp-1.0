/**
 * Data Modelling:
 * => Data Modelling basically means how do you convert the your data 
 *    into model.
 * => There are two approaches:
 *    (a) Think very hard and come up with a model.
 *    (b) Based on the requirement we will create a mock of it. And 
 *        based on what we need on screens, we will come up with a model.
 * 
 * Q. What is Schema?
 * => 
 * 
 * Q1. Create mongoose models for the given images.
 * Q2. Add data to the model.
 *  
 * => npm install mongoose
 * */


/**
 * Import Mongoose:
*/
const mongoose = require('mongoose');


/**
 * Define the Student schema:
*/
const studentSchema = new mongoose.Schema({
    registrationNumber: String,
    studentId: Number,
    studentName: String,
    studentProfilePicURL: String,
    fatherOrGuardianName: String,
    standard: String,
    emergencyContact: Number,
});


/**
 * Create the Student model:
*/
const Student = mongoose.model('Student', studentSchema);


/**
 * Export the Student model:
*/
module.exports = Student;
