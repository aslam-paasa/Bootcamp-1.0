const { validationResult } = require('express-validator');

/**
 * How to send data to the server?
 * - body
 * - query 
 * - header
 * */ 

const home = (req, res) => {
    res.status(201).json({
        msg: "Hi from Home Page!"
    });
}


const details = (req, res) => {
    res.status(200).json({
        email: req.body.email
    })
}

/**
 * Sending Query Data:
 * - Go to Postman
 * - Go to Params: localhost:4000/login/?email="mohammad@gmail.com"&password=123
 *   Key      :   Value
 *   email    :   mohammad@gmail.com
 *   password :   123
 * 
 * Data Validation using express-validator:
 * - express-validator should be kept at the top at middlware level.
 * - body logic       : server
 * - validation logic : userController
 * 
 * Steps:
 * 1. If the validationResultStore(req) has any error then store it in
 *    the 'err' variable.
 * 2. If 'err' is empty then logic successfull.
*/
const login = (req, res) => {
    const err = validationResult(req); 
    if(err.isEmpty()) {
        res.status(200).send(req.query);
    } else {
        res.status(400).json({error: err.array()});
    }
}


module.exports = {
    home,
    details,
    login,
};
