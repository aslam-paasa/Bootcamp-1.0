/**
 * Dumb way of doing Input Validation & Authentication:
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
            "msg": "Somethings up with your inputs"
        });
        return
    }

    /**
     * Input Validation
    */
    if (kidneyId != 1 && kidneyId != 2) {
        res.status(400).json({
            "msg": "Somethings up with your thoughts"
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

app.listen(3000);

/**
 * Send: 
 * (a) http://localhost:3000/health-checkup?kidneyId=2
 * (b) username: 'harkirat'
 *     password: 'pass'
 * 
 * => If anyone is wrong, it will fail:
 *    (a) kidneyId
 *    (b) username
 *    (c) password
*/