const express = require('express');
const carRouter = express.Router();
const cars = require('./02-data');

carRouter.get('/', (req, res) => {
    res.json(cars);
});


module.exports = carRouter;
