export const fakeFetch = (url) => {
  /**
   * Step 1: The fakeFetch function is defined to simulate an API call.
   * => It takes 'url' as a parameter, which represents the API endpoint we're calling.
   * => It returns a Promise, which is used to handle asynchronous tasks.
   */

  return new Promise((resolve, reject) => {
    /**
     * Step 2: Inside the Promise, we simulate a delay using 'setTimeout'.
     * => 'setTimeout' is used to mimic the time it takes for a real API call to complete.
     * => In this case, it will wait for 2 seconds (2000 milliseconds) before returning a response.
     */

    setTimeout(() => {
      // Step 3: Check if the URL passed to 'fakeFetch' is the expected one.
      if (url === "https://example.com/api/employees") {
        /**
         * Step 4: If the URL matches the expected API endpoint, we resolve the Promise.
         * => 'resolve' means the API call was successful and we will return the desired data.
         */

        resolve({
          status: 200, // Status code 200 means the API call was successful.
          message: "Success", // Success message.
          data: {
            employees: [
              // Step 5: Providing employee data inside the 'employees' array.
              { id: "E1", name: "Arpit Jain", workExperience: 6 },
              { id: "E2", name: "Arpit Jain", workExperience: 6 },
              { id: "E3", name: "Arpit Jain", workExperience: 6 },
              { id: "E4", name: "Arpit Jain", workExperience: 6 },
              { id: "E5", name: "Arpit Jain", workExperience: 6 },
              { id: "E6", name: "Arpit Jain", workExperience: 6 },
              { id: "E7", name: "Arpit Jain", workExperience: 6 }
              /**
               * => This array contains employee objects, each with 'id', 'name', and 'workExperience'.
               * => For now, all employees have the same name and experience for simplicity.
               */
            ]
          }
        });
      } else {
        /**
         * Step 6: If the URL does not match the expected endpoint, we reject the Promise.
         * => 'reject' means the API call failed, and we send an error response.
         */

        reject({
          status: 404, // Status code 404 means the resource (employee data) was not found.
          message: "Employee list not found." // Error message explaining the failure.
        });
      }
    }, 2000); // Step 7: The delay is set to 2 seconds to simulate the API response time.
  });
};
