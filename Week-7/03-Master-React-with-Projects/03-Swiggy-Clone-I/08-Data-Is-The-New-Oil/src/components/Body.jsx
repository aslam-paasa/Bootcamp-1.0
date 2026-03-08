import { useEffect, useState, useContext } from 'react';
import RestaurantCard, { withPromotedLabel } from './RestaurantCard';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState('');
  const {loggedInUser, setUsername} = useContext(UserContext);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4594965&lng=77.0266383&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    );

    const json = await data.json();
    const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    setListOfRestaurants(restaurants);
    setFilteredRestaurant(restaurants);
  };


  const isPromoted = (restaurant) => {
    return restaurant?.info?.differentiatedUi?.displayType?.includes("ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT") ||
    restaurant?.info?.displayType?.includes("ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT");
  };


  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1 className='text-center mt-10'>
        Looks like you're offline! Please check your internet connection
      </h1>
    );

  /**
   * Conditional Rendering
   * 1. If listOfRestaurants is empty, show Shimmer
   * 2. If listOfRestaurants is not empty, show the list of restaurants
  */
  return listOfRestaurants.length === 0 ? (
    <div className="mt-28">
      <Shimmer />
    </div>
  ) : (
    <div className="body mt-28">
      <div className="filter flex justify-around items-center py-6 shadow-sm">
        <div className="search flex items-center">
          {/* 1. Search Restaurant Name by Clicking Search Button */}
          <div>
            <input
              type="text"
              className="px-4 py-2.5 w-64 rounded-lg border-2 border-rose-200 focus:border-rose-400 focus:outline-none transition-all duration-200 shadow-sm placeholder:text-gray-400"
              value={searchText}
              placeholder="Search for restaurants..."
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </div>

          <button
            className='ml-4 px-6 py-2.5 bg-gradient-to-r from-rose-400 to-red-400 text-white rounded-lg shadow-md hover:shadow-lg transform cursor-pointer'
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        
          {/* 3. Filter Button by Rating */}
          <button
            className="ml-8 px-6 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg shadow-md cursor-pointer font-medium border border-gray-200"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>

        {/* 4. User Name Input Field */}
        <div>
            <span className="text-lg font-medium">
              Username: 
            </span>
            <input
              type="text"
              className="ml-8 px-4 py-2.5 w-64 rounded-lg border-2 border-rose-200 focus:border-rose-400 focus:outline-none transition-all duration-200 shadow-sm placeholder:text-gray-400"
              value={loggedInUser}
              placeholder="Enter your name..."
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
      </div>

      {/* 4. Restaurant Container: List of Restaurants */}
      <div className="flex justify-center flex-wrap p-4 bg-gray-50">
        {/* Show filtered results if available, otherwise show all restaurants */}
        {(filteredRestaurant.length > 0 ? filteredRestaurant : listOfRestaurants).map((restaurant) => (
          <Link 
            style={{textDecoration: 'none', color: '#000'}} 
            key={restaurant.info.id} 
            to={"/restaurant/" + restaurant.info.id}
          >
            {isPromoted(restaurant) ? <RestaurantCardPromoted resData={restaurant.info} /> : <RestaurantCard resData={restaurant.info} />}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
