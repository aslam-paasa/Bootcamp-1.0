/**
 * 1. Importing area
*/
require('dotenv').config();
const express = require('express');
const app = express();

const { home, details, login } = require('./controllers/userController')

const PORT = process.env.PORT || 3000; // Use 3000 if PORT is not set

app.use(express.json());

/**
 * 2. API Routes:
 *    - Total HTTP Methods are 15 but we are using 4 methods in our project.
 *      a. GET: Read Operation
 *      b. POST: Create Operation
 *      c. PUT: Update Operation
 *      d. DELETE: Delete Operation
*/
app.get('/', home)
app.post('/details', details)
app.get('/login', login)


/**
 * 3. Exporting Area
*/
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});