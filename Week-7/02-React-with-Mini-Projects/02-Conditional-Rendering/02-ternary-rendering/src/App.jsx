/**
 * Challenge:
 * Given the solution code to the previous challenge, refactor this code
 * to use a ternary operator to conditionally render the UI rather than
 * an if statement.
 * 
 * Task:
 * 1. If the user is lactose intolerant, render the LactoseIntolerant
 *    component
 * 2. If the user is lactose tolerant, render the LactoseTolerant
*/

import './App.css'

function LactoseIntolerant() {
  return (
    <h1>
      <span role="img" aria-label="broccoli and strawberry">
        🥦🍓
      </span>
    </h1>
  );
}

function LactoseTolerant() {
  return (
    <h1>
      <span role="img" aria-label="milk and cheese">
        🥛🧀
      </span>
    </h1>
  );
}

function getIsLactoseTolerant() {
  return false;
}

function App() {
  const isLactoseTolerant = getIsLactoseTolerant();

  return isLactoseTolerant ? <LactoseTolerant /> : <LactoseIntolerant />;
}

export default App
