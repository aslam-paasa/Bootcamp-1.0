/**
 * Use this URL: https://example.com/login to make a fake fetch
 * call and show the status like it is authenticated or not with a
 * message in the DOM.
*/

const fakeFetch = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://example.com/login") {
                resolve({
                    status: 200,
                    data: {
                        auth: true
                    }
                });
            } else {
                reject({
                    status: 404,
                    message: "Status not found"
                });
            }
        }, 2000);
    });
};


// your code here


// Output on the DOM should be:
// Verified