/**
 * useEffect - loading state
 * Define an async function called fetchData that uses the fakeFetch to 
 * fetch function to fetch the product data from the API endpoint. Inside
 * the function, set the isLoading state variable to true before making the
 * API call.
 * 
 * If the call is successful, set the data state variable to the response
 * data and set the isLoading state variable to false. If the call fails,
 * log the error to the console.
*/

/**
 * Q. In addition the the previous challenge, you need to display a loading
 *    state while the data is being fetched.
*/

/**
 *
 * Step I: No data in the first render
 * Step IA: Create a state variable, initial value isLoading = true
 * Step II: After the first render happen, async await got triggered
 * data will come back
 * Step II A: isLoading to false
 * --> state of the data is changed
 * Step III: Then again, render will happen and we'll be able to see the data
 *
 *
 */

import { useState, useEffect } from "react";
import { fakeFetch } from "./api/fakeFetch";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Step II

  const fetchData = async () => {
    setIsLoading(true); // Step III A
    try {
      const response = await fakeFetch("https://example.com/api/wishlist");
      console.log(response.data.wishlist);
      setData(response.data.wishlist);
      setIsLoading(false); // Step III B
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();     // Step-I
  }, []);

  return (
    <div className="App">
      <h1 className="app-header">tanaypratap's box</h1>
      <div className="App">
        <h1> Showcase Wishlist </h1>
      </div>
      <p>{isLoading && "Loading..."}</p>
      {/* Step IV */}
      <ul>
        {data.map((prod) => {
          return (
            <li key={prod.name}>
              {prod.name}
              <br />
              Price: {prod.price}
              <br />
              Quantity: {prod.quantity}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App

