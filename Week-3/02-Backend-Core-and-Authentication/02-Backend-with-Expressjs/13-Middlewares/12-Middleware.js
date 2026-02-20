/**
 * 1. Importance of 'app.use(express.json())':
 * => app.use(express.json()) is the middleware that parses incoming
 *    JSON payloads in the request body. It is crucial when dealing
 *    with JSON data sent in the request body, typically in POST or
 *    PUT requests. Without this middleware, you might receive the 
 *    JSON data as a raw sting, and you'd need to manually parse it.
 * 
 * 2. Middleware and req.body:
 * => req.query and req.headers don't require middleware because they
 *    represent the query parameters and headers of the incoming
 *    request, respectively. Express automatically parses them.
 * => req.body requires middleware like 'express.json()' to parse the
 *    request body, especially when the body contains JSON data. Other
 *    middleware, like 'express.urlencoded()', is used to parsing
 *    form data in the request body. 
 * 
 * Middleware helps in processing the request at different stages and
 * is essential for tasks like parsing, logging, authentication, and
 * more in a modular and organized way.
 *
*/


/**
 * Middleware:
 * 
 * Q. Why do you need input validation?
 * Q. What if the user sends the wrong body?
 * => Lets see with an example :
*/

const express = require('express');
const app = express();

app.use(express.json());

app.post("/health-checkup", function(req, res) {
    /**
     * => do something with kidney here
     * => kidneys = [1, 2]
    */
    const kidneys = req.body.kidneys;

    /**
     * input validation: ZOD Library
     * => It is better way to do input validation => later we will see
    */

    if(!kidneys) {
        res.json({msg: "wrong inputs"});
    } else { 
        const kidneyLength = kidneys.length;
        res.send("You have " + kidneyLength + " kidneys");
    }
});

app.listen(3000);
