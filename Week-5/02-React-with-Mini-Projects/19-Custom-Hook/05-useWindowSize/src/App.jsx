/**
 * Question 5:
 * Build a Custom Hook to track and update a window dimensionswith appropriate
 * functionalities.
 * 
 * Window Management:
 * 1. Get window width and height
 * 2. Track window resize events
 * 3. Provide window dimensions as state
*/

import useWindowSize from "./hooks/useWindowSize";

const App = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      <h1>Window Size</h1>
      <p>Width: {width}</p>
      <p>Height: {height}</p>
    </div>
  )
}

export default App
