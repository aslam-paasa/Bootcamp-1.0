/**
 * TOPIC: How to Pass Data Between Components in React
 * 
 * When building a React app, components need to share data.
 * There are multiple ways to do this.
 * We will go from the WORST approach to the BEST approach
 * and explain why each one is better than the previous.
 */


/**
 * APPROACH 1 — Global Variables ❌
 * A global variable is declared OUTSIDE of any component.
 * Any file in the entire app can read or change it directly.
 *
 * WHY THIS IS BAD:
 *
 * 1. Hard to maintain:
 *    Imagine 10 files all reading and writing to window.userData.
 *    If the name suddenly changes to something wrong, you have no
 *    idea WHICH file changed it or WHEN. It becomes a guessing game.
 *
 * 2. Hard to debug:
 *    If one component breaks because of a wrong value, you have to
 *    check every single file that touches the global variable.
 *    Bugs become very hard to trace.
 *
 * 3. Not reusable:
 *    ChildComponent is permanently glued to window.userData.
 *    You cannot use this component with a different user's data
 *    without changing the global variable itself, which breaks
 *    every other component reading the same global.
 *
 * 4. React does not know about it:
 *    If window.userData changes, React will NOT re-render
 *    the component. The UI will show stale, outdated data.
 */

/* Data lives outside React — anyone can read or change this */
window.userData = {
  name: "John",
  age: 25,
};

/** 
 * This component silently depends on a global variable.
 * Just by reading this component, you cannot tell where
 * the data is coming from. It is a hidden dependency.
*/
function ChildComponent() {
  return <div>Hello {window.userData.name}!</div>;
}


/**
 * APPROACH 2 — Props ✅
 * Props (short for "properties") are how React components
 * communicate. The Parent OWNS the data and PASSES it DOWN
 * to the Child explicitly through the component's attributes.
 *
 * Think of props like function arguments:
 *   function greet(name) { ... }        ← name is an argument
 *   <ChildComponent userData={...} />   ← userData is a prop
 *
 * HOW THIS SOLVES APPROACH 1's PROBLEMS:
 *
 * 1. Readable:
 *    When you see <ChildComponent userData={userData} />,
 *    you IMMEDIATELY know what data the component is using
 *    and exactly where it is coming from. No guessing.
 *
 * 2. Easy to debug:
 *    If ChildComponent renders wrong data, you only need to
 *    check ONE place — the parent that passed the prop.
 *    There is only one source of truth.
 *
 * 3. Reusable (the biggest win):
 *    ChildComponent no longer cares about any global variable.
 *    You can use it with ANY user's data just by passing
 *    different props. Like a plug and play component.
 *    See the reusability example below.
 *
 * 4. React re-renders automatically:
 *    When props change, React knows about it and re-renders
 *    the component with the new data. The UI always stays
 *    in sync with the data.
 *
 * DATA FLOW (very important concept in React):
 *    Parent → passes data via props → Child
 *    Data always flows in ONE direction: top to bottom.
 *    This makes the app predictable and easy to understand.
 */

/* ✅ Parent OWNS the data and decides what to send down */
function ParentComponent() {
  const userData = {
    name: "John",
    age: 25,
  };

  /* Explicitly passing userData to ChildComponent as a prop */
  return <ChildComponent userData={userData} />;
}

/**
 * ✅ Child RECEIVES data through props — no hidden dependencies.
 *     Just by reading the function signature { userData }, you know
 *     exactly what this component needs to work.
*/ 
function ChildComponent({ userData }) {
  return <div>Hello {userData.name}!</div>;
}

/**
 * ✅ PROOF OF REUSABILITY:
 *     The same ChildComponent works with completely different data.
 *     In Approach 1, this was impossible without changing the global.
*/ 
function AnotherParent() {
  const anotherUser = {
    name: "Alice",
    age: 30,
  };

  /* Same component, different data — just different props */
  return <ChildComponent userData={anotherUser} />;
}


/**
 * APP
 */
const App = () => {
  return (
    <div>
      <h1>Parent to Child Data Passing</h1>

      {/* Approach 1 — reads from global variable */}
      <ChildComponent />

      {/* Approach 2 — receives data via props */}
      <ParentComponent />

      {/* Same component reused with different data */}
      <AnotherParent />
    </div>
  );
};

export default App;