const express = require('express');
const v1Routes = express.Router();

v1Routes.get('/', (req, res) => {
  res.json('Hello World');
});


module.exports = v1Routes;
