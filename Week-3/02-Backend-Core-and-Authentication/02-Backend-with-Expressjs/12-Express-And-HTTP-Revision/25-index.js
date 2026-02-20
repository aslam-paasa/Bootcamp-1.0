/**
 * Q. How can we send the request to the HTTP Server?
 * Q. How do patients reach it?
 * => Go to browser, type : http://localhost:3000/?n=30
 * => The port or specific room where this doctor is listening
 *    and pass the inputs which is similar to when we are going
 *    to doctor we are taking some reports, then doctor will do
 *    something with this report and will give you an output.
 * => Output: 435
 */ 

const express = require('express');
const app = express();

function calculateSum(n) {
    let ans = 0;
    for(let i = 0; i <= n; i++) {
        ans = ans + i;
    }
    return ans;
}

app.get('/', function(req, res) {
    const n = req.query.n;
    const ans = calculateSum(n);
    res.send(ans.toString());
})  

app.listen(3000);

/** 
 * Note: 
 * => Whenever we are sending, send back a string: 
 *       res.send(ans.toString());
 * => Don't send back numberm otherwise it will create some issue.
*/

// Request methods :
// 1. GET : Going for a consultation to get a checkup
// 2. POST : Going to get a new kidney inserted
// 3. PUT : Going to get a kidney replaced
// 4. DELETE : Going to get a kidney removed


// Status Codes :
// 200 : Everything went fine
// 404 : Doctor is not in the hospital
// 500 : Mid surgery light went away
// 411 : Inputs were incorrect, wrong person came to surgery
// 403 : You were not allowed in the hospital

// Learn by doing, let's create an "in memory" hospital (store data in a variable)
    