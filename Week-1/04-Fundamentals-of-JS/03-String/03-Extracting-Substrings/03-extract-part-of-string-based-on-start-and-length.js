/**
 * substr() - Deprecated Length-based Extraction
 * > substr() start index se specified length tak ka part return karta 
 *   tha.
 * 
 * Note: substr() deprecated ho chuka hai. Modern code mein slice() ya 
 *       substring() use karo.
*/

/**
 * Comparison with Modern Methods:
*/
const text = "JavaScript";

console.log("⚠️ substr() - Deprecated Method Examples:");

// ❌ Deprecated - Don't use in new code
console.log(`substr(4, 6): "${text.substr(4, 6)}"`); // "Script"

// ✅ Modern alternatives
console.log(`slice(4, 10): "${text.slice(4, 10)}"`); // "Script"
console.log(`substring(4, 10): "${text.substring(4, 10)}"`); // "Script"

console.log("\n🔍 Negative start in substr():");
console.log(`substr(-3): "${text.substr(-3)}"`); // "ipt" (last 3)
console.log(`slice(-3): "${text.slice(-3)}"`); // "ipt" (same)


/**
 * Why substr() was deprecated:
 * > Confusing parameters (start, length vs start, end)
 * > Inconsistent behavior across browsers
 * > slice() aur substring() better alternatives hain
*/