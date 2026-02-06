/**
 * Variables:
*/

/**
 * Q. Declare a variable and assign it to your fav drink as a string. 
 *    Make sure there is no whitespace on either side of the string, and 
 *    print the value to the console
*/
let favDrink = " dietVanillaCokeFromFriendlys";
favDrink = favDrink.trim();
console.log(favDrink);


/**
 * Q. Declare a variable, assign it a string of multiple words, and check to 
 *    see if one of the words is "apple".
*/

let multiWord = "car rainbow apple";
// console.log(multiWord.search("apple")); // idx-12
if(multiWord.search("apple") !== -1) {
    console.log("yes");
} else {
    console.log("no");
}


/**
 * Functions:
*/

/**
 * Q. Create a function that returns rock, paper, or scissors as randomly as 
 *    possible
*/
function rockPaperScissors() {
    let random = Math.random();
    if(random < .33) {
        return "rock";
    } else if(random < .66) {
        return "paper";
    } else {
        return "scissors"
    }
}
console.log(rockPaperScissors());



/**
 * Conditionals:
*/

/**
 * Q. Create a function that takes in a choice (rock, paper, or scissors) and 
 *    determines if they won a game of rock paper scissors against a bot using 
 *    the above function
*/
function checkWin(choice) {
    let botChoice = rockPaperScissors()
    if((choice === "rock" && botChoice === "scissors") || (choice === "paper" && botChoice === "rock") || (choice === "scissors" && botChoice === "paper")) {
        console.log("You won");
    } else if(choice === botChoice) {
        console.log("You tied");
    } else {
        console.log("You lost");
    }
}
checkWin("rock");

/**
 * Loops:
*/

/**
 * Q. Create a function that takes an array of choices. Play the game x times 
 *    where x is the number of choices in the array. Print the results of each 
 *    game to the console.
*/
function playGame(arr) {
    arr.forEach((choice) => {
        checkWin(choice);
    });
}
playGame(["rock", "paper", "paper"]);