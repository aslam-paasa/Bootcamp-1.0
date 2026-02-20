/**
 * Sibling-to-Sibling Data Passing:
 * > Use parent component for simple cases
 * > Use Context/Redux for complex cases
 * > Never use global variables
*/

/**
 * Approach-1: Global Variables (worst approach)
*/

/**
 * File-1: global.js
 */
window.sharedState = {
  data: null
};

/**
* File-2: Sibling1.jsx
*/
function Sibling1() {
  return (
      <button onClick={() => window.sharedState.data = "Hello"}>
          Update Data
      </button>
  );
}

/**
* File-3: Sibling2.jsx
*/
function Sibling2() {
  return <div>{window.sharedState.data}</div>;
}


/**
* Problems with Approach-1:
* 1. Unpredictable updates
* 2. Hard to debug
* 3. No reactivity
*/

/**
* Better Approach: Parent Component se data pass karna
*/

/**
* File-1: ParentComponent.jsx
*/
function ParentComponent() {
  const [sharedData, setSharedData] = useState(null);

  return (
      <div>
          <Sibling1 onUpdate={setSharedData} />
          <Sibling2 data={sharedData} />
      </div>
  );
}

/**
* File-2: Sibling1.jsx
*/
function Sibling1({ onUpdate }) {
  return (
      <button onClick={() => onUpdate("Hello")}>
          Update Data
      </button>
  );
}

/**
* File-3: Sibling2.jsx
*/
function Sibling2({ data }) {
  return <div>{data}</div>;
}


/**
* Benefits:
* 1. Controlled data flow
* 2. Predictable updates
* 3. Easy to manage
*/


/**
* Approach-3: Context API/Redux
*/

/**
* File-1: DataContext.jsx
*/
const DataContext = createContext();

function DataProvider({ children }) {
  const [sharedData, setSharedData] = useState(null);

  return (
      <DataContext.Provider value={{ sharedData, setSharedData }}>
          {children}
      </DataContext.Provider>
  );
}

/**
* File-2: Sibling1.jsx
*/
function Sibling1() {
  const { setSharedData } = useContext(DataContext);

  return (
      <button onClick={() => setSharedData("Hello")}>
          Update Data
      </button>
  );
}

/**
* File-3: Sibling2.jsx
*/
function Sibling2() {
  const { sharedData } = useContext(DataContext);
  return <div>{sharedData}</div>;
}


/**
* Benefits:
* 1. Centralized state management
* 2. No prop drilling
* 3. Better Scalability
*/



const App = () => {
  return (
    <div>
      <h1>Sibling to Sibling Data Passing</h1>
      <ParentComponent />
    </div>
  )
}

export default App
