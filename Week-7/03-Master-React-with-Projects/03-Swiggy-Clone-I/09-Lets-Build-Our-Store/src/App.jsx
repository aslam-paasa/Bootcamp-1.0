import './index.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import RestaurantMenu from './components/RestaurantMenu';
import Error from './components/Error';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Cart from './components/Cart';

import { lazy, Suspense } from 'react';
const Grocery = lazy(() => import('./components/Grocery'));

const App = () => {
  const [username, setUsername] = useState();

  useEffect(() => {
    const data = {
      name: "Aslam Paasa",
      email: "aslampaasa421@gmail.com",
    }
    setUsername(data.name);
  }, []);

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


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/grocery',
        element: <Suspense fallback={<h1>Loading...</h1>}><Grocery /></Suspense>,
      },
      {
        path: '/restaurant/:resId',
        element: <RestaurantMenu />,
      },
      {
        path: '/cart',
        element: <Cart />
      }
    ],
  },
]);

export default appRouter;