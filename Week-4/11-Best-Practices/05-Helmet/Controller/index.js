/**
 * Helmet:
 * - In this exercise, you'll enhance the security of your Express
 *   application by using the helmet middleware.
 *   1. Install Helmet Middleware: Install the helmet middleware using
 *      npm install helmet.
 *   2. Use Helmet Middleware: In your app.js, require and use the
 *      helmet middleware. It will automatically set various security
 *      headers to help protect your app.
*/

const express = require('express');
const cors = require('cors');
const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { Movie } = require("./models/movies.model");
const { User } = require("./models/users.model");

app.use(express.json());

const allowedOrigins = ['<http://localhost:3000>', '<https://example.com>'];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

const helmet = require('helmet');
app.use(helmet());

initializeDatabase();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

const v1Routes = require('./routes/v1.routes');
app.use('/api/v1', v1Routes);

async function signup(userDetails) {
  try {
    const user = new User(userDetails);
    const newUser = await user.save();
    return newUser
  } catch (error) {
    throw error;
  }
}

app.post('/signup', async (req, res) => {
  try {
    const savedUser = await signup(req.body);
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user account' });
  }
});

async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      console.log("Logged in user:", user);
      return user;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw error;
  }
}


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

async function changePassword(email, currentPassword, newPassword) {
  try {
    const user = await User.findOne({ email });
    if (user && user.password === currentPassword) {
      user.password = newPassword;
      const updatedUser = await user.save();
      return updatedUser;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw error;
  }
}

app.post('/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const updatedUser = await changePassword(email, currentPassword, newPassword);
    res.json(updatedUser);
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

async function updateProfilePicture(email, newProfilePictureUrl) {
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.profilePictureUrl = newProfilePictureUrl;
      const updatedUser = await user.save();
      return updatedUser;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
}


app.post('/update-profile-picture', async (req, res) => {
  try {
    const { email, newProfilePictureUrl } = req.body;
    const updatedUser = await updateProfilePicture(email, newProfilePictureUrl);
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
});

async function updateContactDetails(email, updatedContactDetails) {
  try {
    const user = await User.findOne({ email });
    if (user) {
      Object.assign(user, updatedContactDetails);
      const updatedUser = await user.save();
      return updatedUser;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
}

app.post('/update-contact/:email', async (req, res) => {
  try {
    const email = req.params.email;
    console.log({ email })
    const updatedContactDetails = req.body;
    const updatedUser = await updateContactDetails(email, updatedContactDetails);
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
});

async function findUserByPhoneNumber(phoneNumber) {
  try {
    const userByPhoneNumber = await User.findOne({ phoneNumber });
    if (userByPhoneNumber) {
      return userByPhoneNumber;
    } else {
      throw new Error("User not found")
    }
  } catch (error) {
    throw error;
  }
}

app.get('/users/phone/:phoneNumber', async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    const user = await findUserByPhoneNumber(Number(phoneNumber));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

async function addRatingAndReview(movieId, userId, rating, reviewText) {
  try {
    const movie = await Movie.findById(movieId);
    console.log({ movie })
    if (movie) {
      movie.ratings.push(rating);

      const review = {
        user: userId,
        text: reviewText,
      };
      movie.reviews.push(review);

      await movie.save();

      const updatedMovieWithReview = await Movie.findById(movieId).populate('reviews.user', 'username profilePictureUrl');
      return updatedMovieWithReview;
    } else {
      throw new Error("Movie not found");
    }
  } catch (error) {
    throw error;
  }
}

app.post('/movies/:movieId/rating', async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const { userId, rating, review } = req.body;

    const updatedMovie = await addRatingAndReview(movieId, userId, rating, review);
    res.json(updatedMovie);
  } catch (error) {
    res.status(404).json({ error: 'Movie not found' });
  }
});

async function getMovieReviewsWithUserDetails(movieId) {
  try {
    const movie = await Movie.findById(movieId).populate({
      path: 'reviews',
      populate: {

        path: 'user', select: 'username profilePictureUrl'
      },
    });
    const reviewsWithUserDetails = movie.reviews.slice(0, 3).map(review => ({
      reviewText: review.text,
      user: review.user,
    }));
    return reviewsWithUserDetails;
  } catch (error) {
    throw error;
  }
}

app.get('/movies/:movieId/reviews', async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const reviewsWithUserDetails = await getMovieReviewsWithUserDetails(movieId);
    res.json(reviewsWithUserDetails);
  } catch (error) {
    res.status(404).json({ error: 'Movie not found' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


/**
 * 1. Request: POST /changePassword
 * 2. Request Body: 
 *    {
 *       "email": "user@example.com",
 *       "currentPassword": "oldpassword",
 *       "newPassword": "newpassword"
 *    }
*/