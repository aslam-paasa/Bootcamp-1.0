/**
 * Lists:
 * - Lists are used to display multiple items in a single component.
 * - They are useful for displaying data that is related to each other.
 * 
 * Note:
 * 1. We have an array of todos in App Component.
 * 2. We convert them into an array of components.
 * 3. We render those components. 
*/

import PropTypes from 'prop-types';

const App = () => {

  const todos = [{
    title: "Go to gym",
    done: false
  }, {
    title: "Buy groceries",
    done: true
  }, {
    title: "Finish React course",
    done: false
  }];

  /**
   * List of todos:
   * - We use the map function to create a list of todos.
   * - We pass the todos array to the Todo component.
   * - We use the key prop to give each todo a unique key.
  */

  const todosComponents = todos.map(todo => (
    <Todo key={todo.title} title={todo.title} done={todo.done} />
  ));

  return (
    <div>
      {todosComponents}
    </div>
  )
}

/**
 * Todo component:
 * - It takes title and done as props.
 * - If done is true, it displays "Done!" otherwise it displays "Not done!".
*/
function Todo({ title, done }) {
  return <div>
    {title} - {done ? "Done!" : "Not done!"}
  </div>
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired
}

export default App
