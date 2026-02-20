```jsx
/**
 * Q. How to submit a form in react?
 *  - Similar to JavaScript, React has onSubmit={}, inside which we
 *    pass fn which will handle the form submission.
 *  - But by default, submitting a form refreshes the page. To prevent
 *    this, we can use 'event.preventDefault()' within our submit
 *    handler function.
 *  - We can collect the data entered in the form fields(like input,
 *    textArea) through controlled components, where the value of
 *    each input is linked to the component's state.
 * 
 * Q. Why can't we collect form data directly like in JS?
 *  - In regular JS, you might use '.value' on an input element to get
 *    its value (e.g., document.getElementById().value).
 *    While this works, it involves direct manipulation of the DOM.
 * 
 *  - In React, we prefer Controlled Components, where the value is
 *    stored in teh component's state and updated via event handlers.
 *    This approach avoids direct DOM access and levereges React's
 *    Virtual DOM to manage changes more efficiently.
 * 
 *  - Using Hooks, changes immediately reflects in the component state,
 *    making data flow easier to track and manage.
 * 
 * Note: useState is a simple variable. Value uthaane ka kaam uska nhi 
 *       hai.
*/

/**
 * In React, when you change a variable, you might not see those changes
 * in the UI right away. This happens because of how React uses the
 * Virtual DOM.
 * 
 * Q. Why doesn't updated variable show up in React?
 *  - If you update a variable directly without using React's state
 *    system, React doesn't know about it. Since React relies on the
 *    Virtual DOM to track changes, it can't see the updated value in
 *    the real DOM.
 * 
 * Solution: Hooks
 * 
 * Hooks:
 * - Hooks are special type of functions in react.
 * - It always start with use keyword.
 * - It will always be call at top level of you component, not inside
 *   any function or block.
 * - It is used for state management.
 * 
 * State:
 * - State are special type of variables that update on Virtual DOM
 *   at realtime(instant).
 * - Jb v kisi component k andr state change hoti hai, wo state reload
 *   hota hai dobara.
 * 
*/

/**
 * Q. How to collect values from the form in React?
 *  - onChange{} 
 *  - JS m ek event hota tha keyup k naam se, uss event k help se jb jb
 *    mere form pe koi key press hogi tb ye event trigger hota tha. Yha
 *    pe wahi kaam ek event krta hai jiska naam hai 'onChange={}', aur
 *    ye inputs pe lagta hai jaise JS m lgta tha.
 * 
 * Q. How to extract data from the form?
 *  - In JS, we use event.target.value to extract data.
 *  - Similarly, we will do:
 * 
 *    const nameInputChangeHandler = (e) => {
 *       let value = e.target.value;
 *       console.log(value);
 *    }
 * 
 *  - But hum aise, nhi krnge. Yha pe hum value ko store krne k liye
 *    useState() Hook ka use krnge.
 * 
 *    const[] = useState();
 * 
 * Note: In HTML, Input m andr humein ek value={} naam ka prop milta 
 *       hai jiske andr hm input ki value pass krte hai. Aur yha jo
 *       v paas krnge UI k form m humein wo dikh rha hoga. To hm apne
 *       state ko iss input k saath connect krnge using this value{}
 *       attribute, aur iske andr hm apni state variable de denge.
 *       => value={setNameVal}
 * 
 *    const [nameVal, setNameVal] = useState("");
 * 
 *    const nameInputChangeHandler = (e) => {
 *      value = e.target.value;
 *      setNameVal(value);
 *    }
 * 
 *    <input type="text" placeholder="Enter Your Name" id="name" onChange={nameInputChangeHandler} value={setNameVal} />
*/

/** 
 * Flow of Data Binding:
 * 1. State Initialization:
 *    const [nameVal, setNameVal] = useState(""); => empty
 * 
 * 2. Handling Input Changes:
 *    - Create a fn that handles changes to the input. 
 *    - This fn gets triggered whenever the user types in i/p field:
 * 
 *      const nameInputChangeHandler = (e) => {
 *         let value = e.target.value; => Get the current value
 *         setNameVal(value);          => Update the state
 *      };
 * 
 * 3. Connecting input to state & Data Flow:
 *  - In the input field, we set the onChange() event to our handler
 *    and bind the input's value to the state variable:
 *    a. onChange() will trigger the input change fn with each keyup,
 *       which contain the setNameVal. This setNameVal update the
 *       the value inside nameVal.
 *    b. Pass the nameVal as param to the value={nameVal}. And we know
 *       whatever we pass inside the value attribute, will reflect on
 *       the input UI. Basically, we are binding nameVal with Value.
 * 
 * <input type="text" placeholder="Enter Your Name" id="name" onChange={nameInputChangeHandler} value={nameVal} />
 * 
*/

/**
 * Data Binding:
 * 1. One way Data Binding:
 *  - UI se jo data bhjte hai apne code mai usse 1-way data binding
 *    bolte hai.
 *  - UI Input --> nameVal(updated)
 * 
 * 2. Two way Data Binding:
 *  - UI jo data bhjte hai apne code mai, fir usse dobara se bhej k
 *    UI m dikhana is 2-way data binding.
 *  - UI Input --> nameVal --> setNameVal --> nameVal --> value --> UI Input(display)
*/

import './App.css'
import { useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';

function App() {
  // Top Level
  const [myName, setMyName] = useState("");
  const [nameVal, setNameVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  console.log('Form Component Render !');

  /**
   * Show Password Logic:
   * => Change type: password to text & text to password. [Toggle]
   * => If password is true then set "text" else "password".
   *    <input type={togglePassword ? "text" : "password"} placeholder="Enter Your Password" id="password" onChange={passwordChangeHandler} value={passwordVal} /> 
  */
  const showHiddenPasswordChangeHandler = () => {
    setTogglePassword(!togglePassword);
  }


  const nameInputChangeHandler = (e) => {
    // store the value in update state
    let value = e.target.value;
    console.log('[value]', value);
    setNameVal(value);
  }

  const emailChangeHandler = (e) => {
    // store the value in update state
    let value = e.target.value;
    console.log('[value]', value);
    setEmailVal(value);
  }

  const passwordChangeHandler = (e) => {
    // store the value in update state
    let value = e.target.value;
    console.log('[value]', value);
    setPasswordVal(value);
  }

  /**
   * Form Submit Fn:
   * 1. Prevent Page Reload
   * 2. Do something with the data
   *    a. Display submitted form data
   *    b. Reset Input Field of the Form
  */
  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    console.log('Form Submitted Successfully !'); 
    console.log('[Name]', nameVal);
    console.log('[Email]', emailVal);
    console.log('[Password]', passwordVal);
    setMyName("");
    setEmailVal("");
    setPasswordVal("");
  }


  const nameChangeHandler = () => {
    console.log('click.....');
    // myName = "Javascript";
    setMyName('JavaScript');
    console.log('[myName]', myName);
  }



  return (
    <div>
      <h1>Your name is :- {myName}</h1>
      <button onClick={nameChangeHandler}>Change Name</button>
      <form action="" onSubmit={ handleFormSubmit }>
        <div className="name form-fields">
          <label htmlFor="name">Name</label><br />
          <input type="text" placeholder="Enter Your Name" id="name" onChange={nameInputChangeHandler} value={nameVal} />
        </div>
        <div className="email form-fields">
          <label htmlFor="email">Email</label><br />
          <input type="email" placeholder="Enter Your Email" id="email" onChange={emailChangeHandler} value={emailVal} />
        </div>
        <div className="password form-fields">
          <label htmlFor="password">Password</label><br />
          <div className='password-field'>
            <input type={togglePassword ? "text" : "password"} placeholder="Enter Your Password" id="password" onChange={passwordChangeHandler} value={passwordVal} /> 
            <span onClick={ showHiddenPasswordChangeHandler }>
              <FaEyeSlash size={17} color='red' />
            </span>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App

```