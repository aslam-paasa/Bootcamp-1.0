/**
 * Q. Now, remove if/else and use a switch statement instead.
 * */

const numList = [
    { type: 'odd', payload: 1 },
    { type: 'odd', payload: 3 },
    { type: 'odd', payload: 55 },
    { type: 'even', payload: 22 },
    { type: 'even', payload: 44 },
]
function oddAndEvenSumReducer(acc, value) {

    switch (value.type) {
        case 'even':
            return { ...acc, even: acc.even + value.payload }
        case 'odd':
            return { ...acc, odd: acc.odd + value.payload }
        default:
            return acc
    }
}
const initialAccumulator = { odd: 0, even: 0 }
numList.reduce(oddAndEvenSumReducer, initialAccumulator)


/**
 * Congratulations! You have written your first reducer.
 * Now, let's just learn how to put it in React and later we'll learn
 * how to put it in Redux. But the basics are this and this only.
*/


/**
 * useReducer:
*/
function counterReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: count + 1 }
        case 'DECREMENT':
            return { count: count - 1 }
    }
}

/**
 * Dry run: 
 * 1. Two Buttons:  
 *    a. '+' : INCREMENT,  
 *    b. '-' : DECREMENT 
 * 2. reduce(accumulator, initialValue)
 *    reduce(prevValue, currentValue)
 *    reduce(state, action)
 * 3. action.type == 'INCREMENT'  :  Update state.count = +1
 *    action.type == 'DECREMENT'  :  Update state.count = -1
 * 
 * Output:
 * 1: + state: { count: 0 }, action: { type: 'INCREMENT' } => { count: 1 }
 * 2: + state: { count: 1 }, action: { type: 'INCREMENT' } => { count: 2 }
 * 3: - state: { count: 2 }, action: { type: 'DECREMENT' } => { count: 1 }
 * 4: + state: { count: 1 }, action: { type: 'INCREMENT' } => { count: 2 }
 * 5: + state: { count: 2 }, action: { type: 'INCREMENT' } => { count: 3 }
*/

