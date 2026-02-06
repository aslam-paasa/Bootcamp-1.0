/**
 * Promise.reject():
 * > "The Promise.reject() static method returns a Promise object that is
 *    rejected with a given reason."
 * 
 * > Unlike Promise.resolve(), Promise.reject() always wraps 'reason' in a
 *   new 'Promise' object, even when 'reason' is already a 'Promise'. 
 * 
 * > Implement the Promise.reject() fn as promiseReject. You can ignore the
 *   case where 'this' is referenced within the implemented function.
 * > Example:
 *   try {
 *     promiseReject('Mayday!');
 *   } catch (err) {
 *     console.log(err); // Mayday!
 *   } 
*/

/**
 * Solution:
 * > Promise.reject returns a 'Promise' that is rejected.
 * > It is essentially a shorthand for 'new Promise((resolve, reject) => reject(reason))'.
 * > The only thing we need to note is to wrap the 'reason' value in a new
 *   'Promise' object even when 'reason' is already a 'Promise'.
 * 
 * > In simple words:
 *   "Tum koi bhi value ye error do, wo usko ek rejected Promise bana ke
 *    return karega."
*/

/**
 * @param {*} reason
 * @returns Promise
 */
export default function promiseReject(reason) {
    return new Promise((_, reject) => reject(reason));
}
  

/**
 * Example usage:
*/
try {
    await promiseReject("Mayday!");
  } catch (err) {
    console.log('Error:', err); // Error: Mayday!
  }
  