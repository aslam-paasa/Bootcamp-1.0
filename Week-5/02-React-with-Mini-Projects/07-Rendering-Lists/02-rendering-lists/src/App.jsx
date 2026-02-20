/**
 * Challenge:
 * Given an array of friends, update our 'ul' to include a 'li' for every
 * friend. The list item should display all the friend's names.
 * 
 * Task:
 * 1. Render an unordered list with all of the friends
 * 2. Each list item should display the correct name
 * 3. Each list item should be given a unique key
 * 
 * Hint: 
 * 1. Array.map method in JavaScript is useful for transmforming lists of
 *    data. When used in JSX, we can transform a list of data into a list
 *    of React elements.
 * 2. When rendering a list in JSX, make sure to give each item a unique key
 *    so that React can keep track of which items it needs to update.
*/

import './App.css'

function List() {
  const friends = [
    { id: 893, name: "Lynn" },
    { id: 871, name: "Alex" },
    { id: 982, name: "Ben" },
    { id: 61, name: "Mikenzi" }
  ];

  return <ul>
    {friends.map(friend => (
      <li key={friend.id}>{friend.name}</li>
    ))}
  </ul>;
}

function App() {

  return (
    <div>
      <List />
    </div>
  )
}

export default App
