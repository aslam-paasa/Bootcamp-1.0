require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Router = require('./middlewares/mid');
const { body, query } = require('express-validator');

const { home, details, login } = require('./controllers/userController')
const PORT = process.env.PORT || 3000; // Use 3000 if PORT is not set

/**
 * Built-in Middleware:
*/
app.use(express.json());
app.use(Router);

/**
 * Error Handling Middleware:
*/
app.use((err, req, res, next) => {
    console.log("Working on Error");
    next();
});

/**
 * Database Connection:
*/
const data = mongoose.connect('connection string');
data.then((d) => {
    console.log('Connected to Database');
}).catch((err) => {
    console.log('Error connecting to Database');
});


/**
 * Defining Schema and Data Modelling:
*/
const Schema = mongoose.Schema({
    email: String
})

const detailsData = mongoose.model("detailsData", Schema);


/**
 * Creating and Saving Dummy Data:
*/
const createDetailsData = new detailsData({
    email: "mohammad@gmail.com"
})

createDetailsData.save()
.then((d) => {
    console.log('Data is saved');
})
.catch((err) => {
    console.log(err);    
});


/**
 * Application Level Middleware:
*/
app.get('/', (req, res, next) => {
    /**
     * We will check if the http method is GET or not.
     * - If GET: send response
     * - If not: error response
    */
    const method = req.method;
    if(method === 'GET') {
        console.log('Hello from Home Page!');
        next();
    } else {
        res.send(400).send("Bad Request");
    }
}, home)


app.post('/details', details)

/**
 * Data Validation: express-validator
 * - body logic       : server
 * - validation logic : userController
*/
app.get('/login', query('email').notEmpty(), login)


/**
 * Port Number:
*/
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});