/**
 * Writing middleware for specific route: (Already written in prev one)
 * => Here, we will define a route specific middleware function that 
 *    checks if the user is authenticated.
 * 
 * 
 * Note: Observe how the placement of middlewares affects the execution
 *       order compared to other middleware.
*/

const express = require('express');
const app = express();

const carsRouter = require('./cars.router');

app.use(express.json());

const loggerMiddleware = (req, res, next) => {
  console.log('Incoming request at:', new Date().toISOString());
  next(); // Call next to move to the next middleware or route handler
};

app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.use('/cars', carsRouter);

/**
 * In this middleware, we create checkAuthentication which takes a
 * request and check whether it is valid token or not.
 * a. In this example, authenticateMiddleware is applied only to the 
 *    route that performs a secure action.
 * b. If the user is authenticated, the middleware allows the request 
 *    to proceed; otherwise, it returns an unauthorized error.
 * 
 * 1. isAuthenticated = true => pass it to next middleware or route
 * 2. isAuthenticated = false => throw error
 * (Depth will be covered in Authentication Module)
*/
function checkAuthentication(req) {
  return req.headers.authorization === 'Bearer validAuthToken';
}

// Route-specific middleware for authentication
const authenticateMiddleware = (req, res, next) => {
  const isAuthenticated = checkAuthentication(req); // Implement your authentication logic

  if (isAuthenticated) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};


// Applying middleware to a specific route
app.post('/secure-action', authenticateMiddleware, (req, res) => {
  res.json({ message: 'Secure action executed successfully' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
