/**
 * Snake and Ladder Board:
 * Grid-based layouts, such as Snakes and Ladders board, are a great way to
 * understand dynamic rendering, efficient state management, and CSS Grid
 * Layout. This guide focuses on building a 10x10 game board, generating
 * numbered cells dynamically, and implementing a zigzag pattern for a
 * visually accurate board.
*/

/**
 * Why use CSS Grid for Layout?
 * The CSS Grid Layout is ideal for creating structured, responsice designs
 * like game boards because:
 * 1. Row-Column Structure: Grid naturally define row and columns, making
 *    them perfect for visualizing board layouts.
 * 2. Flexibility: The repeat() function allows easy scaling by adjusting
 *    the number of columns or rows.
 * 3. Alignment: CSS Grid provides tools like justify-content and align-items
 *    to center content effortlessly.
 * 4. Simpler Code: Compared to Flexbox, or manual positioning, grids
 *    require less code for symmetrical designs.
*/

/**
 * Step-1: Initializing the Board State
 * We start by defining the state and board size:
 * 
 *   Holds the generated board cells
 *   const [data, setData] = useState([])
 * 
 *   Number of rows and columns
 *   const boardSize = 10
 * 
 * a. data will store all the cell numbers, allowing the UI to update
 *    dynamically.
 * b. boardSize defines the dimensions of the board and ensures reusability
 *    for other sizes (e.g., 8x8, 12x12).
*/

/**
 * Step-2: Generating the Board Data
 * We use nested loops to generate the grid numbers dynamically. Odd-numbered 
 * rows are reversed to create the zigzag pattern characteristic of Snakes
 * and Ladders boards.
 * 1. Outer Loop (Rows): Iterates over rows starting from the bottom 
 *    (boardSize - 1), simulating the Snakes and Ladders layout where
 *    numbering starts from the bottom-left.
 * 2. Inner Loop (Columns): Generates numbers for each cell in the row,
 *    calculated as row * boardSize + column + 1.
 * 3. Row Reversal: Odd rows are reversed using rowCells.reverse() to create
 *    the zigzag effect.
 * 4. Updating State: The newCells array is passed to setData, storing the
 *    numbers for rendering. 
*/

/**
 * Step-3: Rendering the Board
 * The data array is mapped to render to grid cells dynamically.
 * 1. Dynamic Rendering: The map() fn iterates over the data array, creating
 *    a <div> for each cell.
 * 2. Keys for React: Each cell is given a unique key (its number) to avoid
 *    React warnings and ensure efficient rendering.
 * 3. Flexibility: The design is agnostic to the board size, changing 
 *    boardSize adjusts the grid automatically.
*/

import { useState, useEffect } from 'react'
import './App.css';

function App() {

  const [data, setData] = useState([])
  const boardSize = 10;

  useEffect(() => {
    let newCells = [];

    for (let row = boardSize - 1; row >= 0; row--) {
      let rowCells = [];
      for (let col = 0; col < boardSize; col++) {
        const cellNumber = row * boardSize + col + 1;
        rowCells.push(cellNumber);
      }
      if (row % 2 !== 0) {
        rowCells.reverse();
      }
      newCells = newCells.concat(rowCells);
    }

    setData(newCells);
  }, []);

  console.log(data)
  return (
    <div className="App">
      <div className='game-board'>
        {data.map((item) => {
          return (
            <div className='game-cell'>{item}</div>
          )
        })}
      </div>
    </div>
  );
}

export default App;

/**
 * Step-4: Styling the Board
 * We use CSS Grid to align the board into a 10x10 structure, with each cell
 * styled uniformly.
 * 
 * Why CSS Grid?
 * 1. Efficient: The grid-template-columns: repeat(10, 1fr) ensures all cells
 *    are evenly spaced without manual positioning.
 * 2. Responsiveness: By using fractional units (1fr), the grid adapts to the
 *    container size.
 * 3. Alignment: The combination of justify-content and align-items centers
 *    numbers neatly within cells.
*/


/**
 * Key Points:
 * 1. State Management: The board cells are dynamically generated and
 *    managed using React's useState and useEffect.
 * 2. Dynamic Grid Creation: Rows and Columns are generated programmatically
 *    ensuring scalability for larger or smaller boards.
 * 3. CSS Grid Layout: Simplifies the process of creating a structured,
 *    responsive layout for grid-based designs.
 * 4. Zigzag Logic: Row reversal adds complexity and realism, emulating,
 *    Snakes and Ladders boards.
*/

/**
 * Interview Tips:
 * 1. State-Driven Rendering: Highlight how data dynamically updates the
 *    board based on the boardSize value.
 * 2. Scalable Logic: Emphasize the flexibility of the grid generation logic
 *    for different board sizes.
 * 3. Efficiency: Discuss how CSS Grid simplifies layout creation compared
 *    to manual positioning or inline styles.
 * 4. Propose Enhancements: Suggest adding interactivity, like hover effects
 *    or clickable cells to trigger events.
*/ 