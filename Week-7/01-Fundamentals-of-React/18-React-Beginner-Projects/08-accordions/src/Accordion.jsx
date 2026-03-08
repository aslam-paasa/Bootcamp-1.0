import { useState } from "react";
import "./App.css";

const Accordion = ({ title, content }) => {
  /**
   * 2. State:
   *    - isActive: boolean
  */
  const [isActive, setIsActive] = useState(false);

  /**
   * 3. Return:
   *    - return the accordion card component
   *      a. header
   *      b. content
  */
  return (
    <section className="accordion-card" key={Math.random()}>

      {/* Header: Where user can see the title and icon */}
      <div className="header" onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <p className="icon">{isActive ? "-" : "+"}</p>
      </div>

      {/* Content: Where user can see the content */}
      <div className="content">
        {isActive && <p className="card-info">{content}</p>}
      </div>
    </section>
  );
};

export default Accordion;
