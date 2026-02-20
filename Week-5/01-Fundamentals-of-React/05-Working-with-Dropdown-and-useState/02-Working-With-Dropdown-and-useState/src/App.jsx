import { useState } from 'react'
import './App.css'

/**
 * Q. Create a React component, to display all the items in the fruits
 *    array on DOM. And then create a dropdown select to filter fruits
 *    by category and display on the DOM.
*/

const fruits = [
  { id: 1, category: "Apple", name: "Apple Shimla" },
  { id: 2, category: "Apple", name: "Kashmiri Apple" },
  { id: 3, category: "Apple", name: "Ambri Apple" },
  { id: 4, category: "Banana", name: "Banana Robusta" },
  { id: 5, category: "Banana", name: "Raw Banana Green" },
  { id: 6, category: "Orange", name: "Orange Indiana" },
  { id: 7, category: "Orange", name: "Orange USA" },
  { id: 8, category: "Grapes", name: "Grapes Black" },
  { id: 9, category: "Grapes", name: "Grapes Seedless" },
  { id: 10, category: "Mango", name: "Badami" },
  { id: 11, category: "Mango", name: "Alphonso" },
  { id: 12, category: "Mango", name: "Ratnagiri" },
]

function App() {
  const[data, setData] = useState(fruits);
  const changeHandler = (event) => {
    event.target.value === "All" ? setData(fruits) : setData(fruits.filter(({ category }) => category === event.target.value));
  }

  return (
    <div>
      <select onChange={changeHandler}>
        <option value="All">All</option>
        <option value="Apple">Apple</option>
        <option value="Banana">Banana</option>
        <option value="Orange">Orange</option>
        <option value="Grapes">Grapes</option>
        <option value="Mango">Mango</option>
      </select>
      <ul>
        {data.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
