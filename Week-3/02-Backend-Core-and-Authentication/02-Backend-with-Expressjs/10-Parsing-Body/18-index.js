/**
 * Response from server :
 * 
 *                   headers
 *                   body
 *                   query params
 * +----------+      route        +---------+
 * | Browser/ |------------------>| HTTP    |
 * | POSTMAN  |<------------------| Server  |
 * +----------+        ?          +---------+
 * 
 * Now let's understand the thing that server can send you back :
 * => We know it send us some text back but what else it can send us back. If we can
 *    send 10 different things, maybe it can respond with more than 1 thing. And the
 *    answer is Yes!.
 * 
 * 
*/

/**
 *  3 important which server sends you :
 *  => (a) Status Code
 *  => (b) Body => Whatever we see in browser/POSTMAN is what server send back
 *  => (c) Headers
*/

/**
 * Status Code:
 * => We might have header this phrase : "Error 404 not found". This  404 is called Status Code.
 * => Our server along with giving you the body, can give you number, the number can be anywhere 
 *    between 100-599 and each number has a specific significance.
 * => We don't need to know all the numbers or memorize them, we only read 3-4 of the important ones.
 * 
 * Status Code Range :
 * 1. Informational responses (100-199)
 * 2. Successful responses (200-299)
 * 3. Redirection messages (300-399)
 * 4. Client error responses (400-499)
 * 5. Server error responses (500-599)
*/

const express = require("express");
let bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

function calculateSum(counter) {
    let sum = 0;
    for (let i = 0; i <= counter; i++) {
        sum = sum + i;
    }
    return sum;
}

/**
 * 3. Let's see this route that we are exposing to handleSum should only handle Sum
 *    between 1 to 100,000. We know this calculation is very expensive so we want
 *    to restrict the input from the user.
*/

function handleFirstRequest(req, res) {
    let counter = req.body.counter;

    /**
     * 4. Since counter is less than 100,000 so control reach here and this was sent.
     * 
     * 5. If counter is greater than 100,000 then it will send status code: 411, 
     *    "You have sent very big number"
    */

    if (counter < 100000) {

        let calculatedSum = calculateSum(counter);
        let answer = "The sum  is " + calculatedSum;

        /**
         * 1. function currying : one function after another.
         * 
         * 2. One important thing we can send is status code. 
         * => Similarly, we can write status(200) but it is default so we no need to write
         *    res.status(401).send(answer); // 401: unauthorized
         * => If client send us something wrong then it will wrong with 400-499.
         * => If server has bug then we will respond with 500-599
        */

        res.send(answer);
    } else {
        res.status(411).send("You have sent very big number");
    }
}

app.post('/handleSum', handleFirstRequest);


function started(req, res) {
    console.log(`Example app listening on port ${port}`);
}


app.listen(port, started);


/**
 * 1. Postman:
 * => URL : http://localhost:3000/handleSum
 * 
 * 
 * 2. Body :
 *    {
 *        "counter": 1000
 *    }
 * 
 * 
 * 3. Response Back : 
 * => The sum is 500500
 * 
 * 
 * Note: We have learnt the server can also send us multiple things, and one of
 *       those things are "Status Code", "Body", "Headers".
*/
