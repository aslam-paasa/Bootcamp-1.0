/**
 * Middleware:
 * => Middleware functions act as intermediaries between the client 
 *    (who makes the request) and the server (who sends the response).
 *    They allow us to perform operations on the incoming request 
 *    before it reaches the server or on the outgoing response before 
 *    it reaches the client.
 * 
 *    CLIENT  ------------>  MIDDLEWARE  ------------>  SERVER
 * 
 * => A middleware can modify the request (like adding headers, 
 *    checking authentication, or transforming data) before passing 
 *    it to the next middleware or server.
 * => Similarly, it can modify the server's response before it is 
 *    sent back to the client.
 * 
 *    CLIENT  <------------  MIDDLEWARE  <------------  SERVER
 * 
 * => In this process, middlewares have access to both `req` (request) 
 *    and `res` (response) objects, allowing us to inspect and manipulate 
 *    data at various points in the lifecycle of the request.
 * => Middlewares have a `next()` function that helps control move to 
 *    the next middleware in line or to the server.
 * 
 *    Think of it like this:
 *    Two friends are talking, but all their messages go through a 
 *    mediator (middleware). 
 *    Friend A (client) sends a message to the mediator, who can modify 
 *    it before passing it to Friend B (server). Similarly, Friend B can 
 *    send a message back through the mediator, who can modify the 
 *    response before sending it to Friend A. 
 *    The `next()` function is like telling the mediator to pass the 
 *    message forward.
 * 
 * => Note: If the middleware stops the message and doesn't call `next()`,
 *          the communication halts, and the message will not proceed 
 *          any further.
 * 
*/

/**
 * Middleware:
 * => Middleware functions are functions that have access to the request
 *    object(req), the response object(res), and the next() middleware
 *    function in the application's request-response cycle. The next()
 *    middleware function is commonly denoted by a variable named next().
 * => Middleware functions can perform the following tasks:
 *    1. Execute any code
 *    2. Make changes to the request and the response objects.
 *    3. End the request-response cycle.
 *    4. Call the next middleware function in the stack.
 * 
 * => If the current middleware function does not end the request-response
 *    cycle, it must call next() to pass control to the next middleware
 *    function. Otherwise, the request will be left hanging.
 * 
 * Example: Middleware function myLogger
 *  - Here is a simple example of a middleware function called myLogger.
 *    This function just prints 'LOGGED' when a request to the app passes
 *    through it. The middleware function is assigned to a variable
 *    named myLogger.
 * 
 *    var myLogger = function(req, res, next) {
 *       console.log('LOGGED');
 *       next();
 *    }
 * 
 * => To load the middleware function, call app.use(), specifiying the
 *    middleware function. For example, the following code loads the 
 *    myLogger middleware function before the route to the root path(/).
 * 
 *    var express = require('express');
 *    var app = express();
 * 
 *    var myLogger = function(req, res, next) {
 *       console.log('LOGGED');
 *       next();
 *    }
 * 
 *    app.use(myLogger);
 * 
 *    app.get('/', function(req, res) {
 *       res.send('Hello, world!');
 *    })
 * 
 *    app.listen(3000);
 * 
 * => Every time the app receives a request, it prints the message 'LOGGED'
 *    to the terminal.
 * => The order of middleware loading is important: middleware functions 
 *    that are loaded first are also executed first.
 * => If myLogger is loaded after the route to the root path, the request
 *    never reaches it and the app doesn't print 'LOGGED', because the
 *    route handler of the root path terminates the request-response
 *    cycle.
 * => The middleware function myLogger simply prints a message, then passes
 *    on the request to the next middleware function in the stack by
 *    calling the next() function.
 * */


/**
 * All Express Application can use the following middleware:
 * 1. Application Level Middleware : app.use()
 * 2. Router Level Middleware      : router.use()
 * 3. Built-in Middleware          : express.static, express.json, express.urlencoded
 * 4. Error Handling Middleware    : app.use(err, req, res, next)
 * 5. Third-Party Middleware       : bodyparser, cookieparser
 * 
 * => You can load application-level and router-level middleware with an
 *    optional mount path. You can also load a series of middleware functions
 *    together, which creates a sub-stack of the middleware system at
 *    a mount point.
 * 
 * Q. What is the use of app.use() in Express?
 * => Each app.use(middleware) is called everytime a request is sent to
 *    the server.
 * => app.use() is used to Mounts(joins) the middleware function or mount
 *    to a specified path, the middleware function is executed when the
 *    base path matches.
 * 
 * Q. Why middleware?
 * => Middleware functions are used to modify req and res objects for
 *    tasks like passing request bodies(here body-parser is used to
 *    parse the body of requests), adding response headers(like res.header
 *    ('Content-Type', 'application/json')), etc.
*/


/**
 * Middleware in JS Context & Problem Statement:
 * => Earlier we used to organize all our prechecks followed by the
 *    application logic all in one route.
 * 
 *    Middleware emerged as a solution to enhance code organization by
 *    extracting prechecks from teh core application logic. The motivation
 *    behind their introduction lies in our commitment to the :
 *    "Don't Repeat Yourself" (DRY) principle.
 * 
 * => By isolating there preliminary checks into distant functions or
 *    code blocks known as "middlewares", we achieve a more modular and
 *    maintainable codebase. This separation not only streamlines the
 *    primary application logic but also promotes code reuse, making it
 *    easier to manage, understand, and scale our software architecture.
*/

/**
 * Best Solution : Middlewares
 * Furthermore, with middleware, we can easily include as many precheck
 * functions as needed. This means we have the freedom to add various
 * checks or operations to our application without making the main
 * code complex. It's like having building blocks that we can mix and
 * match to create a customized process for our application, making it
 * more adaptable and easier to manage. 
 * 
 * Here, we need to do both :
 *    (a) username validation using userMiddleware
 *    (b) kidney validation   using kidneyMiddleware
 * 
*/


/**
 * Some Associated Concepts 
 * 1. next() keyword:
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
 * 
 * 2. Difference between 'res.send()' and 'res.json()':
 *    (a) res.send(): Sends a response of various types(string, Buffer,
 *        object, etc.). Express tries to guess the content type based
 *        on the data provided.
 * 
 *        res.send('Hello, World!');  // Sends a plain text response
 * 
 *    (b) res.json(): Sends a JSON response. It automatically sets the
 *        'Content-Type' header to 'application/json'. 
 * 
 *        res.json({ message: 'Hello, JSON!' }); // Sends a JSON response
 * 
*/

const express = require('express');
const app = express();

/**
 * Application Level Middleware:
*/
function userMiddleware(req, res, next) {
    if(username != "harkirat" && password != "pass") {
        res.status(403).json({
            msg: "Incorrect inputs",
        });
    } else {
        next();
    }
};

/**
 * Application Level Middleware:
*/
function kidneyMiddleware(req, res, next) {
    if(kidneyId != 1 && kidneyId != 2) {
        res.status(403).json({
            msg: "Incorrect inputs",
        });
    } else {
        next();
    }
};


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
