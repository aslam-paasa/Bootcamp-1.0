/**
 * Adding Inline Style:
 * The syntax for adding styles in React is slightly different from
 * basic HTML/CSS. 
 * => In React, style is given as object:
 *    const headerStyle = { color: "green" };
 * => And if we want to use a variable then we have to wrap it inside
 *    curly brackets.
*/

/**
 * Q. Change the color of heading 'Sum of Numbers' to green.
*/

const headerStyle = { color: "green" };

function SumCard() {
  return (
    <div className='App'>
      <h1 className='app-header' style={headerStyle}>Sum of two numbers</h1>
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
