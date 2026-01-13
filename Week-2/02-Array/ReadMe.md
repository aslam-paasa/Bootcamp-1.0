## Array Creation & Inspection:
1. Array() : Constructor to create a new array
2. Array.of(): Creates a new array from arguments
3. Array.from() : Converts array-like or iterable array
4. Array.isArray() : Checks if a value is an array


## Looping/Iteration Methods:
1. forEach() : Executes a function for each element
2. map() : Transforms each element and returns new array
3. filter() : Returns a new array with elements that match a condition
4. reduce() : Reduces array to a single value
5. reduceRight() : Same as reduce, but from right to left
6. some() : Returns true if at least one element passes condition
7. find() : Returns first element that matches condition
8. findLast() : Returns last element that matches condition
9. findIndex() : Returns index of first matching element
10. findLastIndex() : Index of last matching element
11. flatMap() : Maps and flattens the result into one array

## Modifying Array (Mutates Original):
1. push() : Add element(s) to end
2. pop()  : Remove last element
3. unshift() : Add element(s) to beginning
4. shift() : Remove first element
5. splice() : Add/remove item at any index
6. sort() : Sorts array (mutates!)
7. reverse() : Reverses the array
8. fill() : Fill with static value
9. copyWithin() : Copies part of array to another location


## Non-Mutating Array Methods:
1. slice() : Returns part of the array(doesn't mutate)
2. concat() : Join two or more arrays
3. join() : Converts array to string with separator
4. toString: Converts array to string (default comma sep)
5. includes() : Check if array contains a value
6. indexOf() : Find index of value
7. lastIndexOf: Last index of value
8. at() : Access element by index (can use negative index)
9. toReversed() : Returns a new reversed array
10. toSorted() : Returns a new sorted array
11. toSpliced() : Returns a new array with changes like splice
12. with() : Returns a new array with updated value at index.


## Fattening & Combining:
1. flat() : Flattens nested arrays
2. flatMap() : Like map + flat combined
3. concat() : Combines arrays


## Checking:
1. some() : At least one element satisfies condition
2. every() : All elements satisfy condition
3. includes() : Contains a specific value
4. Array.isArray() : Is it an array?


