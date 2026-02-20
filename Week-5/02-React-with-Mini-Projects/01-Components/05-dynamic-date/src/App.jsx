/**
 * Dynamic Date:
 * Using JavaScript, replace the static date with today's date(we made a 
 * helper function that returns today's date to help you out).
 * 
 * Task:
 * 1. Use the getTodaysDate function to render today's date
*/

import './App.css'

function getTodaysDate() {
  return new Date().toLocaleDateString();
}

function Today() {
  return <p>Today is {getTodaysDate()}</p>;
}

function App() {

  return (
    <div>
      <Today />
    </div>
  )
}

export default App
