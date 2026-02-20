/**
 * Previously, we have seen:
 * a. How to show data in react?
 * b. How to filter data in react?
 * 
 * Today, we will see:
 * 1. How to load data in react?
 * 
 * Note: 99% of work in react is about loading data from server, and then
 *       manipulate that data.
*/

/**
 * Making an API Calls from React
 * => handleData fetches data from a fake API endpoint using fakeFetch.
 * => The function first tries to fetch the data using a try-catch block.
 *    If the data is successfully fetched, then the employee data is 
 *    logged in the console.
 * => If there is an error, the error message is caught in the 'catch'
 *    block.
*/

/**
 * API Call on button click - console
 * Q. Add a onClick() event on the button with the text 'get employee details'
 *    to call the handleData function. The handleData function should use
 *    the fakeFetch function to retrieve employee data from :
 *    https://example.com/api/employees. If the response status is 200,
 *    the function should log the employee data to the console.
*/

import { fakeFetch } from './fakeFetch';

function App() {
  
  /**
   * 1. Define the fn that will fetch the data:
  */
  const handleData = async () => {
    /**
     * 2. Use async-await to make an API call:
     *    - The async fn helps in handling the API call in a non-blocking way.
     *    - 'await' will pause the execution until we get the API response.
    */
    try {
      /**
       * 3. Make the API call and store the response in a variable
       *    - API responses usually come with a status code.
       *    - 200 status code means 'OK' and data was successfully fetched.
      */
      const response = await fakeFetch('https://example.com/api/employees');
      if(response.status === 200) {
        /**
         * 4. Log the employee data to the console
        */
        console.log({ data: response.data.employees });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div><h1>Employee List</h1></div>
      <button onClick={handleData}>get employee list</button>
    </div>
  )
}

export default App
