/**
 * Write an ES6 fn that takes an object with title and author properties
 * and returns a string in the format "{title} by {author}". Do this
 * using template literals and destructuring.
*/

const book = { title: 'The Hobbit', author: 'J.R.R. Tolkien' }
console.log(getBookInfo(book)) // "The Hobbit by J.R.R. Tolkien"