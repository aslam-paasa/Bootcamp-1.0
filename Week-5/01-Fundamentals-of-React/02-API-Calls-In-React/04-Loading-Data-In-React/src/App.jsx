import { fakeFetch } from "./api/fakeFetch";
import { useState } from "react";
import './App.css'

/**
 * API Call on button click - view with highlight
 * Q. Click on the "highlight transactions > 1000" button should 
 *    highlight all transactions with a amount greater than 1000.
*/

function App() {
  const [transactions, setTransactions] = useState([]);
  const [highlight, setHighlight] = useState(false);

  const handleData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/transactions");
      if (response.status === 200) {
        console.log({ data: response.data.transactions });
        setTransactions(response.data.transactions);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleHighlight = () => {
    setHighlight(true);
  };

  return (
    <div className="App">
      <h1 className="app-header">tanaypratap's box</h1>
      <div className="App">
        <h1>My Transactions</h1>
      </div>
      <button onClick={handleData}>get transactions details</button>
      <button onClick={handleHighlight}>
        highlight transactions greater than 1000
      </button>
      <ul>
        {transactions.map((item) => {
          return (
            <li
              key={item.id}
              style={{
                border:
                  highlight && item.amount > 1000 ? "4px solid orange" : "",
                padding: "4px"
              }}
            >
              <h3>Amount: {item.amount}</h3>
              <p>Date: {item.date}</p>
              <p>Gateway: {item.gateway}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App
