/**
 * Use this URL: https://example.com/api/chat to make a fake fetch call
 * and handle errors if any. Show a proper message to the user on the
 * DOM, as per the status and message received from the server.
 * A fake fetch has been provided.
*/


const fakeFetch = (url) => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
    if (url === "https://example.com/api/chat") {
    reject({
    status: 503, 
    message: "Service Unavailable"
    });
    } else {
    resolve({
    status: 200,
    data: {
    message: "Success"
    }
    });
    }
    }, 2000);
   });
   };
   // Your Code here
   // Output on the DOM should be: 
   // We are facing high demand at the moment. Please check back later in sometime.