/**
 * Fetching a movie API:
 * - Set up a GET route at '/movies/:title' that allows users to 
 *   retrieve movie details by providing the movie title as a route
 *   parameter. Utilize the readMovie function to fetch the movie data.
 *   Don't forget to error handling!
 *   1. Create a GET Route: Define a GET route at '/movies/:title' to
 *      handle requests for specific movies.
 *   2. Retrieve Movie Data: In the route handler, use the readMovie fn
 *      to find the movie with the provided title. 
 *   3. Success Response: If the movie is found, respond with the movie
 *      details.
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

async function readMovie(movieTitle) {
  try {
    const movie = await Movie.findOne({ title: movieTitle });
    return movie;
  } catch (error) {
    throw error;
  }
}

app.get('/movies/:title', async (req, res) => {
  try {
    const movie = await readMovie(req.params.title);
    console.log({ movie })
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});