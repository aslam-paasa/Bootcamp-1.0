/**
 * Axios : 
 * => Axios is another library that let's us do the same thing and in more cleaner
 *    fashion.
 * => It will automatically understand the data that is coming back is JSON.
 * => Whenever we are using axios we will get access to the final thing in "response.data". 
*/

const axios = require('axios');

async function main() {
    const response = await axios.get("https://sum-server.100xdevs.com/todos")
    // response.data
    console.log(response.data.todos.length);
}

main();


/**
 * Output : 2
 * */ 