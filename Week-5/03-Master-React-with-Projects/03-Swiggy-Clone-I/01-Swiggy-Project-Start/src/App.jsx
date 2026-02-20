import './index.css';
import resList from './data';

/**
 * Component-1: Header
 * 1. Logo
 * 2. Nav Items: Home, About Us, Contact Us, Cart
*/
const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          src="https://png.pngtree.com/png-vector/20230217/ourmid/pngtree-food-logo-design-for-restaurant-and-business-png-image_6604922.png"
          alt="App Logo"
          className="logo"
        />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};




/**
 * Sub-Component: RestaurantCard (for each restaurant)
 * 1. Image
 * 2. Info: Name, Cuisine, Rating, Delivery Time
*/
const RestaurantCard = (props) => {
  const { resData } = props;
  if (!resData?.data) return null;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, deliveryTime } = resData.data;

  return (
    <div className="res-card" style={{ backgroundColor: '#f0f0f0' }}>
      <img
        className="res-logo"
        src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' + cloudinaryImageId }
        alt="Biryani"
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(', ')}</h4>
      <h4>{avgRating} stars</h4>
      <h4>₹{costForTwo / 100} FOR TWO</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
};



/**
 * Component-2: Body
 * 1. Search Bar
 * 2. Restaurant Container:
 *    - RestaurantCard (for each restaurant)
 *      - Image
 *      - Info: Name, Cuisine, Rating, Delivery Time
*/
const Body = () => {
  return (
    <div className="body">
      <div className="search-container">
        <input type="text" placeholder="Search Food or Restaurant" />
        <button>Search</button>
      </div>
      <div className="res-container">
        {resList.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};



/**
 * Component-3: Footer
*/
const currYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Copyright &copy; {currYear}
      </p>
    </footer>
  );
};


/**
 * Parent Component: App
*/
const App = () => {
  return (
    <div className="app">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default App;