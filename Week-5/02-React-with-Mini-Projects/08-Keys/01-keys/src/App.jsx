/**
 * Keys:
 * - Keys are used to uniquely identify the elements in the list, means
 *   when we render lists, each item should have a unique key prop for 
 *   React to track changes efficiently.
 * - Keys are used to identify which items have changed, been added, or
 *   been removed.
 * - Keys should be unique among siblings and stable across re-renders.
 * - Best practice is to use a unique ID from the data as the key.
*/

import PropTypes from 'prop-types';
const ItemList = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}

const App = () => {

  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ]

  return (
    <ItemList items={items} />
  )
}

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default App
