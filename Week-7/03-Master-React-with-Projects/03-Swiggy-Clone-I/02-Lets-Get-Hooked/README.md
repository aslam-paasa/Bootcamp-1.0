## Planning
1. Think of Application Name
2. Build Wireframe of the Application (how does it look)
3. Break the App into 3 components, and each component have multiple sub-component:
   a. Header
      - Logo
      - Nav Items
   b. Body
      - Search
      - RestaurantContainer
        - RestaurantCard
          - Img
          - Name, Rating, Cusine, delivery time
   c. Footer
      - Copyright
      - Links
      - Address
      - Contact

## Development:
## Planning
1. Think of Application Name
2. Build Wireframe of the Application (how does it look)
3. Break the App into 3 components, and each component have multiple sub-component:
   a. Header
      - Logo
      - Nav Items
   b. Body
      - Search
      - RestaurantContainer
        - RestaurantCard
          - Img
          - Name, Rating, Cusine, delivery time
   c. Footer
      - Copyright
      - Links
      - Address
      - Contact

## Development:
1. Build App Component
   a. Build Header
      - Logo Img
      - Nav Items
   b. Build RestaurantCard Component
      - Make card dynamic (pass in props)
      - Props - passing arguments to a function
      - Destructure Props
      - Spread the data in the card
   c. Build Body
      - SearchBar
      - RestaurantContainer:
        - RestaurantCard: Use Map to render cards with dynamic data of restaurants
   d. Build Footer

2. Folder Structure: 
   a. Restructuring Application Files
   b. Make different files for each Component
      - File: components
        - Header
        - RestaurantCard
        - Body
        - Footer
   c. Create config file:
      - File: utils 
        - constants [Keep hardcoded data like URL Strings, Enums, etc]
        - mockData
   d. Do Export/Import files:
      - Two types of export/import:
        i.  Default Export/Import:
            - export default Component;
            - import Component from "path";
        ii. Named Export/Import:
            - export const Component;
            - import {Component} from "path";
   e. First interactive logic: Top rated restaurant
      - Create Restaurant Filter Button
      - Use useState to create a variable
        - listOfRestaurants      : To store list of restaurants
        - setListOfRestaurants   : To update list of restaurants
      - Write filter logic and bind it to the Restaurant Button
        - handleFilterRestaurants: Filter restaurants by using useState

    ``` jsx

        {/* 1. State Variable */}
        const [listOfRestaurants, setListOfRestaurants] = useState(resList);

        {/* 2. Filter Logic */}
        const handleFilterRestaurants = () => {
        const filteredList = listOfRestaurants.filter((res) => res.data.avgRating > 4);
        setListOfRestaurants(filteredList);
        };

        {/* 3. Filter Restaurants by Rating */}
        <div className="filter">
            <button className="filter-btn" onClick={handleFilterRestaurants}>
            Top Rated Restaurants
            </button>
        </div>

        {/* 4. Render the restaurants in the UI */}
        <div className="res-container">
            {listOfRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.data.id} resData={restaurant} />
            ))}
    ```