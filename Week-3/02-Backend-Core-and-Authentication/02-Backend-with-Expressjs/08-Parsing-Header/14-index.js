/**
 * Middleware :
 * => Let's understand 3rd thing called "body". But before we do that we need to
 *    understand "middlewares". 
 * 
 *   
 *    +---------+         +-----------+
 *    | Browser |-------->| app.get() |
 *    +---------+         +-----------+
 *
 *    +---------+         +------------+
 *    | Browser |-------->| middleware |
 *    +---------+         +------------+
 *                              |
 *                              |
 *                              V
 *                        +-----------+
 *                        | app.get() |
 *                        +-----------+
 *
 * => Right now when we send a request from URL and press enter, we know it gets into
 *    the "app.get()" handler. The handler that we have given to "app.get()" for that
 *    specific route, the request goes there, process it and return the right thing
 *    that what we see as response.
 * 
 * => Middlewares are a way for you to capture request before they reach "app.get()".
 *    If we introduce a middleware into our codebase which is affectively a function.
 *    Any request that comes to your express server, first goes to our middleware,
 *    middleware does some logic in it which we will see logic inside the function
 *    and then middleware can pass the request to "app.get()" or it can just stop
 *    the request. It is usually used for things like "authentication", if we have
 *    10 routes here and we need to authenticate incoming request then we need to
 *    make sure the person who is sending the request is let's say "LoggedIn" with
 *    Facebook.com using their username and password, that is when middleware becomes
 *    extremely powerful. We send all those request through the authentication
 *    middleware and then authentication middleware checks if the user is authenticated
 *    and then the control reaches these functions like "app.get()" else it just
 *    return back from the middleware.
*/


/**
 * Q. How middleware are written in Express in JavaScript?
*/


const express = require("express");
const app = express();
const port = 3000;

/**
 * 1. Middleware function:
 * => First control will reach here then control will reach "handleFirstRequest". 
 *    So, this guy calls "next()", if the "next()" function is called, only then
 *    the control reaches "handleFirstRequest".
*/

function middleware1(req, res, next) {
    console.log("from inside middleware" + req.headers.counter);
    next();

}

/**
 * 2. The way to register our middleware is calling "app.use()" and pass the middleware
 *    Register means we have told Express every request that comes needs to first go
 *    through guy. Only if this guy approves or call next() then the control will
 *    reach to the respective handler.
*/

app.use(middleware1);

/**
 * 3. Now let's go to POSTMAN and send the request
 * 
 * Note: We can't send a request twice
*/

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

app.listen(port, started);
