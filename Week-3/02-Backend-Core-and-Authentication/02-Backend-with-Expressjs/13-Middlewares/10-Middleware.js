/**
 * Last Topic: Built-in Middleware - app.use()
 * => app.use() is a middleware which translate the incoming data into
 *    JSON  if we use express.json().  [Middleman]
 * => 'post' method jb v use krnge tb 'express.json()' use krna hi h.
 *    
 * 
 *     const app = express();
 *     app.use(express.json());
 * 
 * 
 * => We have learnt if we want POST body parameters, we have to use "app.use()"
 *    If we use "app.use()" then only we can catch any body that POSTMAN sends us.
 * 
 * => app.use() : This "use()" means this "express.json()" middleware is getting
 *    called everywhere. It is similar to we defined our own middleware. 
 * 
 * => If we know a middleware needs to be called in every route. We can simply write
 *    "app.use(calculatedRequests)" i.e. (middleware-name). And that will be like
 *    any request comes to any route will pass after this "app.use()", will have this 
 *    "calculateRequests()" added.
 * 
 * => So, if we hit the request, first this "numberOfRequests" will keep on going 
 *    then next() function inside "calculatedRequests" will move the code to "res.json()"
 *    But if we remove next(), the request will keep hung. 
 * 
 * => "app.use()" actually take middleware only as an input which means whatever we
 *    are sending as an input should ideally take 3 arguments, and under some conditions
 *    we will call the next() function.
 * 
 * => JS is single threaded and one task is executed at a time. 
 * => First we have to wait in waiting area then "next()" will take us to "Insurance Check".
 * => Then "next()" will take us to Blood test,
 * => Then "next()" will take us to BP Check,
 * => And finally "next()" will take us to Doctors cabin
*/


const express = require('express');
const app = express();

/**
 * Rate Limiting
*/
let numberOfRequests = 0;

function calculateRequests(req, res, next) {
    numberOfRequests++;
    console.log(numberOfRequests);
    next();
}

app.use(calculateRequests);

app.post('/countLoad', function (req, res) {
    console.log(req.body);
    res.json({
        msg: "hi there"
    })
});

app.listen(3000);
