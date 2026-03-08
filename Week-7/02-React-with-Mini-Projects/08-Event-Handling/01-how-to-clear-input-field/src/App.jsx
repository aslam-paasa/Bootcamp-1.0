/**
 * Understanding This Input Element
 * --------------------------------
 * <input type="text" value={firstName} />
 *
 * This input field is a "controlled input" in React.
 * That means the value inside the input is controlled by React state,
 * not by the browser itself.
 *
 * React state becomes the single source of truth.
 */


/**
 * Step 1: Create State for the Input
 * ----------------------------------
 * const [firstName, setFirstName] = useState("");
 *
 * firstName
 * → stores the current value of the input field.
 *
 * setFirstName
 * → updates the value stored in the state.
 *
 * Initial value = ""
 * So when the component first renders, the input will be empty.
 */


/**
 * Step 2: Connect Input to React State
 * ------------------------------------
 * <input type="text" value={firstName} />
 *
 * value={firstName}
 * means the value displayed inside the input always comes from
 * the "firstName" state.
 *
 * Example:
 *
 * firstName = "Ali"
 *
 * React renders:
 * <input value="Ali" />
 *
 * So the input field displays "Ali".
 */


/**
 * Step 3: Update State When User Types
 * ------------------------------------
 * onChange={(e) => setFirstName(e.target.value)}
 *
 * onChange is triggered whenever the user types inside the input.
 *
 * e.target.value
 * → contains the latest text typed by the user.
 *
 * setFirstName(e.target.value)
 * → updates the state with the new value.
 */


/**
 * Step 4: What Happens When the User Types
 * ----------------------------------------
 *
 * Example: User types "A"
 *
 * Flow:
 *
 * User presses key
 *        ↓
 * Browser fires change/input event
 *        ↓
 * React runs onChange handler
 *        ↓
 * e.target.value = "A"
 *        ↓
 * setFirstName("A")
 *        ↓
 * React updates state
 *        ↓
 * Component re-renders
 *        ↓
 * <input value="A" />
 *
 * The input now shows "A".
 */


/**
 * Step 5: Why This is Called a Controlled Input
 * ---------------------------------------------
 * In normal HTML:
 * > Browser controls the input value.
 *
 * In React:
 * > React state controls the input value.
 *
 * This allows React to:
 * - validate inputs
 * - control formatting
 * - clear fields easily
 * - sync UI with application state
 */


/**
 * Step 6: Understanding Form Events
 * ---------------------------------
 * HTML forms generate events when users interact with them.
 *
 * Common form events:
 *
 * onChange → triggered when input value changes
 * onSubmit → triggered when form is submitted
 * onFocus  → when input gets focus
 * onBlur   → when input loses focus
 *
 * React listens to these events using its event system
 * called "Synthetic Events".
 */


/**
 * Step 7: Form Submission Event
 * -----------------------------
 *
 * <form onSubmit={handleSubmit}>
 *
 * When the user clicks the submit button,
 * the form triggers the "submit" event.
 *
 * Flow:
 *
 * User clicks submit button
 *        ↓
 * Browser creates submit event
 *        ↓
 * React captures the event
 *        ↓
 * handleSubmit function runs
 */


/**
 * Step 8: Default Browser Behavior
 * --------------------------------
 * In normal HTML forms, submitting a form causes
 * the browser to refresh the page.
 *
 * Submit form
 *      ↓
 * Page reloads
 *      ↓
 * All React state resets
 *
 * This is not desirable in React applications.
 */


/**
 * Step 9: Prevent Page Refresh
 * ----------------------------
 * - e.preventDefault();
 * - This stops the browser's default behavior.
 * - Now the page does NOT reload and React keeps all state values.
 */


/**
 * Step 10: Full Form Event Flow
 * -----------------------------
 * > User types in input
 * > onChange event fires
 * > React updates state
 * > Input value updates
 * > User clicks submit
 * > onSubmit event fires
 * > handleSubmit runs
 * > preventDefault() stops page refresh
 * > React processes the data
 * > State can be updated (e.g., clearing the input)
 */

import { useState } from 'react'
import './App.css'

function App() {
  const[firstName, setFirstName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop page refresh
    if (firstName) {
      console.log(firstName);
      setFirstName(""); // Clear input
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">Name </label>
        <input
          type="text"
          value={firstName} // Connect to state
          onChange={(e) => setFirstName(e.target.value)}
        />
        <button type="submit">add person</button>
      </form>
    </>
  );
}

export default App
