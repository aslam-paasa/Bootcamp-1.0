/**
 * Project Overview:
 * > Book API is a simple, beginner-friendly RESTful API built with
 *   Express.js and MongoDB (Mongoose). It's designed to manage a 
 *   digital library of books - allowing users to create, read, update,
 *   and delete book records securely and efficiently.
 * 
 * > This project emhasizes best practices such as modular routing,
 *   schema design, request body destructuring, error handling, and
 *   duplicate prevention. It's an excellent hands-on project for
 *   backend beginners transitioning into full-stack or MERN 
 *   development.
*/

/**
 * Core Features:
 * 1. CRUD Operations for Books:
 *    > Create a book with fields like title, author, genre, year,
 *      availability.
 *    > Read all books or get a single book by ID
 *    > Update any book's details
 *    > Delete a book by ID
 * 
 * 2. Data Validation & Structure:
 *    > Uses Mongoose Schema for strong data modeling.
 *    > Validates required fields (title, author)
 *    > Supports additional fields: genre, publishedYear, isAvailable
 *    > Auto-timestamps with createdAt and updatedAt
*/

const express = require('express');
const bookRouter = require('./routes/booksRouter');
const connectDB = require('./config/dbconnect')


const app = express();
const PORT = 5000;

/* Connect to DB */
connectDB();

/* Middleware: Pass json data */
app.use(express.json())


app.use('/api/v1/', bookRouter);


/* Start the server */
app.listen(PORT, console.log(`Server is running on the port... ${PORT}`))


/**
 * APIs:
 * 1. POST: http://localhost:5000/api/v1/books
 *    Req : {
 *             "title": "MERN Stack Guide",
 *             "author": "Mohammad Aslam",
 *             "genre": "programming",
 *             "publishedYear: 2026,
 *             "isAvailable": false
 *          }
 * 
 * 2. GET: http://locahost:5000/api/v1/books
 * 
 * 3. GET: http://locahost:5000/api/v1/book/:id  (id: MongoDB _id)
*/