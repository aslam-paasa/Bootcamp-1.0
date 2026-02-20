/**
 * Introducting router and attaching routes:
 * => In this exercise, we'll introduce routers and learn how to attach
 *  routes to them.
 * => Avi tk whatever we are doing, we are doing on the app directly.
 *    App in an Express is nothing but a router.
 * => Express m router ka concept hota hai, that we can define routers
 *    and then we can define routes on top of routers. And this helps
 *    us in organizing code.
 * */


/**
 * 1. Creating a Router: In your main index.js file, create a router by
 *    importing express.Router().
*/
const express = require('express');
const carRouter = express.Router();


const cars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2022 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2021 },
    { id: 3, make: 'Ford', model: 'Mustang', year: 2022 },
    { id: 4, make: 'Chevrolet', model: 'Corvette', year: 2023 },
    { id: 5, make: 'Tesla', model: 'Model 3', year: 2021 },
    { id: 6, make: 'Nissan', model: 'Altima', year: 2022 },
    { id: 7, make: 'BMW', model: 'X5', year: 2023 },
    { id: 8, make: 'Mercedes-Benz', model: 'C-Class', year: 2021 },
    { id: 9, make: 'Audi', model: 'A4', year: 2022 },
    { id: 10, make: 'Lexus', model: 'RX', year: 2023 },
    { id: 11, make: 'Hyundai', model: 'Tucson', year: 2021 },
    { id: 12, make: 'Kia', model: 'Seltos', year: 2022 },
    { id: 13, make: 'Mazda', model: 'CX-5', year: 2023 },
    { id: 14, make: 'Subaru', model: 'Outback', year: 2021 },
    { id: 15, make: 'Volkswagen', model: 'Golf', year: 2022 },
];


/**
 * 2. Attaching Routes: 
 * => Add a GET route to the router that returns JSON data of all cars.
 * 
 * Note: Every time we define a route on cars, we don't need to type
 *       cars anymore. Because we have already defined all the routes
 *       from cars router should go to '/cars'. 
 *       => app.use('/cars', carRouter)
*/
carRouter.get('/', (req, res) => {
    res.json(cars);
});
carRouter.get('/:id', () => { })
/**
 * If I want to update a particular car with it's id through POST request,
 * how will I do it?
*/
carRouter.post(":/id", () => { }) // 23


/**
 *  3. Mounting the Router: 
 * => In your index.js file, mount the router to a specific path 
 *    (e.g., /cars) using app.use().
*/
app.use('/cars', carRouter)
