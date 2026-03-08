import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";

function HiddenSearchBar() {
  /**
   * 1. State:
   *    - showInput: boolean
   *    - bgColor  : string
  */
  const [showInput, setShowInput] = useState(false);
  const [bgColor, setBgColor] = useState("white");

  /**
   * 2. Function:
   *    - handleClick: function to toggle the input and background color
  */
  const handleClick = (e) => {
    setBgColor("#1a1a1a");
    if (e.target.className === "container") {
      setShowInput(false);
      setBgColor("#fff");
    }
  };

  /**
   * 3. Return:
   *    - return the hidden search bar component
   *    - return the search icon
   *    - return the input
  */
  return (

    /**
     * 1. Section: Where user can see the search bar
     * 2. Input  : Where user can type their input
     * 3. Button : Where user can click the button
    */

    <section
      className="container"
      style={{ backgroundColor: bgColor }}
      onClick={handleClick}
    >

      {showInput ? (
        <input type="text" placeholder="Search..." />
      ) : (
        <FaSearch onClick={() => setShowInput(true)} />
      )}
    </section>
  );
}

export default HiddenSearchBar;
