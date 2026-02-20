/**
 * Fetching movies by director API:
 * - Create a GET route at '/movies/director/:directorName' that allows
 *   users to retrieve movies directed by a particular director. Utilize
 *   the readMoviesByDirector fn to fetch the relevant movie data.
 *   Handle errors gracefully.
 *   1. Create a GET Route: Define a GET route at /movies/directors/:directorName
 *      to handle request for movies directed by a specific director.
 *   2. Retrieve Movies: In the route handler, use the readMoviesByDirector
 *      fn to find movies directed by the provided director's name.
 *   3. Success Response: If the movies are found, respond with an array
 *      containing the details of those movies.
 *   4. Error Handling: If an error occurs, during the process, respond
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
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

async function readAllMovies() {
  try {
    const allMovies = await Movie.find();
    return allMovies;
  } catch (error) {
    throw error;
  }
}

app.get('/movies', async (req, res) => {
  try {
    const allMovies = await readAllMovies();
    res.json(allMovies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

async function readMoviesByActor(actorName) {
  try {
    const moviesByActor = await Movie.find({ actors: actorName });
    return moviesByActor;
  } catch (error) {
    throw error;
  }
}

app.get('/movies/actor/:actorName', async (req, res) => {
  try {
    const movies = await readMoviesByActor(req.params.actorName);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

async function readMoviesByDirector(directorName) {
  try {
    const moviesByDirector = await Movie.find({ director: directorName });
    return moviesByDirector;
  } catch (error) {
    throw error;
  }
}

app.get('/movies/director/:directorName', async (req, res) => {
  try {
    const movies = await readMoviesByDirector(req.params.directorName);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});