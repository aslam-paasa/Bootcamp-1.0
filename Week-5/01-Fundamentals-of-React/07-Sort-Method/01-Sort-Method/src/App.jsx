import './App.css'

/**
 * Q. .Sort Method:
 * => arr.sort([compareFunction])
 * => Sort Numbers in ascending order.
 */

function App() {
  const numbers = [5, 3, 8, 1, 10];

  // Sorting numbers in ascending order
  // Output: [1, 3, 5, 8, 10]
  const sortedNum = numbers.sort((a, b) => b - a);
  
  return (
    <div className="App">
      <h1>Sorting Method</h1>
      <p>Sorted Numbers: {sortedNum}</p>
    </div>
  );
}

export default App
