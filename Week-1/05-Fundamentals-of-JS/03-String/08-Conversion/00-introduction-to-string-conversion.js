/**
 * Introduction: Values Ko String Mein Convert Karna 
 * > String Conversion = Kisi bhi cheez ko written form mein convert karna 
 *   a. String(value) = Universal converter (sab kuch string ban sakta hai)
 *   b. value.toString() = Specific objects ke liye (numbers, arrays, etc.)
 * 
 * > Ye methods kisi bhi value ko string representation mein convert karte hain.
*/

// Different types ko string mein convert karna
console.log(String(42)); // "42"
console.log(String(true)); // "true"
console.log(String(null)); // "null"
console.log(String([1, 2, 3])); // "1,2,3"

console.log((42).toString()); // "42"
console.log(true.toString()); // "true"