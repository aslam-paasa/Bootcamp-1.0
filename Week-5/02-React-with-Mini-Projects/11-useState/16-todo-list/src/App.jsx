/**
 * Todo List:
 * Todo lists are a classic project to showcase management and user interaction
 * in React. They involve adding, editing and deleting tasks dynamically,
 * making them an excellent choice for learning React's core concepts.
 * 
 * In this guide, we'll build a todo list that:
 * a. Adds tasks to a list
 * b. Edits tasks dynamically
 * c. Deletes tasks from the list
*/

/**
 * Problem Statement:
 * We need to create a todo list application with the following features:
 * a. Allow users to add tasks to a list
 * b. Display each task in a reusable WorkTile component
 * c. Enable users to edit or delete individual tasks.
 * d. Maintain a clean and responsive UI.
*/


/**
 * Step-1: Setting up the Main Component
 * The App component serves as the main container, handling:
 * a. The current input (title) for adding tasks.
 * b. The list of tasks (workList).
*/


/**
 * React States Used:
 * The App component uses two main states. 
 * a. The title state is responsible for tracking the current input value,
 *    updating dynamically as the user types.
 * 
 * b. Once a task is added, it is appended to the workList state, which stores
 *    tasks and dynamically updates as tasks are edited or deleted. 
 * 
 * The WorkTile component uses isEditing to determine whether a task is in
 * edit mode and newTitle to temporarily store the updated title during
 * editing. This ensure smooth transitions between editing and viewing modes.
*/

import { useState } from 'react';
import './App.css';
import WorkTile from './Components/WorkTile';

function App() {

  /**
   * 1. Tracks the current input value (title)
   * 2. Store the list of tasks (workList)
  */
  const [title, setTitle] = useState(null)
  const [workList, setWorkList] = useState([])


  /**
   * 1. Add the current title to the list
   * 2. Reset the title input
  */
  const handleSave = () => {
    console.log('called')
    setWorkList((prev) => [...workList, title])
    setTitle('')
  }

  /**
   * 1. Update the title state with user input
  */
  const handleInputChange = (e) => {
    setTitle((prev) => e.target.value)
  }

  return (
    <div className="App">
      <h2>ToDo List</h2>

      {/* Update the title state with user input */}
      <input type='text' value={title} onChange={(e) => handleInputChange(e)} />

      {/* Save the current task to the list */}
      <input type='submit' text='Submit' onClick={handleSave} className='tileButton' />

      {/* Display the list of tasks:
        * The workList.map() method generates a WorkTile for each task, 
        * updating the UI automatically when tasks are added, edited, or 
        * deleted, based on the current state. This keeps the display in 
        * sync with user actions.
      */}
      {workList.map((item) => {
        return (
          <WorkTile title={item} workList={workList} setWorkList={setWorkList} />
        )
      })
      }
    </div>
  );
}

export default App;

/**
 * Interview Tips:
 * 1. Highlight how state separation between App and WorkTile the app
 *    scalable and maintainable.
 * 2. Discuss potential enhancements, like drag-and-drop reordering, task
 *    deadlines, or categories.
*/