/**
 * Moving router to a separate file:
 * => In this exercise, we'll move the router to a separate file and 
 *    demonstrate the concept of modularization.
 * 
 * Challenge:
 * 1. Create Router File: 
 * => Create a new file named cars.router.js.
 * 
 * 2. Move Router Logic: 
 * => Move the router logic from index.js to cars.router.js.
 * 
 * 3. Export the Router: 
 * => In cars.router.js, export the router using module.exports.
 * 
 * 4. Import and Use Router: 
 * => In index.js, import the router using require() and use it with app.use().
 * */


const express = require('express');
const app = express();

const carsRouter = require('./02-cars-router');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.use('/cars', carsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});