/**
 * Headers :
 * 
 * Q. How we can move beyond query parameter?
 * Q. What is the other way around which we can send data to a backend server?
 * Q. Why do we need headers and body when we have Query parameters?
 * 
*/

const express = require("express");
const app = express();
const port = 3000;

function calculateSum(counter) {
    let sum = 0;
    for(let i = 0; i <= counter; i++) {
        sum = sum + i;
    }
    return sum;
}

function handleFirstRequest(req, res) {
    console.log(req.headers);

    /**
     * 2. Getting counter from the headers
     * 3. Hit URL : http://localhost:3000 and send headers as "counter : 4"
     *    The output we receive at POSTMAN is 10
    */

    let counter = req.headers.counter;
    let calculatedSum = calculateSum(counter); // 1+2+3+4 = 10 (output)

    let answer = "The sum  is " + calculatedSum;
    res.send(answer);
}

    /**
     * 1. Now if we go to the browser and try to hit this endpoint, it says "cannot GET /handleSum"
     *    because no longer "GET" handler exist, but there does exist a "POST" handler, but
     *    browser in the URL doesn't let us hit POST Request which is why we downloaded the
     *    a tool called "POSTMAN". It was build to allow developers to send requests.
     * 
     * => There are other ways to send data to the backend :
     *    (a) headers : It is just like query parameter, a different way to send data along with 
     *                  our request POSTMAN provides a option "headers", if we click on it then 
     *                  we can send data.
     * 
     *                  Remove the counter from the URL : http://localhost:3000 and add
     *                  it to the headers section => counter : 4
     * 
     * Issue:
     * => When we send the request, GET will not work, POST will work but now it is
     *    telling me "The sum  is 0" and the reason is Counter no longer exist as a
     *    query parameter. We have moved it to the header which means in our code as
     *    well we need to make sure we are getting counter from the header.
     * */ 
 
/**
 * Q. How do we get counter from headers?
 * */ 

app.post('/handleSum', handleFirstRequest);


/**
 * 4. If we click on Inspect -> Network, we got a "404 Not Found" GET method we
 *    can only send, we can send more requests (POST, PUT etc) from browser but
 *    if we are pasting in the URL bar enter, the only request goes out by default
 *    is GET request. 
 * 
 *    There are some headers that goes out like request headers, default headers
 *    but we can send custom headers. To do that we need POSTMAN etc.
 * 
 * 5. The place where we send most of our data, 95% times we send out data to body.
 *    We are not sending our data to "query parameter" or "headers".
*/


function started(req, res) {
    console.log(`Example app listening on port ${port}`);
}

app.listen(port, started);


/**
 * Q. When to send request from query param and when to send request from headers? 
*/
