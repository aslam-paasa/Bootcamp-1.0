/**
 * Put everything inside HTTP Server and expose it to the world:
*/

const express = require('express');
const app = express();

/**
 * Import Mongoose:
*/
const mongoose = require('mongoose');
const Student = require('./01-student-Schema');

/**
 * Connecting database:
*/
mongoose.connect("mongodb+srv://aslampaasa420:Sy********er@cluster0.goyedz2.mongodb.net/studentDB");


/**
 * Function to add student data:
*/
async function addStudentData() {
    try {
        /**
         * Create a new Student document:
        */
        const newStudent = new Student({
            registrationNumber: 'IN7383743',
            studentId: 123456,
            studentName: 'Alveena S. Kudhus',
            fatherOrGuardianName: 'Salam Kudhus',
            standard: '1st A',
            emergencyContact: 9790547171,
        });

        /**
         * Save the new Student document to the database:
        */
        const savedStudent = await newStudent.save();

        /**
         * Log a success message to the console:
        */
        console.log('Student data saved successfully:', savedStudent);
    } catch (error) {
        /**
         * Log an error message to the console:
        */
        console.error('Error saving student data:', error);
    }
}


/**
 * Call the addStudentData function:
*/
addStudentData();


app.listen(3000);