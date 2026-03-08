/**
 * Understanding data retrieval:
 * Until now we have built HTTP Servers, we have hit those HTTP servers either
 * via POSTMAN or Browser. But we haven't done like in CHAT GPT when we write
 * something on Input field and hit the button, the request goes out.
 * 
 * Q. How do they send a request when we click a button is what we need to understand?
 * => The browser provides a function to do this which is again part of JS Runtime
 *    (not JS but Browser). Browser exposed a function called as fetch() which fetch 
 *    data from the backend.
*/

/**
 * Until now we have sent request in 2 ways :
 * 1. POSTMAN
 * 2. Browser URL bar
 * 
 * => There's 3rd way: fetch()
 * => Let's say I ask you to create an HTML page where -
 *    1. You can see the names of 10 people
 *    2. You need to make sure you get these data from an API call, means I want you to
 *       create small HTML Page but this needs to hit a backend server that gets me the
 *       data and puts it on the screen.
*/



/**
 * Fetch() method:
 * The fetch() method in JavaScript is a modern API that allows you to
 * make network request, typically to retrieve data from a server. It
 * is commonly used to interact with Web APIs and fetch data asynchronously.
 * Here's a breakdown of what the fetch() method is and why it's used:
*/

/**
 * What is the fetch() method?
 * The fetch() method is a built-in JavaScript fn that simplifies 
 * making HTTP requests. It returns a Promise that resolves to the 
 * 'response' to that request, whether it is successful or not.
*/

/**
 * Why is it used?
 * 1. Asynchronous Data Retrieval:
 *    The primary use of the 'fetch()' method is to asynchronously 
 *    retrieve data from a server. Asynchronous means that the code
 *    doesn't wait for the data to arrive before moving on. This is
 *    crucial for creating responsive and dynamic web applications.
 * 
 * 2. Web API Interaction:
 *    Many web applications interact with external services or APIs to
 *    fetch data. The 'fetch()' method simplifies the process of making
 *    HTTP requests to these APIs.
 * 
 * 3. Promise-Based:
 *    The fetch() method returns a Promise, making it easy to work with
 *    asynchronous operations using the '.then()' and '.catch()'
 *    methods. This promotes cleaner and more readable code. 
 * 
 * 4. Flexible and Powerful:
 *    fetch() is more flexible and powerful compared to older methods
 *    like XMLHttpRequest. It supports a wide range of options,
 *    including headers, request methods, and handling different
 *    types of responses(JSON, text, etc).
*/


/**
 * fetch() method to retrieve data from a server:
*/
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Data from server:', data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });


/**
 * In this example, we use 'fetch()' to make a GET request to
 * 'https://api.example.com/data', handle the response and then parse
 * the JSON data. The '.then()' and '.catch()' methods allow us to
 * handle the asynchronous flow and potential errors.
*/