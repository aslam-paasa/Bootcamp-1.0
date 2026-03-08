/**
 * TOPIC: Sibling to Sibling Data Passing in React
 * 
 * First, what is a "sibling" component?
 * Two components are siblings when they live inside the
 * same parent. Just like siblings in a family share the
 * same mom and dad.
 *
 *        <Parent>
 *          <Sibling1 />   ← these two are siblings
 *          <Sibling2 />   ← these two are siblings
 *        </Parent>
 *
 * The problem we are solving:
 * Sibling1 has a button. When clicked, Sibling2 should
 * show the updated value. But siblings cannot talk to
 * each other directly. React only allows data to flow
 * TOP DOWN — from Parent to Child via props.
 *
 * So how do we make siblings share data?
 * Let's go through 3 approaches.
 */

import { useState, createContext, useContext } from "react";


/**
 * APPROACH 1 — Global Variables ❌
 * Idea: Store the shared data in a global variable on the
 * window object. Both siblings can read and write to it directly.
 *
 * Think of it like leaving a note on the kitchen table.
 * Any family member can read or change the note at any time.
 *
 * WHY THIS BREAKS:
 *
 * 1. React does not know the note changed:
 *    When Sibling1 writes to window.sharedState.data, it is
 *    just changing a plain JavaScript variable. React has a
 *    special system for tracking changes — and plain variables
 *    are NOT part of that system. So React never re-renders
 *    Sibling2. The screen stays blank forever, even though
 *    the data DID change in memory.
 *    In simple words: the variable updates, but the screen does not.
 *
 * 2. You have no idea who changed the data or when:
 *    Any component in the whole app can write to window.sharedState.
 *    If the data is wrong, you have to check every single file
 *    to find who changed it. This is exhausting to debug.
 *
 * 3. You cannot reuse these components:
 *    Both components are permanently tied to window.sharedState.
 *    You cannot use Sibling1 in a different part of the app
 *    with different data. It always reads from the same global.
 */

/* ❌ Shared data lives outside React, in a plain JS variable */
window.sharedState = {
  data: null,
};

/**
 * ❌ Sibling1 writes directly to the global variable when clicked.
 *     React is not involved at all — no re-render happens anywhere.
*/ 
function Sibling1Global() {
  return (
    <button onClick={() => (window.sharedState.data = "Hello from Sibling1")}>
      Update Data
    </button>
  );
}

/** 
 * ❌ Sibling2 tries to read from the global variable.
 *    But since React never re-rendered this component after the click,
 *    it always shows the original value (null) — the screen stays blank.
*/ 
function Sibling2Global() {
  return <div>{window.sharedState.data}</div>;
}


/**
 * APPROACH 2 — Lifting State Up ✅
 * This is the standard React way to share data between siblings.
 *
 * The core idea is called "Lifting State Up".
 * Instead of siblings trying to communicate directly with each
 * other, we move (lift) the shared data UP into the Parent.
 * The Parent becomes the middleman.
 *
 * Think of it like two siblings who want to share a toy.
 * Instead of passing it directly, they both go through mom.
 * Sibling1 gives the toy to mom. Mom gives it to Sibling2.
 *
 * How it works in code:
 * - Parent holds the shared data in its own useState.
 * - Parent gives Sibling1 a function (onUpdate) to update that state.
 * - Parent gives Sibling2 the current value of that state (data).
 * - When Sibling1 clicks the button, it calls onUpdate.
 * - Parent's state updates → React re-renders everything.
 * - Sibling2 now receives the new value through its prop and shows it.
 *
 * The flow every time the button is clicked:
 *   Button clicked in Sibling1
 *   → Sibling1 calls onUpdate("Hello")
 *   → Parent's setSharedData runs → state changes
 *   → React re-renders Parent
 *   → Sibling2 gets new data prop
 *   → Sibling2 shows the new value on screen ✅
 *
 * HOW THIS FIXES APPROACH 1:
 *
 * 1. Screen always updates:
 *    State is in useState now. React watches useState values.
 *    Any change triggers a re-render. The screen is always
 *    in sync with the data.
 *
 * 2. One clear source of truth:
 *    The data lives in the Parent only. You always know
 *    exactly where to look if something is wrong.
 *
 * 3. Predictable:
 *    Data flows in one direction: Parent → Children.
 *    No surprises, no hidden mutations.
 *
 * LIMITATION:
 *    This works great when siblings are close in the tree.
 *    But imagine the app grows and Sibling1 and Sibling2 are
 *    buried 5 levels deep inside different parts of the app.
 *    You would need to pass props through every level in between
 *    just to get the data where it needs to go.
 *    This is called "prop drilling" and it gets very messy.
 *    Approach 3 solves this.
 */

/* ✅ Parent owns the shared data and acts as the middleman */
function ParentComponent() {
  const [sharedData, setSharedData] = useState(null);

  return (
    <div>
      {/* Sibling1 gets a function to UPDATE the shared data */}
      <Sibling1LiftedUp onUpdate={setSharedData} />

      {/* Sibling2 gets the current VALUE of the shared data */}
      <Sibling2LiftedUp data={sharedData} />
    </div>
  );
}

/** 
 * ✅ Sibling1 does not own or know about any state.
 *    Its only job: call onUpdate when the button is clicked.
 *    Sibling1 has no idea Sibling2 even exists.
*/ 
function Sibling1LiftedUp({ onUpdate }) {
  return (
    <button onClick={() => onUpdate("Hello from Sibling1")}>
      Update Data
    </button>
  );
}

/**
 * ✅ Sibling2 does not own or know about any state.
 *    Its only job: display whatever data the Parent passes down.
 *    Sibling2 has no idea Sibling1 even exists.
*/ 
function Sibling2LiftedUp({ data }) {
  return <div>{data ?? "Waiting for data..."}</div>;
}


/**
 * APPROACH 3 — Context API ✅✅
 * Approach 2 is great. But it has one weakness: prop drilling.
 *
 * What is prop drilling?
 * Imagine your app looks like this:
 *
 *   App
 *   └── Page
 *       └── Section
 *           └── Card
 *               ├── Sibling1   (needs to update shared data)
 *               └── Sibling2   (needs to read shared data)
 *
 * With Approach 2, you would need to pass sharedData and
 * setSharedData as props through App → Page → Section → Card
 * just so the siblings can use them. That is 4 levels of
 * passing props that those middle components do not even need.
 * This is prop drilling — and it makes code messy and fragile.
 *
 * Context API is React's built-in solution for this.
 * It creates a "shared store" that any component can plug into
 * directly, no matter where it sits in the tree.
 *
 * Think of it like WiFi.
 * The router (DataProvider) broadcasts the signal.
 * Any device (component) in range can connect directly.
 * You do not need to string a cable (prop) through every
 * wall (parent component) to get to the device.
 *
 * How it works in 3 steps:
 *
 * Step 1 — createContext():
 *    Creates the shared channel. Think of it as buying the router.
 *
 * Step 2 — DataProvider:
 *    This component holds the shared state and "broadcasts" it
 *    using <DataContext.Provider value={...}>.
 *    Any component wrapped inside DataProvider can receive it.
 *
 * Step 3 — useContext(DataContext):
 *    Any component calls this to "connect to the WiFi" and
 *    get the shared state directly. No props needed at all.
 *
 * HOW THIS FIXES APPROACH 2:
 *
 * 1. No prop drilling:
 *    Sibling1 and Sibling2 connect to context directly.
 *    Middle components (Page, Section, Card) do not need to
 *    know about the shared data at all.
 *
 * 2. Scales with your app:
 *    As more components need the shared data, they just call
 *    useContext. No restructuring of the component tree needed.
 *
 * 3. One place for shared state:
 *    All shared state lives in DataProvider. Clean and organized.
 */

/**
 * Step 1 — Create the shared channel
 * - DataContext is just an empty channel right now.
 * - DataProvider below will fill it with real data.
*/
const DataContext = createContext();

/**
 * Step 2 — DataProvider holds the state and broadcasts it.
 * - Any component wrapped inside <DataProvider> can access
 *   sharedData and setSharedData directly using useContext.
*/ 
function DataProvider({ children }) {
  const [sharedData, setSharedData] = useState(null);

  /* value={{ sharedData, setSharedData }} is what gets broadcast. */
  /* Both the current value AND the update function are shared.    */
  return (
    <DataContext.Provider value={{ sharedData, setSharedData }}>
      {children}
    </DataContext.Provider>
  );
}

/**
 * Step 3 — Sibling1 connects to context and gets setSharedData.
 * - No props from any parent needed. It connects directly.
*/ 
function Sibling1Context() {
  const { setSharedData } = useContext(DataContext);

  return (
    <button onClick={() => setSharedData("Hello from Sibling1 via Context")}>
      Update Data
    </button>
  );
}

/**
 * Step 3 — Sibling2 connects to context and gets sharedData.
 * - No props from any parent needed. It connects directly.
 * - When Sibling1 updates sharedData, Sibling2 re-renders automatically.
*/ 
function Sibling2Context() {
  const { sharedData } = useContext(DataContext);

  return <div>{sharedData ?? "Waiting for data..."}</div>;
}

/** 
 * Parent only needs to wrap the siblings in DataProvider.
 * - It does not manage any state itself — Context handles it all.
*/
function ParentWithContext() {
  return (
    <DataProvider>
      <Sibling1Context />
      <Sibling2Context />
    </DataProvider>
  );
}


/**
 * APP
 */
const App = () => {
  return (
    <div>
      <h1>Sibling to Sibling Data Passing</h1>

      <h2>Approach 1 — Global Variables (broken)</h2>
      <Sibling1Global />
      <Sibling2Global />

      <h2>Approach 2 — Lifting State Up (correct for simple cases)</h2>
      <ParentComponent />

      <h2>Approach 3 — Context API (correct for complex/deep cases)</h2>
      <ParentWithContext />
    </div>
  );
};

export default App;