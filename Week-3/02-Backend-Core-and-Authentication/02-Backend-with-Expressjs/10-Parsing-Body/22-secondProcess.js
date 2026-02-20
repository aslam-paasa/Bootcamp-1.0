/**
 * => This file do just one thing i.e. send a request to http server, get back
 *    response and log it.
 * 
 * => We have worked with 2 libraries : 
 *    (a) fs module
 *    (b) express module
 * => Now we will work with third library:
 *    (c) fetch module
*/

function logResponseBody(jsonBody) {
    console.log(jsonBody);
}

function callbackFn(result) {
    result.json().then(logResponseBody)
}

let sendObj = {
    method: 'GET'
}

fetch("http://localhost:3000/handleSum?counter=10", sendObj).then(callbackFn);


/**
 * Send request through : 
 * (a) Browser, 
 * (b) POSTMAN, 
 * (c) Node.js
 * 
 * Steps to fetch the request:
 * 1. Create a server => node 13-index.js (Server up in terminal-1)
 * 2. Send http request => node 14-secondProcess.js (Server up in terminal-2)
 *    Once we hit the request, it will display on the console, just like we
 *    hit the API in POSTMAN, browser.
*/