/**
 * Example Question: Solution has been provided for this question for
 * your understanding
 * 
 * Use this URL: https://example.com/api/itemlist to make a fake fetch
 * call and handle errors if any. Show a proper message to the user on
 * the DOM, as per the status and message received from the server.
 * A fakeFetch has been provided.
 * 
*/


const fakeFetch = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://example.com/api/itemlist") {
                reject({
                    status: 404,
                    message: "Items list not found."
                });
            } else {
                resolve({
                    status: 200,
                    data: {
                        message: "Success",
                        data: [
                            { itemName: "Bread", price: 30 },
                            { itemName: "Water Bottle", price: 50 },
                            { itemName: "Dairy Milk", price: 20 }
                        ]
                    }
                });
            }
        }, 2000);
    });
}



// Your Code here (Solution Given)
const displayOutput = document.querySelector("#output");
fakeFetch("https://example.com/api/itemlist")
    .then((response) => console.log(response))
    .catch((error) => {
        if (error.status === 404) {
            displayOutput.textContent =
                "The data you are looking for, does not exist.";
        }
    });


// Output on the DOM should be:
// The data you are looking for, does not exist.


/**
 * Explanation:
 * In the above code solution, we are making a fakeFetch fn call with the
 * URL: https://example.com/api/itemlist
 * 
 * If the Promise is resolved, the "then" method is executed with the
 * successful response as the argument, and the console.log statement
 * outputs the response object to the console.
 * 
 * If the Promise is rejected, the "catch" method is executed with the
 * error object as the argument, and the 'if' statement checks if the
 * error status is equal to 404. If the error status is 404, the message
 * "The data you are looking for, does not exist" is displayed in the
 * HTML element with ID "output". 
*/

