/**
 * Re-rendering:
 * 
 * Q. What exactly is re-render?
 * => Anytime React actually updates the DOM is considered re-render.
 * 
 * Note: Download React Developer Tools
 * 
 * Q. Why we need re-rendering?
 * => React creates dynamic websites(websites whose content changes
 *    very quickly).
 * => React lets us easy way to create dynamic sites. Anytime such
 *    dynamic feature happens like:
 *    (a) we append something to the DOM.
 *    (b) we remove something from the DOM.
 *    (c) or we update something inside the DOM, 
 *    is called as re-rendering. And the rule of React is to minimize
 *    re-rendering. 
 * Example: Counter App
 * */ 

/**
 * Q. How can we visualize re-rendering in react?
 * Q. How can we minimize re-rendering in react?
 * => Update the last app to allow user to update the title of the
 *    first Header with a new title
 * Hint: Math.random() gives you a random number between 0-1
 * */ 

/**
 * A re-render means that:
 * 1. React did some work to calculate what all should update in this
 *    component.
 * 2. The component actually got called(you can put a log to confirm this)
 * 3. The inspector shows you a bounding box around the component.
 * 
 * It happens when:
 * 1. A state variable that is being used inside a component changes
 * 2. A parent component re-render trigger all children re-rendering.
 * */ 

/**
 * You want to minimize the number of re-renders to make a highly optimal
 * react app. 
 * 
 * The more the components that are getting re-rendered, the worse*/ 


/**
 * Q. How can you minimize the number of re-renders?
 * Way-1: Whole App Component is rendering on clicking the button
    import { useState } from 'react';

    function App() {
    const [title, setTitle] = useState("My name is Mohammad");

    function updateTitle() {
        setTitle("My name is " + Math.random());
    }

    console.log("rendered");
    return (
        <>
        <button onClick={updateTitle}>Update the title</button>
        <Header title={title}></Header>
        <Header title="Mohammad2"></Header>
        </>
    )
    }


    function Header({title}) {
    
    return (
        <div>
        {title}
        </div>
    )
    }

    export default App

 *
 * Way-2: Pushing the state down to a component
 * => Only one component is rendering on clicking the button
 * 
    import { useState } from 'react';

    function App() {
    return (
        <>
        <HeaderWithButton />
        <Header title="Mohammad2"></Header>
        </>
    )
    }

    // Only this component is rendering
    function HeaderWithButton() {
    const [title, setTitle] = useState("My name is Mohammad");

    function updateTitle() {
        setTitle("My name is " + Math.random());
    }

    console.log("rendered");
    return (
        <div>
        <button onClick={updateTitle}>Update the title</button>
        <Header title={title}></Header>
        </div>
    )
    }


    function Header({title}) {
    
    return (
        <div>
        {title}
        </div>
    )
    }

    export default App
 *
 *
 * Note: If there are multiple children/component in a tree that need
 *       to use a state variable, we find the lowest common ancestor.
 * 
 * 
 * Way-3: React.memo:
 * => Memo lets us skip re-rendering a component when its props are
 *    unchanged. And this is actually what we need.
 * => props are changed, we want to skip re-rendering components when
 *    its props are unchanged, and react.memo lets us do exactly this.
 * 
 * => Whenever we want to define a component which we want to memoize,
 *    not re-render when its props are unchanged, we define it like this:

        import React from 'react';
        import { useState } from 'react';

        function App() {
        const [title, setTitle] = useState("My name is Mohammad");

        function updateTitle() {
            setTitle("My name is " + Math.random());
        }

        console.log("rendered");
        return (
            <div>
            <button onClick={updateTitle}>Update the title</button>
            <Header title={title}></Header>
            <Header title="Mohammad2"></Header>
            <Header title="Mohammad2"></Header>
            <Header title="Mohammad2"></Header>
            <Header title="Mohammad2"></Header>
            </div>
        )
        }

        const Header = React.memo(function Header({title}) {
        return (
            <div>
            {title}
            </div>
        )
        })

        export default App;


 *    and pass in our function.[Paste fn inside react.memo()]
    */

import React from 'react';
import { useState } from 'react';

function App() {
  const [title, setTitle] = useState("My name is Mohammad");

  function updateTitle() {
    setTitle("My name is " + Math.random());
  }

  console.log("rendered");
  return (
    <div>
      <button onClick={updateTitle}>Update the title</button>
      <Header title={title}></Header>
      <Header title="Mohammad2"></Header>
      <Header title="Mohammad2"></Header>
      <Header title="Mohammad2"></Header>
      <Header title="Mohammad2"></Header>
    </div>
  )
}

const Header = React.memo(function Header({title}) {
  return (
    <div>
      {title}
    </div>
  )
})

export default App;