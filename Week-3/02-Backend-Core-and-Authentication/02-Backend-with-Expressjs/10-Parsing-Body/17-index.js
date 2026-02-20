/**
 * Body:
 * => This is most important because body is used 99% of the time, and 
 *    body is another thing we can't pass in the browser URL.
 * => Browser URL only let's you send query parameters.
 * 
 * Postman: Select => body -> raw -> JSON
 * 
 * {
 *     "name": "mohammad",
 *     "age": 28,
 *     "counter": 100
 * }
 * 
 * => This is similar to objects in JavaScript and it needs to be a valid JSON.
 * => When you send this from POSTMAN, you will receive "The sum is 0" because we
 *    are no longer sending the right headers.
 *    
*/


const express = require("express");

/**
 * 3. Require this library: bodyParser
 * => Used to parse/get/retrieve req.body in express -> PUT or POST
 * 
 * => Post request krne k error aa rha hai qki data parsing m issue hai.
 * => Qki maine parsing ka logic define nhi kiya hai apne code m.
 * => Humaare paas ek middleware hoti hai known as bodyParser.
*/

let bodyParser = require("body-parser");
const app = express();
const port = 3000;

// app.use(middleware1);

/**
 * 4. body.parser() add a middleware that extracts the body before 
 *    "handleFirstRequest" goes to the respective handler.
 * 
 * => So, middlewares were a function that is called before the actual route is
 *    called. We initialize the middleware by simply calling 
 *    "app.use(bodyParser.json());" and we pass in a middleware to it. 
 * 
 * => Now if we restart the middleware we are getting the output, which means this 
 *    is one of many libraries which let's you extract things from your request.
 * 
 * => app.use(bodyParser.json()); 
 * => means yha pe hum specifically bol rhe hai JSON data ko parse/get krna 
 *    hai aur usko request.body object m add kr rhe hai.
*/

app.use(bodyParser.json());  // { name: 'mohammad', age: 28, counter: 100 }


function calculateSum(counter) {
    let sum = 0;
    for(let i = 0; i <= counter; i++) {
        sum = sum + i;
    }
    return sum;
}


function handleFirstRequest(req, res) {

    /**
     * 1. Output: undefined
    */
    console.log(req.body); 
    
    /**
     * 2. Express gives us query & header but not body like this.
     *    But people have created an external library which let us extract the body.
     *    => "npm install body-parser --save"
     * 
     * 5. Now pass the data "counter: 1000 from POSTMAN and we will reveieve the
     *    response, unless we are sending the correct request
     * => It basically means req.body.counter se 1000 nikaal k counter m daal denge
     *    fir uss counter ko hm use krnge.
    */

    let counter = req.body.counter; 
    let calculatedSum = calculateSum(counter); 

    let answer = "The sum  is " + calculatedSum;
    res.send(answer); // 5050
}


app.post('/handleSum', handleFirstRequest);


function started(req, res) {
    console.log(`Example app listening on port ${port}`);
}


app.listen(port, started);


/** Using Middleware:
 * +---------+         +-----------------------------------------+
 * | Browser |-------->| extracts post body, puts it in req body |
 * +---------+         +-----------------------------------------+
 *                           |
 *                           |
 *                           V
 *                     +-----------+
 *                     | app.get() |
 *                     +-----------+
 * 
 * => Express is a routing and middleware framework that has minimal functionality
 *    of its own : An Express application is essentially a series of middleware
 *    function calls.
 * 
 * => Middleware functions are functions that have access to the request object (res)
 *    and the next middleware function in the application's request-response cycle.
 *    The next middleware function is commonly denoted by a variable named next.
 * 
 * => Middleware functions can perform the following tasks :
 *    (a) Execute any code
 *    (b) Make changes to the request and response objects.
 *    (c) End the request-response cycle.
 *    (d) Call the next middleware function in the stack.
 * 
 * => So, you have learnt to send data to backend using :
 *    1. Query Param
 *    2. Headers
 *    3. Body
*/