/**
 * API Call on Button Click - View with Filter
*/

/**
 * Q. Your task is to modify the component to display cart items with a
 *    price greater than or equal to 50.
*/

import { useState } from "react";
import { fakeFetch } from "./api/fakeFetch";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const handleData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/cart");
      if (response.status === 200) {
        console.log({ data: response.data.cart });
        setData(response.data.cart);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filterData = () => {
    const filteredData = data.filter((item) => item.price > 50);
    setData(filteredData);
  };

  return (
    <div className="App">
      <h1 className="app-header">tanaypratap's box</h1>
      <div className="App">
        <h1>My Cart</h1>
        <button onClick={handleData}> get cart details </button>
        <button onClick={filterData}>
          filter items w/ price greater than 50{" "}
        </button>
      </div>
      <ul>
        {data.map((item) => {
          return (
            <li key={item.name}>
              <h3>{item.name}</h3>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App
