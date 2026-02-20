## Namaste React Course by Akshay Saini

## Development:
1. Install react-router-dom package:
   - npm install react-router-dom

2. Create route components:
   - Home (App.jsx)
   - About (About.jsx) 
   - Contact (Contact.jsx)
   - Error (Error.jsx)

3. Setup router configuration:
   - Create browserRouter with route definitions
   - Define paths and corresponding components
   - Create children routes using children property

   ```jsx
   const appRouter = createBrowserRouter([
     { 
       path: '/', 
       element: <App />, 
       errorElement: <Error />,
       children: [
         { path: '/', element: <Body /> },
         { path: '/about', element: <About /> },
         { path: '/contact', element: <Contact /> }
       ]
     }
   ])
   ```
4. Add the configuration object to RouterProvider to render routes:
   - <RouterProvider router={appRouter} />

5. Use Link component for navigation between routes:
   a. Home Link       : Body Component
   b. About Us Link   : About Component
   c. Contact Us Link : Contact Component

``` jsx
<ul>
   <li><Link to="/">Home</Link></li>
   <li><Link to="/about">About Us</Link></li>
   <li><Link to="/contact">Contact Us</Link></li>
   <li>Cart</li>
   <button className="login-btn" onClick={handleLogin}>{buttonText}<button>
</ul>
```

6. Create a page to show restaurant details:
   a. Make RestaurantMenu component:
      - Get data from API 
      - Save data in state
      - Use useParams to get restaurant ID from URL
   b. Show restaurant info:
      - Display Shimmer loading effect while data loads

``` jsx
const [resInfo, setResInfo] = useState(null);
const { resId } = useParams();


  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(RES_MENU_API + resId);
    const json = await data.json();
    console.log(json);
    setResInfo(json?.data);
  };

  if (!resInfo) return <ShimmerMenu />;


  if (!resInfo?.cards[2]?.card?.card?.info) return null;
  const { name, cuisines, costForTwoMessage, cloudinaryImageId, avgRating, deliveryTime } = resInfo.cards[2].card.card.info;
  console.log(name, cuisines, costForTwoMessage, cloudinaryImageId, avgRating, deliveryTime);


  const itemCards = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards || [];
  console.log(itemCards);


  return (
    <div className="menu">
      <header className="menu-header">

        {/* 1. Logo */}
        <div className="menu-header-left">
          <img src={CDN_URL + cloudinaryImageId} alt="Restaurent Info" />
        </div>

        {/* 2. Restaurant Info: Name, Cuisines, Rating, Delivery Time, Cost for Two */}
        <div className="menu-header-right">

          {/* a. Top: Name, Cuisines */}
          <div className="top">
            <h1>{name}</h1>
            <h3>{cuisines.join(', ')}</h3>
          </div>

          {/* b. Bottom: Rating, Delivery Time, Cost for Two */}
          <div className="bottom">

            {/* - Rating */}
            <h4 className="avg-rating">
              <span
                className="icons"
                style={{
                  position: 'relative',
                  top: '2px',
                  marginRight: '3px',
                }}
              >
                <AiOutlineStar />
              </span>
              <span>{avgRating}</span>
            </h4>

            {/* - Delivery Time */}
            <h4 className="time">
              <span
                className="icons"
                style={{
                  position: 'relative',
                  top: '2px',
                  marginRight: '3px',
                }}
              >
                <FiClock />
              </span>
              <span> {deliveryTime} MINS</span>
            </h4>

            {/* - Cost for Two */}
            <h3>{costForTwoMessage}</h3>
          </div>
        </div>
      </header>

      {/* 3. Menu Items: Name, Price, Description, Image */}
      <div className="menu-main">

        {/* a. Title: Menu */}
        <h2>Menu</h2>

        {/* b. Items: Number of Items */}
        <h3 className="items">{itemCards.length} items</h3>

        {/* c. Menu Items: Name, Price, Description, Image */}
        <div className="menu-main-card-container">
          {itemCards.map((item) => (
            <div key={item?.card?.info?.id} className="menu-card">
              <div className="menu-card-left">
                <h2 className="menu-name">{item?.card?.info?.name}</h2>
                <h3 className="menu-price">
                  ₹
                  {item?.card?.info?.price / 100 ||
                    item?.card?.info?.defaultPrice / 100}
                </h3>
                <h4 className="menu-description">
                  {item?.card?.info?.description}
                </h4>
              </div>
              <div className="menu-card-right">
                <img src={CDN_URL + item?.card?.info?.imageId} alt="Menu Info" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

```


7. Make Restaurant Cards Clickable
   - We'll make each restaurant card clickable so that when a user clicks on it, they are taken to that restaurant's menu page. Here's how we do it:
   a. We use React Router's `Link` component to make cards clickable
   b. Each card is wrapped in a `Link` that points to `/restaurant/[restaurant-id]`
   c. When clicked, it navigates to the specific restaurant's menu page

``` jsx
<div className="res-container">
   {(filteredRestaurant.length > 0 ? filteredRestaurant : listOfRestaurants).map((restaurant) => (
      <Link key={restaurant.info.id} to={"/restaurant/" + restaurant.info.id}>
         <RestaurantCard resData={restaurant.info} />
      </Link>
   ))}
</div>
```

8. Fetch github data and make User Card and render in About Component:
   a. User Component:
      ```jsx
      const User = ({ contact }) => {
        const [userInfo, setUserInfo] = useState({});

        useEffect(() => {
          async function getUserInfo() {
              const data = await fetch('https://api.github.com/users/aslam-paasa');
              const json = await data.json();
              setUserInfo(json);
          }
          getUserInfo(); 
        }, []);

        return (
          <div className="user-card">
            <img src={userInfo.avatar_url} alt="user" />
            <h2>Name: {userInfo.name}</h2>
            <h3>Location: {userInfo.location}</h3>
            <h3>Contact: {userInfo.contact || contact }</h3>
            <h3>Followers: {userInfo.followers}</h3>
            <h3>Following: {userInfo.following}</h3>
          </div>
        );
      };

      ```

  b. Render User Component in About Component:
      ```jsx
      import User from './User';

      const About = () => {
        return (
          <div className='about-page'>
            <User contact={'aslampaasa421@gmail.com'} />
          </div>
        );
      };
      ```

9. Performance Optimization & Refactoring

   1. Single Responsibility Principle (SRP) Implementation
   
      a. Custom Hook: useRestaurantMenu()
         - Purpose: Separate data fetching logic from UI rendering
         - Benefits:
           • Makes code more readable and maintainable 
           • Follows SRP - each component has one responsibility
           • Makes code reusable across components
         
         RestaurantMenu Component has 2 main responsibilities:
         1. Fetching data 
         2. Rendering UI
         
         We've moved data fetching into a separate custom hook so RestaurantMenu can focus solely on UI.

         ```jsx
         // useRestaurantMenu.js - Data Fetching Logic
         import { useEffect, useState } from 'react';
         import { RES_MENU_API } from '../utils/constants';

         const useRestaurantMenu = (resId) => {
           const [resInfo, setResInfo] = useState(null);

           useEffect(() => {
             fetchData();
           }, []);

           const fetchData = async () => {
             const data = await fetch(RES_MENU_API + resId);
             const json = await data.json();
             setResInfo(json.data);
           };
           return resInfo;
         };
         export default useRestaurantMenu;

         // RestaurantMenu.jsx - UI Rendering Logic
         import useRestaurantMenu from '../utils/useRestaurantMenu';

         const resInfo = useRestaurantMenu(resId);

         if (!resInfo?.cards[2]?.card?.card?.info) return null;
         const { name, cuisines, costForTwoMessage, cloudinaryImageId, avgRating, deliveryTime } = resInfo.cards[2].card.card.info;

         const itemCards = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards || [];
         ```

      b. Custom Hook: useOnlineStatus()
         - Purpose: Track user's internet connectivity status
         - Use Cases:
           • Display offline message when internet connection is lost
           • Show connectivity status indicator in header
         
         We've created a separate hook to check internet connection that can be reused throughout the app.

         ```jsx
         // useOnlineStatus.js - Internet Status Logic
         import { useEffect, useState } from 'react';

         const useOnlineStatus = () => {
           const [onlineStatus, setOnlineStatus] = useState(true);

           useEffect(() => {
             window.addEventListener('offline', () => {
               setOnlineStatus(false);
             });

             window.addEventListener('online', () => {
               setOnlineStatus(true);
             });
           }, []);

           return onlineStatus;
         };
         export default useOnlineStatus;

         // Body.jsx - Using Hook for Offline Message
         import useOnlineStatus from '../utils/useOnlineStatus';

         const Body = () => {
           const onlineStatus = useOnlineStatus();
           
           if (onlineStatus === false)
             return (
               <h1 style={{ textAlign: 'center', marginTop: '100px' }}>
                 Looks like you're offline! Please check your internet connection
               </h1>
             );

           return listOfRestaurants.length === 0 ? (
             <Shimmer />
           ) : (
             <div className="body"></div>
           );
         };

         // Header.jsx - Using Hook for Status Indicator
         import useOnlineStatus from '../utils/useOnlineStatus';

         const Header = () => {
           const onlineStatus = useOnlineStatus();

           return (
             <div className="header">
               <div className="nav-items">
                 <ul>
                   <li>Online Status: {onlineStatus ? '✅' : '⛔'}</li>
                 </ul>
               </div>
             </div>
           );
         };
         ```

  2. Performance Optimization
     
     Performance optimization is crucial in large applications. When we have many components, the application can become slow. Therefore, we use certain techniques to improve performance.

     A. Important Features of Parcel:
        1. Development Features:
           - Dev Build - Optimized build for development environment
           - Local Server - Provides local development server
           - HMR (Hot Module Replacement) - Automatically reflects code changes
           - File Watching - Algorithm written in C++ to track file changes
           - Caching - Uses caching to speed up build process
           
        2. Build & Optimization Features:
           - Image Optimization - Optimizes images for better performance
           - Minification - Converts code into compact form
           - Bundling - Bundles all files together
           - Compression - Reduces file size
           - Tree Shaking - Removes unused code
           - Code Splitting - Divides code into chunks
           
        3. Additional Features:
           - Differential Bundling - Support for older browsers
           - Error Handling & Diagnostics
           - HTTPS Support
           - Different Dev & Prod Bundles

     B. Why is Code Splitting Important?
        - By default, Parcel bundles all code into a single JS file
        - This approach isn't ideal for large applications because:
          1. Bundle size becomes too large
          2. Application takes longer to load
          3. User experience can be compromised

     C. Solution: Code Splitting/Chunking/Lazy-Loading/Dynamic-Bundling
        - Divide code into logical chunks
        - Each chunk should handle a specific feature
        - Implement lazy loading (Dynamic Bundling)
        - This reduces initial load time of the application

     Example: Implementing Code Splitting with Grocery Section
     Let's learn how to implement code splitting through the Grocery section:

     1. Basic Setup (Without Code Splitting):

     ```jsx
     // Normal import
     import Grocery from './components/Grocery';

     const appRouter = createBrowserRouter([
       {
         path: '/grocery',
         element: <Grocery />  // Direct usage
       }
     ]);
     ```

     Problem: 
     - This way of importing makes Grocery component part of main bundle
     - Increases main bundle size
     - Results in longer initial loading time

     2. Code Splitting Implementation:
     ```jsx
     
     // Step 1: Use lazy import
     import { lazy, Suspense } from 'react';
     const Grocery = lazy(() => import('./components/Grocery'));

     // Step 2: Wrap with Suspense
     const appRouter = createBrowserRouter([
       {
         path: '/grocery',
         element: (
           <Suspense fallback={<h1>Loading...</h1>}>
             <Grocery />
           </Suspense>
         )
       }
     ]);
     ```

     What improved?
     - Grocery component now goes into separate bundle
     - Reduced main bundle size
     - Faster initial page load
     - Grocery component loads only when user visits grocery page

     Important Notes:
     - lazy(): React function that enables dynamic import
     - Suspense: Required to handle loading state
     - fallback: Defines what to display during loading

     Best Practices:
     - Use code splitting only for large components
     - Always show loading indicators
     - Implement code splitting at route level
     - Consider lazy loading during testing

     You can implement the same pattern in other large sections like:
     - Dining section
     - Cart section
     - User Profile section

10. Higher Order Components (HOC)

    What is HOC?
    - HOC is a function that takes an existing component as input, adds extra features to it, and returns an enhanced component
    
    Practical Example: Promoted Restaurant Label
    - Some restaurant cards in our app are promoted/sponsored
    - We need to show a special "Promoted" label on these cards
    - We'll use HOC pattern to implement this

    Implementation Steps:

    1. Creating the HOC Function
    ```jsx
    // RestaurantCard.jsx
    export const withPromotedLabel = () => {
      return (props) => {
        return (
          <div>
            <label>Promoted</label>
            <RestaurantCard {...props} />
          </div>
        )
      }
    }
    ```

    2. Using the Enhanced Component
    ```jsx
    // Body.jsx
    import RestaurantCard, { withPromotedLabel } from './RestaurantCard';
    
    // Create enhanced version of RestaurantCard
    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
    ```

    3. Promotion Check Logic
    ```jsx
    const isPromoted = (restaurant) => {
      return restaurant?.info?.differentiatedUi?.displayType?.includes("ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT") ||
      restaurant?.info?.displayType?.includes("ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT");
    };
    ```

    4. Conditional Rendering
    ```jsx
    <div className="restaurant-container">
      {(filteredRestaurant.length > 0 ? filteredRestaurant : listOfRestaurants).map((restaurant) => (
        <Link 
          key={restaurant.info.id} 
          to={"/restaurant/" + restaurant.info.id}
        >
          {/* Check if promoted and render appropriate component */}
          {isPromoted(restaurant) ? 
            <RestaurantCardPromoted resData={restaurant.info} /> : 
            <RestaurantCard resData={restaurant.info} />
          }
        </Link>
      ))}
    </div>
    ```

    Key Points:
    - Use HOC when you need to add reusable functionality to existing components
    - Always spread props when passing them to ensure original component receives all props
    - HOC pattern is a powerful tool for code reusability in React
    - The enhanced component maintains all original functionality while adding new features
    - This pattern helps keep code DRY (Don't Repeat Yourself)

## Data is the new Oil: Understanding Data Layer
- Modern web applications are built on two fundamental layers:
    1. UI Layer (Presentation Layer)
    - What users see and interact with
    - Contains components, styling and layouts
    - Handles user interactions and events
    2. Data Layer
    - Powers the UI layer with dynamic data
    - Manages application state and data flow
    - Handles data fetching, storage and updates
- To effectively manage the relationship between these layers, we'll explore two important concepts:
    1. Controlled vs Uncontrolled Components
    - Different approaches to handle form inputs and user data
    - Understanding when to use each pattern
    2. Lifting State Up
    - Pattern for sharing state between components
    - Managing data flow in component hierarchies

### Restaurant Menu Page Implementation:
Restaurant menu page ko implement karne ke liye humne RestaurantMenu.jsx component banaya hai. Aaiye samajhte hai iske main parts ko:

```jsx
import { useParams } from "react-router-dom";
import ShimmerMenu from "./ShimmerMenu";
import { CDN_URL } from "../utils/constants";
import { FiClock } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  /** 
   * If API data not ready => shimmer
  */
  if (!resInfo) return <ShimmerMenu />;

  /**
   * 2. Extracting restaurant food items data
   *    a. If restaurantInfo is not found => null
   *    b. If restaurantInfo is found     => restaurantInfo
  */
  const restaurantInfo = resInfo?.cards?.find(
    (c) => c?.card?.card?.info
  )?.card?.card?.info;

  if (!restaurantInfo) return null;

  const {
    name,
    cuisines,
    costForTwoMessage,
    cloudinaryImageId,
    avgRating,
    sla,
  } = restaurantInfo;

  /**
   * 3. Extract all menu categories (REGULAR -> cards)
   *    a. If groupedCard is not found => []
   *    b. If groupedCard is found     => groupedCard
  */
  const categories =
    resInfo?.cards
      ?.find((c) => c.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (c) =>
          c?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      ) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 1.Header */}
      <header className="flex items-center gap-8 p-6 bg-white rounded-2xl shadow-lg mb-8">
        {/* 1.1. Logo */}
        <div className="w-48 h-48 overflow-hidden rounded-xl">
          <img
            src={CDN_URL + cloudinaryImageId}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 1.2. Restaurant Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
          <p className="text-gray-600 mb-4">{cuisines?.join(", ")}</p>

          <div className="flex items-center gap-6">
            <div className="flex items-center px-3 py-1 bg-green-50 rounded-lg">
              <AiOutlineStar className="text-green-600 mr-1" />
              <span className="font-medium text-green-700">{avgRating}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <FiClock className="mr-1" />
              <span>{sla?.deliveryTime} mins</span>
            </div>

            <div className="text-gray-600 font-medium">
              {costForTwoMessage}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Menu */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Menu</h2>

        {/* 2.1. Categories */}
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryTitle = category?.card?.card?.title;
            const items = category?.card?.card?.itemCards || [];

            return (
              <div key={categoryTitle} className="border-b pb-8 last:border-0">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {categoryTitle}
                </h3>

                {/* 2.1.a. Items */}
                <div className="grid gap-6">
                  {items.map((item) => {
                    const info = item?.card?.info;
                    return (
                      <div key={info?.id} className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-xl transition-colors">
                        <div className="flex-1 pr-4">
                          {/* 2.1.1.a. Item Name */}
                          <h4 className="font-medium text-gray-800 mb-1">
                            {info?.name}
                          </h4>

                          {/* 2.1.1.b. Item Price */}
                          <div className="text-green-600 font-medium mb-2">
                            ₹{info?.price / 100 || info?.defaultPrice / 100}
                          </div>

                          {/* 2.1.1.c. Item Description */}
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {info?.description}
                          </p>
                        </div>

                        {/* 2.1.1.d. Item Image */}
                        {info?.imageId && (
                          <div className="w-28 h-28 flex-shrink-0">
                            <img
                              src={CDN_URL + info?.imageId}
                              alt={info?.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default RestaurantMenu;
```

### Uncontrolled Component: Create Accordion for Restaurant Menu Category

1. Accordion Component for Menu Categories:
   - Create separate accordion component for each category
   - Pass title and items as props to the component

2. Accordion Structure:
   - Header Section:
     - Displays category title
     - Shows total item count
     - Has toggle button for expand/collapse
   
   - Body Section:
     - Collapsed by default
     - Expands on click
     - Shows item name, price, description and image
     - Renders items using map function

3. State Management:
   - Manage isOpen state using useState hook
   - Toggle using handleClick function

4. Implementation Steps:
   - Create RestaurantCategory component
   - Accept title and items array as props
   - Implement accordion UI
   - Render items using map function

```jsx
/**
 * RestaurantCategory.jsx
*/
const RestaurantCategory = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            {/* Accordion Header */}
            <div className="flex justify-between items-center p-4 hover:bg-gray-100 rounded-xl transition-colors">
                <div className="text-lg font-semibold text-gray-800">
                    {title} ({items.length})
                </div>
                <div>
                    {isOpen ? (
                        <button onClick={handleClick} className="bg-gray-200 rounded-full p-2 hover:bg-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    ) : (
                        <button onClick={handleClick} className="bg-gray-200 rounded-full p-2 hover:bg-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    )}

                </div>
            </div>

            {/* Accordion Body */}
            {isOpen && (
                <div className="border-b pb-8 last:border-0">
                    <div className="grid gap-6">
                        {items.map((item) => {
                            const info = item?.card?.info;
                            return (
                                <div key={info?.id} className="flex justify-between items-center p-4 hover:bg-gray-100 rounded-xl transition-colors">
                                    <div className="flex-1 pr-4">
                                        {/* 2.1.2.a. Item Name */}
                                        <h4 className="font-medium text-gray-800 mb-1">
                                            {info?.name}
                                        </h4>

                                        {/* 2.1.2.b. Item Price */}
                                        <div className="text-green-600 font-medium mb-2">
                                            ₹{info?.price / 100 || info?.defaultPrice / 100}
                                        </div>

                                        {/* 2.1.2.c. Item Description */}
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {info?.description}
                                        </p>
                                    </div>

                                    {/* 2.1.2.d. Item Image */}
                                    {info?.imageId && (
                                        <div className="w-28 h-28 flex-shrink-0">
                                            <img
                                                src={CDN_URL + info?.imageId}
                                                alt={info?.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

/**
 * RestaurantCard.jsx
*/
{/* 2. Menu */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Menu</h2>

        {/* 2.1. Categories */}
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryTitle = category?.card?.card?.title;
            const items = category?.card?.card?.itemCards || [];

            return (
              <RestaurantCategory key={categoryTitle} title={categoryTitle} items={items} />
            );
          })}
        </div>
      </div>
```

### Controlled Component + Lifting States Up: Advance Accordion
1. The Challenge: Coordinated Accordion Behavior
   - We need to build an accordion where opening one section automatically closes all other sections. To implement this functionality, we need to shift state management to the parent component.

2. State Lifting
- Each RestaurantCategory component was managing its own state
- Each accordion was working independently
- Components were "uncontrolled" as they controlled their own behavior

3. New Implementation
- State will be lifted to RestaurantMenu (parent)
- Parent component will decide which accordion stays open
- RestaurantCategory will become "controlled" components

4. Uncontrolled Components
- Component Maintain their own state
- Manage their own behavior
- Parent has no control over their behavior
- Example: Original RestaurantCategory with internal state (useState)

5. Controlled Components
- State and behavior controlled by parent, passed to child as props
- Receive data and functions through props
- Parent component dictates their behavior
- Example: New RestaurantCategory receiving showItems prop

6. Logic:
- If we make <RestaurantCategory isOpen={true}>, it will expand all the accordion because it will become true for all the menu category. We want to expand our first accordion only. How will we do?
  a. If the index === 0 && true => Only first category will expand
  b. If the index === 1 && true => Only second category will expand

- Now we want dynamic change when we click on any cateogory, it should show itself and collapse others.
  a. Store the index in the state:
     const [showIndex, setShowIndex] = useState(0);
  b. How can a child change their parent's state? 
     - No possible directly! But indirectly we can do that.
     - We will pass setShowIndex to our children using callback
     <RestaurantCategory key={categoryTitle} title={categoryTitle} items={items} showItems={index === showIndex ? true : false} />
  c. Make toggle showIndex:
     - <RestaurantCategory 
          key={categoryTitle} 
          title={categoryTitle} 
          items={items} 
          showItems={index === showIndex} 
          setShowIndex={() => setShowIndex(index === showIndex ? null : index)} 
        />


7. Implementation Code:
```jsx
/**
 * RestaurantMenu.jsx
*/
<div className="space-y-8">
    {categories.map((category, index) => {
        const categoryTitle = category?.card?.card?.title;
        const items = category?.card?.card?.itemCards || [];

        return (
            <RestaurantCategory 
                key={categoryTitle} 
                title={categoryTitle} 
                items={items} 
                showItems={index === showIndex} 
                setShowIndex={() => setShowIndex(index === showIndex ?null : index)} 
            />
        );
    })}
</div>

/**
 * RestaurantCategory.jsx
*/
const RestaurantCategory = ({ title, items, showItems, setShowIndex }) => {
    const handleClick = () => {
        setShowIndex();
    }

    return (
        <div>
            {/* Accordion Header */}
            <div onClick={handleClick} className="flex justify-between items-center p-4 bg-slate-50 border-b mb-4 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-lg font-semibold text-gray-800">
                    {title} ({items.length})
                </div>
                <div>
                    {showItems ? (
                        <button className="bg-gray-200 rounded-full p-2 hover:bg-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>  
                        </button>
                    ) : (
                        <button className="bg-gray-200 rounded-full p-2 hover:bg-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    )}

                </div>
            </div>

            {/* Accordion Body */}
            {showItems && (
                <div className="border-b pb-8 last:border-0">
                    <div className="grid gap-6">
                        {items.map((item) => {
                            const info = item?.card?.info;
                            return (
                                <div key={info?.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex-1 pr-4">
                                        {/* 2.1.2.a. Item Name */}
                                        <h4 className="font-medium text-gray-800 mb-1">
                                            {info?.name}
                                        </h4>

                                        {/* 2.1.2.b. Item Price */}
                                        <div className="text-green-600 font-medium mb-2">
                                            ₹{info?.price / 100 || info?.defaultPrice / 100}
                                        </div>

                                        {/* 2.1.2.c. Item Description */}
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {info?.description}
                                        </p>
                                    </div>

                                    {/* 2.1.2.d. Item Image */}
                                    {info?.imageId && (
                                        <div className="w-28 h-28 flex-shrink-0 relative">
                                            <button className="p-2 bg-black text-white rounded-lg shadow-lg absolute m-auto top-18 cursor-pointer">Add +</button>
                                            <div className="w-28 h-28">
                                                <img
                                                    src={CDN_URL + info?.imageId}
                                                    alt={info?.name}
                                                    className="w-full h-full object-cover rounded-lg "
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
```
- Note: We are lifting the states up, because sometimes we have to lift the states up if we want to control our children.


## Props Drilling:

Props drilling occurs when we need to pass data between components in React applications. This is a common challenge in larger applications.

Here are the key points to understand:

1. Component Hierarchy:
   - React apps have components arranged in a tree structure
   - Data can only flow from parent to child (one-way data flow)

2. The Drilling Problem:
   - When we need to pass data from a grandparent to a grandchild component
   - We must first pass it through the parent component
   - This chain of passing props through intermediate components is called "Props Drilling"

This becomes challenging when:
- Applications grow larger
- Component hierarchies become deeper
- Multiple components need the same data


## React Context: Global State Management
Q. What if our data is present somewhere and we want to access to somewhere else. How would we do that?
- In large applications, sometimes we need to have a global data that can access anywhere in our app, whatever nested level we are, whether we are in header, footer, itemlist, etc. And for that react gives us some super power known as react context.
- Using react context we can avoid props drilling.

Ex: Think of a data which can be needed anywhere in our application, we need to keep it in a central place. What type of data could it be?
- LoggedIn User: Once the user logged in, sometimes we need that login information inside header, card, footer, etc.
- Theme, etc


### Using useContext() Hook in React

useContext() hook allows us to access global data from React Context in any component. Here's how to use it:

1. Import the useContext hook and your context:
   ```jsx
   import { useContext } from 'react';
   import UserContext from './UserContext';
   ```

2. Call useContext() with your context:
   ```jsx
   const contextData = useContext(UserContext);
   ```

3. Access the context data in your component:
   ```jsx
   const { loggedInUser } = contextData;
   ```

This avoids prop drilling by giving direct access to context data from any component level.

```jsx
/**
 * UserContext.js (Global Storage)
 * 1. Create a Context:
 *    Provide some piece of information that it will hold. (global data)
*/
import { createContext } from "react";

const UserContext = createContext({
    loggedInUser: "Default User",
});
export default UserContext;

/**
 * Header:
 * - We can access this context in any component like Header using a react
 *   hook called useContext().
 * - Then get the context data:
*/
import UserContext from '../utils/UserContext';
import { useContext } from 'react';

const Header = () => {
    const {loggedInUser} = useContext(UserContext);
    return (
        <li className='px-4 font-bold'>{loggedInUser}</li>
    );
}
```

Context Provider: Dynamic Data Change in Context
useContext() hook and Context.Provider together form the complete system for using React Context:

1. Using Context.Provider:
   ```jsx
   // Wrap in App component with Provider
   <UserContext.Provider value={{loggedInUser: "Aslam"}}>
     <App />
   </UserContext.Provider>
   ```
   - Provider component updates the context value
   - New data can be passed through the value prop
   - All components inside Provider will have access to this data

2. Using useContext() hook:
   ```jsx
   // In any child component
   import { useContext } from 'react';
   import UserContext from './UserContext';
   
   const contextData = useContext(UserContext);
   const { loggedInUser } = contextData;
   ```
   - useContext() hook gives direct access to context data
   - Can be used in components at any level
   - Best solution to avoid props drilling

This way Provider supplies the data and useContext() consumes it. Together they create the complete React Context system.


```jsx

/**
 * UserContext.js: Create a Context
 * - Provide some piece of information that it will hold. (global data)
*/
import { createContext } from "react";

const UserContext = createContext({
    loggedInUser: "Default User",
});

export default UserContext;

/**
 * App.jsx: Providing new value to my context
 * 1. Fetch Username data 
 * 2. Store in a state
 * 3. Pass it to the <UserContext.Provider value={{userInfo: userInfo}}>, and wrap this whole App inside this UserContext.Provider. And now we can pass whatever value we can pass in.
 *    - loggedInUser becomes userInfo (Overriding the default value)
*/
const App = () => {
  const [username, setUsername] = useState({});

  useEffect(() => {
    const data = {
      name: "Aslam Paasa",
      email: "aslampaasa421@gmail.com",
    }
    setUsername(data.name);
  }, []);

  return (
    <UserContext.Provider value={{loggedInUser: username, setUsername}}> 
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
    </UserContext.Provider>
  );
};

/**
 * Note: 
 * 1. Context is a global state which we can provide to whole app, or some small portion of our app. 
 * 2. Outside of the provider the loggedInUser will be 'default value' and inside of the UserContext.Provider the loggedInUser will be 'Aslam'.
 * 3. We can create multiple contexts.
*/

/**
 * Body.jsx: Dynamic change global state
*/
import { useContext } from 'react';
import Shimmer from './Shimmer';
import UserContext from '../utils/UserContext';

const Body = () => {
  const {loggedInUser, setUsername} = useContext(UserContext);

  return listOfRestaurants.length === 0 ? (
    <div className="mt-28">
      <Shimmer />
    </div>
  ) : (
    <div className="body mt-28">
        {/* User Name Input Field */}
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
  );
};

export default Body;
```
- We will not use context, we will use redux.

## Feature: Login/Logout Button
- We will create the button in the header section like:

const Header = () => {

  return (
    <div className="header">
      {/* 1. Logo */}
      <div className="logo-container">
        <img src={LOGO_URL} alt="App Logo" className="logo" />
      </div>
      {/* 2. Nav Items: List of Nav Items, Login Button */}
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li>Cart</li>
          <button>Login</button>
          <button>Logout</button>
        </ul>
      </div>
    </div>
  );
};

- Now, we don't want to display both the buttons at the same time. 
- First we should display the login button, and when the user is logged in, we should display the logout button.
- For practice purposes, we just a state variable isLoggedIn which has a default value false (i.e. the user is not logged in by default), with only the login button shown in UI and on clicking the Login button, the value of the state variable is isLoggedIn would be changed to true, with only the logout button shown below:

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="header">

      {/* 1. Logo */}
      <div className="logo-container">
        <img src={LOGO_URL} alt="App Logo" className="logo" />
      </div>

      {/* 2. Nav Items: List of Nav Items, Login Button */}
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li>Cart</li>

          {
            (!isLoggedIn) ?
                (<button onClick={() => { setIsLoggedIn(true)}}>LogIn</button>) 
                : (<button onClick={() => { setIsLoggedIn(false)}}>LogOut</button>)
          }
        </ul>
      </div>
    </div>
  );
};

# Episode 12 - Let's Build Our Store
- In this episode, we are going to create our own Redux Store.
- We have learned about UI & Data Layer, and redux works in Data Layer
- We are going to learn, how we can manage:
  > state of our application using redux
  > data of our application using redux
    - put data into it
    - retrieve data from it
    - update data
    - delete data

1. Redux is not mandatory
   - Companies start using redux without even thinking that they even
     need redux or not.
   - When we build small & medium size application, we don't need 
     redux. But if we are building large scale application where the 
     data is heavily used, a lot of read and write operations are 
     happening in our UI application, a lot of components and a lot 
     of data is being transferred b/w these components, then using
     redux makes sense.

2. Redux and React are different libraries.
   - When we are building react application, redux is not required.
   - But we can use redux if we really need it.
   - It's a third-party library which we install in our react app.
   - And redux is not the only library to manage state, we have many
     other libraries like:
     > Zustand
     > Recoil

3. Redux offers easy debugging
   - Redux Dev Tools help use debug app when we use redux.

4. There are two librares that redux team offers:
   a. react-redux  : It acts as a bridge b/w react and redux
   b. redux toolkit: It is used for state management

5. Installation:
   - First, install both Redux Toolkit and React-Redux (Redux Toolkit is the recommended way to write Redux logic):
     ```jsx
     npm install @reduxjs/toolkit react-redux
     ```
   - That’s it! You’re ready to create your Redux store and start managing state in your React app.


# Building the Cart Feature (Step by Step for Beginners)

In this section, we will build a simple shopping cart feature for our app. We’ll go step by step and keep things easy to understand.

1. What is a Cart?
   A cart lets users select their favorite food items as they browse the 
   app. When a user clicks the "Add Food" button for a food item, that item
   goes into their cart—like putting groceries in a shopping basket. We 
   want the user to see all their chosen items on a special Cart page.

2. How Do We Keep Track of Cart Items?
   To make sure every part of our app can know what the user has added to 
   the cart, we’ll use something called Redux. Redux helps us keep all
   our cart information in one place, so it’s easy to access and manage 
   from any component in our app.

3. What Will We Build?
   - First, we’ll create a very simple Cart page that lists the items the 
     user has added.
   - Next, we will use Redux to store and control the cart’s data, making
     it easier to develop more features as we go.

4. Understanding Redux Basics
   - Redux Store: Think of the Redux store as a big container (a JavaScript
     object) that holds all the important data for our app in one central
     place.
   - Every component in the app can access this store—so it’s easy to read 
     from or write to, no matter where you are in your app.

5. Why do we need slices (User/Cart)?
   - In a real app, some data is needed everywhere:
     > User info: Login, Navbar, Profile
     > Cart info: Cart Page, Checkout, Header Count
   - So we store them in Redux as separate slices:
     > userSlice: handles user data
     > cartSlice: handles cart items
   - Each slice has one responsibility. 

6. Important Rule of Redux:
   - You cannot directly change data inside a slice.
     a. Wrong Thinking: "I'll just push them into array" ❌
     b. Redux says    : "Nope. Store is read-only." 

7. Then how does data go inside Cart or User Slice?
   - Redux gives one legal way: Dispatch an Action
   - You can't change the data yourself.
   - You request Redux to change.

8. When we click on the Add Button, how does the data goes inside the Cart?
   - We cannot directly Add data to the Cart Slice, means redux says we   
     cannot directly modify the cart slice, but there is a way to modify 
     data to the cart slice.
   - If we click on Add Button, we'll have to 'dispatch' an 'action'. 
     Action will call a function and this function modifies the cart.

9. What is this function actually?
   - This function is known as Reducer, which will update the slice.

10. We have modified the data, but how can we read modified read data in UI?
    - To read data from store in UI, we use 'selector', and this selector
      will display the modified react component.
    - And this phenomemon is know as Subscribing to the store.

11. Flow:
    - When we click on 'ADD' Button, it will 'dispatch(action)'.
    - 'dispatch(action)' will call a reducerFn. 
    - reducerFn updates the slice of our redux store.
    - Cart Component is subscribed to the store using 'selector'. So, it 
      automatically reflect the updated data in the Cart Component.

12. Cart Implementation:
    - Install @reduxjs/toolkit and react-redux: 
    - Build our store
    - Connect our store to our app
    - Slice (cartSlice)
    - dispatch(action)
    - Selector
```jsx
/**
 * 1. Cart Slice:
 *    > Each slice for each feature
 *    > createSlice is a function that takes a configuration object to
 *      create a slice for our feature
 *      a. name        : The name of the slice
 *      b. initialState: The initial value of the slice (default value)
 *      c. reducers    : functions that modify the cart state (actions)
 *         > addItem    : action to add an item to the cart
 *         > removeItem : action to remove an item from the cart
 *         > clearCart  : action to clear the cart
 *      d. actions gets access to two things:
 *         > State         : current state of the cart
 *         > action.payload: data that we want to pass to the action
 *      e. Example:
 *         > state is initialState: { items: [] }
 *         > action.payload is { id: 1, name: "Pizza", price: 100 }
 *           - Pushing data to cart   : state.items.push(action.payload)
 *           - Popping data from cart : state.items.pop()
 *           - Clearing data from cart: state.items = [] (empties the cart)
 *      f. Export the cart actions & reducers:
 *         > Export addItem, removeItem, clearCart so you can update the cart
 *           from any component using dispatch.
 *         > Export the cart reducer for appStore.js so the store can keep
 *           track of cart items.
 */
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: ["burger", "pizza"],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items.length = 0; // state = []
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

```jsx
/**
 * 2. App Store: Creating our main Redux Store
 *    - configureStore is a function that creates a store for our app
 *    - reducer is the combination of different small stores
 *    - We'll add slices to the store (cartSlice)
*/ 
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default appStore;
```


```jsx
/* App.jsx */ 
import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import cartReducer from './utils/cartSlice';

const App = () => {
  /* 3. Provide the store data as props to the app */ 
  return (
    <Provider store={appStore}> 
      <UserContext.Provider value={{ loggedInUser: username, setUsername }}>
        <div className="app">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};
```

```jsx
/* 4. Header.jsx: Subscribe to the cart store */ 
import { useSelector } from "react-redux";

const Header = () => {
  /* Selector Hook: To read the updated store data */ 
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between items-center bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50 px-4 py-2">
      <nav className="flex items-center">
        <ul className="flex items-center space-x-6 font-medium">
          <li className="px-4 font-bold">Cart - ({cartItems.length} items)</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
```

13. Refactoring:
```jsx
/**
 * 1. Cart Slice:
 */
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items.length = 0; // state = []
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

```jsx
/**
 * 2. App Store: Creating our main Redux Store
*/ 
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default appStore;
```


```jsx
/**
 * App.jsx:
 * > Provide the store data as props to the app
 */ 
import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import cartReducer from './utils/cartSlice';

const App = () => {
  /* 3.  */ 
  return (
    <Provider store={appStore}> 
      <UserContext.Provider value={{ loggedInUser: username, setUsername }}>
        <div className="app">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};
```

```jsx
/**
 * 4. Items List: Dispatch an Action
*/
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const RestaurantCategory = ({ title, items, showItems, setShowIndex }) => {
  /* Dispatch an action: dispatch(addItem(action.payload: "pizza")) */
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div>
      {/* 2.1.2.d. Item Image */}
      {info?.imageId && (
        <div>
          <button
            onClick={() => handleAddItem(item)}
                      >
            Add +
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;


```
```jsx
/**
 * 5. Header.jsx: 
 *    > Subscribe to the cart store 
 *    > To read the updated store data
 */ 
import { useSelector } from "react-redux";

const Header = () => {
  /*  */ 
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between items-center bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50 px-4 py-2">
      <nav className="flex items-center">
        <ul className="flex items-center space-x-6 font-medium">
          <li className="px-4 font-bold">Cart - ({cartItems.length} items)</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
```

```jsx
/* Cart.jsx: Display Cart Items, Remove and Clear Actions: */
import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { clearCart, removeItem } from "../utils/cartSlice";

const CartItem = ({ item, onRemove }) => {
  const info = item?.card?.info;

  return (
    <div className="flex gap-4 p-4 border-b last:border-b-0">
      {/* IMAGE */}
      {info?.imageId && (
        <img
          src={CDN_URL + info.imageId}
          alt={info.name}
          className="w-24 h-24 object-cover rounded-xl"
        />
      )}

      {/* DETAILS */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{info?.name}</h3>

        <p className="text-green-600 font-semibold mt-1">
          ₹{(info?.price || info?.defaultPrice) / 100}
        </p>

        {info?.description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {info.description}
          </p>
        )}
      </div>

      {/* REMOVE */}
      <button
        onClick={() => onRemove(item)}
        className="px-3 py-1 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
      >
        Remove
      </button>
    </div>
  );
};

const Cart = () => {
  /* Fetching cartItems */ 
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => dispatch(clearCart());
  const handleRemoveItem = (item) => dispatch(removeItem(item));

  const totalPrice = cartItems.reduce((total, item) => {
    const price =
      item?.card?.info?.price || item?.card?.info?.defaultPrice || 0;
    return total + price / 100;
  }, 0);

  /* EMPTY CART */
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Your cart is empty 🛒
        </h1>
        <p className="text-gray-500">Add some delicious food to see it here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT – ITEMS */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Cart Items ({cartItems.length})
          </h2>

          <button
            onClick={handleClearCart}
            className="text-sm text-red-600 hover:underline"
          >
            Clear Cart
          </button>
        </div>

        <div>
          {cartItems.map((item, index) => (
            <CartItem
              key={item?.card?.info?.id || index}
              item={item}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
      </div>

      {/* RIGHT – SUMMARY */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 h-fit sticky top-24">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

        <div className="flex justify-between text-gray-600 mb-2">
          <span>Items Total</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600 mb-4">
          <span>Delivery Fee</span>
          <span className="text-green-600">FREE</span>
        </div>

        <div className="border-t pt-4 flex justify-between items-center">
          <span className="text-lg font-bold">Total</span>
          <span className="text-2xl font-bold text-green-600">
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>

        <button className="w-full mt-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-lg">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
```