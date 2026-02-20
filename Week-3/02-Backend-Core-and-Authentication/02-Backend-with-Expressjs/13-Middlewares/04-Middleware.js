/**
 * +---------------------------------------------------------+
 * | Better way to doing Authentication & Input Validation : |
 * +---------------------------------------------------------+
 * => What if I tell you to introduce another route that does :
 *    (a) Kidney replacement
 *    (b) Inputs need to be the same
 * 
 * Note: 
 * (a) Ugly Solution : Create a new route, repeat code
 * (b) Violates DRY Principles
 * => If we have to introduce 20 different routes which need to have 
 *    authentication as well and kidneyId as well. Writing this logic 
 *    again and again is bad.
*/

const express = require('express');
const app = express();

app.get("/health-checkup", function (req, res) {
    /**
     * do health checks here
    */
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = req.query.kidneyId;

    /**
     * Username checks : Adhar/Insurance checks 
    */
    if (username != 'harkirat' || password != 'pass') {
        res.status(400).json({
            "msg": "User doesn't exist"
        });
        return
    }

    /**
     * Input Validation
    */
    if (kidneyId != 1 && kidneyId != 2) {
        res.status(411).json({
            "msg": "Somethings up with your inputs"
        });
        return;
    }

    /**
     * do something with kidney here
     */

    res.json({
        msg: "Your kidney is fine!"
    })
});

app.put('/replace-kidney', function (req, res) {
    /**
     * do health checks here
    */
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = req.query.kidneyId;

    /**
     * Username checks : Adhar/Insurance checks
     */ 
    if (username != 'harkirat' || password != 'pass') {
        res.status(400).json({
            "msg": "User doesn't exist"
        });
        return
    }

    /**
     * Input Validation
    */
    if (kidneyId != 1 && kidneyId != 2) {
        res.status(411).json({
            "msg": "Somethings up with your inputs"
        });
        return;
    }

    /**
     * do something with kidney here
     */ 
    res.json({
        msg: "Your kidney is fine!"
    })
})

app.listen(3000);
