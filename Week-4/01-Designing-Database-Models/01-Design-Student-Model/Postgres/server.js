/**
 * Put everything inside HTTP Server and expose it to the world:
 */
const express = require('express');
const app = express();

/**
 * Import student model:
 */
const Student = require('./student.model.js');

/**
 * Function to add student data:
 */
async function addStudentData() {
    try {
        const newStudent = {
            registrationNumber: 'IN7383743',
            studentId: 123456,
            studentName: 'Alveena S. Kudhus',
            studentProfilePicURL: '',
            fatherOrGuardianName: 'Salam Kudhus',
            standard: '1st A',
            emergencyContact: 9790547171,
        };

        const savedStudent = await Student.createStudent(newStudent);

        console.log('Student data saved successfully:', savedStudent);
    } catch (error) {
        console.error('Error saving student data:', error);
    }
}

/**
 * Call function:
 */
addStudentData();

/**
 * Start server:
 */
app.listen(3000, () => {
    console.log('Server running on port 3000');
});