/**
 * Understanding Query Param:
 * 1. Passing data using Query Param :
 * => localhost:3000/handleSum?counter=1000
 * => We are passing another input i.e. "?counter=1000" as a "Query Parameter" and
 *    that's how we pass it.
*/

/**
 * Q. Can we pass data more than one?
 * => Yes!, if you want to send more, then just add an "&" here :
 * => localhost:3000/handleSum?counter=1000&counter2=100000&counter3=123234
 * => With this we can send multiple parameters, separate them by "&"
*/


/**
 * => Now we want to modify the backend code to take this input "1000" and call
 *    "calculateSum()" on this input. So, we will now use the "request" parameter.
*/

const express = require("express");
const app = express();
const port = 3000;

function calculateSum(counter) {
    let sum = 0;
    for(let i = 0; i < counter; i++) {
        sum = sum + i;
    }
    return sum;
}

function handleFirstRequest(req, res) {

    /**
     * => We got the counter as an input from the user.
     * => User passed it as a query param i.e. "counter=1000"
     * => We can catch it here using "req.query.counter"
     * => Then called "calculateSum()" passing the "counter" and return it to the end user.
    */
 
    let counter = req.query.counter;
    let calculatedSum = calculateSum(counter);
    console.log(counter);
    let answer = "The sum  is " + calculatedSum;
    res.send(answer); // 499500

    /**
     * The sum is "x", so whatever we pass "counter=x", this "x" will be the input.
    */
}

app.get('/handleSum', handleFirstRequest);


function started(req, res) {
    console.log(`Example app listening on port ${port}`);
}

app.listen(port, started)


/**
 * HTTP:
 * => Hyper Text Transfer Protocol and it is used locally.
 * => Means we are works on server which is not live, so the URL will
 *    come through HTTP.
 * 
 * HTTPS: 
 * => Hyper Text Transfer Protocol and it is used globally.
 * => Means when our application is live then we use HTTPS.
 * 
 * Whenever we buy domain/hosting, the seller will provide this https 
 * security. Means our website will be registered globally, so anyone
 * can access globally.
 * 
 * SSL Certificate:
 * Company will provide us this certificate & will guarantee that our
 * will be safe and secured.
*/