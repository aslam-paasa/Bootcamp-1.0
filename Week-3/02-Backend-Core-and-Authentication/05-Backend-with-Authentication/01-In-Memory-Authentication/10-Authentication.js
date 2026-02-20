// Authentication Recap :
// 1. JWT to create tokens
// 2. User gets back a token after the signin request
// 3. User sends back token in all authenticated requests






// Databases :
const ALL_USERS = [
    {
        username: "harkirat@gmail.com",
        password: "123",
        name: "harkirat singh",
    },
    {
        username: "raman@gmail.com",
        password: "123321",
        name: "Raman singh",
    },
    {
        username: "priya@gmail.com",
        password: "123321",
        name: "Priya kumari",
    },
];
// Until now, we have been storing in memory. This is bad for a few reasons :
// 1. Data can't be dynamic, if you update in memory objects, the updates are
//    lost if the process restarts.
// 2. There are multiple servers in the realworld.


// In the real world, a basic architecture looks like this :
// (1) User hits the background
// (2) Backend hits the database
// (3) User doesn't have access to the database/can't talk to the DB

//                         +---------------------------------+
// +---------+             |   +---------+    +----------+   |
// | Browser |-------------|-->| Backend |--->| Database |   |
// +---------+             |   +---------+    +----------+   |
//                         +---------------------------------+

// In the real world, a basic architecture looks like this :
// There are various types of databases :
// 1. Graph DBs
// 2. Vector DBs
// 3. SQL DBs
// 4. NoSQL DBs
// For todays class, we'll look at a famous NoSQL database - MongoDB


// MongoDB let's you create databases :
// In each DB, it lets you create tables (collections)
// In each table, it lets you dump JSON data
// It is schemaless
// It scales well and is a decent choice for most use cases

// How to start?
// 1. Create a MongoDB free instance by going to "https://mongodb.com/"
// 2. Get your mongodb connection URL
// 3. Download MongoDB Compass and try to explore the DB


// How does the backend connect to the database?
// Using libraries!
// 1. Express lets you create an HTTP server
// 2. JsonWebtokens library let's you create jets
// 3. Mongoose let's you connect to your database

// Let's explore mongoose and do the next assignment :
// https://mongoosejs.com/ 
// https://gist.github.com/hkirat/23c42247d8a37de53b005d2668507a67 