import './App.css'
import ProductList from "./pages/ProductList"
import Cart from "./pages/Cart"
import Header from "./components/Header"
import products from "./data/productsDB"
import { Routes, Route } from 'react-router-dom'

/**
 * Consume Context:
 * - Now that we have context ready and has been provided to <App />
 *   component, let's consume it in the Cart component.
 * - We don't need to pass things from App to Cart anymore. You can
 *   directly use the 'cartItems' value in the Cart component without
 *   passing it as props to <Cart />
 * - You can also do this for Header component.
 * - Syntax of consuming context:
 *   const { cartItems } = useContext(cartContext);
*/


function App() {

  return (
    <div className='App'>
      <Header />
      <Routes>
          <Route path='/' element={<ProductList products={products} />} />
          <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
