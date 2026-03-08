/**
 * Challenge:
 * Using an 'if-statement', update the code to conditionally render the
 * correct component based on the value of isLactoseTolerant.
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

  if (isLactoseTolerant) {
    return <LactoseTolerant />;
  } 
  
  return <LactoseIntolerant />;
}

export default App
