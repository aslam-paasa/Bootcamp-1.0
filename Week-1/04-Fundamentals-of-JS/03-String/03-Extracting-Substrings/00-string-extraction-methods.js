/**
 * Introduction: Strings Se Parts Extract Karna
 * > String Extraction = Cake ka piece katna 
 *   - slice() = Exact measurements se piece katna (negative bhi chalega)
 *   - substring() = Simple measurements se piece katna
 *   - substr() = Purana tarika (ab use nahi karna chahiye)
 * 
 * > Ye methods strings se specific parts extract karne ke liye use 
 *   hote hain. 
 * > Original string change nahi hoti.
*/

const text = "JavaScript Programming";
console.log(text.slice(0, 10));     // "JavaScript"
console.log(text.substring(4, 10)); // "Script"
console.log(text.substr(4, 6));     // "Script" (deprecated)