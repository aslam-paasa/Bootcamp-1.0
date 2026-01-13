/**
 * Local Storage:
 * - Local Storage enables us to store data across browser sessions. 
 *   It means if we refresh our page, our data will persist.
 * - It allows us to build applications that maintain state and provide
 *   value even when the browser is closed and reopened.
 * - Note: Local storage only stores strings, so arrays and objects need
 *   to be converted to strings (e.g., JSON.stringify) before storage 
 *   and parsed  (e.g., JSON.parse) when retrieved.
 * 
 * 1. Put Item Into Local Storage:
 * - We can put stuff into local storage by using the localStorage.setItem().
 *   localStorage.setItem('bestFriend', 'Bob');
 * - Now there will be an object in local storage that has the bestFriend
 *   property and the value of Bob.
 * 
 * 2. Get Item out of Local Storage:
 * - We can also get an item out of local storage by going ahead and
 *   just using the getItem method on localStorage.
 *   localStorage.getItem('bestFriend', 'Bob');
 * 
 * 3. Remove Item from Local Storage:
 * - We can also remove an item from local storage with the removeItem()
 *   method:
 *   localStorage.removeItem('bestFriend', 'Bob');
 * 
 * 4. Remove All from Local Storage:
 * - We can clear everything in local storage with clear().
 *   localStorage.clear();
*/


/**
 * Example: Fetch book details using ISBN and store in local storage
*/
document.querySelector('button').addEventListener('click', getFetch)

/**
 * 2. Better approach to handle localStorage:
 * If this book doesn't exist, go ahead and create it.
 * - Even though we are tried put it in an array, but it is actually 
 *   getting stored as string. And this will cause some trouble down the
 *   line.
 * - So, if we can't use an array, what can we use so we can kind of
 *   keep track of all this stuffs? 
 * - 1. Convert the array to a string: JSON.stringify(array)
 *   2. Store it in local storage using 'setItem'
 *      [Means an array to our end but when it comes to store data 
 *       into local storage, we will convert it into a string]
 *   3. When we want to take things out, retrieve the string from
 *      local storage using 'getItem'.
 *   4. Convert it back back to an array: JSON.parse(string).
*/
// if(!localStorage.getItem('books')) {
//   localStorage.setItem('books', [])
// }

function getFetch() {
  const choice = document.querySelector('input').value
  const url = `https://openlibrary.org/isbn/${choice}.json` // 9780140328721, 9781449373320 

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

      /**
       * Beginner Approach to handle local storage:
       * We are getting individual books and start building an actual
       * book checker. But the idea here is that 
       * 1. We are getting books back from the open library.
       * 2. We are checking to see if there is an spot in local storage
       *    called 'books'. But if there is not, then go ahead and create
       *    that spot in local storage, and if there already a spot in
       *    local storage for books, we just go ahead and add next book
       *    we got back, and then store that in local storage. So, basically
       *    we are concatenating String over and over again.
       * Note: This is just first pass to see the idea, but there are some
       * more realistic way to put stuff into local storage and get stuff
       * out.
      */
      if (!localStorage.getItem('books')) {
        localStorage.setItem('books', data.title)
      } else {
        let books = localStorage.getItem('books') + ',' + data.title;
        localStorage.setItem('books', books);
      }

      document.querySelector('h2').innerHTML = localStorage.getItem('books');

    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}