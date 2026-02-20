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

8. Create a login-page using Formik Library