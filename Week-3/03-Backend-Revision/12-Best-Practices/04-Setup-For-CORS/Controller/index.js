/**
 * Setup for CORS:
 * - In this exercise, you'll configure Cross-Origin Resource Sharing
 *   (CORS) to allow requests from different domain.
 *   1. Install CORS Middleware: Install the CORS middleware using
 *      npm install cors.
 *   2. Use CORS Middleware: In your app.js require and use the CORS
 *      middleware. Configure it to allow specific origins and HTTP
 *      methods.
 * Note: CORS is applied by the browser, but our Postman is not browser.
*/ 


/**
 * CORS Policy:
 * - Avi tk humne jitne API hit kiye hai wo saare POSTMAN se kiya hai,
 *   lekin jo real world application hai wo hm browser se hit krte hai.
 * - Jb hm react pe iss api ko hit krte hai 'http://localhost:3000/login'
 *   to humein error milta hai ki this API is blocked by CORS Policy, 
 *   aur jb same API ko hm POSTMAN se hit krte hai to API sahi kaam kr
 *   rha. Aisa q ho rha hai?
 * - Basically hm apne humaara server(5000) ko hit kr rhe hai apne
 *   browser(5173) se, aur error aa rha hai because of securiy reasons.
 *   Hum Client se directly kisi Server ko hit ni kr skte, aur ye kuch
 *   set of rules hote hai jisse hm CORS Policy kehte hai.
 * - CORS Policy means humaari ek frontend application diff port pe chl 
 *   rhi hai i.e. 5173, aur server ki application diff port pe chl rhi
 *   hai i.e. 5000, and 5173 pe ek resource hai jo hit kr rhi hai 5000
 *   ko. To jb 2 different port aapas m hit hoti hai to humaara 'server'
 *   usse block kr deta hai.
 * - So, jb v CORS Policy dikhe that means 2 different origin aapas m
 *   hit ho rhe hai.
 * 
 * Q. How to resolve CORS policy?
 *  - Issue server k end pe hai to hum apne server ko btate hai tm isse
 *    allow kr do, ye trusted banda hai.
 *  - Install CORS Package: npm i cors
 * 
 * 1. Allowing CORS for all origins:
 * => app.use(cors());
 * => app.get('/hello', (req, res) => {
 *       res.send('hello');
 *    });
 * 
 * 2. Allowing CORS for a single route:
 * => app.get('/hello', cors(), (req, res) => {
 *       res.send('hello');
 *    });
 * 
 * 3. Allowing CORS for multiple origins:
 * => Check below code
 * 
 * Note: Place the CORS at the top.
*/

const express = require('express');
const cors = require('cors');
const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { Movie } = require("./models/movies.model");
const { User } = require("./models/users.model");

app.use(express.json());


/**
 * Allowing Multiple Origins:
 * => If you want to allow multiple origins(or domains) to access your
 *    backend API instead of all origins, you need to pass an options
 *    object to the cors() fn.
 * 
 * => Now, we can only access website data from the two origins that
 *    we added to the allowedOrigins array and all other origins are
 *    blocked.
 * 
 * Note: Instead of URL, we can pass empty String, which means API
 *       can come from anywhere.
*/
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