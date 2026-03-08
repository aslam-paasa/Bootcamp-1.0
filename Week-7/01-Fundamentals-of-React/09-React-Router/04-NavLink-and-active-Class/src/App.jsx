import './App.css'
import Home from './Pages/Home'
import Category from './Pages/Category'
import ProductDetail from './Pages/ProductDetail'
import WishList from './Pages/WishList'
import Cart from './Pages/Cart'
import { Routes, Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

/**
 * NavLink and active Class:
 * - A <NavLink> is a special kind of <Link> that knows whether or not
 *   it is "active" or not.
 * - This is useful when building a navigation menu, such as breadcrumbs
 *   or a set of tabs where you'd like to show which of them is 
 *   currently selected.
 * 
 * Note: Replace Link with NavLink
*/

/**
 * Q. Make the nav link on the top stand out when they're active i.e. 
 *    when that current page is active.
*/

const getActiveStyle = ({ isActive }) => ({
  margin: "1rem 0",
  fontWeight: isActive ? "600" : "200",
  padding: isActive ? "1rem" : "0.5rem",
  color: isActive ? "red" : ""
});

function App() {

  return (
    <div className='App'>
      <nav>
        <NavLink style={getActiveStyle} to="/"> Home </NavLink> ||
        <NavLink style={getActiveStyle} to="/category"> Category </NavLink> ||
        <NavLink style={getActiveStyle} to="/cart"> Cart </NavLink> ||
        <NavLink style={getActiveStyle} to="/wishlist"> WishList</NavLink>
      </nav>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/category' element={<Category />}></Route>
        <Route path='/product/:productId' element={<ProductDetail />}></Route>
        <Route path='/wishlist' element={<WishList />}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
    </div>
  )
}

export default App
