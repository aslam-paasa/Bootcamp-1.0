/**
 * Introduction to Immutable vs Mutable Methods:
 * > Ye sab methods original array ko change karte hain (mutate). 
 * > Agar aap original array preserve karna chahte hain, toh pehle copy bana 
 *   lein.
*/

/* Original array change ho jayega */
const originalOne = [1, 2, 3];
originalOne.push(4); // originalOne becomes [1, 2, 3, 4]

/* Original array preserve karna */
const originalTwo = [1, 2, 3];
const copy = [...originalTwo]; // Spread operator se copy
copy.push(4); // copy becomes [1, 2, 3, 4], original remains [1, 2, 3]