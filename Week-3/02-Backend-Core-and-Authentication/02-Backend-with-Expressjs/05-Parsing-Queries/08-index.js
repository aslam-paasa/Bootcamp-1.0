/**
 * 1. Passing data using Query Parameters:
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
    let counter = req.query.counter;
    let calculatedSum = calculateSum(counter);
    console.log(counter);
    let answer = "The sum  is " + calculatedSum;
    res.send(answer);
}

function createUser(req, res) {
    res.send("This is POST request!")
}

/**
 * => When the HTTP Protocol was written, by using "Route" we determine which function to call.
 * 
 * => When we are making a request we need to tell whether we want to :
 *    (a) GET some data from the backend
 *    (b) POST some data to the backend
 *    (c) Update some data to the backend
 *    (d) Delete some data from the backend
 * 
 * => The people who are writing the protocol said with "URL+Route" we have also 3rd thing
 *    called "method". Methods are of many types but important ones are :
 *    (a) GET,
 *    (b) POST,
 *    (c) PUT,
 *    (d) DELETE
 * 
 * => Whenever we are writing our handlers, we need to tell what kind of request this will run on.
 * 
 * Note : Any request that goes to backend from the URL is by default a GET Request which is why 
 *        when we wrote 'app.get() it fetches.
 * 
 * =>  When we are going to Instagram and do signup then we are telling backend to create an account 
 *     for me. This is a POST request.
*/


/**
 * 1. GET Request
 * */ 

app.get('/handleSum', handleFirstRequest);


/**
 * 2. POST Request
 * 
 * Q. How do I send a POST Request?
 * => Go to POSTMAN and paste the URL there : http://localhost:3000/createUser
 * => When we hit this URL POST Request in URL, it will give "This is POST request!"
*/

app.post('/createUser', createUser);


function started(req, res) {
    console.log(`Example app listening on port ${port}`);
}

app.listen(port, started)


/**
 * Assignment:
 * 1. Create PUT method
 * 2. Create DELETE method
 * 
 * Note: 
 * => Type "ipconfig" in the Node.js
 * => Then copy and paste it in chatgpt
 * => Write "find me my private IP address"
 * => Make sure we are on same wifi & make sure don't have restricted network.
*/

