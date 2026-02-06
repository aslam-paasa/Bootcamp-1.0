/**
 * Step 8: fill() - Array ko static value se fill karna
 * > fill() array ke elements ko static value se replace kar deta hai.
 * 
 * Syntax: array.fill(value, start, end)
*/



/**
 * Example 1: Basic Fill Operation
*/

const emptyArray = new Array(5);
console.log("Empty array:", emptyArray); // [empty × 5]

/* Sabhi positions par 0 fill karo */
emptyArray.fill(0);
console.log("Filled with 0:", emptyArray); // [0, 0, 0, 0, 0]

/* Specific range fill karo */
const numbers = [1, 2, 3, 4, 5];
numbers.fill(9, 1, 4); // Index 1 se 3 tak (end exclusive)
console.log("Partially filled:", numbers); // [1, 9, 9, 9, 5]




/**
 * Example 2: Real World - Game Board Initialization
*/

class TicTacToe {
    constructor() {
        this.board = new Array(9);
        this.resetBoard();
    }
    
    resetBoard() {
        this.board.fill(null);
        console.log("Board reset!");
    }
    
    makeMove(position, player) {
        if (position < 0 || position >= 9) {
            console.log("❌ Invalid position!");
            return false;
        }
        
        if (this.board[position] !== null) {
            console.log("❌ Position already occupied!");
            return false;
        }
        
        this.board[position] = player;
        console.log(`✅ ${player} ne move kiya position ${position} par`);
        return true;
    }
    
    displayBoard() {
        console.log("🎯 Current Board:");
        for (let i = 0; i < 9; i += 3) {
            const row = this.board.slice(i, i + 3)
                .map(cell => cell || " ")
                .join(" | ");
            console.log(` ${row} `);
            if (i < 6) console.log("-----------");
        }
    }
}

/* Usage */
const game = new TicTacToe();
game.displayBoard();

game.makeMove(4, "X");
game.makeMove(0, "O");
game.makeMove(2, "X");
game.displayBoard();