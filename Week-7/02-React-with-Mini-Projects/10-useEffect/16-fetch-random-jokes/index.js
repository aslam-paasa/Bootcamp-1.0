/**
 * useEffect + Fetch API + Error Handling
 * API: https://official-joke-api.appspot.com/random_joke
 */

import { useEffect, useState } from "react";

function App() {

  /**
   * Step 1: State variables
   */
  const [joke, setJoke] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);


  /**
   * Step 2: Fetch joke function
   */
  const fetchJoke = async () => {

    try {

      /* Start loading and reset error */
      setLoading(true);
      setError(false);

      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      /* Handle HTTP errors */
      if (!response.ok) {
        throw new Error("Failed to fetch joke");
      }

      const data = await response.json();

      /* Set joke */
      setJoke(`${data.setup} ... ${data.punchline}`);

    }
    catch (err) {
      setError(true);
    }
    finally {
      setLoading(false);
    }

  };


  /**
   * Step 3: Fetch joke on component mount
   */
  useEffect(() => {

    fetchJoke();

  }, []);


  /**
   * Step 4: Render UI
   */
  return (
    <div>

      <h1>Random Joke Generator</h1>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Error state */}
      {!loading && error && (
        <p>Error: Something went wrong</p>
      )}

      {/* Success state */}
      {!loading && !error && (
        <p>Today's joke is: {joke}</p>
      )}

      {/* Fetch new joke */}
      <button onClick={fetchJoke}>
        New Joke
      </button>

    </div>
  );

}

export default App;
