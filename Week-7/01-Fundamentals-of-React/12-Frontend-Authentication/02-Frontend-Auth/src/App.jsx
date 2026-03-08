import './App.css'

/**
 * Understanding:
 * In order for authentication to work, when someone tries to access a
 * protected page, they will be redirected to a login page. You can
 * only access private pages after the key has been extracted & is
 * set to true.
*/

/**
 * Implement Static Login Functionality on a button:
 * Q. Using state create a login button and accordingly show the address
 *    page and login page.
 *    a. Change variable to state variable.
 *    b. Set onClick fn on the button
 *    c. toggle the state variable [true-false] inside the onClick
 *       - state is true : Display button 'Login', Address Component
 *       - state is false: Display button 'Logout', Login Component
*/ 

/** 
 * Understanding:
 * To summarize, you set the login using a useState. This is all about 
 * authentication. From here we will just refactor our code to make it 
 * better.
*/

import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Address from "./pages/Address";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";

const getActiveStyle = ({ isActive }) => ({
  margin: "1rem 0",
  fontWeight: isActive ? "600" : "200",
  padding: isActive ? "1rem" : "0.5rem",
  color: isActive ? "red" : ""
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        ||
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>{isLoggedIn ? "Logout" : "Login"}</button>
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
