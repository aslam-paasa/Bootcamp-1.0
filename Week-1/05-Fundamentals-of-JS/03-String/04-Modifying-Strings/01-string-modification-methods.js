/**
 * Introduction: Strings Ko Modify Karna
 * > String Modification = Text editor mein formatting apply karna 
 *   - Case change = UPPERCASE/lowercase toggle karna
 *   - Trimming = Extra spaces hatana
 *   - Replacement = Find & replace karna
 *   - Padding = Text ko align karna
 *   - Repetition = Text copy-paste karna
 * 
 * > Ye methods strings ko modify karke nayi strings return karte hain. 
 * > Original string change nahi hoti.
*/

const text = "  Hello World  ";
console.log(text.toUpperCase());                  // "  HELLO WORLD  "
console.log(text.trim());                         // "Hello World"
console.log(text.replace("World", "JavaScript")); // "  Hello JavaScript  "