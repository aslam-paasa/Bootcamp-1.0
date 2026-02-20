/**
 * Light and Dark Mode using Context API:
 * Managing global states like themes is a common requirement in modern
 * application, and the React Context API provides an efficient solution.
 * Here, we'll create a theme switcher to toggle between light and dark mode,
 * enhancing user experience with dynamic styling. This task emphasizes key
 * concepts like creating and using context, sharing state across components,
 * and applying styles dynamically.
 * 
 * It's a particular way to understand global state management while preparing
 * for interview challenges that test your ability to implement scalable
 * and reusable solutions.
*/

/**
 * Problem Statement:
 * The Context API is used here to efficiently manage the theme across the
 * application without passing props through multiple levels. By using
 * ThemeProvider, any component can access the theme value and toggleTheme
 * function directly, no matter how deep it is in the component tree. This
 * keeps the code clean, organized, and easy to scale, especially for shared
 * states like themes.
 * 
 * Objectives:
 * 1. Access the current theme (light or dark)
 * 2. Toggle between themes using a single button. 
 * 3. Dynamically update styles based on the selected theme.
*/

/**
 * Step-1: Creating the Context Provider
 * The ThemeProvider is responsible for managing the theme state and providing
 * it to the application.
 * 1. ThemeContext : Acts as a central store for the theme and toggleTheme fn.
 * 2. ThemeProvider: Maintains the theme state and provides theme and 
 *                   toggleTheme to its children.
 * 3. Custom Hook  : useTheme() simplifies to the context, allowing components
 *                   to consume the theme and toggleTheme values easily.
*/



/**
 * Step-2: Using the Theme in a Component:
 * The About component consumes the context to access the current theme and
 * toggle functionality.
 * 1. Accessing Context: The useTheme hook retrieves the current theme and
 *    toggleTheme function.
 * 2. Dynamic Styling: Styles for background and text color update based on
 *    the theme value.
 * 3. Theme Toggle: The 'Switch Mode' button calls toggleTheme, changing the
 *    theme state.
*/

/**
 * Step-3: Integrating the Theme Provider:
 * Wrap the application in ThemeProvider to provide the context.
 * 1. Context Wrapping: ThemeProvider wraps the application, ensuring all
 *    components have access to the theme context.
 * 2. Routing: The About component demonstrates context consumption and
 *    theme switching.
*/



import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import { ThemeProvider } from "./Context/ThemeContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/about" Component={About} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App


/**
 * Key Points:
 * 1. Global State Management: Context API eliminates prop drilling by
 *    providing a centralized state management system.
 * 2. Reusable Provider: The ThemeProvider is reusable and scalable for
 *    other global states like authentication or language setting.
 * 3. Dynamic Styling: Real-time updates to styling using the theme value
 *    enhance user experience.
 * 4. Custom Hooks: useTheme simplifies context consumption, making the
 *    code cleaner and more maintainable.
*/


/**
 * Interview Tips:
 * 1. Explain Context API Usage: Highlight how Context API reduces prop drilling
 *    and simplifies global state management.
 * 2. State Management: Discuss how the theme state is updated and shared
 *    across components using ThemeProvider.
 * 3. Dynamic Styling: Emphasize how the UI adapts based on the current theme
 *    using conditional styles.
 * 4. Propose Enhancements: Suggest adding animations during theme transitions
 *    or persisting the theme in local storage.
*/