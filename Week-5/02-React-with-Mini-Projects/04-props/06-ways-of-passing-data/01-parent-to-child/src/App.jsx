/**
 * Approach-1: Global Variables (worst approach)
*/

/**
 * File-1: global.js
 */
window.userData = {
  name: "John",
  age: 25
};

/**
* File-2: ChildComponent.jsx
*/
function ChildComponent() {
  return <div>Hello {window.userData.name}!</div>;
}

/**
* Why this is bad?
* 1. Hard to maintain:
*    You won't know where and when data being changed.
* 
* 2. Tough to test:
*    If one thing breaks, it affects the whole app.
*    Debugging becomes a nightmare.
* 
* 3. Low reusability:
*    You can't easily reuse components with different data.
*    Everything depends on global variables.
*/




/**
* Approach-2: Props
*/

/**
* File-1: ParentComponent.jsx
*/
function ParentComponent() {
  const userData = {
      name: "John",
      age: 25
  };

  // Sending userData to ChildComponent
  return <ChildComponent userData={userData} />;
}


/**
* File-2: ChildComponent.jsx
*/
function ChildComponent({ userData }) {
  return <div>Hello {userData.name}!</div>;
}


/**
* Why this is amazing?
* 1. Readable:
*    You can see where the data is coming from and where it's going.
* 
* 2. Easy to test:
*    You can test this component by just giving it different props.
*    No side effects, just pure function.
* 
* 3. Reusable:
*    You can use ChildComponent with different data.
*    Like plug and play.
*/




const App = () => {
  return (
    <div>
      <h1>Parent to Child Data Passing</h1>
      <ParentComponent />
    </div>
  )
}

export default App
