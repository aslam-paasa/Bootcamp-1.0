/**
 * Challenge: Field Notes
 * In this challenge, you're tasked with completing an app that collects
 * new notes from the user and displays them in a list. Whenever a new note
 * is added, you'll need to scroll it into view.
 * 
 * Tasks:
 * 1. Add a new note when the user submits the form
 * 2. Scroll the new note into view
 * 3. Clear the input field when the user submits a valid note
 * 4. Prevent empty notes from being added
 * 
 * Hint:
 * 1. Before we add the new note to the list, we want to make sure it's not
 *    empty. To do that, we can check if 'note.trim()' is falsy. If it is,
 *    that means it's an empty string.
 * 
 *    const handleSubmit = (e) => {
 *       e.preventDefault();
 *       const form = e.target;
 *       const formData = new FormData(form);
 *       const newNote = formData.get("note");
 *       if (newNote.trim()) {
 *         // Add the new note to the list
 *       }
 *     };
 * 
 *    Next, to add an element to an array, use JavaScript's spread operator
 *    to spread all the existing elements onto a new array with the new
 *    element. 
 * 
 *    const handleSubmit = (e) => {
 *       e.preventDefault();
 *       const form = e.target;
 *       const formData = new FormData(form);
 *       const newNote = formData.get("note");
 *       if (newNote.trim()) {
 *         setNotes([...notes, newNote]);
 *       }
 *     };
 * 
 *    And finally, we want to make sure we reset the 'form' after we 
 *    successfully add the new note.
 * 
 *    const handleSubmit = (e) => {
 *       e.preventDefault();
 *       const form = e.target;
 *       const formData = new FormData(form);
 *       const newNote = formData.get("note");
 *       if (newNote.trim()) {
 *         setNotes([...notes, newNote]);
 *         form.reset();
 *       }
 *     };
 * 
 * 2. To scroll an element into view, we can use the 'scrollIntoView' method.
 * 
 *    element.scrollIntoView();
 * 
 *    To do that, we first need to get access to the element we should scroll
 *    to. We can do that by creating a ref and adding it to the last element
 *    in our list.
 * 
 *    const lastNoteRef = useRef(null);
 * 
 *    ...
 * 
 *    <ul>
 *      {notes.map((msg, index) => (
 *        <li
 *          ref={index === notes.length - 1 ? lastNoteRef : null}
 *          key={index}
 *        >
 *          {msg}
 *        </li>
 *      ))}
 *    </ul>
 * 
 * 3. Once we've create a ref and added to the last 'li' element in our list,
 *    the last thing we need to do is figure out when to invoke 'scrollIntoView'
 *    on it.
 * 
 *    We know it's a side effect, so we want to keep it out of React's 
 *    rendering flow. Since React won't attach our ref to the 'li' element
 *    until after it has updated the DOM, instead of sticking it in an event
 *    handler, we'll need to stick it in useEffect.
 * 
 *    useEffect(() => {
 *       if (lastNoteRef.current) {
 *         lastNoteRef.current.scrollIntoView();
 *       }
 *    });
 * 
 *    Now after every render, React will scroll the last note into view.
 * 
*/

import './App.css'
import { useState, useRef, useEffect } from 'react'

function FieldNotes() {
  const [notes, setNotes] = useState([
    "Components encapsulate both the visual representation of a particular piece of UI as well as the state and logic that goes along with it.",
    "The same intuition you have about creating and composing together functions can directly apply to creating and composing components. However, instead of composing functions together to get some value, you can compose components together to get some UI.",
    "JSX combines the power and expressiveness of JavaScript with the readability and accessibility of HTML",
    "Just like a component enabled the composition and reusability of UI, hooks enabled the composition and reusability of non-visual logic."
  ]);

  const lastNoteRef = useRef(null);

  useEffect(() => {
    if (lastNoteRef.current) {
      lastNoteRef.current.scrollIntoView();
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newNote = formData.get("note");
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      form.reset();
    }
  };

  return (
    <article>
      <h1>Field Notes</h1>
      <div>
        <ul>
          {notes.map((msg, index) => (
            <li
              ref={index === notes.length - 1 ? lastNoteRef : null}
              key={index}
            >
              {msg}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="note"
            placeholder="Type your note..."
          />
          <button className="link" type="submit">
            Submit
          </button>
        </form>
      </div>
    </article>
  );
}

function App() {

  return (
    <div>
      <FieldNotes />
    </div>
  )
}

export default App
