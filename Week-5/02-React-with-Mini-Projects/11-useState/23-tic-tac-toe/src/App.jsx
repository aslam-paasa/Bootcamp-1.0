/**
 * Tic Tac Toe:
 * Tic Tac Toe is a classical game that provides a use case for practicing
 * a. state management, 
 * b. conditional rendering, and 
 * c. event handling.
 * 
 * This project implements a dynamic Tic Tac Toe board where two players can
 * alternate turns, and the game announces the winner or a draw.
*/

/**
 * Step-1: Managing Game State
 * The game uses several state variables to handle gameplay dynamics:
 * 1. xTurn: Tracks the current player (X or O)
 * 2. xInput and oInput: Stores the cell indices selected by each player
 * 3. gameOver: Ensures no further moves can be made after a win or draw
 *    is detected.
 * 
 *    a. Keeps track of the current player's turn
 *       const [xTurn, setXTurn] = useState(true);
 * 
 *    b. Store indices selected to 'X'
 *       const [xInput, setXInput] = useState([]);
 *  
 *    c. Stores indices selected to 'O'
 *       const [oInput, setOInput] = useState([]);
 * 
 *    d. Ends the game after a win or draw
 *       const [gameOver, setGameOver] = useState(false);
 * 
 * Explanation:
 * These state variables ensure that gameplay alternates between players
 * while also tracking their moves and ending the game when a win or draw
 * is detected.
*/

/**
 * Step-2: Handling Click Events
 * When a player cracks on a cell, the following actions are triggered:
 * 1. The cell is marked as selected for the current player.
 * 2. The checkWinds functions evaluates whether the player has won.
 * 3. If all cells are filled without a winner, a draw is declared. 
 * 
 *    a. Handle a click on a box
 *       const handleClick = (i) => {
 *         
 *          b. If the box is already clicked or the game is over, do nothing
 *             if(xInput.includes(i) || oInput.includes(i) || gameOver) return;
 * 
 *          c. If it's X's turn
 *             if (xTurn) {
 *                d. Add the clicked index to X's moves
 *                   let tempX = [...xInput, i];
 *                   setXInput(tempX);
 *  
 *                e. Check if X has a winning combination
 *                   if(tempX.length >= 3) {
 *                     let didWin = checkWins(tempX);
 *                     if(didWin) {
 *                        alert('X wins!');
 *                        setGameOver(true);
 *                     }
 *                   }
 *              } else {
 *                 g. If it's O's turn, add the clicked index to O's moves
 *                    let tempO = [...oInput, i];
 *                    setOInput(tempO);
 * 
 *                 h. Check if O has a winning combination
 *                    if(tempO.length >= 3) {
 *                       let didWin = checkWins(tempO);
 *                       if(didWin) {
 *                          alert('O wins!');
 *                          setGameOver(true);
 *                       }
 *                    }
 *              }
 * 
 *          i. Check if all boxes are filled and no one has won
 *             if (xInput.length + oInput.length + 1 === NUMBER_OF_BOXES && !gameOver) {
 *                alert('Draw!');
 *                setGameOver(true);
 *             }
 * 
 *          j. Toggle the turn
 *             setXTurn(!xTurn);
 *       }
 * 
 * The handleClick function controls what happens when a player clicks on a
 * box in the Tic-Tac-Toe game. It first checks if the box is already taken
 * or if the game is over, and does nothing in those cases. If it's X's turn,
 * it adds the clicked box to X's moves and check if X has a winning 
 * combination. Similarly, if it's O's turn, it does the same for O's moves.
 * 
 * If all the boxes are filled and no one wins, it declares the game a draw.
 * After each move, it switches the turn to the other player. This function
 * makes sure the game runs smoothly by managing moves, checking for winners,
 * and handling draws.
 * 
*/

/**
 * Step-3: Checking Winning Conditions:
 * The game uses predefined winning combinations to validate wins:
 * a. Horizontal, vertical, and diagonal lines are encoded as arrays of
 *    indices.
 * b. The checkWins function check if the player's selections match any
 *    winning combination.
 * 
 *    const winnings = [
 *      [0, 1, 2],
 *      [3, 4, 5],
 *      [6, 7, 8],
 *      [0, 3, 6],
 *      [1, 4, 7],
 *      [2, 5, 8],
 *      [0, 4, 8],
 *      [2, 4, 6],
 *    ]
 * 
 *    const checkWins = (array) => {
 *      return winnings.some((item) => item.every((index) =>
 *         array.includes(index)));
 *    };
 * 
 * By iterating through the predefined combinations, the function efficiently
 * determines whether a player has won, avoiding unnecessary computations.
*/

/**
 * Step-4: Resetting the Game
 * The resetGame function resets all states for their initial values, allowing
 * players to restart the game.
 * 
 *   const resetGame = () => {
 *     setXTurn(true);
 *     setXInput([]);
 *     setOInput([]);
 *     setGameOver(false);
 *   }
 * 
 * This function ensures that the board is cleared, all states are reset, and
 * gameplay can begin anew.
*/

/**
 * Step-5: Rendering the Board
 * The game board is dynamically generated based on the current state. Each
 * cell displays 'X' or 'O' depending on the player's moves.
 * 
 *   const renderBoard = () => {
 *     let arr = [];
 *     for (let i = 0; i < NUMBER_OF_BOXES; i++) {
 *       arr.push(
 *         <div key={i} className="box" onClick={() => handleClick(i)}>
 *           <div className="board-value">{renderBoardValue(i)}</div>
 *         </div>
 *       );
 *     }
 *     return arr;
 *   }
 * 
 * The renderBoard function uses a loop to generate the game grid dynamically,
 * reflecting the current state in real time.
 * 
*/

import { useState } from "react";
import "./App.css";

function App() {
  const NUMBER_OF_BOXES = 9;
  const [xTurn, setXTurn] = useState(true);
  const [xInput, setXInput] = useState([]);
  const [oInput, setOInput] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const winnings = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWins = (array) => {
    return winnings.some((item) => {
      return item.every((index) => array.includes(index));
    });
  };

  const handleClick = (i) => {
    if (xInput.includes(i) || oInput.includes(i) || gameOver) return;

    if (xTurn) {
      let tempX = [...xInput, i];
      setXInput(tempX);

      if (tempX.length >= 3) {
        let didWin = checkWins(tempX);
        if (didWin) {
          alert('X wins!');
          setGameOver(true);
        }
      }
    } else {
      let tempO = [...oInput, i];
      setOInput(tempO);

      if (tempO.length >= 3) {
        let didWin = checkWins(tempO);
        if (didWin) {
          alert('O wins!');
          setGameOver(true);
        }
      }
    }

    if (xInput.length + oInput.length + 1 === NUMBER_OF_BOXES && !gameOver) {
      alert("It's a draw!");
      setGameOver(true);
    }

    setXTurn(!xTurn);
  };

  const resetGame = () => {
    setXInput([]);
    setOInput([]);
    setXTurn(true);
    setGameOver(false);
  };

  const renderBoardValue = (i) => {
    if (xInput.includes(i)) {
      return "X";
    } else if (oInput.includes(i)) {
      return "O";
    }
    return "";
  };

  const renderBoard = () => {
    let arr = [];
    for (let i = 0; i < NUMBER_OF_BOXES; i++) {
      arr.push(
        <div onClick={() => handleClick(i)} className="box" key={i}>
          <div className="board-value">
            {renderBoardValue(i)}
          </div>
        </div>
      );
    }
    return arr;
  };

  return (
    <div className="App">
      TicTacToe
      <div className="board-holder">{renderBoard()}</div>
      {gameOver && <button onClick={resetGame}>Restart Game</button>}
    </div>
  );
}

export default App;


/**
 * Key Points:
 * 1. State Management: Multiple states (xTurn, xInput, oInput, gameOver)
 *    ensure precise tracking of the game.
 * 2. Conditional Logic: Prevents invalid moves and handles edge cases
 *    like draws.
 * 3. Dynamic Rendering: Reflects gameplay instantly by re-rendering the
 *    board on every move.
 * 4. Reusable Design: The logic can be extended for larger boards or
 *    additional features.
*/

/**
 * Interview Tips:
 * 1. Explain State Management: Highlight how state variables are used to
 *    manage turns, track moves, and determine game outcomes.
 * 2. Propose Refactoring: Suggest splitting the board into reusable
 *    components for better modularity.
 * 3. Discuss Algorithms: Talk about the efficiency of the checkWins fn and
 *    its use of predefined winning combinations.
 * 4. Real-World Relevance: Relate the game logic for scenarios in UI design,
 *    such as handling dynamic user interactions or validating inputs as
 *    well.
*/