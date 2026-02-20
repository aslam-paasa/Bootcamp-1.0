/**
 * Challenge: Click Outside
 * In this challenge, you'll be adding a modal experience to the app. The
 * user needs to be able to open the modal and then close it either by
 * clicking the close icon in the modal itself, or by clicking anywhere
 * outside of the modal.
 * 
 * You'll need both component state and a reference to the modal to make it
 * work properly. You'll also want to reference the 'pointerdown' event if
 * you're not familiar with it.
 * 
 * 
 * Tasks:
 * 1. Don't render the modal by default
 * 2. Clicking the 'Open Modal' button should open the modal
 * 3. Don't close the modal when the dialog is clicked
 * 4. Close modal by clicking close icon
 * 5. Close the modal when the user clicks outside of the modal
 * 
 * Hint:
 * 1. First the easy part. You'll want to add some state to the component in
 *    order to keep track of if the modal is open or not. As you can see in
 *    the JSX, this state allows us to dynamically show or hid the modal.
 * 
 *    const [isOpen, setIsOpen] = useState(false);
 * 
 *    const handleOpenModal = () => {
 *      if (isOpen === false) {
 *        setIsOpen(true);
 *      }
 *    };
 * 
 *    const handleCloseModal = () => {
 *      setIsOpen(false);
 *    };
 * 
 *    This only thing to keep in mind is you don't want to let the user open
 *    the modal if it's already opened(to prevent the modal from re-animating).
 * 
 * 2. In order to know if the user clicked outside of the modal(so you can
 *    close it), you'll first need to get a reference to the modal. You can
 *    do that by creating a 'ref' and attaching it to the modal(the 'dialog'
 *    element).
 * 
 *    const ref = useRef(null);
 *
 *    ...
 *
 *    <dialog ref={ref}>
 * 
 * 3. In order to know if the user has clicked outside of the modal(so you
 *    can close it), you'll need to step up a document wide event listener
 *    whenever the modal is opened.
 * 
 *    Since you're synchronizing the document's 'pointerdown' event with
 *    your component, try using useEffect with a dependency of 'isOpen'. 
 * 
 *    useEffect(() => {
 *       // ...
 *    }, [isOpen]);
 * 
 *    Now, when 'isOpen' is 'true', you'll set up your event listener to the
 *    'pointerdown' event. 
 * 
 *    useEffect(() => {
 *       if (isOpen === true) {
 *          const handleEvent = (e) => {
 *             // ...
 *          };
 *
 *          document.addEventListener("pointerdown", handleEvent);
 *
 *          return () => {
 *            document.removeEventListener("pointerdown", handleEvent);
 *          };
 *       }
 *    }, [isOpen]);
 * 
 * 4. Noe the trickiest part, knowing if the user clicked outside or inside
 *    the modal.
 * 
 *    First, within your 'handleEvent' event handler, try grabbing a reference
 *    to your modal using your ref.
 * 
 *    const handleEvent = (e) => {
 *       const element = ref.current;
 *    };
 * 
 *    Now you can use the 'contains' method on the modal 'element' in order
 *    to see if the 'target' that was clicked(which you have access to via
 *    e.target) is controlled within the 'element'. 
 * 
 *    If it was, you know the user clicked inside the modal and you don't
 *    want to do anything. If it wasn't, you know the user clicked outside
 *    of the modal and you'll want to close it.
 * 
 *    const handleEvent = (e) => {
 *       const element = ref.current;
 *       if (element && !element.contains(e.target)) {
 *          setIsOpen(false);
 *       }
 *    };
 * 
 * Note: closeIcon - npm i react-icons
 * 
 */

import './App.css'
import { useState, useRef, useEffect } from 'react'
import { IoClose } from "react-icons/io5";

const closeIcon = <IoClose size={24} />;

function ClickOutside() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen === true) {
      const handleEvent = (e) => {
        const element = ref.current;
        if (element && !element.contains(e.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("pointerdown", handleEvent);

      return () => {
        document.removeEventListener("pointerdown", handleEvent);
      };
    }
  }, [isOpen]);

  const handleOpenModal = () => {
    if (isOpen === false) {
      setIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section>
        <h1>Click Outside</h1>
        <button className="link" onClick={handleOpenModal}>
          Open Modal
        </button>
      </section>
      {isOpen && (
        <dialog ref={ref}>
          <button onClick={handleCloseModal}>{closeIcon}</button>
          <h2>Modal</h2>
          <p>
            Click outside the modal to close (or use the button) whatever you
            prefer.
          </p>
        </dialog>
      )}
    </>
  );
}


function App() {

  return (
    <div>
      <ClickOutside />
    </div>
  )
}

export default App
