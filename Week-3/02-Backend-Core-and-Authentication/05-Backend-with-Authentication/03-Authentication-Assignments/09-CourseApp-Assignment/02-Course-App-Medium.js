const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];


/**
 * Approach-2: Authentication using JWT
 * - When the user signs up, they should get back a jwt that is
 *   valid for 1hr.
 * - They should then send just that jwt vs Sending username and
 *   password to the authenticated routes.
 * - 49:00 L-3.4
*/
const secretKey = "superS3cr3t1"; // replace this with your own secret key

const generateJwt = (user) => {
  const payload = { username: user.username, };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


/**
 * 1. Route: POST /admin/signup
 * 2. Description: Creates a new admin account.
 * 3. Input: { username: 'admin', password: 'pass' }
 * 4. Output: { message: 'Admin created successfully', token: 'jwt_token_here' }
*/
app.post('/admin/signup', (req, res) => {
  const admin = req.body;
  const existingAdmin = ADMINS.find(a => a.username === admin.username);
  if (existingAdmin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    ADMINS.push(admin);
    const token = generateJwt(admin);
    res.json({ message: 'Admin created successfully', token });
  }
});


/**
 * 1. Route: POST /admin/login
 * 2. Description: 
 *    a. Authenticates an admin. 
 *    b. It requires the admin to send username and password in the headers.
 * 3. Input: Headers: { 'username': 'admin', 'password': 'pass' }
 * 4. Output: { message: 'Logged in successfully', token: 'jwt_token_here' }
*/
app.post('/admin/login', (req, res) => {
  const { username, password } = req.headers;
  const admin = ADMINS.find(a => a.username === username && a.password === password);

  if (admin) {
    const token = generateJwt(admin);
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Admin authentication failed' });
  }
});


/**
 * 1. Route: POST /admin/courses
 * 2. Description: Creates a new course.
 * 3. Input: 
 *    a. Headers: 
 *       { 
 *          'Authorization': 'Bearer jwt_token_here' 
 *       }, 
 * 
 *    b. Body: 
 *       { 
 *          title: 'course title', 
 *          description: 'course description', 
 *          price: 100, 
 *          imageLink: 'https://linktoimage.com', 
 *          published: true 
 *       }
 * 4. Output: { message: 'Course created successfully', courseId: 1 }
 * */ 
app.post('/admin/courses', authenticateJwt, (req, res) => {
  const course = req.body;
  course.id = COURSES.length + 1; 
  COURSES.push(course);
  res.json({ message: 'Course created successfully', courseId: course.id });
});


/**
 * 1. PUT /admin/courses/:courseId
 * 2. Description: 
 *    a. Edits an existing course. 
 *    b. courseId in the URL path should be replaced with the ID of the course to be edited.
 * 3. Input: 
 *    a. Headers: 
 *       { 
 *          'Authorization': 'Bearer jwt_token_here' 
 *       }, 
 * 
 *    b. Body: 
 *       { 
 *          title: 'updated course title', 
 *          description: 'updated course description', 
 *          price: 100, 
 *          imageLink: 'https://updatedlinktoimage.com', 
 *          published: false 
 * 4. Output: { message: 'Course updated successfully' }
*/
app.put('/admin/courses/:courseId', authenticateJwt, (req, res) => {
  const courseId = parseInt(req.params.courseId);

  const courseIndex = COURSES.findIndex(c => c.id === courseId);

  if (courseIndex > -1) {
    const updatedCourse = { ...COURSES[courseIndex], ...req.body };
    COURSES[courseIndex] = updatedCourse;
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});


/**
 * 1. Route: GET /admin/courses
 * 2. Description: Returns all the courses.
 * 3. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
 * 4. Output: 
 *    { 
 *       courses: [ { 
 *                     id: 1, 
 *                     title: 'course title', 
 *                     description: 'course description', 
 *                     price: 100, imageLink: 'https://linktoimage.com', 
 *                     published: true 
 *                }, ... ] 
 *    }
*/
app.get('/admin/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES });
});


/**
 * 1. Route: POST /users/signup
 * 2. Description: Creates a new user account.
 * 3. Input: { username: 'user', password: 'pass' }
 * 4. Output: { message: 'User created successfully', token: 'jwt_token_here' }
*/
app.post('/users/signup', (req, res) => {
  const user = req.body;
  const existingUser = USERS.find(u => u.username === user.username);
  if (existingUser) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    USERS.push(user);
    const token = generateJwt(user);
    res.json({ message: 'User created successfully', token });
  }
});


/**
 * 1. Route: POST /users/login
 * 2. Description: 
 *    a. Authenticates a user. 
 *    b. It requires the user to send username and password in the headers.
 * 3. Input: Headers: { 'username': 'user', 'password': 'pass' }
 * 4. Output: { message: 'Logged in successfully', token: 'jwt_token_here' }
*/
app.post('/users/login', (req, res) => {
  const { username, password } = req.headers;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    const token = generateJwt(user);
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'User authentication failed' });
  }
});


/**
 * 1. Route: GET /users/courses
 * 2. Description: Lists all the courses.
 * 3. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
 * 4. Output: 
 *    { 
 *       courses: [ { 
 *                     id: 1, 
 *                     title: 'course title', 
 *                     description: 'course description', 
 *                     price: 100, 
 *                     imageLink: 'https://linktoimage.com', 
 *                     published: true 
 *                }, ... ] 
 *    }
*/
app.get('/users/courses', authenticateJwt, (req, res) => {
  res.json({ courses: COURSES });
});


/**
 * 1. Route: POST /users/courses/:courseId
 * 2. Description: 
 *    a. Purchases a course. 
 *    b. courseId in the URL path should be replaced with the ID of the course to be purchased.
 * 3. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
 * 4. Output: { message: 'Course purchased successfully' }
*/
app.post('/users/courses/:courseId', authenticateJwt, (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId);
  if (course) {
    const user = USERS.find(u => u.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});


/**
 * 1. Route: GET /users/purchasedCourses
 * 2. Description: Lists all the courses purchased by the user.
 * 3. Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
 * 4. Output: 
 *    { 
 *       purchasedCourses: [ { 
 *                              id: 1, 
 *                              title: 'course title', 
 *                              description: 'course description', 
 *                              price: 100, 
 *                              imageLink: 'https://linktoimage.com', 
 *                              published: true 
 *                        }, ... ] 
 *    }
*/
app.get('/users/purchasedCourses', authenticateJwt, (req, res) => {
  const user = USERS.find(u => u.username === req.user.username);
  if (user && user.purchasedCourses) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: 'No courses purchased' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
