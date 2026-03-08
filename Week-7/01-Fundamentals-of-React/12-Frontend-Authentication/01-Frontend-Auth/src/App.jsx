import './App.css'
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";

import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Address from "./pages/Address";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

/**
 * What is Frontend Authentication:
 * - Frontend Authentication means protecting your private pages like
 *   Profile Page, Inbox, Wishlist, Cart, Chat Messages, etc.
 * - Until the user has logged in, we should not be able to see the
 *   the content of the page.
*/

/**
 * How to Auth:
 * - Protect the private pages
 *   a. redirect to login
 *   b. once logged in, redirect to private page user was going to
 * - Also, all private APIs should be protected
*/

/**
 * Implement Static Login Functionality on Variable:
 * Q. Create a private page(eg: An Address Page). Now show the Address
 *    page only if a user is logged(if the login variable is true -
 *    no need to add any state), else redirect to the login page.
 * => In order for authentication to work, when someone tries to access
 *    a protected page, they will redirected to a login page. You can
 *    only access private pages after the key has been extracted & is
 *    set to true.
*/

/**
 * Login Variable: true/false
 * => const isLoggedIn = false; [Login Page Component] 
 *    a. If user 'isLoggedIn'  = Address Component
 *    b. If user '!isLoggedIn' = Login Page Component
*/

const getActiveStyle = ({ isActive }) => ({
  margin: "1rem 0",
  fontWeight: isActive ? "600" : "200",
  padding: isActive ? "1rem" : "0.5rem",
  color: isActive ? "red" : ""
});

function App() {
  const isLoggedIn = false;
  return (
    <div className="App">
      <nav>
        <NavLink style={getActiveStyle} to="/">
          Home
        </NavLink>
        ||
        <NavLink style={getActiveStyle} to="/category">
          Category
        </NavLink>
        ||
        <NavLink style={getActiveStyle} to="/cart">
          Cart
        </NavLink>
        ||
        <NavLink style={getActiveStyle} to="/wishlist">
          WishList
        </NavLink>
        ||
        <NavLink style={getActiveStyle} to="/address">
          Address
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
        {!isLoggedIn && <Route path="/address" element={<Login />} />}
        {isLoggedIn && <Route path="/address" element={<Address />} />}
      </Routes>
    </div>
  );
}

export default App
