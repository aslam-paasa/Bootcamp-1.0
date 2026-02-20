const express = require('express')
const Book = require('./models/Book');

const bookRouter = express.Router();

/**
 * 1. POST: Create new book 
 *    > req.body === the data the wants to save
 *    > Check for duplicate
 *    > Save the new data
 *    > Send the response to the user
*/
bookRouter.post('/books', async (req, res) => {
    const { title, author, genre, publishedYear, isAvailable } = req.body;

    try {
        const existingBook = await Book.findOne({ title, author });
        if (existingBook) {
            return res.status(409).json({ error: 'Book already exists' });
        }

        const book = await Book.create({
            title,
            author,
            genre,
            publishedYear,
            isAvailable,
        })

        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

/**
 * 2. GET: Fetch All Books
*/
bookRouter.get('/books', async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

/**
 * 3. GET: Fetch a Book
*/
bookRouter.get('book/:id', async (req, res) => {
    try {
        const books = await Book.findById(req.params.id)
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

/**
 * 4. DELETE: Delete a Book
*/
bookRouter.delete('book/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

/**
 * 5. PUT: Update a book
*/
app.put('book/:id', async (req, res) => {
    try {
        const bookUpdated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(bookUpdated);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = bookRouter