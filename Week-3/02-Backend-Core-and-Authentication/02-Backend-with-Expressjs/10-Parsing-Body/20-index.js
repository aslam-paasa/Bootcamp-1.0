/**
 * Until now we had :
 *    +-----------------+
 *    | Browser         |         HTTP Request            +-------------+
 *    | Postman         |-------------------------------->| HTTP Server |
 *    | Node.JS Process |                                 +-------------+
 *    +-----------------+
 * 
 * => But now, Servers can talk to servers :
 *     Java
 *     Python                                             Backend Server written in :
 *     Node.js(fetch)                                      - NodeJS => Express                                                 
 *    +-----------------+         HTTP Request            +-------------+
 *    | Servers         |-------------------------------->| HTTP Server |
 *    +------^----------+                                 +-------------+
 *           |                                               fn() {
 *           +----------------------------------------------------- res.send
 *                                                                }
 * 
 * => Express let's us create HTTP server, whereas fetch() in Node.js, request in Python
 *    let's us send HTTP request(not create HTTP server). fetch() let's us talk to
 *    HTTP server.
*/

/**
 * Q. Why do we need this?
 * => In the real world, usually there is not only one fronend and one backend server,
 *    a lot of times backend server need to talk to other backend server.
 * => For example, backend server talks to another backend server for authentication,
 *    response back and then this backend server done some logic and then it has to
 *    talk to another backend server, and finally the response goes out to us.
 * 
 * Note: It's not necessary that browser/POSTMAN, Browser is the only thing that
 *       sends requests, even Node.js processes, Python send HTTP requests.
*/


/**
 * Q. How did we do it?
 * => This Node.js written backend server exposes an HTTP server on a URL : "http://localhost:3000" 
 *    and any request that comes to it, it has a bunch of methods inside them i.e. callback fn() 
 *    which handles the requests and do a res.send() => return back the response to the end user.
 * 
 * => The whole goal of HTTP server was, our backend server can do a bunch of things.
 * => If we want to expose that to the internet and allow everyone in the world to
 *    talk to our backend server and use our complex algorithm. That's the purpose of
 *    http/backend servers.
 * 
 * => Our browsers, POSTMANs send requests to our backend server, and backend server
 *    handles them in a specific route, does the expensive operation and retuns a 
 *    response.
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


function handleFirstRequest(req, res) {
    let counter = req.query.counter;

    let calculatedSum = calculateSum(counter);

    let answerObject = {
        sum: calculatedSum
    }

    res.send(answerObject);
}

app.get('/handleSum', handleFirstRequest);

function started(req, res) {
    console.log(`Example app listening on port ${port}`);
}

app.listen(port, started);
