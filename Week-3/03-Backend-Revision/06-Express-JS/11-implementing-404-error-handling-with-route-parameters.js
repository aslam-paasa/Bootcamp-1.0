/**
 * Implementing 404 Error Handling with Route Parameters:
 * => Now, let's extend our error handling knowledge to route parameters.
 * 
 * Q. Create GET Route for Single Car: 
 * Q. Define a GET Route at '/cars/:id' to retrieve a car by its ID.
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
 * Error handling with route parameters, if we pass wrong route.
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
 * 1. URL: http://localhost:3000/cars/999
 * 2. Response:
 *    {
 *       "error": "Car not found"
 *    }
 * */