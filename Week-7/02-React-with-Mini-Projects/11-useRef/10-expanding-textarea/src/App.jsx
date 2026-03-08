/**
 * Challenge: Expanding Textarea
 * In this challenge, you'll need to add functionality to the app so that
 * the user can type into the textarea and it will expand to fit the content
 * as they type.
 * 
 * Tasks:
 * 1. Update the value for the textarea when typing
 * 2. Set the textarea's height based on its scroll height
 * 
 * Hint:
 * 1. Before you worry about expanding the height of the 'textarea', you'll
 *    first want to make it so the user can type into that textarea. To do
 *    that, let's update 'text' to be a piece of React state and then we 
 *    can create a new 'handleChange' fn which updates it. 
 * 
 *    function ExpandintTextarea() {
 *       const [text, setText] = useState("");
 * 
 *       const handleChange = (event) => setText(event.target.value);
 * 
 *       return(
 *          <section className="container">
 *             <h1>Expanding Textarea</h1>
 *             <label htmlFor="textarea">Enter or paste in some text</label>
 *             <textarea
 *               id="textarea"
 *               placeholder="Enter some text"
 *               value={text}
 *               onChange={handleChange}
 *               rows={1}
 *             />
 *          </section>
 *       )
 *    }
 * 
 * 2. In order to imperatively expland the height of the 'textarea', we'll
 *    need to be able to reference the 'textarea' DOM node that React creates.
 *    To do that, we'll use React's useRef hook and pass the 'ref' it creates
 *    to the 'textarea' element.
 * 
 *    function ExpandintTextarea() {
 *       const [text, setText] = useState("");
 *       const textAreaRef = useRef(null);
 * 
 *       const handleChange = (event) => setText(event.target.value);
 * 
 *       return(
 *          <section className="container">
 *             <h1>Expanding Textarea</h1>
 *             <label htmlFor="textarea">Enter or paste in some text</label>
 *             <textarea
 *               id="textarea"
 *               placeholder="Enter some text"
 *               value={text}
 *               ref={textAreaRef}
 *               onChange={handleChange}
 *               rows={1}
 *             />
 *          </section>
 *       )
 *    }
 * 
 * 3. Now, whenever the user types into the textarea, we want to calculate
 *    the 'scrollHeight' of the 'textarea' and then set the textarea's height
 *    to that value so the user never has to scroll to see all the content.
 * 
 *    You may be tempted to use useEffect to do this, but remember our rules,
 *    if you can abstract the side effect into an event handler, do that
 *    instead of useEffect.
 * 
 *    In our case, we'll update our 'handleChange' fn to calculate the 
 *    textarea's scrollHeight and then set its actial height to that value.
 *
 *    function ExpandintTextarea() {
 *       const [text, setText] = useState("");
 *       const textAreaRef = useRef(null);
 * 
 *       const handleChange = (event) => {
 *          setText(event.target.value);
 *          textAreaRef.current.style.height = "inherit";
 *          const scrollHeight = textAreaRef.current.scrollHeight;
 *          textAreaRef.current.style.height = scrollHeight + "px";
 *       }
 * 
 *       return(
 *          <section className="container">
 *             <h1>Expanding Textarea</h1>
 *             <label htmlFor="textarea">Enter or paste in some text</label>
 *             <textarea
 *               id="textarea"
 *               placeholder="Enter some text"
 *               value={text}
 *               ref={textAreaRef}
 *               onChange={handleChange}
 *               rows={1}
 *             />
 *          </section>
 *       )
 *    }
 * 
 * The reason we need 'textAreaRef.current.style.height = "inherit";' is 
 * because we want to reset the textarea's height to its default value
 * before we calculate the scrollHeight. If we don't do this, the textArea
 * will never shrink back down if the user deletes text. 
 * 
*/

import './App.css'
import { useState, useRef } from 'react'

function ExpandingTextarea() {
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);

  const handleChange = (event) => {
    setText(event.target.value);
    textAreaRef.current.style.height = "inherit";
    const scrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = scrollHeight + "px";
  };

  return (
    <section className="container">
      <h1>Expanding Textarea</h1>
      <label htmlFor="textarea">Enter or paste in some text</label>
      <textarea
        id="textarea"
        placeholder="Enter some text"
        ref={textAreaRef}
        value={text}
        onChange={handleChange}
        rows={1}
      />
    </section>
  );
}

function App() {

  return (
    <div>
      <ExpandingTextarea />
    </div>
  )
}

export default App
