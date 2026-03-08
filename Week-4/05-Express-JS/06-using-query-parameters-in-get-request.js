/**
 * Using query parameters in a GET request: (One way to requesting data)
 * => In this exercise, we'll enhance our GET request by allowing users
 *    to filter cars based on query parameters.
 * 
 * => Query parameters provides object in the "req.query" object, we
 *    are destructuring that query object:
 *       const { make, model } = req.query;
 * 
 * Q. Modify GET Route for Cars:
 * => Update the /cars route to handle query parameters.
 * 
 *    app.get('/cars', (req, res) => {
 *       const { make, model } = req.query; // you can access the query data like this
 *       // your code here...
 *    }
 * 
 * Note: Don't get into the logic first, get into the mechanic first.
 *       If the mechanic/piping works, obviously water will flow.
 * 
*/



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
 * GET Route by filtering cars based on query parameters:
*/
app.get('/cars', (req, res) => {
    const { make, model } = req.query
    let filteredCars = cars
    if (make) {
        filteredCars = filteredCars.filter(
            (car) => car.make.toLowerCase() === make.toLowerCase(),
        )
    }
    if (model) {
        filteredCars = filteredCars.filter(
            (car) => car.model.toLowerCase() === model.toLowerCase(),
        )
    }
    res.json(filteredCars)
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
 * 1. URL: http://localhost:3000/cars?make=Toyata  <= '?' is query parameter
 * 2. Params: Key=make, Value=Toyata
 * 3. Response:
 *    [
 *       { 
 *          id: 1,
 *          make: 'Toyota', 
 *          model: 'Camry', 
 *          year: 2022 
 *       }
 *    ]
*/