import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loggedInUser } = useContext(UserContext);
  const onlineStatus = useOnlineStatus();

  /* 4. Selector Hook: To read the updated store data */
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between items-center bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50 px-4 py-2">
      {/* 1. Logo */}
      <div className="flex items-center">
        <img
          className="w-16 h-16 object-contain hover:scale-105 transition-transform duration-200"
          src={LOGO_URL}
          alt="App Logo"
        />
      </div>

      {/* 2. Nav Items: List of Nav Items, Login Button */}
      <nav className="flex items-center">
        <ul className="flex items-center space-x-6 font-medium">
          <li className="flex items-center gap-2">
            <span>Online Status:</span>
            <span className="text-lg">{onlineStatus ? "✅" : "⛔"}</span>
          </li>
          <li>
            <Link to="/" className="px-4">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="px-4">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="px-4">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/grocery" className="px-4">
              Grocery
            </Link>
          </li>
          <li className="px-4 font-bold">
            <Link to="/cart" className="px-4">
              Cart - ({cartItems.length} items)
            </Link>
          </li>
          <button className="px-4" onClick={() => setIsLoggedIn(!isLoggedIn)}>
            {isLoggedIn ? "Logout" : "Login"}
          </button>
          <li className="px-4 font-bold">{loggedInUser}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
