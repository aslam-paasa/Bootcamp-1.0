const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8082;

/**
 * 1. Connect to mongodb using mongoose
 */
const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/masynctech");
    console.log("Mongodb has been connected successfully");
  } catch (error) {
    console.log(`Error connecting to mongodb ${error}`);
  }
};
connectToDB();
/**
 * 2. Design Our Schema with embedded document
 *    > name: String
 */

const authorSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

/**
 * 3. Compile the schema to create the model
 */
const Author = mongoose.model("Author", authorSchema);

/**
 * 4. Design Our Schema with embedded document
 *    > title: String
 *    > author: authorSchema
 */
const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author", //Referencing
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * 5. Compile the schema to create the model
 */
const Book = mongoose.model("Book", bookSchema);

/**
 * 6. Create Author
 */
// const createAuthor = async () => {
//   try {
//     await Author.create({ name: "Masynctech" });
//   } catch (error) {
//     console.log(error);
//   }
// };
// createAuthor();

/**
 * 7. Create Book
 */
// const createBook = async () => {
//   try {
//     await Book.create({
//       title: "MERN for everyone",
//       author: "6533a2799c7f3d749dc61c52",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// createBook();

/**
 * 8. Fetch Books
 */
const fetchBooks = async () => {
  try {
    const books = await Book.find().populate("author");
    console.log(books);
  } catch (error) {
    console.log(error);
  }
};
fetchBooks();

/**
 * 9. Start the server
 */
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
