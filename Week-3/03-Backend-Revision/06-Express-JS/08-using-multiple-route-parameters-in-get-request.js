/**
 * Using multiple route parameters in a GET request:
 * => Now, let's extend our knowledge by using multiple route parameters
 *    to retrieve cars based on make and model.
 * 
 * 
 * Q. Create GET Route with Multiple Parameters:
 * Q. Define a GET route at '/cars/:make/:model' to retrieve cars based
 *    on both make and model.
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
 * GET Route to retrieve cars based on both make and model:
*/
app.get('/cars/:make/:model', (req, res) => {
    const make = req.params.make.toLowerCase()
    const model = req.params.model.toLowerCase()
    const filteredCars = cars.filter(
        (car) =>
            car.make.toLowerCase() === make && car.model.toLowerCase() === model
        )
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
 * 1. URL: http://localhost:3000/cars/:make/:model
 *         http://localhost:3000/cars/Toyota/Camry
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