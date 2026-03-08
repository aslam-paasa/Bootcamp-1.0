import { useState } from "react";
import "./App.css";

function Calculator() {
  /**
   * 1. State:
   *    - inputvalue: string
  */
  const [inputvalue, setinputvalue] = useState("");

  /**
   * 2. Function:
   *    - display  : function to display the value
   *    - calculate: function to calculate the value
   *    - clear    : function to clear the value
  */

  function display(value) {
    setinputvalue(inputvalue + value);
  }

  function calculate() {
    var answers = eval(inputvalue);
    setinputvalue(answers);
  }

  function clear() {
    setinputvalue("");
  }

  /**
   * 3. Return:
   *    - return the calculator component
  */
  return (
    /**
     * 1. Input: Where user can type their input
     * 2. Button: Where user can click the button
     * 3. List: Where all the buttons are displayed
    */
    <form class="calculator" name="calc">
      <input type="text" class="value" value={inputvalue} />
      <span class="num clear" onClick={() => clear()}>
        c
      </span>
      <span onClick={() => display("/")}>/</span>
      <span onClick={() => display("*")}>*</span>
      <span onClick={() => display("7")}>7</span>
      <span onClick={() => display("8")}>8</span>
      <span onClick={() => display("9")}>9</span>
      <span onClick={() => display("-")}>-</span>
      <span onClick={() => display("4")}>4</span>
      <span onClick={() => display("5")}>5</span>
      <span onClick={() => display("6")}>6</span>
      <span className="plus" onClick={() => display("+")}>
        +
      </span>
      <span onClick={() => display("1")}>1</span>
      <span onClick={() => display("2")}>2</span>
      <span onClick={() => display("3")}>3</span>
      <span onClick={() => display("0")}>0</span>
      <span onClick={() => display("00")}>00</span>
      <span onClick={() => display(".")}>.</span>
      <span class="num equal" onClick={() => calculate()}>
        =
      </span>
    </form>
  );
}

export default Calculator;
