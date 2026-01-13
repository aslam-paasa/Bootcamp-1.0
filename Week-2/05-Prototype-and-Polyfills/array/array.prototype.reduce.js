/**
 * Array.prototype.reduce():
 * > Array.prototype.reduce is a way of "reducing" elements in an array by
 *   calling a "reducer" callback function on each element of the array in
 *   order, passing in the return value from the calculation on the preceding
 *   element.
 * > The final result of running the reducer across all elements of the array
 *   is a single value.
 * > Example:
 *
 *   [1, 2, 3].myReduce((prev, curr) => prev + curr, 0); // 6
 *   [1, 2, 3].myReduce((prev, curr) => prev + curr, 4); // 10
 */

/**
 * > The rest of the implementation is straightforward with these nuances
 *   taken into account. As we loop through the array (via this), call the
 *   callback on each array element with the following parameters: \
 *   a. acc,
 *   b. element,
 *   c. index, and
 *   d. this.
 *
 * > The returned value will become the new acc to be passed to the next call
 *   of the callbackFn.
 */

Array.prototype.myReduce = function (callbackFn, initialValue) {
  const noInitialValue = initialValue === undefined;
  const len = this.length;

  if (noInitialValue && len === 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let acc = noInitialValue ? this[0] : initialValue;
  let startingIndex = noInitialValue ? 1 : 0;

  for (let k = startingIndex; k < len; k++) {
    if (Object.hasOwn(this, k)) {
      acc = callbackFn(acc, this[k], k, this);
    }
  }

  return acc;
};

/**
 * Edge Cases:
 * > Empty array, with and without the initialValue argument.
 * > Single-value array, with and without the initialValue argument.
 * > Passing the index and array to the reducer callback.
 * > Sparse arrays, e.g. [1, 2, , 4]. The empty values should be ignored
 *   while traversing the array.
 */

Array.prototype.myReduce = function (callbackFn, initialValue) {
  const len = this.length;

  if (
    typeof callbackFn !== "function" ||
    !callbackFn.call ||
    !callbackFn.apply
  ) {
    throw new TypeError(`${callbackFn} is not a function`);
  }

  if (len === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let k = 0;
  let accumulator = undefined;

  if (initialValue !== undefined) {
    accumulator = initialValue;
  } else {
    let kPresent = false;
    while (!kPresent && k < len) {
      // Ignore index if value is not defined for index (e.g. in sparse arrays).
      kPresent = Object.hasOwn(this, k);
      if (kPresent) {
        accumulator = this[k];
      }
      k = k + 1;
    }

    if (!kPresent) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
  }

  while (k < len) {
    const kPresent = Object.hasOwn(this, k);
    if (kPresent) {
      const kValue = this[k];
      accumulator = callbackFn(accumulator, kValue, k, this);
    }
    k = k + 1;
  }

  return accumulator;
};
