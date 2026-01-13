/**
 * Write an ES6 fn that takes an array of objects representing books
 * and returns an array with only the titles of each book.
*/

const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { title: '1984', author: 'George Orwell' },
    { title: 'Pride and Prejudice', author: 'Jane Austen' },
];

// Your code here

const titles = getBookTitles(books);
console.log(titles); // Output: ['The Great Gatsby', 'To Kill a Mockingbird', '1984', 'Pr
