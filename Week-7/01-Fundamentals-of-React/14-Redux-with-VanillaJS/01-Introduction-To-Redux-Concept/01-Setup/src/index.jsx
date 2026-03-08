/**
 * Reducer:
 * a. Pure Function
 * b. Given a state, an action will give you a new state
 *    { currentCount: 1}, { type: 'increment' } => { currentCount: 2 }
 *    { currentCount: 1}, { type: 'decrement' } => { currentCount: 0 }
 *    { currentCount: 1}, { type: 'reset' } => { currentCount: 0 }
 * c. Store: It says, whatever is the new state, I am going to have that
 *    until a new action comes, and it has some methods:
 * 
 *    - UI dispatches action (event)  - New action by user
 *    - Action goes to reducer        - State updated
 *    - Reducer goes to store         - Store updates the state
 *    - Store is subscribed by the UI - Updates the UI
 * 
 *    
 *                                        +--------+
 *      +-------------------------------->| Action |
 *      |          dispatch               +--------+
 *      |                                     |
 *    +----+                                  V
 *    | UI |                              +--------+
 *    +----+                              | Reducer|
 *      |                                 +--------+
 *      |                                     |
 *      |                                     V
 *      |           subscribe             +--------+
 *      + <-------------------------------| Store  |
 *                                        +--------+
*/


/**
 * Challenge: Setup Redux
 * In the 'index.html' file:
 * a. Get a Cookie Button: Add a button with the text 'Get a Cookie' with 
 *    id 'add'
 * b. Give away a Cookie Button: Add a button with the text 'Give Away a
 *    Cookie' with the id 'remove'. 
 * c. Display Cookie Count: Add a h1 tag with id 'cookie-count'
*/



function App() {

  return (
    <div>
      <button id="add">Get a Cookie</button>
      <button id="remove">Give Away a Cookie</button>

      <h1>🍪 <span id="cookie-count"></span></h1>
    </div>
  )
}

export default App
