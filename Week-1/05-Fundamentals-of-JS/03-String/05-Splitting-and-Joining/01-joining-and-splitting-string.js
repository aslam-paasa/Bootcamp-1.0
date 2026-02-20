/**
 * Introduction: Strings Ko Split, Join aur Compare Karna
 * > Ye methods strings ko arrays mein convert karte hain aur vice versa,
 *   aur strings ko compare karte hain.
 *   - Splitting = Sentence ko words mein break karna 
 *   - Joining   = Words ko mila kar sentence banana 
 *   - Comparing = Do strings ko compare karna (alphabetically)
*/

// Splitting and Joining
const sentence = "Hello World JavaScript";
const words = sentence.split(" "); // ["Hello", "World", "JavaScript"]
const newSentence = words.join("-"); // "Hello-World-JavaScript"

// Comparing
console.log("apple".localeCompare("banana")); // -1 (apple comes before banana)