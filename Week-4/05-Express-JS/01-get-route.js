/**
 * # Adding a basic GET Route:
 * => In this exercise, we'll add a simple GET route to our Express.JS
 *    application and test it using a web browser.
 * 
 * Q. Adding a GET Route on "/:" Create an GET route that responds with
 *    a simple message when the root URL '/' is accessed.
 * */


/**
 * Put everything inside HTTP Server and expose it to the world:
*/
const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello, Express!')
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