/**
 * Grid Lights:
 * This app is a simple yet engaging tile interaction game where users click
 * tiles to fill them, and the tiles clear automatically after all have been
 * cleared automatically after all have been clicked except the center tile.
 * It provides a fun example of working with React's state management,
 * conditional rendering, and lifecycle hooks like useEffect to create 
 * dynamic behavior. 
*/

/**
 * Step-1: Setting Up the State
 * The app manages its interactivity using two state variables:
 * 1. clickedTiles: Tracks which tiles have been clicked by the user.
 * 2. removeTiles : A boolean flag that starts the tile clearing process.
 * 
 *    a. Tracks clicked tiles
 *       const [clickedTiles, setClickedTiles] = useState([]);
 * 
 *    b. Triggers tile removal
 *       const [removeTiles, setRemoveTiles] = useState(false);
 * 
 * clickedTiles stores the indices of clicked tiles, while removeTiles
 * ensures that the tile-clearing animation starts only when all eligible
 * tiles have been clicked.
*/

/**
 * Step-2: Handling Tile Clicks
 * The handleClick function manages user interactions with tiles:
 * a. Adds the clicked tile index to the clickedTiles array if the tile is
 *    eligible.
 * b. Triggers the tile clearning process when all clickable tiles have been
 *    selected.
 * 
 *    const handleClick = (i) => {
 *      if (i !== 4 && !clickedTiles.includes(i)) {
 *        setClickedTiles((prev) => {
 *          let newTileArray = [...prev, i];
 *          if(newTileArray.length === 8) {
 *            setRemoveTiles(true);   <== starts the clearing process
 *          }
 *          return newTileArray;
 *        })
 *      }
 *    };
 * 
 * This function ensures valid gameplay by ignoring clicks on the center tile
 * or titles that we already clicked.
*/

/**
 * Step-3: Clearning Tiles with useEffect
 * The clearing process begins after all tiles are clicked:
 * a. Use setInterval to remove tiles one by one in reverse order.
 * b. Resets the game state when all tiles are cleared.
 * 
 *    useEffect(() => {
 *      let interval;
 * 
 *      if(removeTiles) {
 *        interval = setInterval(() => {
 *          setClickedTiles((prev) => {
 * 
 *             if(prev.length === 0) {
 *               clearInterval(interval); <== Stops clearing when no files remain
 * 
 *               setRemoveTiles(false);   <== Reset the flag
 *               return prev;
 *             }
 * 
 *             return prev.slice(0, -1);  <== Remove one tile at a time
 *          })
 *        }, 100); 
 *      }
 * 
 *      return () => clearInterval(interval);  <== cleanup function
 *    }, [removeTiles]);
 * 
 * When removeTiles is true, this useEffect starts removing one tile every
 * 100ms. It stops when no tiles are left, resets the removeTiles flag, and
 * clears the interval to ensure everything works smoothly without 
 * unnecessary background tasks.
*/

/**
 * Step-4: Rendering the Tiles
 * The game grid is generated dynamically, displaying:
 * a. Tile numbers to identify each tile.
 * b. Updated styles for clicked tiles to indicate user interaction.
 * 
 *    const renderTiles = () => {
 *       let cells = [];
 *       for(let i = 0; i < 9; i++) {
 *         cells.push(
 *           <div
 *             key={i}
 *             className={clickedTiles.includes(i) && i !== 4 ? 'tile-filled' : 'tile'}
 *             onClick={() => handleClick(i)}
 *           >
 *             {`${i + 1}`}
 *           </div>
 *         );
 *       }
 *       return cells;
 *    };
 * 
 * The renderTiles function is responsible for dynamically generating a
 * grid of tiles and updating their appearance based on user interaction.
 * It creates nine tiles by iterating from 0 to 8, assigning each a unique
 * number displayed within the tile (i + 1).
 * 
 * The className for each tile is determined based on whether its index
 * exists in the clickedTiles state. If a tile has been clicked (its index
 * is in clickedTiles) and it's not the center tile (index 4), it is styled
 * with the tile-filled class to visually indicate interaction. Otherwise,
 * it retains the default tile class.
 * 
 * Additionally, each tile has an onClick handler that triggers the
 * handleClick(i) function, ensuring that clicking a file updates its state
 * and appearance, providing instant visual feedback to the user. This makes
 * the grid interactive and responsive to user actions.
*/

import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [clickedTiles, setClickedTiles] = useState([]);
  const [removeTiles, setRemoveTiles] = useState(false);

  const handleClick = (i) => {
    if (i !== 4 && !clickedTiles.includes(i)) {
      setClickedTiles((prev) => {
        let newTileArray = [...prev, i];
        if (newTileArray.length === 8) {
          setRemoveTiles(true);
        }
        return newTileArray;
      });
    }
  };

  useEffect(() => {
    let interval;

    if (removeTiles) {
      interval = setInterval(() => {
        setClickedTiles((prev) => {
          if (prev.length === 0) {
            clearInterval(interval);
            setRemoveTiles(false);
            return prev;
          }
          let newTileArray = prev.slice(0, -1);
          return newTileArray;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [removeTiles]);

  const renderTiles = () => {
    let cells = [];
    for (let i = 0; i < 9; i++) {
      cells.push(
        <div
          key={i}
          className={
            clickedTiles.includes(i) && i !== 4 ? "tile-filled" : "tile"
          }
          onClick={() => handleClick(i)}
        >
          {`${i + 1}`}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="App">
      <div className="tileHolder">{renderTiles()}</div>
    </div>
  );
}

export default App;


/**
 * Key Points:
 * 1. State Management:
 *    - clickedTiles tracks which files have been clicked.
 *    - removeTiles controls the clearning animation sequence, ensuring
 *      smooth state transitions.
 * 
 * 2. Conditional Rendering:
 *    - Dynamically updates file appearance based on the clickedTiles state.
 *    - Ensures the center tile (index 4) remains unclickable, maintaining
 *      gameplay integrity.
 * 
 * 3. Timed Animations with useEffect:
 *    - Combines React's lifecycle management with setInterval to create a
 *      smooth clearing animation.
 *    - Proper cleanup using clearInterval ensures no unintended behavior.
 * 
 * 4. Dynamic Rendering:
 *    - Uses a loop to generate the grid layout dynamically, allowing for
 *      scalable and reusable designs.
*/

/**
 * Interview Tips:
 * 1. Discuss State Dependencies:
 *    Explain how clickedTiles and removeTiles work together to drive game
 *    logic and animations.
 * 2. Propose Scalability:
 *    Suggest extending the game to include larger grids, custom animations,
 *    or scoring mechanisms.
 * 3. Showcase Conditional Logic:
 *    Highlight the use of conditions to handle edge cases like preventing
 *    clicks on already-filled tiles or the center tile.
 * 4. Relate to Real-World Scenarios:
 *    Link the timed clearing animation to real-world applications, such as
 *    loading indicators, progress bars, or interactive dashboards.
*/