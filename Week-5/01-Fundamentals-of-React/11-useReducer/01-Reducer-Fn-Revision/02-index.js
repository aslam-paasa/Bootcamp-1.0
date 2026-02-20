/**
 * 1. Array Data:
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
 *    a. If action.type == 'even'
 *       - state: { even: +playload, odd: remains same }
 *    b. If action.type == 'odd'
 *       - state: { even: remains same, odd: +payload }
 * => O/P: { odd: 59, even: 66 }
*/
function reducer(state, action) {
    if (action.type === 'even') {
        return { ...state, even: state.even + action.payload }
    }
    return { ...state, odd: state.odd + action.payload }
}
