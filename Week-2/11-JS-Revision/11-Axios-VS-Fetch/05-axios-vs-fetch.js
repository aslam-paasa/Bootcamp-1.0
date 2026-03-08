/**
 * Axios vs Fetch :
 * => Two popular ways to hit a backend server and get back response.
 * 
 * => Axios is an external library that smart peeople have written to make it easy
 *    to send HTTP requests because the syntax of fetch is little wierd and axios
 *    also provide some extra features.
*/

/**
 * Fetch :
 * => log the number of todos that exist.
*/

function main() {
    fetch("https://sum-server.100xdevs.com/todos") // promise
        .then(async response => {
            /**
             * convert this response into json
            */
            const json = await response.json();
            // await response.text()
            console.log(json.todos.length);
            console.log(json);
        })
}

main();


/**
 * Total no of todos : 2 (randomly generated)
 */ 



/**
 * Same as above function : (Cleaner syntax)
*/
async function main() {
    const response = await fetch("https://sum-server.100xdevs.com/todos") // promise
    const json = await response.json();
    console.log(json.todos.length);
}

main();

/**
 * Total no of todos : 2 (randomly generated)
*/ 
