/**
 * Useful Function with Generics:
 * Q. Define a fn named findItem that takes two parameters: an array
 *    items of type T[] and an item of type T. The function should 
 *    return the index of the first occurrence of the item in the
 *    array, or -1 if the item is not found.
*/

const items = [1, 2, 3, 4, 5] // number[]
const itemToBeFound = '3' // string

// findItem(items, itemToBeFound) // JS give an error? No
// findItem(items, itemToBeFound) // TS will give an error if we use generics

/**
 * Q. Write a findItem that takes an array and an item, and returns true
 *    or false depending on whether the item is there or not.
*/

function findItem<T>(items: T[], item: T): number {
    return items.indexOf(item)
}

//    findItem([1, 2, 3, 4, 5], '3')
//    findItem(['mango', 'banana', 'apple'], 2) // give an error? Yes
// findItem(['mango', 'banana', 'apple'], 'guava') // give an error? Yes