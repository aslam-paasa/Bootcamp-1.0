/**
 * Use this URL: https://example.com/winner-team to make a fake fetch
 * call to get names of winner group members and show a nice message on
 * the DOM congratulating all of them.
*/

const fakeFetch = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://example.com/winner-team") {
                resolve({
                    status: 200,
                    data: {
                        message: "Success",
                        data: ["Jhon", "Raju", "Anjali", "Sakshi"]
                    }
                });
            } else {
                reject({
                    status: 404,
                    message: "No Users found."
                });
            }
        }, 2000);
    });
};


// your code here


// Output on the DOM should be:
// Congratulation to the members of winning team Jhon, Raju, Anjali, Sakshi, great work k