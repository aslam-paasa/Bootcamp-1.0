/**
 * +-------------------------+
 * | Q. How to send headers? |
 * +-------------------------+
*/


/**
 * +----------------------------+
 * POST request using fetch API:
 * +----------------------------+
*/

async function main() {
    const response = await fetch("https://www.toptal.com/developers/postbin/1711292233043-3811761257238", {
        method: 'POST',
        headers: {
            "Authorization": "Bearer 123"
        }
    });

    const textualData = await response.text();
    console.log(textualData);
}


/**
 * +----------------------------+
 * POST request using Axios API:
 * +----------------------------+
*/

const axios = require('axios');

async function main() {
    const response = await axios.post("https://www.toptal.com/developers/postbin/1711292233043-3811761257238", {
        headers: {
            "Authorization": "Bearer 123"
        }
    });
    console.log(response.data);

    /**
     * => We dont' have to call to extra json/text.
     * => Axios is able to parse it automatically
    */

}

main();