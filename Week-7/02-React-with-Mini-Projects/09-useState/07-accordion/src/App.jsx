/**
 * Machine Coding: Accordion
 * - Accordions are a common UI feature used to display information in a
 *   clean and organized way.
 * - You'll often see them in FAQs, dashboards, or menus where content is
 *   divided into sections.
 * - They allow users to expand and collapse sections, making it easier to
 *   focus on specific details using React. 
 * - By doing this, we will practice the concepts of:
 *   a. managing state
 *   b. conditional rendering
*/

/**
 * Problem Statement:
 * We need to create an Accordion component that:
 * a. Displays a list of headers with corresponding content.
 * b. Expands the content when a header is clicked.
 * c. Closes the previously opened section if a different header is clicked.
 * d. Toggles the section off when the same header is clicked again. 
*/

/**
 * Step-1: Component Setup
 * - Define Accordion component.
 * - Creates data  : Contains objects with header(title) and content(details).
 * - Loops with map: Dynamically generates sections from the data array.
 * - Adds key      : Ensures each identification for each Virtual DOM Ele.
 * - Displays data : Renders each section with its header and content.
 * 
 *   const Accordion = () => {
 *     const data = [
 *       { header: "Header 0", content: "Content 0" },
 *       { header: "Header 1", content: "Content 1" },
 *       { header: "Header 2", content: "Content 2" },
 *       { header: "Header 3", content: "Content 3" },
 *       { header: "Header 4", content: "Content 4" },
 *     ]
 *   }
*/


/**
 * Step-2: Adding State
 * - Use useState to manage which accordion section is open.
 * - Add logic to toggle sections dynamically. 
 * 
 *   const [clickedAccordion, setClickedAccordion] = useState(null);
 *   const handleHeaderClick = (index) => {
 *     setClickedAccordion(clickedAccordion === index ? null : index);
 *   }
 * 
 *   return (
 *     <div>
 *       {data.map((item, index) => (
 *         <div key={index}>
 *           <div onClick={() => handleHeaderClick(index)}>{item.header}</div>
 *           {clickedAccordion === index && <p>{item.content}</p>}
 *       ))}
 *     </div>
 *   )
 * }
 * 
 * - This makes the Accordion iterative - only the clicked header's content
 *   is visible.
*/

/**
 * Step-3: Styling
 * - To improve user experience, style the headers and content using a
 *   CSS file (Accordion.css).
 * 
 *   .componentContainer {
 *       width: 50%;
 *       margin: 20px auto;
 *       font-family: Arial, sans-serif;
 *    }
 * 
 *    .accordionContainer {
 *       border: 1px solid #ccc;
 *       margin-bottom: 10px;
 *       border-radius: 4px;
 *    }
 * 
 *    .accordionHeader {
 *       background-color: #f1f1f1;
 *       cursor: pointer;
 *       padding: 10px;
 *       font-size: 14px;
 *       font-weight: bold;
 *    }
 * 
 *    .accordionBody {
 *       padding: 10px;
 *       font-size: 12px;
 *       color: #333;
 *       border-top: 1px solid #ccc;
 *       background-color: #fff;
 *    }
 * 
 * Update the JSX to use these styles:
 * 
 *   <div className="accordionHeader" onClick={() => handleHeaderClick(index)}>
 *     {item.header}
 *   </div>
 * 
 *   {clickedAccordion === index && (
 *     <div className="accordionBody">{item.content}</div>
 *   )}
*/ 

import './App.css'
import { useState } from 'react'

const Accordion = () => {
  const [clickedAccordion, setClickedAccordion] = useState(null);

  const data = [
    { header: "Header 0", content: "Content 0" },
    { header: "Header 1", content: "Content 1" },
    { header: "Header 2", content: "Content 2" },
    { header: "Header 3", content: "Content 3" },
    { header: "Header 4", content: "Content 4" },
  ]

  const handleHeaderClick = (index) => {
    setClickedAccordion(clickedAccordion === index ? null : index);
  }

  return (
    <div>
      {data.map((item, index) => (
        <div className='accordionContainer' key={index}>
          <div className='accordionHeader' onClick={() => handleHeaderClick(index)}>{item.header}</div>
          {clickedAccordion === index && <p className='accordionBody'>{item.content}</p>}
        </div>
      ))}
    </div>
  )
}


function App() {

  return (
    <div>
      <Accordion />
    </div>
  )
}

export default App
