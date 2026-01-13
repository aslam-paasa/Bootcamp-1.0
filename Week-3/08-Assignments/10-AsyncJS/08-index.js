/**
 * Use this URL: https://example.com/api/allbooks to make fake fetch 
 * call and handle errors if any. Show a proper message to the user
 * on the DOM(Bad Request! Requested size too large.), as per the
 * status received from the server.
*/

const fakeFetch = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://example.com/api/allbooks") {
                reject({
                    status: 400,
                    message: "Bad Request"
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
// Bad Request! Requested size too large.
   