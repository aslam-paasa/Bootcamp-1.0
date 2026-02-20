/**
 * Express and HTTP with real world examples : POSTMAN
 * Q. What are HTTP Server?
 * Q. How we can create an HTTP Server in Express?
 * Q. What is POSTMAN?
 * Q. How it let us interact with Server?   
*/

/**
 * Going to doctor : Real World Example
 * => Doctors is someone who has  a skill. 
 * => They have acquired this skill over years. 
 * => And they provide service to other people who want to use their skill.
 * => To expose this life saving skill, they open a clinic. People who want
 *    to use their skill, line up in a waiting room one-by-one, the doctor 
 *    meets with them.
 * => The doctor is single threaded means one patient at a time.
*/

/**
 * Q. How do people reach to doctors?
 * => We get their address from google or advertisement and we navigate to it.
 * => Once we navigate to the address, there is a door through which we can enter the
 *    waiting area (we cannot directly go to the doctors cabin and use their services)
 *    and until our turn is called we stay there and then we go to the doctor's cabin).
 * => Doctors tend to them one by one. So, one person moves from waiting area
 *    to Doctor's cabin.
 * 
 * 
 * => Once the doctor understand the symptopms, the doctor tell the first person to get the
 *    medicine from chemist and come back to me, and meanwhile tend to other people. This is
 *    similar to delegating task/asynchronous task. 
 * => And whenever this person comes back with the medicine, this person will wait in the 
 *    waiting room again and when the doctor is free he will call you again.
 * 
 * => Doctors are similar to JS Thread, who can do something for us using their clinic
 *    or hospitals. Doctors can tell them to get a medicine in the middle and meanwhile
 *    tend to other people that is similar to asynchronous tasks.
 * 
 * => Our logic is like a doctor, if we are writing any JS Logic like calculateSum()
 *    that takes "n" as an input and calculates the sum, and we can expose this to
 *    the world. The logic is like a "doctor degree" and function call is like a relative.
 *    Relative doesn't need to find the address, they stay in the same house.
 */
        function calculateSum(n) {
            let ans = 0;
            for(let i = 1; i <= n; i++) {
                ans = ans + i;
            } 
            return ans;
        }

        let ans = calculateSum(10);
        console.log(ans);



/**
 * Q. But what if you want to expose this logic or "college degree" to the world?
 * => This is where "HTTP" comes into the picture. Hyper Text Transfer Protocol, it's
 *    a protocol which let's you transfer data from one place to another. Similarly,
 *    hospital is a place where people can come and the information being transferred
 *    from doctor to the patient. Similarly, here it is transferred from some code to
 *    the user.
*/

/**
 * Q. How do I expose my doctor degree/functionality to other people?
 * Q. How can they find me?
 * => By creating an HTTP server/Hospital. It lets you create a "hospital"
 *    where people can come and find you.
 * 
 * Q. How do we create an HTTP server (Hospital Building)?
 * => ExpressJS, Spring Boot, NextJS etc. (Builders)
 * 
 * => Express JS is a library where really smart people have written HTTP Server
 *    that are optimized. We just have to call a functions on it and it will expose
 *    our functionality over the HTTP Protocol.
 * 
 * 
 *      function calculateSum(n) {
 *          let ans = 0;
 *          for(let i = 1; i <= n; i++) {
 *              ans = ans + i;
 *          } 
 *          return ans;
 *      }
 *
 *      let ans = calculateSum(10);
 *      console.log(ans);
 *
 * => This function is same but the difference is, how are we exposing it.
 * => This is how we are exposing it to the world:
*/

        const express = require('express');
        const app = express();

        /**
         * Our logic should be here
         * */ 

        app.get('/', function() {
            const n = req.query.n;
            const ans = calculateSum(n);
            res.send(ans);
        })  

        app.listen(3000);

/**
 * => Exposing the doctors one functionality (kidney surgery, brain surgery). 
 * => Doctors could have multiple rooms inside their hospital, this is one of them.
 * => Think of it like a room of a doctor where the people can now come and doctor
 *    can expose various functionalities like consultation, surgery, physiotherapy etc.
 * => It is similar to opening a clinic or a room inside Hospital.
 * => And whenever any patient comes to "/" room no then "calculateSum" logic
 *    should run. Similarly, in the hospital there are many room, and each room
 *    provides different service like Heart Specialist, Kidney Specialist etc...
*/

        app.get('/', function() {
            const n = req.query.n;
            const ans = calculateSum(n);
            res.send(ans);
        })  


/**
 * +--------------------+
 * | Example: Hospital |
 * +--------------------+
 * 1. Doctor-1 :
 *
 *    const express = require('express');
 *    const app = express();
 *
 *    function calculateSum(a, b) {
 *        return a + b;
 *    }
 * 
 *    app.get('/', function(req, res) {
 *        const a = req.query.a;
 *        const b = req.query.b;
 *        const ans = calculateSum(a, b);
 *        res.send(ans);
 *      })  
 * 
 *    app.listen(3001);
 *
 * 
 * 2. Doctor-2:
 * 
 *    const express = require('express');
 *    const app = express();
 * 
 *    function calculateSum(n) {
 *        let ans = 0;
 *        for(let i = 0; i <= n; i++) {
 *            ans = ans + i;
 *        }
 *        return ans;
 *    }
 * 
 *    app.get('/', function(req, res) {
 *        const n = req.query.n;
 *        const ans = calculateSum(n);
 *        res.send(ans);
 *      })  
 * 
 *    app.listen(3000);
 *
 * 
 * Port No decides the address of the Clinic:
 * 1. app.listen(3000); 
 * 2. app.listen(3001);
 * => If we look at it from high level, we can have a Hospital which is similar
 *    to our Machine where there could be two doctor or two HTTP Servers.
 * => If you have kidney surgery, come to room number 3000 of the hospital.
 * => If you have heart surgery, come to room number 3001 of the hospital.
 * => This is the room no of the doctor.
 * 
 * Note: In fact, in other ports we can expose our code in Java, Python, Go etc...
 *       Whatever Port the HTTP Server is listening on needs to be unique for every 
 *       process, otherwise if we start the process then both doctor try to take the 
 *       room and whoever will take the room first, will take the room. So, keep in
 *       mind whatever port the HTTP server is listening on needs to be unique for
 *       every process.
*/
