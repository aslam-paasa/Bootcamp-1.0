/**
 * Frontend:
 * 1. We know how to create UI Components using libraries
 * 2. We know how to store data in state
 * 3. We know how to display data from state
 * 3. But Server se state tak data laa k rakhe kaise?
 *    > Server ko request bhejne wala maamla thoda difficult hota hai.
 *    > For that we will use 'axios' library: npm i axios
 *    > +----------+         +---------+
 *      | Frontend |-------->| Backend |
 *      +----------+  axios  +---------+
*/

/**
 * Create a folder: api
 * > This folder will be used in testing and talk to all the backend.
 * > Not a single component will talk to the backend.
 *   1. axios.js
 *   2. authService.js
 *   3. constants.js
*/

import React from 'react'

const App = () => {
  return (
    <div>
      <p>Home Page</p>
    </div>
  )
}

export default App
