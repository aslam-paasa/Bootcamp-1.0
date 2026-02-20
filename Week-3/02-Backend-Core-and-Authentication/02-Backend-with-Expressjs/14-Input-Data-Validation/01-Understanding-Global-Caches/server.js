/**
 * Global Catches - Exception Handling :
 * 
 * Q. Why do you need input validation?
 * Q. What if the user sends the wrong body?
 * => Backend are exposed on the internet, anyone can hit backend with any input. 
 *    People will not always hit backend with right input like wrong input data type,
 *    blank input body etc. It is our job to do input validation to make sure that
 *    the server doesn't crash.
 * => If we send the request with wrong input from POSTMAN. It will display some HTML
 *    related error. If we preview: "TypeError: Cannot read properties of undefined".
 * => And through this error HTML response we can read how does our server looks like
 *    and they can break our server. This is why we need input validation and exception
 *    handling.
 * 
 * 1. Error Handling using Global Catch:
 * => Our Client should not see the error HTML message when the server went down.
 *    This is where we use Global Catches.
 * => Global Catches help you give the user a better error message.
 * => It is another middleware that we put at the end. First "app.use(express.json());"
 *    get called then Global Catch get called, if there is an exception.
 * => "Error-Handling Middleware: This is a special type of middleware function in
 *    express that has four arguments instead of three ('(err, req, res, next)').
 * => Express recognizes it as an error-handling middleware because of these four
 *    arguments."
 * 
 * 2. Input Data Validation using Express-Validator
 * 
 * 3. Input Validation using ZOD Library:
 * => But we have to write a lot of checks like input datatype is array or not, then 
 *    inside the input some other validation. To make this issue easy we use an in-built
 *    library called ZOD.
*/


/**
 * Global Catches:
 * It is essentially help us the developers give a better error message
 * to the user.
 * 
 *    Global Catch or Error-Handling Middleware is a special type of
 *    middleware function in Express that has four arguments instead of
 *    three (err, req, res, next). Express recognizes it as an 
 *    error-handling middleware because of these four arguments.
 * 
 *    // Error Handling Middleware
 *    const errorHandle = (err, req, res, next) => {
 *       console.log('Error', err);
 *    
 *       // Customize the error response based on your requirements
 *       res.status(500).json({ error: 'Something went wrong!' });
 *    }
 * 
*/

/**
 * Importance of Global Error Handling:
 * 1. Centralized Handling:
 *    Global catch blocks allow you to centrally manage and handle errors
 *    that occur anywhere in your application. Instead of handling
 *    errors at each specific location, you can capture and process them
 *    in centralized location.
 * 
 * 2. Consistent Error Handling:
 *    Using a global catch mechanism ensures a consistent approach to
 *    error handling throughout the application. You can define how 
 *    errors are logged, reported, or displayed in ole place, making it
 *    easier to maintain a uniform user experience.
 * 
 * 3. Fallback Mechanism:
 *    Global catches often serve as a fallback mechanism. If an unexpected
 *    error occurs and it not handled locally, the global catch can
 *    capture it, preventing the application from crashing and providing
 *    an opportunity to log the error for further analysis.
*/

const express = require('express');
const app = express();

app.use(express.json());

app.post("/health-checkup", function (req, res) {
    /**
     * => do something with kidney here
     * => kidneys = [1, 2]
    */
    const kidneys = req.body.kidneys;
    const kidneyLength = kidneys.length;
    res.send("You have " + kidneyLength + " kidneys");

    /**
     * if(!kidneys) {
     *     res.json({msg: "wrong inputs"});
     * } else { 
     *     const kidneyLength = kidneys.length;
     *     res.send("You have " + kidneyLength + " kidneys");
     * }
     */
});


/**
 * Note: There is another type of middleware in JS.
 * => The biggest problem is someone else can read our exception which is bad.
 * => If our server is crashed, it is crashed, but our end client should not be 
 *    able to read the exception.
 * => We should not expose our backend logic to frontend code (not exception, 
 *    only status code).
 * 
 * Way-2 : Handle Input Validation => Global Catches
 * 1. app.use(express.json());
 * 2. app.post();
 * 3. global catches
 * 
 * => We define all of our routes at the top and define this middleware we put at
 *    the end. Global catches takes 4 inputs :
 *    (a) err,
 *    (b) req,
 *    (c) res,
 *    (d) next
*/

/**
 * Global Catches: Display this exception msg
*/

app.use(function (err, req, res, next) {
    // errorCount++; // Count or Log exceptions for debugging
    res.json({ msg: "Sorry something is up with our server" })
})



app.listen(3000);


/**
 * 1. URL: https://localhost:3000/health-checkup
 * 2. body: 
 *       {
 *          "kidneys": [1, 2]
 *       }
 * 3. Response:  You have 2 kidneys.
 * */ 