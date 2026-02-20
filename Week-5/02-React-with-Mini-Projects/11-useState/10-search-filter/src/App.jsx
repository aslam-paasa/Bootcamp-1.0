/**
 * Challenge: Search and Filter
 * In this challenge, you're given an app that uses useEffect as a way to
 * react to changes in the search item. That's not ideal - useEffect should
 * be used for synchronizing, not for reacting to changes in a value.
 * Refactor the app to get rid of useEffect but keep the same functionality.
 * 
 * Tasks:
 * 1. Render the list of items
 * 2. Filter the list of items based on search term
 * 3. Don't use useEffect
 * 
 * Hint:
 * 1. filteredItems doesn't need to be a piece of state. Instead, it can be
 *    derived from the search term. 
 * 
 * 2. Deriving a value from another value isn't a side effect, therefore,
 *    you can do that directly in the component without needing useEffect.
*/

import './App.css'
import { useState } from 'react';
const items = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Fig",
  "Grape",
  "Honeydew",
  "Lemon",
  "Mango",
  "Nectarine",
  "Orange",
  "Papaya",
  "Raspberry",
  "Strawberry",
  "Watermelon"
];

function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Search Filter</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {

  return (
    <div>
      <SearchFilter />
    </div>
  )
}

export default App
