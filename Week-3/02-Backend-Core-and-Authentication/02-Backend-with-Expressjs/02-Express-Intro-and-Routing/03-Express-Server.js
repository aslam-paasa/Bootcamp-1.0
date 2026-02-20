/**
 * ExpressJS:
 * 1. ExpressJS is a web application framework that is built on top of Node.js.
 *    (Express is an application level framework of Node.js used to generate
 *     web application, web services & to overcome the drawbacks of Node.js
 *     implementations.)
 * 2. Express.js adds flexibility to an application with a huge range of modules
 *    available on npm that you can directly plug into Express as per the
 *    requirement.
 * 3. It was developed by TJ Holo-way-chuk and was released in the market on
 *    22nd May, 2010.
 * 4. Formerly it was managed by IBM but currently, it is placed under the
 *    stewardship of the Node.js Foundation incubator.
 * 5. Express is majorly responsible for handling backend part in the MERN/MEAN stack.
 *    [Express is dependency i.e. module]
*/

/**
 * MVC Architecture:
 * 1. Model     : MongoDB
 * 2. View      : ReactJS
 * 3. Controller: ExpressJS
 * 
 * 
 *                                       Server
 *                          +-------------Node----------------+
 *                          |         Express Applcn          |
 *                          |     +--------------------+      |
 *     Client               |     | Application Logic  |      |          Database Server
 * +-------------+   HTTP   |     +--------------------+      |            +---------+
 * | Web Browser |<-------->|     | Express Middleware |      |<---------->| MongoDB | 
 * +-------------+          |     +--------------------+      |  DB Driver +---------+
 *                          |     |    Route Handler   |      |
 *                          |     +--------------------+      |
 *                          |                                 |
 *                          +---------------------------------+
 * 
 * 
 * Application Flow:     (2)        (8)          (5)
 *                     +----------------+     +-------+
 *                     |  View/ReactJS  |     | Model |
 *                     +----------------+     +-------+
 *                     |                |         |
 *                     |                |         |
 *                     |           (3)  | (7) (6) | (4)
 *                +--------+     +----------------------+
 *             (1)| Client |(9)  | Controller/ExpressJS |
 *                +--------+     +----------------------+
*/

/**
 * Creating HTTP Server using ExpressJS:
 * 1. npm init -y (package.json)
 * 2. npm install express
 * 
 * => This is where we bring library to our machine.
 * => And this code is enough to create an HTTP server
*/

/**
 * Q. When do you do this: const express = require('express');
 *  - The express module returns to you a factory function.
 *  - A factory function is a regular function that you call like a regular function
 *    and when you call it, it creates and returns an object:
 * 
 *    const App = express();
 *  - Here, this App is an express object. With the help of express object
 *    (App, which we create here), we can access all the functionality of express.
 * 
 *  - If you write var App, then in that case, the value of App can be
 *    changed, but if we want that the value of App cannot be changed
 *    then in that case we use const App.
 * 
 * Note: A Factory function is just a Function that creates something.
 *       It is usually an Object, but it can be anything, like a String,
 *       an Array, or even another Function.
 * 
 *       It's not a constructor directly(which is why we don't use new on
 *       the Express Library). 
*/

const express = require("express");
const app = express();
const port = 3000;

/**
 * Now I have to expose this code to internet so that other people can use it i.e. "Server logic"
*/

function calculateSum(counter) {
    let sum = 0;
    for(let i = 0; i < counter; i++) {
        sum = sum + i;
    }
    return sum;
}

/**
 * => The code that we have written is powerful enough to be deployed on the Internet
 *    as website. And by buying a domain name we can host it on the Internet.
 *    (The idea of exposing of functions to the internet is encapsulated in this 32 lines)
*/

function handleFirstRequest(req, res) {
    let calculatedSum = calculateSum(100);
    console.log(calculatedSum);
    let answer = "The sum  is " + calculatedSum;
    res.send(answer);
}

/**
 * Create a todo app that's lets users store todos on the server:
 * 1. Try to create a http server from scratch in c
 * 2. Create an http server in rust using actix-web
 * 3. Create an http server in golang using the gurrila framework
 * 4. Create an http server in Java using the Spring Boot Framework
 * Note : In the end the protocol remains similar
*/

app.get('/', handleFirstRequest);

function started(req, res) {
    console.log(`Example app listening on port ${port}`);
}

app.listen(port, started);


/**
 * Q.Now we understood if we have an algorithm how can we expose it to the Internet?
 * => Right now we are exposing it to => localhost:3000
 * 
 * Note : Django, Spring Boot, Express are frameworks that make us easy for us to
 *        expose HTTP servers or create HTTP Servers. These HTTP Servers runs on backend
 *        machine and listens to external requests that are coming in and then sending
 *        the incoming request to a function that does the complicated task. Once the
 *        task is done, it gets back and returns it. That's an HTTP Server.
*/


/**
 * Q. Difference between public and private IPs?
 * => Internet is very big and there as thousands of machines today and these no of
 *    IP addresses are limited.
 * 
 * => I am in my house right now and all the machines currently in my building have
 *    something called "private IP". There is a router in our building let's say,
 *    our router might have public address, we individually don't have public address.
 *    When we run NodeJS application locally, most probably my friend in Jaipur won't
 *    be able to access it unless I am from Jaipur.
 * 
 * => My friend in my local network will be able to handle it (send a request).
 *    We all are part of private network and we all have our own set of private IPs
 *    (172.33.17.15) and we can talk to each other.
 * 
 * => College-1 cannot reach this (172.33.17.15) machine but College-2 can.
 *    And the reason it is called private because this machine is accessible to only
 *    for College-2 or the Network range is only accessible to college-2.
 * 
 * => But public IPs means on the internet, doesn't matter where we access from it
 *    we will reach the same "CHAT GPT" server.
*/