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