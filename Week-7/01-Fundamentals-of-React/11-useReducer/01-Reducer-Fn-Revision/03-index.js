/**
 * Q. Modify your oddAndEvenSumReducer function to accumodate an array
 *    of objects. The objects will have two keys: type & payload.
 *    The type will tell you whether the number is even or odd and the
 *    payload will have the number
 * 
 *    const numList = [
 *       { type: 'odd', payload: 1 },
 *       { type: 'odd', payload: 3 },
 *       { type: 'odd', payload: 55 },
 *       { type: 'even', payload: 22 },
 *       { type: 'even', payload: 44 },
 *    ]
 * 
 * Note: This means you don't need the odd/even logic in the reducer
 *       function anymore.
 *       if(value.type === 'even') {...}
 * */


/**
 * 1. Array of Object: 
 *    a. type
 *    b. payload
*/
const numList = [
    { type: 'odd', payload: 1 },
    { type: 'odd', payload: 3 },
    { type: 'odd', payload: 55 },
    { type: 'even', payload: 22 },
    { type: 'even', payload: 44 },
]

/**
 * 2. reducerFn(accumulator, currentElement):
 *    a. Add the 'payload' to the 'even' key
 *       - state: { even: +playload, odd: remains same }
 *    b. Add the 'payload' to the 'odd' key
 *       - state: { even: remains same, odd: +payload }
 * => O/P: { odd: 59, even: 66 }
*/

function oddAndEvenSumReducer(acc, value) {
    if (value.type === 'even') {
        return { ...acc, even: acc.even + value.payload }
    }
    return { ...acc, odd: acc.odd + value.payload }
}

const initialAccumulator = { odd: 0, even: 0 }

/**
 * Syntax of reducer: array.reduce(callbackFn, initialValue)
 *                    array.reduce(accumulator, initialValue)
 *                    array.reduce(state, action) 
 * a. oddAndEvenSumReducer: Logic to update the accumulator.
 * b. initialAccumulator  : Initial Value for the accumulator
*/
console.log(numList.reduce(oddAndEvenSumReducer, initialAccumulator));

/**
 * Dry Run:
 * 1 ; acc: { odd: 0, even: 0 }, value: { type: 'odd', payload: 1 }
 * 2 ; acc: { odd: 1, even: 0 }, value: { type: 'odd', payload: 3 }
 * 3 ; acc: { odd: 4, even: 0 }, value: { type: 'odd', payload: 55 }
 * 4 ; acc: { odd: 59, even: 0 }, value: { type: 'even', payload: 22 }
 * 5 ; acc: { odd: 59, even: 22 }, value: { type: 'even', payload: 44 }
 * 6 { odd: 59, even 66 }
*/
