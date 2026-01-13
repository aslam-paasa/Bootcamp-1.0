/**
 * What is Nullish Coalescing?
 * - Imagine you're trying to get a value from some data - maybe a user
 *   input or API response - and you wanna set a default value only if the
 *   real value is null or undefined.
 * - That's what exactly does:
 *   const result = someValue ?? 'Default';
*/

/**
 * It only kicks in when:
 * - someValue === null || someValue === undefined
 * 
 * - Not for:
 *   a. 0
 *   b. false
 *   c. '' (empty string)
*/

/**
 * Why it is introduced?
 * - Before ??, we used || (OR) operator like this:
 *   const name = user.name || 'Guest';
 * 
 * - But this fails when user.name = "" or 0 or false, because || treats
 *   those as falsy values.
 * 
 * - Problem:
 *   console.log("" || "Guest"); => "Guest" ❌
 *   console.log(0  || 10);       => 10     ❌
 * 
 * - Solution:
 *   console.log("" ?? "Guest"); => "" ✅ (empty string valid hai)
 *   console.log(0  ?? 10);      => 0  ✅ (zero valid hai)
*/


/**
 * When to use ??
 * - Use when:
 *   a. You only want to fallback if value is null or undefined.
 *   b. You don't want to accidentally override legit falsy values like
 *      0, '', or false.
 * 
 * - Don't use when:
 *   a. You want to fallback on any falsy value (false, 0, ''), then use
 *      || (OR) operator.

*/

/**
 * Assignment - User Profile
 * - Hum ek user profile banayenge jisme:
 *   a. Name (agar null/undefined hai to "Guest" dikhao)
 *   b. Age  (agar null/undefined hai to "N/A" dikhao)
 *   c. Bio  (agar null/undefined hai to "No bio available" dikhao)
*/

const userData = {
    name: null,
    age: 0,
    bio: undefined
};

function UserProfile({ user }) {
    // ?? ka use karke default values set karte hain
    const name = user.name ?? "Guest";
    const age = user.age ?? "N/A";
    const bio = user.bio ?? "No bio available";

    return (
        <div className="p-4 bg-white rounded shadow-md w-80">
            <h2 className="text-xl font-bold mb-2">User Profile</h2>
            <p>👤 Name: {name}</p>
            <p>🎂 Age: {age}</p>
            <p>📖 Bio: {bio}</p>
        </div>
    );
}

/**
 * Important Points:
 * 1. ?? sirf null aur undefined ke liye kaam karta hai
 * 2. 0, false, "" jaise values ko valid maanta hai
 * 3. || operator ki jagah ?? use karein jab aap sirf null/undefined check 
 *    karna chahte hain
*/