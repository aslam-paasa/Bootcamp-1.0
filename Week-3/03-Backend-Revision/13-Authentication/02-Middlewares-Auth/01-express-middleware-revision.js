/**
 * 1. Express Middleware revision
 * Create an API/user and return
 *    a. name
 *    b. age
 *    c. pincode
 * 
 * a. Write a middleware which logs everytime this API is being 
 *    accessed.
 * 
 * b. Access this API using Postman.
 * */


const express = require('express');

const app = express();

function userLogger(req, res, next) {
    console.log("logger called")
    if (true) {
        res.json({ success: false })
    }
    next();
}

app.get("/", (req, res) => {
    res.send("welcome to auth session")
})

app.get('/user', userLogger, (req, res) => {
    res.json({ name: "Tanay", age: 32, pincode: "560102" })
});

app.listen(3000, () => {
    console.log('server started');
});