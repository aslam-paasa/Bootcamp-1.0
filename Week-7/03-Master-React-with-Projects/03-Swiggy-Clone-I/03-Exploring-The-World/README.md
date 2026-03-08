## Namaste React Course by Akshay Saini

# Episode 06 - Exploring the world

## Coding Assignment:

- Play with the `useEffect Hook` to see when it is called? (before or after render)
- Play with the `dependency array` in useEffect Hook.
- Play with the `developer console` by putting a `debugger` in render and `useEffect`.
- Call an `actual API call`.
- `Handle Error` in your `API call`.
- Build `Shimmer UI` when data is not loaded.
- `Render your UI` with actual API data.
- Make `Search functionality` work.
- Make a `Login Logout` button that toggles with a state.

## [Food App Search Feature](https://food-app-search-feature.netlify.app/)


1. We have learned how to display static data, we we will call an actual API (dynamic data) inside an useEffect Hook
2. Use Optional Chaining to handle the error in data fetching
3. CORS Issue:
   a. Browsers blocks calling API from one origin to another
   b. Install CORS Chrome Extension to bypass CORS
4. Render the component with the loaded data

``` jsx
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4594965&lng=77.0266383&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    );
    const json = await data.json();
    const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setListOfRestaurants(restaurants);
    console.log(restaurants);
  };

    <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant.info} />
        ))}
    </div>
```

5. While data is loading, we show a dummy UI (Shimmer UI) instead of a blank screen to improve user experience. Shimmer UI resembles the page's actual UI, so users will understand how quickly the web or mobile app will load even before the content has shown up.
   a. If listOfRestaurant is empty  - show dummy UI
   b. If listsOfRestaurant has data - show data

6. Make a Login Logout button that toggles with a state

``` jsx
const [isLoggedIn, setIsLoggedIn] = useState(false);

const buttonText = isLoggedIn ? 'Logout' : 'Login';
const handleLogin = () => {
  setIsLoggedIn(!isLoggedIn);
};

<button className="login-btn" onClick={handleLogin}>{buttonText}</button>
```

7. Search Restaurant By Name
   a. Create search input box in JSX
      - <input type="text">
   b. Create state variable searchText using useState
      - const [searchText, setSearchText] = useState('')
   c. Connect input value with searchText state
      - value = {searchText}
   d. Update searchText when input changes using onChange
      - onChange((e) => setSearchText(e.target.value))
   e. Attach a button to the search bar
   f. Create a new variable and keep data of filteredRestaurant
      - const [filteredRestaurant, setFilteredRestaurant] = useState([]);
   g. Render from the filteredRestaurant


``` jsx
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState('');

    {/* 1. Search Restaurant Name by Clicking Search Button */}
    <input
      type="text"
      placeholder="Search a restaurant you want..."
      className="searchBox"
      value={searchText}
      onChange={(e) => {
        setSearchText(e.target.value);
      }}
    />

    <button
      onClick={() => {
        const filteredRestaurant listOfRestaurants.filter((res) => res.info.name.toLowerCase().include(searchText.toLowerCase()));
        setFilteredRestaurant(filteredRestaurant);
      }}
    >
      Search
    </button>

    {/* 2. Filter Button by Rating */}
    <button
      className="filter-btn"
      onClick={() => {
        const filteredList = listOfRestaurants.filte(
          (res) => res.info.avgRating > 4
        );
        setFilteredRestaurant(filteredList);
      }}
    >
      Top Rated Restaurants
    </button>

    <div className="res-container">
        {/* Show filtered results if available, otherwise show all restaurants */}
        {(filteredRestaurant.length > 0 ? filteredRestaurant : listOfRestaurants).map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant.info} />
        ))}
      </div>
```

Note: Never modify the original listOfRestaurant. Play with the copy of data i.e., filteredRestaurant.