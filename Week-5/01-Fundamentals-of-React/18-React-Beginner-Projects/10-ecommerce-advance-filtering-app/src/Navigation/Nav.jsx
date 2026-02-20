import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import "./Nav.css";

/**
 * Nav Component:
 * a. handleInputChange    : the function to handle the input change
 * b. query                : the query of the product
 */
const Nav = ({ handleInputChange, query }) => {

    /**
     * Return the navigation component, which contains:
     * a. Search Input     : It is used to search for a product.
     * b. Profile Container: It is used to display the profile of the user.
     *    - FiHeart              : the heart icon
     *    - AiOutlineShoppingCart: the shopping cart icon
     *    - AiOutlineUserAdd     : the profile user icon
     */
    return (
        <nav>
            {/* Search Input */}
            <div className="nav-container">
                <input
                    className="search-input"
                    type="text"
                    onChange={handleInputChange}
                    value={query}
                    placeholder="Enter your search shoes."
                />
            </div>

            {/* Profile Container */}
            <div className="profile-container">
                <a href="#">
                    <FiHeart className="nav-icons" />
                </a>
                <a href="">
                    <AiOutlineShoppingCart className="nav-icons" />
                </a>
                <a href="">
                    <AiOutlineUserAdd className="nav-icons" />
                </a>
            </div>
        </nav>
    );
};

export default Nav;