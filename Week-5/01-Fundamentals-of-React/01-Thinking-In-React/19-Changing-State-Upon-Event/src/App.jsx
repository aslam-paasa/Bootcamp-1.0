/**
 * Control the styling based on variable:
 * Q. Change the color of count to red, when it is more than 10.
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
  return (
    <div style={{ textAlign: 'center'}}>
      <button onClick={handleClickMinus}> - </button>
      <p style={{ color: count > 10 ? "red" : "black" }}>{count}</p>
      <button onClick={handleClickPlus}> + </button>
    </div>
  )
}

export default App
