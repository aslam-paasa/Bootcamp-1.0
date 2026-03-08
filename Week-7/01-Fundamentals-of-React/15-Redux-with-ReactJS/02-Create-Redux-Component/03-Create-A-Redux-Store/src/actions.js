/**
 * Challenge-1: Create Actions
 * In a file called actions.js, define the actions for adding income and
 * expenses with amount.
*/

export const addIncome = (amount) => {
    return {
        type: 'ADD_INCOME',
        payload: amount
    }
}

export const addExpense = (amount) => {
    return {
        type: 'ADD_EXPENSE',
        payload: amount
    }
}