/**
 * => Until now we have lied a little bit, we don't just give one callback 
 *    function, we can give a series of callback functions. And there are 
 *    3 inputs in these callback functions:
 *    (a) req,
 *    (b) res,
 *    (c) next
 * 
 * # next() keyword:
 *    In middleware functions in Express, next() is a callback fn that
 *    is used to pass control to the next middleware function in the
 *    stack. When you call 'next()', it tells Express to move to the
 *    next middleware in line. If 'next()' is called within a middleware
 *    fn, the request-response cycle stops, and the client receives no
 *    response.
 * 
 *    app.use((req, res, next) => {
 *       console.log('The middleware runs first.');
 *       next();  // Move to the next middleware
 *    });
 * 
 *    app.use((req, res) => {
 *       console.log('The middleware runs second.');
 *       res.send('Response sent from the second middleware.');
 *    });
*/

const express = require('express');
const app = express();

app.get('/health-checkup', function (req, res, next) {

    console.log("hi from req1");
    next();

}, function (req, res) {

    console.log("hi from req2");

});

app.listen(3000);