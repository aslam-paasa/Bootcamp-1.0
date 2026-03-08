// http://latentflip.com/loupe

// calculate the sum  from 0 to 50

// 1. Dumb way

let sum = 1+2+3+4+5+6+7+8+9+10+ 
          11+12+13+14+15+16+17+18+19+20+
          21+22+23+24+25+26+27+28+29+30+
          31+32+33+34+35+36+37+38+39+40+
          41+42+43+44+45+46+47+48+49+50 

console.log(sum)

// The flaws of above  code:
// 1. Too much text
// 2. what if u need to calculate the sum  from 0 to 500 , u need to write alot of 
//    code to achieve this



// 2. Using loops

let sum02 = 0

for(let i=0;i<=50;i++){
  sum02 = sum02 + i
}
console.log(sum02)

// The advantage of loops:

// 1. Reduce the code repetation
// 2. Easy to debug



// Syntax of a for loop :
// +---------------------+
// for (initialization; condition; update) 
// {
//  Code to be repeated
// }

// How loops works
// 1. First loops goes to initalization step.
// 2. And then it checks the condition statement.
// if the condition if true, then it execute the block of code.
// or else  it exist the loop.
// 3. After exectuing the block of code it goes to updation step where the values can be incremented or it can be decremented.
// 4. Then again controls check the condition and exectute the block of code
// This is will be done again and again until the condition fails

// Note : You can even visualize how actally the code runs : http://latentflip.com/loupe/
// This website lets you visualize how code is running.