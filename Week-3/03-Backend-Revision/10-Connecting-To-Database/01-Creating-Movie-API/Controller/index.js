/**
 * Creating a movie API:
 * - Create a POST route at '/movies' that accepts JSON data with movie
 *   details. Use the 'createMovie' function to save the movie data.
 *   Handle errors too.
 *   1. Create a POST Route: Set up a POST route at '/movies'. 
 *   2. Handle the Request: In the route handler, use the 'createMovie'
 *      function to save the movie data received in the request body.
 *   3. Success Response: If the movie is successfully added, respond
 *      with success message and the saved movie details.
 *   4. Error Handling: If an error occurs during the process, respond
 *      with an error message.
*/

const express = require('express');
const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { Movie } = require("./models/movies.model");

app.use(express.json());

initializeDatabase();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

async function createMovie(movieData) {
  try {
    const movie = new Movie(movieData);
    const savedMovie = await movie.save();
    console.log("Created movie:", savedMovie);
    return savedMovie;
  } catch (error) {
    throw error;
  }
}

app.post('/movies', async (req, res) => {
  try {
    const savedMovie = await createMovie(req.body);
    res.status(201).json({ message: 'Movie added', movie: savedMovie });
  } catch (error) {
    console.log({ error })
    res.status(500).json({ error: 'Failed to add movie' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});