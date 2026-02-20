import { LOGO_URL } from '../utils/constants';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {loggedInUser} = useContext(UserContext);
  const onlineStatus = useOnlineStatus();

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
            <span className="text-lg">{onlineStatus ? '✅' : '⛔'}</span>
          </li>
          <li>
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link>
          </li>
          <li>
            <Link to="/grocery" className="hover:text-orange-500 transition-colors">Grocery</Link>
          </li>
          <li className="hover:text-orange-500 transition-colors cursor-pointer">Cart</li>
          <button 
            className="ml-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
          <li className='px-4 font-bold'>{loggedInUser}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
