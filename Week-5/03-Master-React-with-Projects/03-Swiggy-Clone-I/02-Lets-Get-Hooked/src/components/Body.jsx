import { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import resList from '../utils/mockData';


const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState(resList);

  const handleFilterRestaurants = () => {
    const filteredList = listOfRestaurants.filter((res) => res.data.avgRating > 4);
    setListOfRestaurants(filteredList);
  };

  return (
    <div className="body">

      {/* 1. Filter Restaurants by Rating */}
      <div className="filter">
        <button className="filter-btn" onClick={handleFilterRestaurants}>
          Top Rated Restaurants
        </button>
      </div>

      {/* 2. Render the restaurants in the UI */}
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}

      </div>
    </div>
  );
};

export default Body;
