/**
 * +-----------------------+
 * POST request using fetch:
 * +-----------------------+
 * async function main() {
 *     const response = await fetch("https://www.toptal.com/developers/postbin/1711292233043-3811761257238", {
 *         method: 'POST',
 *     });
 *
 *     const textualData = await response.text();
 *     console.log(textualData);
 * }
*/


/**
 * +------------------------------------+
 * POST request using Axios Library API:
 * +------------------------------------+
*/

const axios = require('axios');

async function main() {
    const response = await axios.post("https://www.toptal.com/developers/postbin/1711292233043-3811761257238");
    console.log(response.data);

    /**
     * => We dont' have to call to extra json/text.
     * => Axios is able to parse it automatically.
    */
}

main();