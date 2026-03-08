/**
 * Single Data:
 * Q. Write a React component to display two numbers and the sum of
 *    those two numbers. 
 *    (a) Calculate the sum dynamically.
 *    (b) Take the numbers as props.
*/

/**
 * 2. Reading Values:
 * => All the data are stored inside a props object and then we pass
 *    that props object to the fn.
 * => {props} : This property of object inside a curly braces is known
 *     as Object Short-hand(ES6+).
 * => And now by destructuring, we can take these values out from the
 *    props object.
*/


function SumCard({ firstNumber, secondNumber }) {
  return (
    <div className='App'>
      <h1 className='app-header'>Sum of two numbers</h1>
      <div className='app-body'>
        <p>First Number  : { firstNumber }</p>
        <p>Second Number : { secondNumber }</p>
        <p>Sum : { firstNumber + secondNumber }</p>
      </div>
    </div>
  )
}

/**
 * 1. Passing values to the fn:
 * => SumCard() is a fn, and this is how we can pass the value to it.
 *    And this is called Props. So, props are nothing but passing values
 *    in the fn using JSX Syntax.
*/
function App() {
  return (
    <SumCard firstNumber={4} secondNumber={5} />
  )
}

export default App
