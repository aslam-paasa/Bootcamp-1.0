import './App.css'

/**
 * Understranding how to write your own components and then rendering on DOM:
 * => Components let you split the UI into independent, reusable pieces,
 *    and think about each piece in isolation.
 * => Always start component names with a capital letter. 
 * => React treats components starting with lowercase letters as DOM tags. 
 * => For example, <div/> represents an HTML div tag, but <Sum /> represents
 *    a component.
*/

/**
 * Q. Write a React component to display two numbers and the sum of those
 *    two numbers.
*/

function SumCard() {
  return (
    <div className='App'>
      <h1 className='app-header'>Sum of two numbers</h1>
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
