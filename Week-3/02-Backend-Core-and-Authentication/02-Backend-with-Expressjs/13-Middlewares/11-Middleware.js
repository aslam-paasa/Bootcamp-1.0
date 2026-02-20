
/**
 * Importance of 'app.use(express.json())':
 * => app.use(express.json()) is the middleware that parses incoming
 *    JSON payloads in the request body. It is crucial when dealing
 *    with JSON data sent in the request body, typically in POST or
 *    PUT requests. Without this middleware, you might receive the 
 *    JSON data as a raw sting, and you'd need to manually parse it.
 *
*/

const express = require('express');
const app = express();

/**
 * Middleware to parse JSON in the request body
*/
app.use(express.json()); 

app.post('/api/data', (req, res) => {
    /**
     * Now res.body contains the parsed JSON data
    */
    const jsonData = req.body;

    /**
     * Process the data...
    */
   res.json({ success: true });
})