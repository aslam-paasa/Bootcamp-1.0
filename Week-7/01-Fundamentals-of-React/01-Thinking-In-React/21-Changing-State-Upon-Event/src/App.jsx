/**
 * Q. Write a React component to list out all fruits name and their
 *    price from the fruits array in the format {name} : INR {price}.
 *    On click of a button 'Highlight Budget Fruits', display the 
 *    fruits in red color, for which the price is less than INR 50.
*/

import { useState } from "react";

const fruits = [
  { id: 1, name: "Apple", price: 200 },
  { id: 2, name: "Orange", price: 110 },
  { id: 3, name: "Grapes", price: 50 },
  { id: 4, name: "Pineapple", price: 75 }
];

function App() {
  const [ shouldHighlight, setShouldHighlight] = useState(false);

  const highlightCostlyFruits = () => {
    setShouldHighlight(true);
  }

  return (
    <div>
      {fruits.map(({ id, name, price }) => (
        <p key={id} style={{ color: shouldHighlight && price > 100 ? "red" : "black"}}> {name} : INR {price}</p>
      ))}

      <button onClick={highlightCostlyFruits}> Highlight costly fruits </button>
      <button onClick={() => setShouldHighlight(false)}> Reset </button>
      <button onClick={() => setShouldHighlight(!shouldHighlight)}> Toggle </button>
    </div>

    
  )
}

export default App
