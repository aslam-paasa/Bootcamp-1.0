/**
 * API Call on button Click - view
 * => handleData() fetches data from a fake API endpoint using fakeFetch.
 * => The function first tries to fetch the data using a try-catch block.
 *    If the data is successfully fetched, then the product is logged in
 *    the console and the state is updated with the product data and 
 *    displayed on the screen using a map. 
 * => If there's an error, then the error message is caught in the
 *    catch block.
*/

/**
 * Q. Add a onClick() event on the button with the text 'get product details'
 *    to call the handleData function. The handleData function should
 *    use the fakeFetch function to retrieve product data from:
 *    https://example.com/api/products. If the response status is 200,
 *    the function should update the state with the product data and
 *    display it on the screen. Each product item should display the 
 *    name, price and quantity.
*/

import { fakeFetch } from "./fakeFetch";
import { useState } from 'react';


function App() {


  const [products, setProducts] = useState([]); // Step I: declaring state variable


  // Step-II: 
  const handleData = async () => {
    try {
      const { data, status } = await fakeFetch(
        "https://example.com/api/products"
      );
      if (status === 200) {
        console.log({ data: data.products }); // done previously
        setProducts(data.products); // update products variable
      }
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <div>

      <div className="App">
        <h1>My Products</h1>
        {/* Step II:  */}
        <button onClick={handleData}>Fetch Products</button>
      </div>

      <ul style={{ listStyle: "none" }}>
        {/*  Step III: Creating list in JSX */}
        {/*  When setProduct updated, then due to rerendering map started printing. */}
        {products.map(({ id, name, price, quantity }) => {
          return (
            <li key={id}>
              <h3>{name}</h3>
              <p>Price: {price}</p>
              <p>Quantity: {quantity}</p>
            </li>
          );
        })}
      </ul>

    </div>
  )
}

export default App
