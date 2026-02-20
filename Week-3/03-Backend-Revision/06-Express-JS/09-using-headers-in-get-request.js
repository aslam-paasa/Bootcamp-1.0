/**
 * Using headers in a GET request:
 * => There are 7 hidden headers:
 *    1. Cache-Control
 *    2. Postman-Token
 *    3. Host
 *    4. User-Agent
 *    5. Accept
 *    6. Accept-Encoding
 *    7. Connection
 * => We can also set our own headers as Key:Value pairs.
 *    (a) Key: x-featured-request
 *    (b) Value: true
 * => And these pairs, we can set here in POSTMAN in our code. 
 * => To read the header, we need to do: "req.header('x-featured-request');"
 * => And "req.header()" is not an object, but a function, so inside this
 *    we pass header key i.e. what header we want to read, and we get
 *    the value. If header key is not present, throw an error. 
 * 
 * In this exercise, let's explore how to use headers to request 
 * specific data.
 * 
 * Q. Create GET Route with Headers.
 * Q. Define a GET route at '/cars/' features that returns featured cars
 *    (which have year 2022 and have based on a custom header).
 * Note: Make sure you place this request before '/cars/:id' route.
 * 
 * 1. "/cars" --> 1
 * 2. "/cars/:id" ---> 2 dynamic
 * 3. "/cars/featured" --> 3 static // wrong and that's why you will not reach here
 * 
 * 1. "yourserver.com/cars" => 1
 * 2. "yourserver.com/cars/1" => 2
 *    "yourserver.com/cars/tanay" => 2
 *    "yourserver.com/cars/featured"
 * 
 * Q. What is the difference between static route & dynamic route?
 * => 1. '/' => Static Route
 * => 2. '/:' => Dynamic Route
 * 
 * => Place our static route(specific) before dynamic routes(generic):
 * => /cars/all before 1, after 1, after 2, after 3
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
 * GET Route with headers:
*/
app.get('/cars/featured', (req, res) => {
    const isFeaturedRequest = req.header('x-featured-request')
    if (isFeaturedRequest === 'true') {
        const featuredCars = cars.filter((car) => car.year >= 2022)
        res.json(featuredCars)
    } else {
        res.status(400).json({ error: 'Invalid request' })
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
 * 1. URL: http://localhost:3000/cars/featured
 * 2. Headers: 
 *       (a) Key: x-featured-request
 *       (b) Value: true
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