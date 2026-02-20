/**
 * useEffect - success on view with filter
*/

/**
 * Q. Your task is to modify the component to display wishlist items with
 *    a price greater than or equal to 100 but with useEffect - onload.
*/

import { useState, useEffect } from "react";
import { fakeFetch } from "./api/fakeFetch";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/wishlist");
      console.log(response.data.wishlist);
      setData(response.data.wishlist);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterData = () => {
    const filteredData = data.filter((item) => item.price > 100);
    setData(filteredData);
  };

  return (
    <div className="App">
      <h1 className="app-header">tanaypratap's box</h1>
      <div className="App">
        <h1> Showcase Wishlist </h1>
      </div>
      <button onClick={filterData}>
        filter items w/ price greater than 100{" "}
      </button>
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
