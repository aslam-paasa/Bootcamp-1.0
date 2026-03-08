import { useState } from 'react'
import './App.css'

/**
 * Search on an Array:
 * Q. Given an array of objects, fruits, which have properties name, 
 *    color, and quantity. Create a React component that takes a fruit
 *    name as input from the user, then searches the fruits array for
 *    a matching fruit name. If a matching fruit is found, display its
 *    color and quantity. If not matching is found, display a message
 *    saying that the fruit was not found.
*/

const fruits = [
  { name: "Apple", color: "Red", quantity: 10 },
  { name: "Banana", color: "Yellow", quantity: 5 },
  { name: "Orange", color: "Orange", quantity: 3 },
  { name: "Grape", color: "Purple", quantity: 7 }
]

function App() {
  const [userInput, setUserInput] = useState('');
  const [fruitData, setFruitData] = useState(null);

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSearch = () => {
    const fruitData = fruits.find(fruit => fruit.name.toLowerCase() === userInput.toLowerCase());
    setFruitData(fruitData || null); // Update state with found fruit or null if not found
  };

  return (
    <div>
      <h1>Search Fruit</h1>
      <input onChange={handleInput} />
      <button onClick={handleSearch}>Search</button>
      {fruitData ? (
        <div>
          <p>Name: {fruitData.name}</p>
          <p>Color: {fruitData.color}</p>
          <p>Quantity: {fruitData.quantity}</p>
        </div>
        ) : (
          userInput && <p>"Fruit not found!"</p>
        )}
    </div>
  )
}

export default App
