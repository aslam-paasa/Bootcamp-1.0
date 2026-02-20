const initialState = {
    income: [],
    expenses: [],
    savings: [],
    loading: false,
    error: null
};

const financeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_INCOME_SUCCESS":
            return {
                ...state,
                income: action.payload,
                loading: false,
                error: null
            };
        case "FETCH_EXPENSES_SUCCESS":
            return {
                ...state,
                expenses: action.payload,
                loading: false,
                error: null
            };
        case "FETCH_SAVINGS_SUCCESS":
            return {
                ...state,
                savings: action.payload,
                loading: false,
                error: null
            };
        case "FETCH_INCOME_FAILURE":
            return {
                ...state,
                loading: false,
                error: "Error fetching income data"
            };
        case "FETCH_EXPENSES_FAILURE":
            return {
                ...state,
                loading: false,
                error: "Error fetching expense data"
            };
        case "FETCH_SAVINGS_FAILURE":
            return {
                ...state,
                loading: false,
                error: "Error fetching savings data"
            };
        default:
            return state;
    }
};

export default financeReducer;
