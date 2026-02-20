/**
 * useEffect - Error State
 * Use a try-catch block to catch any errors and set the 'isError' state to
 * true if there is an error. Set the data to the product data from the
 * response and set the isLoading state to false. Finally, set the isLoading
 * state to false in a finally block.
*/

/**
 * Q. In this challenge, you will need to fetch data from an API and display
 *    it on the UI. You will need to show a loading state while the data is
 *    being fetched and an error message if the request fails.
*/

import { useState, useEffect } from "react";
import { fakeFetch } from "./api/fakeFetch";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);     // New piece of code

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fakeFetch("https://example.com/api/wishlists");
      console.log(response.data.wishlist);
      setData(response.data.wishlist);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);       // New piece of code
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 className="app-header">tanaypratap's box</h1>
      <div className="App">
        <h1> Showcase Wishlist </h1>
      </div>
      <p>{isLoading && "Loading..."}</p>
      <p>{isError && "Error"}</p>

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
