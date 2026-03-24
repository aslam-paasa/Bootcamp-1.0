require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { home, details, login } = require('./controllers/userController')
const PORT = process.env.PORT || 3000; // Use 3000 if PORT is not set

/**
 * Database Connection Area:
 * - MongoDB
 * - Methods:
 *   a. connect()
 *   b. JS Promise Chain
 *      - Pending
 *      - Fulfilled
 *      - Rejected
*/
const data = mongoose.connect('connection string');
data.then((d) => {
    console.log('Connected to Database');
}).catch((err) => {
    console.log('Error connecting to Database');
    
});

/**
 * Schema Design:
 * - Mongoose to design the structure of schema objects.
 * - Inside Schema we will define our data model.
 * - Methods: Schema()
*/
const Schema = mongoose.Schema({
    email: String
})

/**
 * Data Model:
 * => model("modelName", Schema)
 *    a. Param-1: Hm jo v modelName ka naam rkhnge uss name se database
 *       m collection ban jaega.
 *    b. Schema: detailsData collection k andr mere data model ka format
 *       iss Schema pe based rahega.
*/
const detailsData = mongoose.model("detailsData", Schema);

/**
 * Creating dummy data:
*/
const createDetailsData = new detailsData({
    email: "mohammad@gmail.com"
})

/**
 * Saving dummy data:
*/
createDetailsData.save()
.then((d) => {
    console.log('Data is saved');
})
.catch((err) => {
    console.log(err);    
});


/**
 * API Routes:
*/
app.get('/', home)
app.post('/details', details)
app.get('/login', login)


/**
 * Port Number:
*/
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});