/**
 * Machine Coding: Like Button
 * - The Like Button is a small yet powerful UI element commonly used in
 *   social media platforms and interactive applications.
 * - Building this component involves managing state efficiently while
 *   simulating real-world scenarios like API calls.
 * - It requires toggling between liked and unliked states, handling
 *   asynchronous API requests, and ensuring a smooth user experience with
 *   loading indicators and error handling.
*/

/**
 * Problem Statement:
 * We need to create a like button with the following features:
 * 1. Toggle between liked and unliked states on button click.
 * 2. Simulate API calls to send the like/unlike action.
 * 3. Show a loading spinner during the API request.
 * 4. Display error messages if the API call fails. 
 * 5. Use modular components for a clean and reusable design. 
*/

/**
 * Step-1: Setting Up the Main Component
 * The App component manages the application's state and handles the API
 * call logic for the like button. 
*/

import { useState } from 'react'
import './App.css'
import Button from './Button'

function App() {
  /**
   * 1. Tracks Loading State
   * 2. Tracks API errors
   * 3. Tracks whether the button is liked
  */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  /**
   * 2. Handles the click event, including API calls and state updates
  */

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1/comments",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.status === 200) {
        setLiked(!liked); // Toggle liked state if API call successful
        setError(null); // Clear any existing errors
      } else {
        const res = await response.json();
        setError(res.message); // Set error message if API call fails
        setLiked(false);
      }
    }

    catch (error) {
      setError("An unexpected error occurred" + error); // Handle unexpected errors
      setLiked(false);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  /**
   * Render the Button component and pass required props
  */
  return (
    <div className='App'>
      <Button
        onDoubleClick={handleClick}
        liked={liked}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default App


/**
 * Breaking Down the Logic:
 * 1. State Management:
 *    - loading tracks if the API call is in progress and displays a spinner
 *      when true.
 *    - error stores any error messages from the API call and displays them
 *      below the button. 
 *    - liked toggles between true and false to track the like/unlike state. 
 * 
 * 2. API Call:
 *    - The fetch function simulation a POST request to like or unlike the
 *      button. 
 *    - The request includes an action field ("like" or "unlike") based on 
 *      the current state. 
 * 
 * 3. Error Handling:
 *    - If the API call fails, the error state is updated with the error 
 *      message, and the UI reflects the failure.
 * 
 * 4. Toggle Logic:
 *    - When the API call is successful, the liked state toggles between true
 *      and false, updating the button's appearance and feedback. 
*/


/**
 * Key Takeaways:
 * 1. State Management:
 *    - The Project shows how states like loading, error, and liked can be
 *      used to handle dynamic interactions in a clean and effective way.
 * 
 * 2. API Integration:
 *    - It demonstrates how the frontend communicates wuth a server using
 *      POST requests and handles responses or errors gracefully.
 * 
 * 3. Modular Design:
 *    - Encapsulating the button's logic in the Buttom component makes the
 *      code easier to maintain and reuse.
 * 
 * 4. Feedback Loop:
 *    - Provides immediate user feedback with a loading spinner, success 
 *      message, and error handling, improving the overall user experience.
 * 
 * 5. Conditional Rendering:
 *    - Updates the UI dynamically based on the state, ensuring the interface
 *      feels smooth and responsive.
*/


/**
 * Interview Tips:
 * 1. State Management: 
 *    - Be ready to explain how separating states like loading, error, and
 *      liked helps in creating predictable and clean behavior.
 * 
 * 2. Error Handling:
 *    - Highlight how the app handles success, failres, and unexpected errors
 *      to ensure a reliable user experience.
 * 
 * 3. Modular Design:
 *    - Discuss the benefits of reusable components like Button, which make
 *      the codebase easier to extend and maintain.
 * 
 * 4. API Integration:
 *    - Explain how the app uses API calls to simulate real-world interactions
 *      and how it handles asynchronous operations.
*/