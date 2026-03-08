/**
 * Implementing error handling for car data updates:
 * => Now, let's enhance our car data update mechanism by incorporating
 *    error handling.
 * 
 * Q. Update POST Route for Car Data Updates
 * Q. Improve the '/cars/:id' route to include error handling for updating
 *    car data.
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
 * Error Handling for car data updates:
*/
app.use(express.json())

app.post('/cars/:id', (req, res) => {
    const carId = parseInt(req.params.id)
    const updatedCarData = req.body
    const carToUpdate = cars.find((car) => car.id === carId)
    if (!carToUpdate) {
        res.status(404).json({ error: 'Car not found' })
    } else {
        if (!updatedCarData.make || !updatedCarData.model || !updatedCarData.year) {
            res.status(400).json({ error: 'Make, model, and year are required' })
        } else {
            Object.assign(carToUpdate, updatedCarData)
            res.json({ message: 'Car data updated successfully', car: carToUpdate })
        }
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