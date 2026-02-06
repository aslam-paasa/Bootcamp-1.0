/**
 * Array.prototype.at():
 * > Array.prototype.at() takes an integer value and returns the item at
 *   that index, allowing for positive and negative integers. 
 * > Negative integers count back from the last item in the array.
*/

/**
 * Example:
*/
const arr = [42, 79];
arr.myAt(0); // 42
arr.myAt(1); // 79
arr.myAt(2); // undefined

arr.myAt(-1); // 79
arr.myAt(-2); // 42
arr.myAt(-3); // undefined


/**
 * Implementation:
 * > The Array.prototype.at() method allows accessing elements of an array
 *   using positive or negative indices, similar to how Python's list
 *   indexing works which is convenient when accessing items from the back.
 * > Traditionally, to access the last item you'd do arr[arr.length - 1], 
 *   but with this method you can do arr.at(-1).
 * 
 * > For indices that are out of bounds (defined as index < -arr.length ||
 *   index >= arr.length), undefined is returned. 
 * > To safely access the index, we can allow the index to "wrap around" by
 *   adding array.length to indices so that negative indices will become the
 *   positive counterpart. However, for positive values, this will now cause
 *   the index to exceed the array range.
 * > Hence, we modulo by array.length to get the index back within the range.
 * 
 * Note: The specifications state that the index is converted to an integer
 *       first, so Array.prototype.at() works even for string versions of
 *       indices.
*/

Array.prototype.myAt = function (index) {
    const len = this.length;
    if (index < -len || index >= len) {
      return;
    }
  
    return this[(index + len) % len];
};


/**
 * Edge Cases:
 * > Using non-integer index such as [42, 79].at('1').
*/

/**
 * @param {number} index
 * @return {any | undefined}
 */
Array.prototype.myAt = function (index) {
    const len = this.length;
    const relativeIndex = Number(index);
    const k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  
    if (k < 0 || k >= len) {
      return undefined;
    }
  
    return this[k];
};


const arrOfStrings = ['42', '79'];
arrOfStrings.myAt('1'); // 79
arrOfStrings.myAt(-1); // 79
arrOfStrings.myAt(-2); // 42
arrOfStrings.myAt(-3); // undefined