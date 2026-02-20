/**
 * Fetching movies by rating API:
 * - Develop a GET route at /movies/ratings that allows users to access 
 *   movies sorted by their ratings in descending order. Utilize the 
 *   readMoviesByRating function to retrieve the movie data. Handle
 *   errors effectively.
 *   1. Create a GET Route: Set up a GET route at /movies/ratings to 
 *      handle requests for movies sorted by ratings.
 *   2. Retrieve Movies: In the route handler, use the readMoviesByRating
 *      function to find and sort movies by their ratings in descending 
 *      order.
 *   3. Success Response: If movies are found, respond with an array 
 *      containing the details of those movies.
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

async function readMoviesByRating() {
  try {
    const moviesByRating = await Movie.find().sort({ rating: -1 });
    return moviesByRating;
  } catch (error) {
    throw error;
  }
}

app.get('/movies/ratings', async (req, res) => {
  try {
    const movies = await readMoviesByRating();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
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

async function readMoviesByGenre(genreName) {
  try {
    const moviesByGenre = await Movie.find({ genre: genreName });
    return moviesByGenre;
  } catch (error) {
    throw error;
  }
}

app.get('/movies/genre/:genreName', async (req, res) => {
  try {
    const movies = await readMoviesByGenre(req.params.genreName);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});



async function updateMovie(movieId, updatedData) {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, updatedData, { new: true });
    return updatedMovie;
  } catch (error) {
    throw error;
  }
}

app.post('/movies/:movieId', async (req, res) => {
  try {
    const updatedMovie = await updateMovie(req.params.movieId, req.body);
    if (updatedMovie) {
      res.json(updatedMovie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update movie' });
  }
});

async function deleteMovie(movieId) {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    return deletedMovie;
  } catch (error) {
    throw error;
  }
}

app.delete('/movies/:movieId', async (req, res) => {
  try {
    const deletedMovie = await deleteMovie(req.params.movieId);
    if (deletedMovie) {
      res.json({ message: 'Movie deleted', movie: deletedMovie });
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete movie' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});