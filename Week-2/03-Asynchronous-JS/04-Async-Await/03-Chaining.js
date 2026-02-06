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


const printMultipleMessages = async () => {
    try {
      // Each call to fakeFetch is awaited in sequence
      const firstResponse = await fakeFetch("First message");
      console.log(firstResponse); // "From server: First message"
  
      const secondResponse = await fakeFetch("Second message");
      console.log(secondResponse); // "From server: Second message"
  
      const thirdResponse = await fakeFetch("Third message");
      console.log(thirdResponse); // "From server: Third message"
    } catch (error) {
      console.error(error); // Catch any error if one of the fetches fails
    }
  };
  
  // Call the function to start the process
  printMultipleMessages();
  