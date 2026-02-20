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
 * Note: Anytime we restart the server, this data get reset. That's why
 *       we don't use in-memory data.
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



/**
 * => POST - User can add a new kidney.
 * => Whenever someone would come to us, we probably put healthy kidney
 *    inside but lets put an unhealthy kidney anytime a post request
 *    happens.
 * 
 * Note: In POST Request, we send data in the body. This is another place
 *       where we can specify that this is my input.
 * 
 * Q. How do we get the body here?
 * => We add the data into the variable though the body:
 *    const isHealthy = req.body.isHealthy;
 * 
 * => Now push the data into the variable:
 *    users[0].kidneys.push({
 *       healthy: isHealthy
 *    });
 * 
 * Note: Once it gets updated, and someone hit the get(), then he can see
 *       the updated kidneys.
 * 
 * Q. How can we post data?
 * => Use POSTMAN to push data:
 *    1. URL: https://localhost:3000
 *    2. body:
 *       {
 *          "isHealthy": true
 *       }
 * => Note: Error! Cannot POST => Restart
 * => Note: Error! req.body.isHealthy => undefined
 * 
 * Solution:
 * => Middlewares : app.use(express.json()); => Done!
*/

app.use(express.json());
app.post('/', function(req, res) {

    /**
     * 1. Add body data into isHealthy variable
    */
    const isHealthy = req.body.isHealthy;


    /**
     * 2. Add/Push the isHealthy data into the in-memory data:
    */
    users[0].kidneys.push({
        healthy: isHealthy
    });


    /**
     * 3. Display a msg "Done!" when the data is pushed successfully!
    */
    res.json({
        msg: "Done!"
    })
})



/**
 * PUT - User can replace a kidney, make it healthy.
 * => 411: Update every kidney to healthy kidney.
 * => If we don't send back data - res.json({}); the request will hung.
 *    Means POSTMAN wouldn't know that the request has ended.
*/

app.put('/', function(req, res) {
    /**
     * 1. Update every kidney to healthy
    */
    for(let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }

    /**
     * 3. Display msg when the request ended
    */
    res.json({});
});



/**
 * DELETE - User can remove a kidney.
 * => When anyone send delete(), we will remove the unhealthy kidney.
 * 
 * Q. What should happen if they try to delete when there are no kidneys?
 * Q. What should happen if they try to make a kidney healthy when all are already healthy?
*/
app.delete('/', function(req, res) {

    /**
     * Removing all the unhealthy kidneys:
     * 1. We already have users[0].kidneys, we have to convert it into new
     *    array such that new ones only has the healthy kidney.
     * 2. Iterate all over the kidneys and whichever is healthy, keep them
     *    into the new array - newKidneys[] and replace the old data with
     *    new data.
     * 
     * Note: First we will set if-condition to check if there is atleast one unhealthy kidney
     *       then we will run this logic, else we will just return "411" status code.
    */
    if(isThereAtleastOneUnhealthyKidney()) {
        const newKidneys = [];
        for(let i = 0; i < users[0].kidneys.length; i++) {
            if(users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }

        /**
         * 3. Push the newKidneys i.e. only healthy kidneys into the 
         *    users[0].kidneys(replace data)
        */
        users[0].kidneys = newKidneys;

        /**
         * 4. Display the msg once the old data is replaced with new data.
        */
        res.json({msg: "done"});
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
});


/**
 * Conditional Check for atleast one unhealthy kidney:
 * => Only if there is alteast one unhealthy kidney then we will run the logic
 *    else return 411 status code.
 * 
 * Note: In realworld when there is a website, the user will see a website that
 *       says make healthy but if already there kidneys are healthy then they won't
 *       see that button.
*/
function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for(let i = 0; i < users[0].kidneys.length; i++) {
        if(!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}


app.listen(3000);