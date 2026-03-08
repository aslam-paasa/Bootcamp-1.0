/**
 * Using route parameters in a GET request:
 * => Let's now explore using route parameters to retrieve a specific
 *    car by its ID.
 * 
 * Q. Create GET Route for Single Car: Define a GET route at /cars/:id to 
 *    retrieve a car by its ID.
 * 
 *    app.get('/cars/:id', (req, res) => {
 *       => You can retrieve the car id with the help of req.params
 *       => Parse String value to Integer Value
 *       const carId = parseInt(req.params.id)
 *       const { id } = req.params;
 *       => .. your code here
 *    };
 * */


/**
 * Put everything inside HTTP Server and expose it to the world:
*/
const express = require('express');
const app = express();

/**
 * Array of Car Objects:
*/
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
]


/**
 * GET Route for single car by ID:
*/
app.get('/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id)
    const car = cars.find((car) => car.id === carId)
    if (car) {
        res.json(car)
    } else {
        res.status(404).json({ error: 'Car not found' })
    }
})



/**
 * Listen on a Port:
 * => Add code to listen on a port(e.g., 3000) and display a message
 *    indicating all the server is running.
*/
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


/**
 * 1. URL: http://localhost:3000/cars/:id
 *         http://localhost:3000/cars/3
 * 2. Response:
 *    [
 *       { 
 *          id: 1,
 *          make: 'Toyota', 
 *          model: 'Camry', 
 *          year: 2022 
 *       }
 *    ]
*/