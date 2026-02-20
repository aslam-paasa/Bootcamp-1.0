/**
 * Best Solution: Middleware
 * => Let's say we have 3 routes, and we need to do both :
 *    (a) username validation
 *    (b) kidney validation
 * 
 * Q. How do you define middleware?
 * Q. How does that 1st middleware after checking send control to the next middleware?
 * => userMiddleware & kidneyMiddleware are middlewares. Means something sitting
 *    in the middle between route and final handler which does some checks.
 * => If first middleware is correct then next() function will let us move to the
 *    next middleware and if all pre-checks are clear then we will move to our logic.
*/

const express = require('express');
const app = express();

function userMiddleware(req, res, next) {
    if(username != "harkirat" && password != "pass") {
        res.status(403).json({
            msg: "Incorrect inputs",
        });
    } else {
        next();
    }
};

function kidneyMiddleware(req, res, next) {
    if(kidneyId != 1 && kidneyId != 2) {
        res.status(403).json({
            msg: "Incorrect inputs",
        });
    } else {
        next();
    }
};

/**
 * => Using the middleware [cleaner way]
 *    1. Some function doing the user authentication checks
 *    2. Some function doing the kidney authorization checks
 *    3. Then my handler handling my logic
*/

/**
 * userMiddleware & kidneyMiddleware are middlewares:
 * */  

app.get("/health-checkup", userMiddleware, kidneyMiddleware, function(req, res) {

    /**
     * do something with kidney here
    */

    res.send("Your kidney is healthy");
});

app.get("/kidney-check", userMiddleware, kidneyMiddleware, function(req, res) {

    /**
     * do something with kidney here
    */

    res.send("Your kidney is healthy");
});

app.get("/heart-check", userMiddleware, function(req, res) {

    /**
     * do something with kidney here
    */

    res.send("Your heart is healthy");
});


app.listen(3000);