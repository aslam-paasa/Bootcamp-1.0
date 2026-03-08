export const fetchIncome = () => async (dispatch) => {
    try {
        dispatch({ type: 'FETCH_DATA_LOADING' })
        const response = await fetch(
            'https://redux-example.tanaypratap.repl.co/income',
        )
        const data = await response.json()
        dispatch({ type: 'FETCH_INCOME_SUCCESS', payload: data })
    } catch (error) {
        console.error('Error fetching income data:', error)
        dispatch({ type: 'FETCH_INCOME_FAILURE' })
    }
}

export const fetchSavings = () => async (dispatch) => {
    try {
        const response = await fetch(
            "https://redux-example.tanaypratap.repl.co/savings"
        );
        const data = await response.json();
        dispatch({ type: "FETCH_SAVINGS_SUCCESS", payload: data });
    } catch (error) {
        console.error("Error fetching savings data:", error);
        dispatch({ type: "FETCH_SAVINGS_FAILURE" });
    }
};

export const fetchExpenses = () => async (dispatch) => {
    try {
        const response = await fetch(
            "https://redux-example.tanaypratap.repl.co/expenses"
        );
        const data = await response.json();
        console.log({ data });
        dispatch({ type: "FETCH_EXPENSES_SUCCESS", payload: data });
    } catch (error) {
        console.error("Error fetching expense data:", error);
        dispatch({ type: "FETCH_EXPENSES_FAILURE" });
    }
};

export const addEntry = (entry) => async (dispatch) => {
    try {
        const response = await fetch(
            "https://redux-example.tanaypratap.repl.co/add-entry",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(entry)
            }
        );

        const data = await response.json();
        if (data.success === true) {
            dispatch({ type: "ADD_ENTRY_SUCCESS", payload: data.data });
        }
    } catch (error) {
        console.error("Error adding entry:", error);
        dispatch({ type: "ADD_ENTRY_FAILURE" });
    }
};
