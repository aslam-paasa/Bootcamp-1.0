/**
 * Q. How middleware are written in Express in JavaScript?
*/

const express = require("express");
const app = express();
const port = 3000;
let numberOfRequests = 0;

/**
 * 1. All Route specific logic lives inside "handleFirstRequest" the Route Handlers
 *    but some global logic that needs to run before every request is handled 
 *    should be here.
 * 
 * => If we want to calculate the no.of requests coming into our server.
*/

function middleware1(req, res, next) {

    /**
     * 2. This way we can capture the noOfRequest that are coming and this global 
     *    middleware let's us track all the incoming requests in one place and then
     *    log them and then it juts call the right handler.
    */

    numberOfRequests = numberOfRequests + 1;

    console.log("Total number of requests coming to our server are : " + numberOfRequests);

    /**
     * 3. next() makes sure that the respective handler gets called at right time.
    */

    next();
}

app.use(middleware1);


function calculateSum(counter) {
    let sum = 0;
    for (let i = 0; i <= counter; i++) {
        sum = sum + i;
    }
    return sum;
}


function handleFirstRequest(req, res) {
    console.log(req.headers);

    let counter = req.headers.counter;
    let calculatedSum = calculateSum(counter);

    let answer = "The sum  is " + calculatedSum;
    res.send(answer);
}


app.post('/handleSum', handleFirstRequest);

function started(req, res) {
    console.log(`Example app listening on port ${port}`);
}


app.listen(port, started)

