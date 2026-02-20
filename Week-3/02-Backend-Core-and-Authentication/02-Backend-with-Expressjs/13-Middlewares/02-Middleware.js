/**
 * +------------------------------------------------------------+
 * | Session : Middlewares, authentication, global catches, zod |
 * +------------------------------------------------------------+
 * 
 * Understanding Middlewares:
 * => Imagine a Busy Hospital:
 *    Think of a hospital where there's a doctor, patients waiting in
 *    line, and a few helpful assistants making sure everything runs
 *    smoothly. 
 * 
 * 1. Doctor's Cabin(Application Logic):
 *    The doctor is like the main braing of the hospital - ready to
 *    help patients with their problems.
 * 
 * 2. Waiting Room(Callback Queue):
 *    The waiting room is where patients hang out before seeing the  
 *    doctor. Each patient has a unique situation.
 * 
 * 3. Intermediates(Middlewares):
 *    (a) Before a patient sees the doctor, there are some helpers doing
 *        important tasks.
 *    (b) One helper checks if patients have the right paperwork. This
 *        is like ensuring everyone is who they say they are (Authentication).
 *    (c) Another helper does quick checks - like making sure patient's
 *        blood pressure is okay. This is similar to checking if the
 *        information coming to the doctor is healthy and makes sense
 *        (Input Valiadtion).
 * 
 *             HTTP Request
 * +--------+ <-------------[Middleware]----------> +--------+
 * | Client |                                       | Server |
 * +--------+ <-----------------------------------> +--------+
 *                    HTTP Response
 * 
 * 
 * Understanding Doctor's Cabin (Application Logic):
 * => Let's begin with an example : Hospital(Covid)
 * => A lot of time we come to the waiting area then before we reach the doctor we 
 *    go through an insurance check (generally in US) :
 *    1. Your adhar/insurance info is taken. Only if you have insurance you proceed.
 *    2. Blood test is done, only if no STD does use proceed.
 *    3. BP Checked, only if BP is reasonable user proceeds.
 *    4. If all are fine, then we will go to Doctor's Cabin.
 * 
 * Note: 
 * => There are few pre-checks that happen before we actually enters the doctor's cabin.
 * => All these pre-checks and doctor's cabin is JS Thread(single JS thread). All of 
 *    these process happens one-by-one and one patient at a time. 
 *    
*/

/**
 * Q. What is the equivalent code of this doctor's cabin (Application Logic)?
 * => The doctor is like the main brain of our hospital - ready to help
 *    patients with their problems.
 */ 

app.get("/health-checkup", function(req, res) {
    /**
     * do health checks here
    */
    res.send("Your heart is healthy!"); 
});


/**
 * Q. How do we do pre-checks?
 * 1. Auth Checks? (Does this user have funds to visit the doctor) ?
 * 2. Ensure input by the user is valid (BP/blood tests) ?
 * 
 * => Generally in the real world, the use case of "middlewares" is usually to do
 *    pre-checks and in real-world, pre-checks are of two types :
 *    (a) Authentication : Making sure this person is logged in into the LinkedIn Site.
 *    (b) Input Validation : Means they are trying to access the logic but have they
 *        sent us the right input? Maybe they have not? The route we are trying to hit,
 *        whatever input it expects, we are prodividing the right inputs.
*/


/**
 * Q. What is the best way to do these pre-checks?
*/

app.get("/health-checkup", function(req, res) {
    /**
     * do health checks here
     */ 
    res.send("Your heart is healthy!"); 
});


/**
 * Q. Is it here or some other place where we can define some few things or logic?
 * => Pre-checks : This is the job of middlewares.
 * 
 * => Before we proceed, let's add constraints to our route. Means there is a
 *    "/health-checkup" endpoint and here two things need to happen before we can
 *    run the logic "Your heart is healthy!".
 *    1. User needs to send a kideneyId as a query parameter which should be a number
 *       from 1-2 (humans only has 2 kidneys). So, whenever user is hitting the 
 *       /health-checkup endpoint, they should give a query parameter called "kideneyId"
 *       which should either be 1 or 2. (Whenever we are sending a GET request we can
 *       send an input along with URL : localhost:3000?n=3300, and this "n" is query
 *       parameter).
 *    2. User should send a username and password in headers. We have ignored headers
 *       until now, but there are a few ways to send inputs to a request :
 *       (a) query parameters, 
 *       (b) body, 
 *       (c) headers
*/


/**
 * Ugly way to code :
*/

const express = require('express');
const app = express();

app.get("/health-checkup", function(req, res) {
    /**
     * do health checks here
    */
    const kideneyId = req.query.kideneyId;
    const username = req.headers.username;
    const password = req.headers.password;

    /**
     * Username checks : Adhar/Insurance checks 
    */
    if(username != 'mohammad' || password != 'pass') {
        res.status(403).json({
            msg: "User doesn't exist",
        });
        return;
    }

    /**
     * Input Validation
    */
    if(kideneyId != 1 && kideneyId != 2) {
        res.status(411).json({
            msg: "wrong inputs",
        });
        return;
    }

    /**
     * do something with kidney here
     */ 

    res.send("Your heart is healthy")
});

app.listen(3000);