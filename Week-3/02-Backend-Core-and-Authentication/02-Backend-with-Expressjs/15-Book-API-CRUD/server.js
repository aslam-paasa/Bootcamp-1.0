const express = require("express");
const app = express();
const PORT = 8082;

/**
 * Receiving incoming from the client configuration:
 * > It will convert the incoming data from the client to a JSON object.
 */
app.use(express.json());


/**
 * Books array: It will store the books data in an array.
 */
const books = [
  { id: "1", title: "The great Gatsby", author: "F.Scott" },
  { id: "2", title: "The Moby Dic", author: "Herman" },
  { id: "3", title: "The MERN Stack", author: "Masynctech" },
];


/**
 * Home Route: It will return a welcome message.
 */
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to my first book api using express",
    data: "Masynctech",
  });
});


/**
 * Fetching all books: It will return all the books data in an array.
 */
app.get("/books", (req, res) => {
  res.json({
    status: "success",
    message: "Books fetched successfully",
    data: books,
  });
});


/**
 * Fetch a book: It will return a single book data based on the id.
 */
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const bookFound = books.find((book) => book.id === id);
  if (!bookFound) {
    return res.json({
      status: "failed",
      message: `Book with id ${id} not found`,
    });
  }
  res.json({
    status: "success",
    message: "Books fetched successfully",
    data: bookFound,
  });
});


/**
 * Create a book: It will create a new book data in an array.
 */
app.post("/books", (req, res) => {
  const newPost = req.body;
  books.push(newPost);
  res.json({
    status: "success",
    message: "Books created successfully",
    data: books,
  });
});


/**
 * Search for a book (req.query): 
 * > It will return a single book data based on the query.
 */
app.get("/books/search", (req, res) => {
  console.log(req.query);
  res.json({
    status: "success",
    message: "Book found successfully",
  });
});


/**
 * Start the server
 */
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
