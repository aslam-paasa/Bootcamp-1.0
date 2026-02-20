/**
 * Slightly better solution - Create wrapper fns:
*/

const express = require('express');
const app = express();

function usernameValidator(username, password) {
    if (username != "harkirat" && password != "pass") {
        return false;
    }
    return true;
}

function kidneyValidator(kidneyId) {
    if (kidneyId != 1 && kidneyId != 2) {
        return false;
    }
    return true;
}

app.get("/health-checkup", function (req, res) {
    /**
     * do health checks here
    */
    const kidneyId = req.query.kideneyId;

    /**
     * Username checks : Adhar/Insurance checks
     */ 
    if (!usernameValidator(req.query.username, req.query.password)) {
        res.status(400).json({
            msg: "User doesn't exist"
        });
        return
    }

    /**
     * Input Validation
    */
    if (!kidneyValidator(kidneyId)) {
        res.status(411).json({
            msg: "Wrong Inputs"
        });
        return;
    }
    /**
     * do something with kidney here
    */
    res.send("Your kidney is healthy!")
});

app.put("/replace-kidney", function (req, res) {
    /**
     * do health checks here
    */
    const username = req.headers.username;
    const password = req.headers.password;
    const kideneyId = req.query.kidneyId;

    /**
     *  Username checks : Adhar/Insurance checks 
    */
    if (!usernameValidator(req.query.username, req.query.password)) {
        res.status(403).json({
            msg: "User doesn't exist"
        });
        return
    }

    /**
     *  Input Validation
    */
    if (!kidneyValidator(kideneyId)) {
        res.status(411).json({
            msg: "Wrong Inputs"
        });
        return;
    }

    /**
     * do something with kidney here
    */
    res.send("Your kidney is healthy!")
});

app.listen(3000);