/**
 * Introduction: Strings Mein Search Karna 
 * > String Searching = Book mein specific word dhundhna 
 *   - indexOf()      = Pehli baar word kahan mila?
 *   - lastIndexOf()  = Aakhri baar word kahan mila?
 *   - includes()     = Kya word book mein hai?
 *   - startsWith()   = Kya chapter specific word se start hota hai?
 *   - endsWith()     = Kya paragraph specific word par khatam hota hai?
 * 
 * > Ye methods strings mein patterns aur substrings dhundhne ke liye 
 *   use hote hain.
*/

const text = "JavaScript is awesome. JavaScript is powerful.";
console.log(text.indexOf("JavaScript"));     // 0
console.log(text.lastIndexOf("JavaScript")); // 20
console.log(text.includes("awesome"));       // true
console.log(text.startsWith("Java"));        // true
console.log(text.endsWith("powerful."));     // true