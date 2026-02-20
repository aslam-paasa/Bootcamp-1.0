
/**
 * useEffect - successfully load data on console
 * - Use useEffect to call the fetchData function when the component first
 *   renders.
*/

/**
 * Q. In this challenge, you need to load product data after render.
 *    [useEffect & fakeFetch]
 * => Output:
 *    - App component rendered
 *    - before render... 
 *    - Mohammad
 *    - {data: Array(3)}
*/


import './App.css'
import { useEffect } from 'react'
import { fakeFetch } from './api/fakeFetch'

function App() {

  console.log("App component rendered");  // 1

  /**
   * getData fn:
  */
  const getData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/wishlist");
      if (response.status === 200) {
        console.log({ data: response.data.wishlist });
      }
    } catch (e) {
      console.error(e);
    }
  };



  useEffect(() => {
    console.log("Mohammad");
    getData(); // This is only new code we have added
  }, []);


  console.log("before render...");   // 2

  return (
    <div className="App">
      <h1 className="app-header">Mohammad's box</h1>
      <div className="App">
        <h1> Showcase Wishlist </h1>
      </div>
    </div>
  );
}

export default App
