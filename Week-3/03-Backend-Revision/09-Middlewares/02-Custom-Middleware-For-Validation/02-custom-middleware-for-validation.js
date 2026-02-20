/**
 * Writing custom middleware for validation:
 * => Now, let's write a custom middleware that checks whether a certain
 *    condition is met.
 * 
 * Q. Creating Custom Middleware:
 * => Define a custom middleware function that checks if the request
 *    has a query parameter named validate.
*/

const express = require('express');
const app = express();

const carsRouter = require('./cars.router');

app.use(express.json());


/**
 * Custom middleware for validation
*/
const validationMiddleware = (req, res, next) => {
    const validateParam = req.query.validate
    if (validateParam === 'true') {
        next() // Proceed to the next middleware or route handler
    } else {
        res.status(403).json({ error: 'Validation failed' }) // Return error response
    }
}


/**
 * Applying custom middleware to a specific route:
*/
app.get('/cars/:id', validationMiddleware, (req, res) => {
    // Route logic to retrieve car by ID
})


app.use('/cars', carsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


/**
 * Here, the validationMiddleware is applied to the route that retrieves
 * a specific car by ID. If the query parameter validate is set to true,
 * the middlware allows the request to proceed; otherwise, it returns
 * a forbidden error.
*/