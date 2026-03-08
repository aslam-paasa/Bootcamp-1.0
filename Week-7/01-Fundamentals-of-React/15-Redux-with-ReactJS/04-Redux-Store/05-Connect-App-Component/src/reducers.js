const initialState = {
    income: [],
    expenses: [],
    savings: [],
    loading: false,
    error: null,
}

const financeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_INCOME_SUCCESS':
            return {
                ...state,
                income: action.payload,
                loading: false,
                error: null,
            }
        case 'FETCH_INCOME_FAILURE':
            return {
                ...state,
                loading: false,
                error: 'Error fetching income data',
            }
        case 'FETCH_DATA_LOADING':
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }
}
export default financeReducer