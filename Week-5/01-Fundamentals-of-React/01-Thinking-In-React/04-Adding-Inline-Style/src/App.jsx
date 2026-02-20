/**
 * Q. Change the fontSize of "First Number", "Second Number" and
 *    "Sum" to 20px.
*/

/**
 * return - The return method in React is a way to return data from a
 * component.
*/

function SumCard() {
  return (
    <div className='App'>
      <h1 className='app-header' style={{ color: 'red' }}>Sum of two numbers</h1>
      <div className='app-body'>
        <p>First Number  : 5</p>
        <p>Second Number : 4</p>
        <p>Sum : 9</p>
      </div>
    </div>
  )
}


function App() {
  return (
    <SumCard />
  )
}

export default App
