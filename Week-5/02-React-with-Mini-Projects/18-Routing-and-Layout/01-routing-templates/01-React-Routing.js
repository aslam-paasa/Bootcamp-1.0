/**
 * In this lecture, Harkirat covers key concepts in React development,
 * specifically focusing on routing, prop drilling, and the Context API.
 * Routing is vital for managing navigation in React Applications, while
 * prop drilling and the Context API addresses challenges related to
 * passing data between components. These insights provide essential
 * knowledge for building well-organized and effective React projects.
*/

/**
 * React Routing:
 * Routing in React is a mechanism that allows you to manage navigation
 * and control the content displayed in your application based on the
 * URL. It's essential for several reasons:
 * 
 * 1. Multi-Page Applications(MPAs):
 *    In traditional web development, navigating between pages required
 *    a full page reload. React, being a Single Page Application(SPA)
 *    library, loads a single HTML page and dynamically updates the content
 *    as users navigate. Routing enables SPAs to mimic the behavior of
 *    traditional MPAs by updating the view based on the URL.
 * 
 * 2. User Experience:
 *    Routing enhances the overall user experience by providing a
 *    seamless and dynamic interface. Users can navigate between views
 *    or sections of your application without experiencing the delays
 *    associated with full-page reloads.
 * 
 * 3. Bookmarking and Sharing:
 *    With routing, each view in your React application can have a
 *    unique URL. This allows users to bookmark specific pages or share
 *    URLs with others, making the application more user-friendly and
 *    SEO-friendly.
 * 
 * 4. Code Organization:
 *    As your application grows, organizing code into separate components
 *    and views become crucial. Routing helps structure your code by
 *    associating components with specific routes, making it easier to
 *    manage and maintain.
 * 
 * 5. State Preservation:
 *    When users navigate between different views, routing helps preserve
 *    the state of the application. React Router, a popular routing
 *    library for React, allows you to pass parameters and state between
 *    different components based on the route.
 * 
 * 6. Conditional Rendering:
 *    Routing enables conditional rendering of components based on the
 *    current URL. Different components or views can be displayed
 *    depending on the route, allowing you to create dynamic and 
 *    context-aware user interfaces.
 * 
 * To implement routing in a React application, developers often use
 * libraries like React Router. React Router provides a set of 
 * components and functions to define routes, handle navigation, and
 * manage the application's history, making it an essential tool for
 * building robust and navigable React Applications.
*/

/**
 * Before we go into Routing, few Jargons we need to know:
 * 1. Single Page Applications
 * 2. Client Side Bundle
 * 3. Client Side Routing
*/

/** 
 * 1. Single Page Application:
 * => React is a single page application. 
 * => Before React was a thing, how websites were created. There is a
 *    linkedIn.com website, if you go to this website in your browser.
 *    You send an HTTP request and you get back and index.html file
 *    index.js etc files. This is how websites were supposed to be
 *    build.
 * => But if I change my page to linkedIn.com/messages, if I click on
 *    it during pre-React days, it basically send a request and got
 *    a new index.html, js etc file as response, and a new page get
 *    rendered. This is hard reload of page, which basically means 
 *    we can see a white screen for a second then eventually index.html
 *    would come back and then we can see the new rendered page. And
 *    this is how things were done until React came into the picture.
 * => React let's you create single page application, which basically
 *    means, only the first time when I go to linkedIn.com we get all
 *    the files. As I change pages like click on a button and go to a
 *    messages tab, there is no need for more HTML, CSS, JS to come.
 *    It all came in the first go itself. It's a Single Page Application.
 * 
 * 
 * A Single Page Application(SPA) is a type of web application or website
 * that interacts with the user by dynamically rewriting the current page,
 * rather than loading entire new pages from the server.
 * 
 * 
 * => We have Single Page here, we are just changing the view on the
 *    screen rather than doing a hard reload.
 * 
 * Q. Does it mean if I am on a page on linkedIn.com, if I go to the
 *    messages tab, no HTML, JS comes bacK?
 * => Almost. 
 * => We can optimize our App so that if we click on messages, the part
 *    of messages or the bundle that contain the code of messages comes
 *    back after we click on it. This bundle is an optimization.
 * => If we don't want to do optimization, then we can do that the
 *    full code will come together which contain the whole code of all
 *    our pages and even if we change our pages, not more HTML comes,
 *    only "Client Side Routing" happens, and this is what we will learn
 *    today.
*/ 

/** 
 * 2. Client Side Bundle:
 * => Client Side Bundle is the bundle that we are get from the backend.
 * => More specifically, Collection of JS files with other assets like
 *    HTML, CSS. Fonts, Images etc are bundled together to be delivered
 *    to the Client's web browser is called bundle. 
 * => This is our final very big JS file which contains all our code of
 *    linked.com and we get this single JS file from the server and do 
 *    Client Side Routing based on what page we are in, we show that on
 *    the screen.
*/

/**
 * 3. Client-Side Routing:
 * => Client-Side Routing refers to the process of managing navigation
 *    within a Sigle Page Application(SPA) entirely on the client side,
 *    without making additional requests to the server for each new
 *    view.
*/


/** 
 * Key Characteristics:
 * 1. Single Page Application:
 * => There is where we dynamically changing the page and not refetching
 *    something from the backend.
 * 
 * Key Characteristics of Single Page Application::
 * a. Loads a single HTML page initially.
 * b. Subsequent interactions and navigation are handled by dynamically
 *    updating the content on the page through JavaScript.
 * c. Utilizes AJAX or Fetch API to communicate with the server and
 *    fetch data without reloading the entire page.
 * d. Provides a more fluid and seamless user experience by avoiding
 *    full-page reloads.
 * 
 * 2. Client Side Bundle:
 * => Big bundle that we get on the client that has all our JS code.
 * 
 * Key Components of Client Side Bundle:
 * a. JavaScript Files: 
 *    The applications's logic and functionality are written in JS files.
 *    Bundling involves combining these files into a single or multiple
 *    bundles.
 * b. Stylesheets, images and Other Assets:
 *    Along with JavaScript, other assets like stylesheets, images, and
 *    fonts may be included in the bundle for efficient delivery to the
 *    client.
 * 
 * Advantages:
 * a. Reduces the number of HTTP requests, improving loading times.
 * b. Enables code splitting and lazy loading for optimizing performance.
 * c. Simplifies development and maintenance by organizing code into
 *    manageable bundles.
 * 
 * 3. Client Side Routing:
 * => The code that we write as a developer to make sure that if the
 *    user is on msg page, show them their messages.
 * 
 * Key Characteristics of Client-Side Routing:
 * a. Utilizes the browser's History API to manipulate the URL without
 *    triggering full page reloads.
 * b. Enables dynamic content updates based on the route, improving
 *    user experience.
 * c. Typically implemented user libraries like React Router for React
 *    applications or Vue Router for Vue.js applications.
 * 
 * Advantages:
 * a. Enhances the performance of SPAs for avoiding the need for server
 *    round-trips during navigation.
 * b. Allows for a smoother and more responsive user interface as content
 *    is updated dynamically.
 * c. Enables bookmarking, sharing and direct linking to specific views
 *    within the SPA.
 * */

/**
 * Q. What are routes?
 * => linkedIn.com/feed/ 
 * 
 * Q. How do we create an application where we handle these routes in
 *    which we can render a specific page given a route?
 * => react-router-dom [This is a router for dom in react]
*/


/**
 * React Router DOM:
 * In React, routing is commonly achieved using the React Router DOM 
 * library, which provides a set of components for handling navigation
 * within a React Application. The main components involved in React
 * Router DOM are:
 * 1. BrowserRouter,
 * 2. Routes,
 * 3. Route,
 * 
 * Here's an overview of how routing is typically implemented using these
 * components:
*/