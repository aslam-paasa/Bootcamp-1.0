/**
 * Axios: We can write more cleaner.
*/

const axios = require('axios');

async function main() {

    /**
     * 1. Request Config: GET, POST, PUT, DELETE
    */

    const response = await axios( {
        url: "https://httpdump.app/dumps/9b8cd04b-0547-462b-8a67-35b0a5161bd5",
        /**
         * Change it to PUT, DELETE
        */
        method: "POST",
        headers: {
            "Authorization": "Bearer 123"
        },
        data: {
            username: "mohammad"
        },
    });
    console.log(response.data);
}

main();

/**
 * httpdump : Here we can dump all our http request and see what http data is reaching.
*/