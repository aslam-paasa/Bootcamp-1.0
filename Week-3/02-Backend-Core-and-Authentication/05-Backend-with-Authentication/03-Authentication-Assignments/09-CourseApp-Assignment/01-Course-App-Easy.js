/**
 * Creating a Course Selling Website:
 * Approach-1: Storing data on in-memory storage
*/

const express = require('express');
const app = express();

app.use(express.json());

/**
 * We will keep 3-arrays at the top, and all 3 of them needs to be
 * populated when the below routes are hit
*/
let ADMINS = [];
let USERS = [];
let COURSES = [];

/**
 * Make sure that the username and password send as input in the header
 * are existing and correct.
 * 
 * Q. How do we protect routes so that only Admin can protect Admin
 *    Routes and only Users can access Users Routes?
 * => We need to send data, but also with those data we also need to
 *    send something else which identifies them. This can simply be
 *    username and password for now.
 * => If any Admin wants to hit the route that is Admin protected, means
 *    these routes are not visible to the Admin of that website. When
 *    the hit the backend server, they need to send the username and
 *    password along, only then we will get the response, else they
 *    won't.
 * 
 * Middlewares:
 * 1. Admin Authentication
 * 2. User Authentication
 * => They will check the headers and make sure that the username and
 *    password that the user has send in the headers are correct. 
*/
const adminAuthentication = (req, res, next) => {
  /**
   * Extracting the username and password from the body. And then
   * check, whether or not ADMINS contains the username and password.
   * 1. If present: next()
   * 2. Else: Status(403)
  */
  const { username, password } = req.headers; 

  const admin = ADMINS.find(a => a.username === username && a.password === password);
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: 'Admin authentication failed' });
  }
};

const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (user) {
    req.user = user;  // Add user object to the request
    next();
  } else {
    res.status(403).json({ message: 'User authentication failed' });
  }
};


/**
 * Admin Routes:
 * 1. Signup (post)
 * 2. Login  (post)
 * 3. Courses(post)
 * 4. Courses => CourseId
 * 5. Courses(get)
*/

/**
 * 1. Route: POST /admin/signup
 * 2. Description: Creates a new admin account.
 * 3. Input: { username: 'admin', password: 'pass' }
 * 4. Output: { message: 'Admin created successfully' }
 *    i. If exist: 'Admin already exists'
 *    ii. If doesn't exist: 'Admin created successfully'
*/
app.post('/admin/signup', (req, res) => {

  const admin = req.body; 

  const existingAdmin = ADMINS.find(a => a.username === admin.username);
  if (existingAdmin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    ADMINS.push(admin);
    res.json({ message: 'Admin created successfully' });
  }
});


/**
 * 1. Route: POST /admin/login
 * 2. Description: 
 *    a. Authenticates an admin. 
 *    b. It requires the admin to send username and password in the headers.
 * 3. Input: Headers: { 'username': 'admin', 'password': 'pass' }
 * 4. Output: { message: 'Logged in successfully' }
*/
app.post('/admin/login', adminAuthentication, (req, res) => {
  res.json({ message: 'Logged in successfully' });
});


/**
 * 1. Route: POST /admin/courses
 * 2. Description: Creates a new course.
 * 3. Input: Headers: { 'username': 'admin', 'password': 'pass' }
 * 4. Input: Body 
 *      { 
 *         title: 'course title', 
 *         description: 'course description', 
 *         price: 100, 
 *         imageLink: 'https://linktoimage.com', 
 *         published: true 
 *      }
 * 5. Output: { message: 'Course created successfully', courseId: 1 }
 * */ 
app.post('/admin/courses', adminAuthentication, (req, res) => {
  const course = req.body;

  course.id = Date.now(); // use timestamp as course ID
  COURSES.push(course);
  res.json({ message: 'Course created successfully', courseId: course.id });
});


/**
 * 1. PUT /admin/courses/:courseId
 * 2. Description: 
 *    a. Edits an existing course. 
 *    b. courseId in the URL path should be replaced with the ID of the course to be edited.
 * 3. Input: Headers: { 'username': 'admin', 'password': 'pass' }
 * 4. Input: Body 
 *       { 
 *          title: 'updated course title', 
 *          description: 'updated course description', 
 *          price: 100, 
 *          imageLink: 'https://updatedlinktoimage.com', 
 *          published: false 
 *       }
 * 5. Output: { message: 'Course updated successfully' }
*/
app.put('/admin/courses/:courseId', adminAuthentication, (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId);
  if (course) {
    Object.assign(course, req.body); // replace original obj with new one
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});


/**
 * 1. Route: GET /admin/courses
 * 2. Description: Returns all the courses.
 * 3. Input: Headers: { 'username': 'admin', 'password': 'pass' }
 * 4. Output: 
 *       { 
 *          courses: [{
 *                       id: 1, 
 *                       title: 'course title', 
 *                       description: 'course description', 
 *                       price: 100, 
 *                       imageLink: 'https://linktoimage.com', 
 *                       published: true 
 *                   }, ... ] 
 *       }
*/
app.get('/admin/courses', adminAuthentication, (req, res) => {
  res.json({ courses: COURSES });
});



/**
 * Users Route:
 * 1. Signup
 * 2. Login
 * 3. Courses
 * 4. Courses => CourseId
 * 5. Purchased Courses
*/

/**
 * 1. Route: POST /users/signup
 * 2. Description: Creates a new user account.
 * 3. Input: { username: 'user', password: 'pass' }
 * 4. Output: { message: 'User created successfully' } 
*/
app.post('/users/signup', (req, res) => {
  // const user = {...req.body, purchasedCourses: []};
  // Below line is the same as above one line.
  // ...req.body copy the content and paste it inside the user.
  // And we will addpurchasedCourses with username & password.
  const user = {
    username: req.body.username,
    password: req.body.password,
    purchasedCourses: []
  }
  USERS.push(user);
  res.json({ message: 'User created successfully' });
});


/**
 * 1. Route: POST /users/login
 * 2. Description: 
 *    a. Authenticates a user. 
 *    b. It requires the user to send username and password in the headers.
 * 3. Input: Headers: { 'username': 'user', 'password': 'pass' }
 * 4. Output: { message: 'Logged in successfully' }
*/
app.post('/users/login', userAuthentication, (req, res) => {
  res.json({ message: 'Logged in successfully' });
});


/**
 * 1. Route: GET /users/courses
 * 2. Description: Lists all the courses.
 * 3. Input: Headers: { 'username': 'admin', 'password': 'pass' }
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
app.get('/users/courses', userAuthentication, (req, res) => {
  // COURSES.filter(c => c.published)
  let filteredCourses = [];
  for (let i = 0; i<COURSES.length; i++) {
    if (COURSES[i].published) {
      filteredCourses.push(COURSES[i]);
    }
  }
  res.json({ courses: filteredCourses });
});


/**
 * 1. Route: POST /users/courses/:courseId
 * 2. Description: 
 *    a. Purchases a course. 
 *    b. courseId in the URL path should be replaced with the ID of the course to be purchased.
 * 3. Input: Headers: { 'username': 'admin', 'password': 'pass' }
 * 4. Output: { message: 'Course purchased successfully' }
*/
app.post('/users/courses/:courseId', userAuthentication, (req, res) => {
  const courseId = Number(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId && c.published);
  if (course) {
    req.user.purchasedCourses.push(courseId);
    res.json({ message: 'Course purchased successfully' });
  } else {
    res.status(404).json({ message: 'Course not found or not available' });
  }
});


/**
 * 1. Route: GET /users/purchasedCourses
 * 2. Description: Lists all the courses purchased by the user.
 * 3. Input: Headers: { 'username': 'admin', 'password': 'pass' }
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
app.get('/users/purchasedCourses', userAuthentication, (req, res) => {
  // const purchasedCourses = COURSES.filter(c => req.user.purchasedCourses.includes(c.id));
  // We need to extract the complete course object from COURSES
  // which have ids which are present in req.user.purchasedCourses
  var purchasedCourseIds = req.user.purchasedCourses; [1, 4];
  var purchasedCourses = [];
  for (let i = 0; i<COURSES.length; i++) {
    if (purchasedCourseIds.indexOf(COURSES[i].id) !== -1) {
      purchasedCourses.push(COURSES[i]);
    }
  }

  res.json({ purchasedCourses });
});



app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
