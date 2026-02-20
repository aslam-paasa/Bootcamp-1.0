/**
 * Creating Middleware for every route:
 * - Write a middleware that logs a message for every incoming request,
 *   and apply it using app.use().
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
  next();
};

app.use(loggerMiddleware);

const logAllRequestsMiddleware = (req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
};

app.use(logAllRequestsMiddleware);

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


app.use('/cars', carsRouter);

function checkAuthentication(req) {
  return req.headers.authorization === 'Bearer validAuthToken';
}

const authenticateMiddleware = (req, res, next) => {
  const isAuthenticated = checkAuthentication(req);

  if (isAuthenticated) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.post('/secure-action', authenticateMiddleware, (req, res) => {
  res.json({ message: 'Secure action executed successfully' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});