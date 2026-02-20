/**
 * 1. Creating an HTTP Server using Express JS:
*/
const express = require('express');


/**
 * 2. Creating Clinic/Hospital
*/
const app = express();


/**
 * 3. Doctor taking a room:  http://localhost:3000/?n=10
*/
const port = 3000;
app.listen(`The application is listening on ${port}`);


/**
 * 7. If you are coming to my place, please bring your X-ray only then I will
 *    able to diagnose you.
*/
function sum(n) {
    let ans = 0;
    for(let i = 1; i <= n; i++) {
        ans = ans + i;
    }
    return ans;
}


/**
 * 4. Doctor is waiting for patients to come, but didn't mentioned his speciality
 *    The actual logic/functionality of the doctor needs to be implemented (route)
 * 5. Give me a callback function, any patient waiting in the waiting room I will
 *    send them here one by one as long as you are free.
 * 6. Doctor can do one thing at a time so request will reach here one by one
*/

app.get('/', function(req, res) {

    /**
     * 8. Provide the X-Ray
    */
    const n = req.query.n;

    /**
     * 9. Calculate something on that X-Ray
    */
    const ans = sum(n); 
    res.send("Hi your ans is " + ans);
})



