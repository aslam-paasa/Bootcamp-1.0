const express = require('express');
const app = express();

/**
 * req, res => request and response
 * => Anything related to the request which basically things like:
 *    what was the input, what was the header etc will be in "req". 
 * => And anything related to the response which basically things like:
 *    What status code to send back?
 *    What data to send back?
 *    What headers to send back?
 *    Everything will be in this "res". 
 * 
 * Q. What are request methods?
 * => Whenever we are calling an HTTP endpoint, we have to specify the
 *    request method.
 *    1. GET - Going for a consultation to get a check up
 *    2. POST - Going to get a new kidney inserted(put insta post)
 *    3. PUT - Going to get a kidney replaced(update first name on website)
 *    4. DELETE - Going to get a kidney removed(delete insta post)
 * 
 * Q. What are Status Codes?
 * => Status Codes are what can the server respond back with.
 * => It is just a signal to the frontend that other than the data I am
 *    sending, you should know something bad has happened that's why we
 *    are returning 404, or something good has happened that's why I am
 *    returning 200.
 *    1. 200 - Everything went fine
 *    2. 404 - Doctor is not in the hospital(Route doesn't exist)
 *    3. 500 - Mid Surgery light went away
 *    4. 411 - Inputs were incorrect, wrong person came to surgery
 *    5. 403 - You were not allowed in the Hospital 
 * */ 
app.get("/", function(req, res) {

})

app.listen(3000);