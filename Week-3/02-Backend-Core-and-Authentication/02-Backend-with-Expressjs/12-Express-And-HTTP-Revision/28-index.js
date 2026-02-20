/**
 * Learn by doing, Building a hospital in itself:
 * => Let's create an in-memory hospital
 * => In-memory means we are not going to use any database eventually
 *    in the real world. 
 * => We are going to use in-memory hospital means we will store all the
 *    data in a variable.
 * 
 * Assignment:
 * 1. GET - User can check how many kidneys they have and their health.
 * 2. POST - User can add a new kidney.
 * 3. PUT - User can replace a kidney, make it healthy.
 * 4. DELETE - User can remove a kidney
*/

const express = require('express');
const app = express();

/**
 * In-memory / Global Variable:
 * => Creating an in memory array of objects that looks like this.
 * => And we can update this in-memory array accordingly.
*/
let users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}];


/**
 * Boiler Plate Codes: 
 * => Four things the hospital can do.
 *    1. GET - User can check how many kidneys they have and their health.
 *    2. POST - User can add a new kidney.
 *    3. PUT - User can replace a kidney, make it healthy.
 *    4. DELETE - User can remove a kidney
 * */


/**
 * => We use Query Parameters to get the request : "https://localhost:3000/?n=3"
 * => GET - User can check how many kidneys they have and their health.
 * => John needs to know how many kidneys he has and how many of them are healthy.
 * => So, let's write that logic:
*/
app.get("/", function (req, res) {

    /**
     * 1. healthy: false => We are trying to get in this variable.
    */
    const johnKidneys = users[0].kidneys;

    /**
     * 2. Total Number of kidneys we are storing here.
    */
    const numberOfKidneys = johnKidneys.length;


    /**
     * 3. Filter: How many of them are healthy?
    */
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < johnKidneys.length; i++) {
        if (johnKidneys[i].healthy == true) {
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1; // healthy kidneys
        }
    }


    /**
     * 4. Filter: How many of them are unhealthy?
    */
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;


    /**
     * 5. Send response back to the Client:
     *    (a) No of Kidneys
     *    (b) No of Healthy Kidneys
     *    (c) No of Unhealthy Kidneys
    */
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
});



app.post("/", function (req, res) {

});



app.put("/", function (req, res) {

});



app.delete("/", function (req, res) {

});


app.listen(3000);