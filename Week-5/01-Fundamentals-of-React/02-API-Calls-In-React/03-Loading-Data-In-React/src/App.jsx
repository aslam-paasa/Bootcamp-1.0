/**
 * API Call on button click - view without highlight
 * Q. Click on the "highlight transactions > 1000" button should highlight
 *    all transactions with a amount greater than 1000.
*/

import { useState } from 'react'
import { fakeFetch } from './fakeFetch'


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
    <div>
      <h1>My Transactions</h1>
      <button onClick={handleData}>get transaction details</button>
      <button onClick={handleHighlight}>highlight transactions greater than 1000</button>

      <ul>{transactions.map((items) => {
        return ( 
          <li key={items.id} style={{border: highlight && items.amount > 1000 ? "4px solid orange" : "", padding: "4px"}}>
            <h3>Amount: {items.amount}</h3>
            <p>Date: {items.date}</p>
            <p>Gateway: {items.gateway}</p>
          </li>
        )
      })}</ul>
    </div>
  )
}

export default App
