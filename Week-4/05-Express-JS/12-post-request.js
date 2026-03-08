/**
 * Introduction to POST Request:
 * => In this exercise, we'll create a simple POST request that allows
 *    us to add a new car to our inventory.
 * 
 * Q. Create a POST Route for Adding Cars.
 * Q. Define a POST route at '/cars' that receives JSON data of a new car
 *    and adds it to the inventory.
 * => Make sure you use the built-in express.json() middleware to parse
 *    JSON request bodies.
 * 
 * Solution:
 * 1. app.use(express.json())
 * 2. app.post('/cars', (req, res) => {
 *       const newCar = req.body; => this is how you can access the data you want to post
 *       => your code here
 *    });
 * 
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
 * POST Request for Adding Cars:
*/
app.use(express.json())
app.post('/cars', (req, res) => {
    const newCar = req.body
    cars.push(newCar);
    res.status(201).json({ message: 'Car added successfully', car: newCar })
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
 * Request-1:
 * 1. URL: http://localhost:3000/cars
 * 2. Body: raw
 *    {
 *       "id": 16,
 *       "make": "Renault",
 *       "model": "Triber",
 *       "year": 2023
 *    }
 * 3. Response: 
 *    {
 *       "message": "Car added successfully",
 *       "car": {
 *           "id": 16,
 *           "make": "Renault",
 *           "model": "Triber",
 *           "year": 2023
 *        }
 *    }
 * 
 * 
 * Request-2:
 * 1. URL: http://localhost:3000/cars
 * 2. Body: raw
 *    {
 *       "id": 17,
 *       "model": "Triber",
 *       "year": 2023
 *    }
 * 3. Response: 
 *    {
 *       "error": "Make, model, and year are required"
 *    }
 * */