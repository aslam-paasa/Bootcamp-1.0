/**
 * Routing:
 * 1. Routing refers to determining how an application responds to a client
 *    request.
 *    a. You define routing using methods of the Express App object that
 *       corresponds to HTTP methods. For example, app.get() to handle
 *       GET requests(routes GET request) and app.post() to handle POST
 *       requests. 
 *    b. You can also use app.all() to handle all HTTP methods and app.use()
 *       to specify middleware as the callback function[Middleware topic].
 * 2. Each route can have one or more handler function(callbacks), which are
 *    executed when the route is matched.
 *    a. Requests are routed based on two pieces of information:
 *       - The HTTP Request
 *       - The request path
 *    b. A route refers to an HTTP method, path, and handler combination. 
 *    c. Route definition takes following structure:
 *       1 app.METHOD(PATH, HANDLER): 
 *       - Route an HTTP request(handles an HTTP request), where METHOD
 *         is the HTTP method of the request, such as GET, POST, and so on,
 *         in lowercase. Thus, the actual method are app.get(), app.post(),
 *         app.put(), and so on. Whereas:
 *          i. 'app' is an instance of express.
 *          ii. METHOD is an HTTP request method(they are also termed as
 *              routing methods), in lowercase.
 * 3. Routing methods:
 *  - Express supports the following routing methods corresponding to
 *    the HTTP methods of the same names:
 *    checkout(), copy(), delete(), get(), head(), lock(), merge(),
 *    mkactivity(), mkcol(), move(), m-search(), notify(), options(),
 *    patch(), post(), purge(), put(), report(), search(), subscribe(),
 *    trace(), unlock(), unsubscribe().
 *  - The API documentation has explicit entries only for the most popular
 *    HTTP method:
 *    a. app.get()
 *    b. app.post()
 *    c. app.put()
 *    d. app.delete()
 * 4. The App object has methods for:
 *    a. Routing HTTP requests         [app.method and app.param]
 *    b. Configuring Middleware        [app.route]
 *    c. Rendering HTML views          [app.render]
 *    d. Registering a template engine [app.engine]
 *    e. 
*/

/**
 * Route Methods:
 * - A route method is derived from one of the HTTP methods, and is attached
 *   to an instance of the express class.
 * - The following code is an example of routes that are defined for the
 *   GET and the POST methods to the root of the app.
 * 
 *   app.get('/', function(req, res) {
 *      res.send('GET request to the homepage');
 *   })
 * 
 *   app.post('/', function(req, res) {
 *      res.send('POST request to the homepage');
 *   });
 * 
 * - There is a special routing method, app.all(), used in middleware
 *    functiions at a path for all HTTP request methods.
 * - For example, the following handler is executed for requests to the
 *   route "secret" whether using GET, POST, PUT, DELETE, or any other
 *   HTTP request method supported in the HTTP Module.
 * 
 *   app.all('/secret', function(req, res) {
 *      console.log('Accessing the secret section...');
 *      next(); => pass control to the next handler
 *   });
*/


/**
 * Q. How do we start listening on various routes?
 * => Significance : Each route does a different thing.
*/

const express = require("express");
const app = express();
const port = 3000;

/**
 * 3. When anytime there is a request, call the function here.
*/

function calculateSum(counter) {
    let sum = 0;
    for (let i = 0; i < counter; i++) {
        sum = sum + i;
    }
    return sum;
}

/**
 * 1. "handleFirstRequest" is a asynchronous callback function.
 * 4. In this callback function we need to handle the request and provide the response.
*/

function handleFirstRequest(req, res) {
    // headers, body, query parameters
    let calculatedSum = calculateSum(100);
    console.log(calculatedSum);
    let answer = "The sum  is " + calculatedSum;
    res.send(answer);
}

/**
 * 2. "app.get" Route triggers "handleFirstRequest" anytime when it gets a request
 *     on "/handleSum". 
 * 5. All routes will reach to a single "handleFirstRequest" function and that's
 *    how we handle multiple routes.
*/

app.get('/handleSum', handleFirstRequest);
app.get('/handleSum1', handleFirstRequest);
app.get('/handleSum2', handleFirstRequest);
app.get('/handleSum3', handleFirstRequest);


function started(req, res) {
    console.log(`Example app listening on port ${port}`);
};

app.listen(port, started);

