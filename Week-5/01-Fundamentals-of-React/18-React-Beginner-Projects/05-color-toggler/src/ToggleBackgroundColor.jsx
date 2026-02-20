import { useState } from "react";
import "./App.css";

function ToggleBackgroundColor() {
  /**
   * 1. State:
   *    - backgroundColor: string
   *    - textColor: string
   *    - buttonStyle: string
  */
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [textColor, setTextColor] = useState("#1b1b1b");
  const [buttonStyle, setButtonStyle] = useState("white");

  /**
   * 2. Function:
   *    - handleClick: function to toggle the background color
  */
  function handleClick() {
    setBackgroundColor(backgroundColor === "white" ? "#1b1b1b" : "white");
    setTextColor(textColor === "#1b1b1b" ? "#ffa31a" : "#1b1b1b");
    setButtonStyle(backgroundColor === "white" ? "#1b1b1b" : "white");
  }

  /**
   * 3. Return:
   *    - return the toggle background color component
  */
  return (
    <section style={{ backgroundColor, color: textColor }}>

      {/* Button: Where user can toggle the background color */}
      <button
        onClick={handleClick}
        style={{
          buttonStyle,
          color: textColor,
          border: `2px solid ${textColor}`,
        }}
      >
        {backgroundColor == "#1b1b1b" ? "Black Theme" : "White Theme"}
      </button>

      {/* Content: Where user can see the content */}
      <section className="content">
        <h1>
          Welcome To A <br /> Real World..
        </h1>
      </section>
      
    </section>
  );
}

export default ToggleBackgroundColor;
