import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Error from "./components/Error";
import "./index.css";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import UserContext from "./utils/UserContext";
/**
 * Lazy Loading:
 */
import { lazy, Suspense } from "react";
const Grocery = lazy(() => import("./components/Grocery"));

const App = () => {
  const [username, setUsername] = useState();

  useEffect(() => {
    const data = {
      name: "Aslam Paasa",
      email: "aslampaasa421@gmail.com",
    };
    setUsername(data.name);
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser: username, setUsername }}>
      <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

/**
 * 1. Create a Browser Router: It will take an object of paths
 *    a. '/'        : App Component
 *    b. '*'        : Error Component
 * 2. Create Children Route (Outlet):
 *    a. '/'        : Body Component
 *    b. '/about'   : About Component
 *    c. '/contact' : Contact Component
 * 3. Header and Footer is intact, but my Outlet is getting filled with the
 *    component that is passed as a children into the Parent Component (App)
 *    a. '/'        : Header + Body + Footer
 *    b. '/about'   : Header + About + Footer
 *    c. '/contact' : Header + Contact + Footer
 */
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
  },
]);

export default appRouter;
