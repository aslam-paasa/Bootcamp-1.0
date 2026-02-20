
/**
 * useEffect - successfully load data on UI
 * - In the useEffect hook, call the fetchData function to fetch data when
 *   the component mounts. Use an empty dependency array[] to ensure that
 *   the useEffect hook only runs once.
*/

/**
 * Q. In this challenge, you will use the useEffect and useState hooks to
 *    fetch data from an API using the fakeFetch function and display it 
 *    on the UI.
 * => Output:
 *    - 
 * 
 * Note: This is not how it's done in production, this is more about your
 * understanding on how to load data from the server.
*/

import { useState, useEffect } from "react";
import { fakeFetch } from "./api/fakeFetch";
import "./App.css";

function App() {

  /**
   * useState hook:
  */
  const [data, setData] = useState([]); // Step II

  /**
   * fetchData fn:
   * - This time inside the fetchData fn, we are also doing setData
   *   to update the data state.
  */
  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/wishlist");
      console.log(response.data.wishlist);
      setData(response.data.wishlist); // Step III
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * useEffect hook:
  */
  useEffect(() => {
    fetchData();     // Step-I
  }, []);

  return (
    <div className="App">
      <h1 className="app-header">Mohammads box</h1>
      <div className="App">
        <h1> Showcase Wishlist </h1>
      </div>
      {/* Step-IV:Load data on the UI */}
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
