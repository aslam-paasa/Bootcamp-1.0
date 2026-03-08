/**
 * Lazy Loading:
 * Lazy Loading in React is a technique used to optimize the performance
 * of a web application by deferring the loading of certain components
 * until they are actually needed. This can significantly reduce the
 * initial bundle size and improve the overall loading time of the
 * application.
 * 
 * In React, lazy loading is typically achieved using the React.lazy
 * function along with the 'Suspense' component. The React.lazy function
 * allows you to load a component lazily, meaning it is only fetched
 * when the component is actually rendered. Here's a simple example:
*/

/**
 * React Suspense:
 * In React, Suspense is a component that enables a better experience
 * for handling asynchronous operations such as code-splitting and
 * lazy loading. It's used in conjunction with React.lazy for lazy
 * loading components or with data fetching functions.
 * 
 * When you're using React.lazy to load a component lazily, you wrap it
 * with 'Suspense' to specify a fallback UI that will be rendered while
 * the component is being loaded. The 'fallback' prop of 'Suspense' 
 * defines what to display during the loading period.
 * */ 


import React, { Suspense } from 'react';

const MyLazyComponent = React.lazy(() => import('./MyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyLazyComponent />
      </Suspense>
    </div>
  );
}


/**
 * In this example, if MyLazyComponent is not yet loaded, the 'Suspense'
 * component will render the "Loading..." message as the fallback until
 * the component is fully loaded and ready to be displayed.
 * */ 

/**
 * The mechanism is particularly useful for improving the user experience
 * when dealing with dynamic loading of components or fetching data
 * asynchronously. The 'fallback' UI gives users feedback that something
 * is happening in the background, making the application feel more
 * responsive.
*/