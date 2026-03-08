/**
 * Redux Toolkit Query:
 * > Redux Toolkit Query(RTK) is specifically designed to simplify
 *   data fetching, caching, and state management for API Calls in a
 *   React and Redux Application.
 * > We'll learn:
 *   1. How to get all products
 *   2. How to get a specific product
 *   3. How to add a new product
 *   4. How to update a product
 *   5. How to delete a product
*/

import './App.css'
import AllProducts from './components/AllProducts.jsx'
import SpecificProduct from './components/SpecificProduct.jsx'
import AddNewProduct from './components/AddNewProduct.jsx'
import UpdateProduct from './components/UpdateProduct.jsx'
import DeleteProduct from './components/DeleteProduct.jsx'

function App() {

  return (
    <div>
      {/* <AllProducts /> */}
      {/* <SpecificProduct /> */}
      {/* <AddNewProduct /> */}
      {/* <UpdateProduct productId={4} /> */}
      <DeleteProduct productId={4} />
    </div>
  )
}

export default App
