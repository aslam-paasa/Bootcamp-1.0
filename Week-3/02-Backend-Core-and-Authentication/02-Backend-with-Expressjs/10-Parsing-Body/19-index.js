/**
 * Body :
 * => There are a bunch of body types that we can return.
 *    (a) HTML
 *    (b) JSON (most use)
 *    (c) Simple text (least use)
 * 
 * Q. Which of these 3 it lies in?
 * => Simple text 
 * => We are returning a string and hence the body we are returning is
 *    a simple text.
*/


const express = require("express");
let bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());  

function calculateSum(counter) {
    let sum = 0;
    for(let i = 0; i <= counter; i++) {
        sum = sum + i;
    }
    return sum;
}

/**
 * 3 => 1 * 2 * 3 = 6
 * 4 => 1 * 2 * 3 * 4 = 24
*/

function calculateMul(counter) {
    let mul = 1;
    for(let i = 1; i <= counter; i++) {
        mul = mul * i;
    }
    return mul;
}


/**
 * 1. Simple text:
*/
function handleSimpleText(req, res) {    
    let counter = req.body.counter; 
    if(counter < 100000){
        let calculatedSum = calculateSum(counter); 
        let answer = "The sum  is " + calculatedSum;
        res.send(answer);
    } else {
        res.status(411).send("You have sent very big number");
    }
}

/**
 * POSTMAN:
 * 1. URL : http://localhost:3000/handleSimpleText
 * 2. body :
 *    {
 *       "counter": 1000
 *    }
 * 3. Response Back : the sum is 500500
*/



/**
 * 2. JSON Response:
 * */
function handleJSON(req, res) {    
    let counter = req.body.counter; 

    if(counter < 100000){
        let calculatedSum = calculateSum(counter); 

        let answerObject = {
            sum: calculatedSum
        }

        res.status(200).send(answerObject);
    }
}

/**
 * POSTMAN:
 * 1. URL : http://localhost:3000/handleJSON
 * 2. body :
 *    {
 *         "counter": 1000
 *    }
 * 3. Response Back: 
 * => JSON (Server is sending back JSON. And JSON is more structured way to send data)
 *    {
 *       "sum": 500500
 *    }
*/



/**
 * 3. JSON Response : Calculate Sum & Mul 
*/
function handleSecondJSON(req, res) {    
    let counter = req.body.counter; 

    let calculatedSum = calculateSum(counter); 
    let calculatedMul = calculateMul(counter);

    /**
     * 1. It is difficult to parse them, that's why we will return them in object
     * => let stringAnswer = "sum is " + calculatedSum + " and mul is " + calculatedMul;
     * 
     * 2. It's very difficult to pull out calculatedSUm & calculatedMul from this string.
     *    That's why we use JSON.
    */

    let answerObject = {
        sum: calculatedSum,
        mul: calculatedMul,
    };

    res.status(200).send(answerObject);
}


/**
 * POSTMAN:
 * 1. URL : http://localhost:3000/handleSecondJSON
 * 2. body :
 *    {
 *        "counter": 5
 *    }
 * 3. Response Back: 
 * => JSON (Server is sending back JSON. And JSON is more structured way to send data).
 *    {
 *        "sum": 15,
 *        "mul": 120
 *    }
*/


/**
 * 4. HTML:
*/
function handleHTML(req, res) {
    res.send(`<head>
                <title>
                    Hello from page
                </title>
              </head>
              <body>
                <i>Hi there!</i>
              </body>`)
}

/**
 * 5. Send Current Directory HTML File:
 * */ 
function handleHTMLFile(req, res) {
    /**
     * res.send(__dirname + '/index.html');
     * => It will send File location
    */
    res.sendFile(__dirname + '/index.html');
}


app.post('/handleSimpleText', handleSimpleText);
app.post('/handleJSON', handleJSON);
app.post('/handleSecondJSON', handleSecondJSON);
app.get('/handleHTML', handleHTML);
app.get('/handleHTMLFile', handleHTMLFile);

function started(req, res) {
    console.log(`Example app listening on port ${port}`);
}

app.listen(port, started);


/**
 * Q. Are the status code always sent by us?
 * => They are always sent by the backend but there is a default value of 200 so,
 *    even if we don't send this "res.status(200).send(answerObject)", status Code
 *    200 will sent by default.
*/


/**
 * Q. What's the difference between res.send(answerObject) and res.json(answerObject)?
 * => Same, but we can't send "text" in JSON but we can send "simple text" in res.send()
 *    res.json() only make sure we are sending JSON response.
*/
