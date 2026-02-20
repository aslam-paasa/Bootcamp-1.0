/**
 * Challenge: Localized Primes
 * Complete the app so that the user can change their locale as well
 * as iterate through every prime number. Take special care to only
 * re-calculate the prime number when the user clicks NEXT PRIME.
 * 
 * Tasks:
 * 1. Increment the prime number count when the button is clicked
 * 2. Change the language when the select option is changed
 * 3. Memoize the nthprime so that it's only re-calculated when the
 *    count changes.
 * 
 * Hint:
 * 1. In order to preserve count between renders and trigger a re-render
 *    of the component when it changes, it needs to be created with
 *    useState.
 * 
 *    const [count, setCount] = React.useState(1)
 * 
 *    And now we can update handleClick to increment count:
 * 
 *    const handleClick = () => setCount(count + 1)
 * 
 * 2. In order to preserve locale between renders and trigger a re-render
 *    of the component when it changes, it needs to be created with
 *    useState. By looking at the value props of our option elements in
 *    the JSX, we can see that locale can be either en-US or es-ES.
 *    We'll initialize it to en-US.
 * 
 *    const[locale, setLocale] = React.useState('en-US')
 * 
 *    And now whenever the user selects a new locale via the dropdown
 *    list and handleLocaleChange is invoked, we'll update locale to
 *    whatever options was selected (e.target.value).
 * 
 *    const handleLocalChange = (e) => setLocale(e.target.value)
 * 
 * 3. In order to memoize nthprime so it's only ever re-calculated when
 *    count changes, we'll use React's useMemo hook.
 * 
 *    const nthprime = React.useMemo(() => {
 *      return calculatePrime(count)
 *    }, [count])
 *
 */


import React, { useState } from "react";

// Simple brute-force function to find the Nth prime number
const calculatePrime = (n) => {
  let num = 2; // Start checking from 2 (first prime number)
  let count = 0;

  while (true) {
    let isPrime = true;
    
    // Check if num is prime
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        isPrime = false;
        break; // Not prime, exit loop
      }
    }

    if (isPrime) {
      count++; // Found a prime
      if (count === n) return num; // Return the Nth prime
    }

    num++; // Move to the next number
  }
};

// Simple translations
const translations = {
  "en-US": {
    nextPrime: "Next Prime",
    nthPrime: (count, prime) => `The ${count}th prime number is ${prime}.`,
  },
  "es-ES": {
    nextPrime: "Próximo Primo",
    nthPrime: (count, prime) => `El ${count}° número primo es ${prime}.`,
  },
};


// Function to format number based on locale
const formatNumberToString = (num, locale) => {
  return new Intl.NumberFormat(locale).format(num);
};


const App = () => {
  const [count, setCount] = useState(1);
  const [locale, setLocale] = useState("en-US");

  const handleLocaleChange = (e) => {
    setLocale(e.target.value);
  };

  const handleClick = () => {
    setCount(count + 1);
  };

  const nthPrime = React.useMemo(() => {
    return calculatePrime(count);
  }, [count]); // Calculate every time (brute force)

  return (
    <div>
      <header>
        <select value={locale} onChange={handleLocaleChange}>
          <option value="en-US">English (US)</option>
          <option value="es-ES">Español (ES)</option>
        </select>

        <button className="primary" onClick={handleClick}>
          {translations[locale].nextPrime}
        </button>
      </header>

      <p>
        {translations[locale].nthPrime(
          formatNumberToString(count, locale),
          nthPrime
        )}
      </p>
    </div>
  );
};

export default App;
