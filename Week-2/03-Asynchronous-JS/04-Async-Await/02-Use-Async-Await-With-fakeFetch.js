/**
 * Use async-await with fakeFetch:
 * Call fakeFetch() with some msg and use await to get the data and 
 * then print it.
*/

function fakeFetch(msg, shouldReject) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(shouldReject) {
                reject(`error from server: ${msg}`);
            }
            resolve(`from server: ${msg}`);
        }, 3000);
    });
}

const printDataFromServer = async () => {
    try {
        const serverData = await fakeFetch("I am awesome", false);
        console.log(serverData);
    } catch (err) {
        console.error(err);
    } 
}

printDataFromServer();