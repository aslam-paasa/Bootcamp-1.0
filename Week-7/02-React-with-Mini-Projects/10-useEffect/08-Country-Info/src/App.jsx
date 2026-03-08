/**
 * Challenge: Country Info
 * In this challenge, you'll be synchrinizing the result of fetching country
 * data froom an external API(the url below) with your component's state.
 * 
 * The JSX is finished, so all you need to do is fetch the data from the
 * following URL and update the component's state with the result.
 * 
 * const url = `https://restcountries.com/v2/alpha/${countryCode}`;
 * 
 * You'll update 'data' with the exact JSON response returned from the
 * given url.
 * 
 * Tasks:
 * 1. Display a loading state when fetching data
 * 2. Fetch new data based on  the user's input
 * 3. Render an error message if fetch fails
 * 
 * Hint:
 * 1. Since we'll need to preserve all the values in our component across
 *    renders and update the UI when they change, we'll want to store them
 *    as React state using useState.
 * 
 *    const [countryCode, setCountryCode] = useState("AU");
 *    const [data, setData] = useState(null);
 *    const [isLoading, setIsLoading] = useState(true);
 *    const [error, setError] = useState(null);
 * 
 * 2. Since our effect will depend on countryCode, and we're synchronizing
 *    the result of fetching our external data with our component's
 *    countryCode state, we'll include that in the dependency array.
 * 
 *    useEffect(() => {
 *       ...
 *    }, [countryCode]);
 * 
 * 3. To fetch our data, we'll create an async function inside the effect
 *    that sets 'loading' to 'true', 'fetch'es the data, then updates 'error',
 *    'data' and 'loading' depending on the result of the 'fetch'.
 * 
 *    useEffect(() => {
 *       const fetchCountry = async () => {
 *       const url = `https://restcountries.com/v2/alpha/${countryCode}`;
 *       setIsLoading(true);
 * 
 *       try {
 *         const response = await fetch(url);
 *         const data = await response.json();
 *
 *         setData(data);
 *         setError(null)
 *         setIsLoading(false);
 *     } catch (error) {
 *       setData(null);
 *       setError(error);
 *       setIsLoading(false);
 *     }
 *   }
 *
 *   fetchCountry();
 * }, [countryCode]);   
 * 
 * 4. Don't forget to 'ignore' any responses that come from stale requests.
 * 
 *    useEffect(() => {
 *       let ignore = false
 *
 *       const fetchCountry = async () => {
 *       const url = `https://restcountries.com/v2/alpha/${countryCode}`;
 *       setIsLoading(true);
 *
 *       try {
 *         const response = await fetch(url);
 *         const data = await response.json();
 *
 *         if (ignore === false) {
 *           setData(data);
 *           setError(null)
 *           setIsLoading(false);
 *         }
 *     } catch (error) {
 *       if (ignore === false) {
 *         setData(null);
 *         setError(error);
 *         setIsLoading(false);
 *       }
 *     }
 *   }
 *
 *   fetchCountry();
 *
 *   return () => {
 *     ignore = true
 *   }
 * }, [countryCode]);
 * 
 * 
 * 5. At this point, all that's left is to update countryCode whenever
 *    handleChange is invoked.
 * 
 *    const handleChange = (e) => {
 *      setCountryCode(e.target.value);
 *    }
*/

import './App.css'
import { useState, useEffect } from 'react'

function CountryInfo() {
  const [countryCode, setCountryCode] = useState("AU");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false

    const fetchCountry = async () => {
      const url = `https://restcountries.com/v2/alpha/${countryCode}`;
      setIsLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (ignore === false) {
          setData(data);
          setError(null)
          setIsLoading(false);
        }
      } catch (error) {
        if (ignore === false) {
          setData(null);
          setError(error);
          setIsLoading(false);
        }
      }
    }

    fetchCountry();

    return () => {
      ignore = true
    }
  }, [countryCode]);

  const handleChange = (e) => {
    setCountryCode(e.target.value);
  };

  return (
    <section>
      <header>
        <h1>Country Info:</h1>

        <label htmlFor="country">Select a country:</label>
        <div>
          <select id="country" value={countryCode} onChange={handleChange}>
            <option value="AU">Australia</option>
            <option value="CA">Canada</option>
            <option value="CN">China</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="IN">India</option>
            <option value="JP">Japan</option>
            <option value="MX">Mexico</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States of America</option>
          </select>
          {isLoading && <span>Loading...</span>}
          {error && <span>{error.message}</span>}
        </div>
      </header>

      {data && (
        <article>
          <h2>{data.name}</h2>
          <table>
            <tbody>
              <tr>
                <td>Capital:</td>
                <td>{data.capital}</td>
              </tr>
              <tr>
                <td>Region:</td>
                <td>{data.region}</td>
              </tr>
              <tr>
                <td>Population:</td>
                <td>{data.population}</td>
              </tr>
              <tr>
                <td>Area:</td>
                <td>{data.area}</td>
              </tr>
            </tbody>
          </table>
        </article>
      )}
    </section>
  );
}

function App() {
  return (
    <CountryInfo />
  )
}

  export default App
