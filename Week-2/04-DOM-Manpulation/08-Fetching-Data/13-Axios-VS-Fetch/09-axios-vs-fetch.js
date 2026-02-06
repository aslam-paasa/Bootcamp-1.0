/**
 * +---------------------------------+
 *  Q. How to send some data as well?
 * +---------------------------------+
 * => body
 * => httpdump is a website where we can create our own dump which basically give me an
 *    end point and any request we send on the endpoint will log everything about 
 *    that request here.
 *    
*/


/**
 * +----------------------------+
 * POST request using fetch API:
 * +----------------------------+
 * 
 *  async function main() {
 *      const response = await fetch("https://www.toptal.com/developers/postbin/1711292233043-3811761257238", {
 *          method: 'POST',
 *          body: {
 *              username: 'mohamamd',
 *              password: '1234567'
 *          },
 *          headers: {
 *              "Authorization": "Bearer 123"
 *          }
 *      });
 *
 *      const textualData = await response.text();
 *      console.log(textualData);
 *  }
*/


/**
 * +----------------------------+
 * POST request using Axios API:
 * +----------------------------+
 * 1. First Argument : change request method (GET, POST, PUT, DELETE)
 * 2. Second Argument : send body
 * 3. Third Argument : send header
*/

const axios = require('axios');

async function main() {

    /**
     * 1. Request Config: GET, POST, PUT, DELETE
    */

    const response = await axios.post("https://httpdump.app/dumps/a8159fa0-b907-4585-a524-32df85144bf0", {
        
        /**
         * 2. body(2nd object has body)
         * */    
        
        username: 'mohamamd',
        password: '1234567'
    },
    {
        
        /**
         * 3. headers(3rd object has header)
        */

        headers: {
            "Authorization": "Bearer 123"
        }
    });
    console.log(response.data);

    /**
     * => We dont' have to call to extra json/text.
     * => Axios is able to parse it automatically.
    */

}

main();

/**
 * https://httpdump.app/
 * => This free service gives you a unique URL to send requests to and inspect them.
 * => Hit this api from IDE then the request will go to the httpdump server.
 * => We can see this in the httpdump website.
 * 
 * Note: We have learnt that if we are sending a "post/put/delete" request then :
 * 1. First Argument : URL
 * 2. Second Argument : body
 * 3. Third Argument : headers
 * 
 * => But in a "GET" request we can never send "request body" (we can send extra data
 *    via query param).
*/




/**
 * +----------------------------+
 *  GET request using Axios API:
 * +----------------------------+
*/

async function main() {

    /**
     * 1. Request Config: GET, POST, PUT, DELETE
    */

    const response = await axios.get("https://httpdump.app/dumps/a8159fa0-b907-4585-a524-32df85144bf0", {

        /**
         * 2. headers(3rd object has header)
        */

        headers: {
            "Authorization": "Bearer 123"
        }
    });
    console.log(response.data);

    /**
     * => We dont' have to call to extra json/text.
     * => Axios is able to parse it automatically.
    */

}
