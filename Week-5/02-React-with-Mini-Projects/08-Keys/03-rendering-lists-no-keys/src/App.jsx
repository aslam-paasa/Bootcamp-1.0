/**
 * Challenge:
 * Given an array of friends, create a list of item for every friend inside
 * of our unordered list.
 * 
 * Note: The items in our friends array don't have their own unique keys.
 *       You need to improvise.
 * 
 * Task:
 * 1. Render an unordered list with all of the friends
 * 2. Each list item should display the correct name
 * 3. Each list item should be given a unique key
 * 
 * Hint:
 * 1. The Array.map() method in JavaScript has a callback that receives 
 *    3-arguments: 
 *       a. current element in the list
 *       b. index
 *       c. a reference to the original array
 *    If you don't have a unique key available in your data, using the index
 *    as the key works - assuming you're not mutating the array.
*/

import './App.css'

function List() {
  const friends = ["Ben", "Lynn", "Alex"];

  return (
    <ul>
      {friends.map((friend, index) => {
        return <li key={index}>{friend}</li>;
      })}
    </ul>
  );
}

function App() {

  return (
    <div>
      <List />
    </div>
  )
}

export default App
