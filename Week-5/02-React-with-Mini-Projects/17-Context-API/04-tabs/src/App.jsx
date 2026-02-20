/**
 * Challenge: Tabs
 * Given the completed JSX, finish the app so that the correct tab content
 * is shown when a tab is clicked.
 * 
 * This challenge is deliberately vague. You'll need to carefully examine 
 * the final app as well as each component and what props it receives to
 * figure out how to complete the challenge.
 * 
 * Once finished, you should have a working tabs implementation that is
 * hyper flexible and not coupled at all to the current layout of the app.
 * 
 * Tasks:
 * 1. Show the correct tab content when a tab is clicked
 * 
 * Hint:
 * 1. In order to make our tabs "hyper flexible", we want to put the state
 *    for managing them on context so it can be accessed or updated from
 *    anywhere in our component tree.
 * 
 *    function TabProvider({ children, defaultValue }) {
 *       const [activeTabValue, setActiveTabValue] = useState(defaultValue);
 *
 *       return (
 *          <tabContext.Provider value={{ activeTabValue, setActiveTabValue }}>
 *             {children}
 *          </tabContext.Provider>
 *       );
 *    }
 * 
 *   Since TabProvider accepts a 'defaultValue' prop, we'll use that to set
 *   the initial state of our tabs when we useState
 * 
 * 2. Now that we've put our state on context, the next thing we need to do
 *    is update it from within the app. This is what TabTrigger is used for.
 * 
 *    After getting our context values, inside of handleSetActiveTabValue,
 *    we'll call setActiveTabValue passing it the value prop that TabTrigger
 *    receives to update activeTabValue when a tab is clicked.
 * 
 * function TabTrigger({ value, children }) {
 *    const { activeTabValue, setActiveTabValue } = useContext(tabContext);
 *
 *    const handleSetActiveTabValue = () => {
 *      setActiveTabValue(value);
 *    };
 *
 *    return (
 *      <button
 *        onClick={handleSetActiveTabValue}
 *        className={`tab ${activeTabValue === value ? "active" : ""}`}
 *      >
 *        {children}
 *      </button>
 *    );
 *  }
 * 
 * That's a lot of words. Basically now whenever a tab is clicked activeValue
 * will be updated accordingly.
 * 
 * 3. Now that our state is on context and we can update it via TabTrigger,
 *    the only other thing to do is display the correct tab content. To do
 *    this inside of TabContent, we'll get the current value of activeTabValue
 *    from context and compare it to the value prop that TabContent receives.
 * 
 *    If they match, we'll return the children prop that TabContext receives.
 *    Otherwise, we'll return null.
 * 
 *    function TabContent({ children, value }) {
 *       const { activeTabValue } = useContext(tabContext);
 *   
 *       if (activeTabValue !== value) {
 *         return null;
 *       }
 *
 *       return children;
 *    }
*/

import './App.css'
import { useState, useContext } from 'react' 

const tabContext = createContext({
  activeTabValue: null,
  setActiveTabValue: () => {}
});

function TabProvider({ children, defaultValue }) {
  const [activeTabValue, setActiveTabValue] = useState(defaultValue);

  return (
    <tabContext.Provider value={{ activeTabValue, setActiveTabValue }}>
      {children}
    </tabContext.Provider>
  );
}

function TabTrigger({ value, children }) {
  const { activeTabValue, setActiveTabValue } = useContext(tabContext);

  const handleSetActiveTabValue = () => {
    setActiveTabValue(value);
  };

  return (
    <button
      onClick={handleSetActiveTabValue}
      className={`tab ${activeTabValue === value ? "active" : ""}`}
    >
      {children}
    </button>
  );
}

function TabContent({ children, value }) {
  const { activeTabValue } = useContext(tabContext);

  if (activeTabValue !== value) {
    return null;
  }

  return children;
}

function App() {
  return (
    <section>
      <h1>Tabs</h1>
      <TabProvider defaultValue="tab-1">
        <div className="tabs">
          <TabTrigger value="tab-1">Tab 1</TabTrigger>
          <TabTrigger value="tab-2">Tab 2</TabTrigger>
          <TabTrigger value="tab-3">Tab 3</TabTrigger>
        </div>
        <TabContent value="tab-1">Tab Content 1</TabContent>
        <TabContent value="tab-2">Tab Content 2</TabContent>
        <TabContent value="tab-3">Tab Content 3</TabContent>
      </TabProvider>
    </section>
  );
}

export default App
