/**
 * Writing custom middleware for validation:
 * => When a request comes from client to server, first HTTP is parsed
 *    i.e. '/cars' request.
 * => Then it goes to the router. If we see the code below, there are
 *    two parts of the code:
 *    
 *    app.get('/', (req, res) => {
 *       res.send('Hello express');
 *    })
 * 
 *    (a) http.get()
 *    (b) '/' => route
 *    (c) callback
 * 
 * => Generally, if it goes to router, it says we know what './cars' is,
 *    let me give it to the "callback" i.e. route handler.
 * 
 * Middleware:
 * Instead of giving it directly to route handler, there is someone
 * in between which wants to process the routes before it goes to the
 * route handler i.e. middleware. And then it do some process, pass it
 * to the route handler and then route handler send back the response.
 * 
 * => Example of middleware: json.parser() : Anything which is going
 *    should go to JSON.parser() and it parse JSON from the body and
 *    put it in req.body. 
 * 
 * Note: To send the request to next middleware or route handler, we 
 *       have to use a function called "next()". 
 * 
 * 
 * Q. Creating a Middleware: 
 * => Middlware functions are functions that have access to the request
 *    (req), response(res), and next middleware function in the 
 *    applications' request-response cycle.
 * => Let's create a middleware function that logs a message to the
 *    console for each incoming request.
 * */


const express = require('express');
const app = express();

const carsRouter = require('./cars.router');

app.use(express.json());


/**
 * Middlware function
*/
const loggerMiddleware = (req, res, next) => {
    console.log('Incoming request at:', new Date().toISOString());
    next(); // Call next to move to the next middleware or route handler
};

/**
 * Applying middleware to all routes:
 * => By using app.use() with loggerMiddleware, the middleware is applied
 *    to all routes in the application.
*/
app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.use('/cars', carsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
