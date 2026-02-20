

/**
 * Integrating the Dropdown Component:
 * Now, let's integrate the Dropdown into the App to demonstrate its reusability
 * 
 * Step-1: Setting Up the Parent Component
*/

import './App.css'
import Dropdown from './components/Dropdown'

function App() {
  const data = [
    { title: 'Title 01', options: ['Option 01', 'Option 02']},
    { title: 'Title 02', options: ['Option 01', 'Option 02']},
    { title: 'Title 03', options: ['Option 01', 'Option 02']},
    { title: 'Title 04', options: ['Option 01', 'Option 02']},
    { title: 'Title 05', options: ['Option 01', 'Option 02']},
    { title: 'Title 06', options: ['Option 01', 'Option 02']},
    { title: 'Title 07', options: ['Option 01', 'Option 02']},
    { title: 'Title 08', options: ['Option 01', 'Option 02']},
    { title: 'Title 09', options: ['Option 01', 'Option 02']},
  ]

  return (
    <div className='App'>
      {data.map((item, index) => {
        return <Dropdown key={index} componentObject={item} />
      })}
    </div>
  )
}

export default App

/**
 * Explanation:
 * 1. Dataset: The data array defines the title and options for each
 *    dropdown.
 * 2. Dynamic Rendering: The map() function generates a Dropdown component
 *    for each item in data.
 * 
 * Rendering occurs dynamically as the map() function iterates over the
 * data array, generating a Dropdown component for each item.
*/



/**
 * Key Points:
 * 1. Reusable Component: The Dropdown component can be used for any dataset,
 *    making it highly versatile.
 * 2. Dynamic Rendering: Options and dropdowns are rendered dynamically
 *    based on the provided data.
 * 3. State Management: Separates states (clickedHeader and clickedOption)
 *    efficiently handle dropdown visibiluty and selection tracking.
 * 4. User Experience: The hover effects and collapsing behavior enhance
 *    interactivity and usability.
 * 5. Scalability: This structure easily adapts to larger datasets or more
 *    complex dropdown functionality.
*/

/**
 * Interview Tips:
 * 1. Explain Reusability: Highlight how the dropdown component is designed
 *    to handle different datasets without modifications.
 * 2. Discuss State Handling: Emphasize the role of clickedHeader in toggling
 *    visibility and clickedOption in tracking the selected option. 
 * 3. Propose Enhancements: Suggest features like animations, multi-level
 *    dropdowns, or dynamically loaded options for large datasets.
*/