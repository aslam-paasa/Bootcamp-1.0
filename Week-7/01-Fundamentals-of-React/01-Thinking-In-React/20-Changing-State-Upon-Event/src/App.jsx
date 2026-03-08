/**
 * Q. Implement a reset button which sets the value to 0.
*/

import { useState } from 'react';

function App() {
  const [ count, setCount ] = useState(0);

  const handleClickMinus = () => {
    setCount((count) => count - 1);
  }

  const handleClickPlus = () => {
    setCount((count) => count + 1);
  }

  const handleClickReset = () => {
    setCount(0);
  }

  return (
    <div style={{ textAlign: 'center'}}>
      <p style={{ color: count > 10 ? "red" : "black" }}>{count}</p>
      <button onClick={handleClickMinus}> - </button>
      <button onClick={handleClickPlus}> + </button>
      <button onClick={handleClickReset}>reset</button>
    </div>
  )
}

export default App
