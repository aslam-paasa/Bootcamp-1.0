/**
 * fetch() vs axios():
 * 
 * Fetch API:
 * 1. Native Browser API:
 *    fetch is a native JS fn built into modern browsers for making
 *    HTTP requests.
 * 
 * 2. Promise-Based:
 *    It returns a Promise, allowing for a more modern asynchronous
 *    coding style with 'async/await' or using '.then()'. 
 * 
 * 3. Lightweight:
 *    fetch is a lightweight and comes bundles with browsers, reducing
 *    the need for external dependencies.
 * */ 

fetch('<https://api.example.com/data>')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));


/**
 * Axios:
 * 1. External Library:
 *    Axios is a standalone JS libraru designed to work in both browsers
 *    and Node.js environments.
 * 
 * 2. Promise-Based:
 *    Similar to 'fetch', Axios also returns a Promise, providing a
 *    consistent interface for handling asynchronous operations.
 * 
 * 3. HTTP Request and Response Interceptors:
 *    Axios allows the use of interceptors, enabling the modification
 *    of requests or responses globally before they are handles by
 *    'then' or 'catch'. 
 * 
 * 4. Automatic JSON Parsing:
 *    Axios automatically parses JSON responses, simplifying the
 *    process compared to fetch.
*/

import axios from 'axios';

axios.get('<https://api.example.com/data>')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));


/**
 * Comparison Points:
 * 1. Syntax:
 *    fetch uses a chain of '.then()' to handle responses, which might
 *    lead to a more verbose syntax. Axios, on the other hand, provides
 *    a concise syntax with '.then()' directly on the Axios instance.
 * 
 * 2. Handling HTTP Errors:
 *    Both fetch and Axios allow error handling using '.catch()' or
 *    '.finally()', but Axios may provide more detailed error info
 *    by default.
 * 
 * 3. Interceptors:
 *    Axios provides a powerful feature with interceptors for both 
 *    requests and responses, allowing global modifications. fetch
 *    lacks built-in support for interceptors.
 * 
 * 4. Request Configuration:
 *    Axios allows detailed configuration of requests through a variety
 *    of options. fetch may require more manual setup for headers, methods
 *    and other configurations.
 * 
 * 5. JSON Parsing:
 *    Axios automatically parses JSON responses, while the fetch, you
 *    need to manually call .json() on the response.
 * 
 * 6. Browser Support:
 *    fetch is natively supported in modern browsers, but if you need to
 *    support older browsers, you might need a polyfill. Axios has
 *    consistent behavior across various browsers and does not rely on
 *    native implementations.
 * 
 * 7. Size:
 *    fetch is generally considered lightweight, being a part of browser.
 *    Axios, being a separate library, introduces an additional file
 *    size to your project.
*/


/**
 * Conclusion:
 * In summary, both fetch and axios have their strengths, and the choice
 * depends on the specific requirements and preferences of the project.
 * fetch is excellent for simplicity and lightweight projects, while
 * Axios provides additional features and consistent behavior across 
 * different environments.
*/