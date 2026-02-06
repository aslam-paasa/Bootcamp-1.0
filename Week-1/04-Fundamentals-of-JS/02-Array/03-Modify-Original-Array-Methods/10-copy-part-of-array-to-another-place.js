/**
 * Step 9: copyWithin() - Part of array ko copy karna
 * > copyWithin() array ke andar hi elements ko copy karta hai - ek position
 *   se dusri position par.
 * 
 * Syntax: array.copyWithin(target, start, end)
*/



/**
 * Example 1: Basic CopyWithin
*/

const numbers = [1, 2, 3, 4, 5];

console.log("Original:", numbers);

/* Index 0 par index 3 se copy karo */
numbers.copyWithin(0, 3);
console.log("After copyWithin(0, 3):", numbers); // [4, 5, 3, 4, 5]

/* Reset karo */
numbers = [1, 2, 3, 4, 5];
/* Index 0 par index 3 se 4 tak copy karo */
numbers.copyWithin(0, 3, 4);
console.log("After copyWithin(0, 3, 4):", numbers); // [4, 2, 3, 4, 5]



/**
 * Example 2: Real World - Data Shifting
*/

/* Time series data - recent values ko shift karna */
const temperatureReadings = [22, 23, 24, 25, 26, 27, 28];

console.log("Original temperatures:", temperatureReadings);

/* Naya reading aaya hai, purane readings shift karo */
function addNewReading(newTemp) {
    /* Purane readings ek position shift karo */
    temperatureReadings.copyWithin(0, 1);
    /* Last position par naya reading add karo */
    temperatureReadings[temperatureReadings.length - 1] = newTemp;
    console.log(`New reading: ${newTemp}°C`);
}

addNewReading(29);
console.log("Updated temperatures:", temperatureReadings);

addNewReading(30);
console.log("Final temperatures:", temperatureReadings);
