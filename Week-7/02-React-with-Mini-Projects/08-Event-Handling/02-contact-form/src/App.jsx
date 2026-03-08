import './App.css'
import { useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';

function App() {
  const [myName, setMyName] = useState("");
  const [nameVal, setNameVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  console.log('Form Component Render !');

  const showHiddenPasswordChangeHandler = () => {
    setTogglePassword(!togglePassword);
  }

  const nameInputChangeHandler = (e) => {
    let value = e.target.value;
    console.log('[value]', value);
    setNameVal(value);
  }

  const emailChangeHandler = (e) => {
    let value = e.target.value;
    console.log('[value]', value);
    setEmailVal(value);
  }

  const passwordChangeHandler = (e) => {
    let value = e.target.value;
    console.log('[value]', value);
    setPasswordVal(value);
  }

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
    setMyName('JavaScript');
  }

  return (
    <div>
      <h1>Your name is :- {myName}</h1>
      <button onClick={nameChangeHandler}>Change Name</button>
      <form action="" onSubmit={handleFormSubmit}>
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
            <span onClick={showHiddenPasswordChangeHandler}>
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
