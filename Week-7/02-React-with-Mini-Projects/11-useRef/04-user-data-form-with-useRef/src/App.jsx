/**
 * Assignment: User Data Form with useRef
 * 
 * Create a form that collects user data (name, email, password) using useRef hooks
 * instead of controlled components (useState). The form should:
 * - Capture input values using refs
 * - Reset form fields after submission
 * - Demonstrate DOM manipulation by changing heading color on submit
*/

/**
 * Q. What is useRef()?
 * - Refs are a special attribute that are available on all React
 *   components. They allows us to create a reference to a given
 *   element/component. They works same as we worked in JS to target
 *   the DOM elements.
 * - Basically useRef means reference. Jaise normal HTML, JS use kr k 
 *   hm project bnate the, to waha hm document.getElementById() se hm
 *   DOM elements ki id utha k laate the, aur wahi same kaam yha useRef
 *   krta hai. 
 * - Let's say mujhe koi element target kr k usme koi manipulation krna
 *   hai to wo hm useRef se krnge. 
 * - Humne useState() se kr k Form bnaya tha, yha pe wahi kaam hm
 *   useRef() se krnge.
*/

import { useRef } from 'react';

function App() {

  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);
  const headingRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputNameRef.current.value);
    console.log(inputEmailRef.current.value);
    console.log(inputPasswordRef.current.value);
    
    resetInput(inputNameRef);
    resetInput(inputEmailRef);
    resetInput(inputPasswordRef);

    headingRef.current.style.color = 'red';
    console.log('Form Submit!');
  }

  const resetInput = (inputRef) => {
    inputRef.current.value = '';
  }

  return (
    <div>
        <h1 ref={headingRef}>User Data Form</h1>
        <form onSubmit={submitHandler}>
          <div className="name">
            <label htmlFor="name">Name:- </label> <br />
            <input type="text" name="" id="" placeholder="Enter Your Name" ref={inputNameRef} />
          </div>
          <div className="email">
            <label htmlFor="email">Email:- </label> <br />
            <input type="text" name="" id="" placeholder="Enter Your Email" ref={inputEmailRef} />
          </div>
          <div className="password">
            <label htmlFor="password">Password:- </label> <br />
            <input type="text" name="" id="" placeholder="xxxx-xx-xxx" ref={inputPasswordRef} />
          </div>
          <button>SUBMIT</button>
        </form>
    </div>
  )
}

export default App
