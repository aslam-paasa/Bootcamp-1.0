/**
 * Challenge-2: Create Reducers
 * In a file called reducers.js, create reducers to manage income and expenses.
*/

const initialState = {
    income: 0,
    expenses: 0
}

const financeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_INCOME':
            return {
                ...state,
                income: state.income + action.payload
            }

        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: state.expenses + action.payload
            }

        default:
            return state;
    }
}

export default financeReducer;