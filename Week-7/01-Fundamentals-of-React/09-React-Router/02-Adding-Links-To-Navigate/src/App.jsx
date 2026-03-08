import './App.css'
import Home from './Pages/Home'
import Category from './Pages/Category'
import ProductDetail from './Pages/ProductDetail'
import WishList from './Pages/WishList'
import Cart from './Pages/Cart'
import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

/**
 * Adding links to Navigate:
 * - Browsers maintain their own history stack as the user navigates
 *   around. That's how the back and forward buttons can work. We can
 *   also achieve that with react router.
*/

/**
 * Q. Add four routes for different pages, and then use links in the
 *    top to navigate.
*/

function App() {

  return (
    <div className='App'>
      <nav>
        <Link to="/"> Home </Link> ||
        <Link to="/category"> Category </Link> ||
        <Link to="/cart"> Cart </Link> ||
        <Link to="/wishlist"> WishList</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/category' element={<Category />}></Route>
        <Route path='/product' element={<ProductDetail />}></Route>
        <Route path='/wishlist' element={<WishList />}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
    </div>
  )
}

export default App
