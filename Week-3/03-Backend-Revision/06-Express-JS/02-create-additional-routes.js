/**
 * Q. Creating additional routes:
 * => Add more routes to our Express.js application for the "About" and
 *    "Contact" pages.
 * => Create"/about" Route: Add a GET Route for the "/about" URL that
 *    responds with a message about your application.
 * 
 * => Create"/contact" Route: Add a GET Route for the "/contact" URL that
 *    responds with a message about your application.
 * */

/**
 * Put everything inside HTTP Server and expose it to the world:
*/
const express = require('express');
const app = express();


app.get('/about', (req, res) => {
    res.send('This is the About page.')
})

app.get('/contact', (req, res) => {
    res.send('Contact us at contact@example.com')
})


/**
 * Listen on a Port:
 * => Add code to listen on a port(e.g., 3000) and display a message
 *    indicating all the server is running.
*/
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})