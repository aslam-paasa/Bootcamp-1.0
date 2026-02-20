/**
 * Challenge: Autofocus
 * In this challenge, you're given a ref and a simple 'input' element. 
 * You job is to autofocus the input when the component first renders.
 * 
 * Tasks:
 * 1. Autofocus the input when the component renders
 * 
 * Hint:
 * 1. Before you can do anything imperatively with the 'input', you need
 *    to attach the ref to it.
 * 
 *    <input
 *      id="focus"
 *      ref={inputRef}
 *      type="email"
 *      placeholder="Enter your email"
 *    />
 * 
 * 2. Focusing an input is a side effect, therefore, we'll either need to
 *    out it in an event handler or in useEffect.
 * 
 *    Since the side effect is caused by the component appearing rather than
 *    a specific interaction, we'll put it in useEffect.
 * 
 *    useEffect(() => {
 *       if(inputRef.current) {
 *          inputRef.current.focus();
 *       }
 *    }, []);
 */

import './App.css'
import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef(null);

   useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <h1>Autofocus Input</h1>
      <label htmlFor="focus">Email Address</label>
      <input
        id="focus"
        ref={inputRef}
        type="email"
        placeholder="Enter your email"
      />
    </div>
  );
}

function App() {

  return (
    <div>
      <TextInput />
    </div>
  )
}

export default App
