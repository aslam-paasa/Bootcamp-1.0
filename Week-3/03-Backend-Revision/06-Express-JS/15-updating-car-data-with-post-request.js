/**
 * Updating car data with POST requests(using car ID):
 * => In this exercise, we'll learn how to use POST requests to update
 *    car data based on the car's ID.
 * 
 * Q. Create POST Route for Updating Car Data.
 * Q. Define a POST route at '/card/:id' that receives updated car data
 *    in the request body and updates the corresponding car's information.
 * => Design of APIs:
 *    1. "/cars" - GET will get all cars, POST will create a new car
 *    2. "/cars/:id" - GET will get the id car, POST will update that id car 
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
 * POST Request for Updating Car data:
*/
app.use(express.json())

app.post('/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id)
    let isCarFound = false
    let updatedCar
    const updatedCarData = req.body
    cars = cars.map((car) => {
        if (car.id === carId) {
            isCarFound = true
            Object.assign(car, updatedCarData)
            updatedCar = car
        }
        return car
    })
    if (!isCarFound) {
        res.status(404).json({ error: 'Car not found' })
    } else {
        res.json({ message: 'Car data updated successfully', car: updatedCar })
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
 * Request-1:
 * 1. URL: http://localhost:3000/cars/999
 * 2. Body: raw
 * 3. Response:
 *    {
 *       "error": "Car not found"
 *    }
 * 
 * 
 * Request-2:
 * 1. URL: http://localhost:3000/cars/1
 * 2. Body: raw
 *    {
 *       "id": 1,
 *       "make": "Toyota",
 *       "model": "Camry",
 *       "year": 2023
 *    }
 * 3. Response: 
 *    {
 *       "message": "Car data updated successfully",
 *       "car": {
 *           "id": 1,
 *           "make": "Toyota",
 *           "model": "Camry",
 *           "year": 2023
 *        }
 *    }
 * 
 * */