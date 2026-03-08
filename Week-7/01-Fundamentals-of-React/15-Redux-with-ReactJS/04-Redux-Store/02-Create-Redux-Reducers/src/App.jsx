/**
 * Challenge-2: Create Redux Reducers
 * 1. Create reducers.js File: Start by creating a new file named in
 *    your project.
 * 2. Set Up Initial State:
 *    In reducers.js, define an initial state object called initialState.
 *    This should have the following properties:
 *    > income  : An empty array to hold income data.
 *    > expenses: An empty array to hold expenses data.
 *    > savings : An empty array to hold savings data.
 *    > loading : A boolean set to false initially to indicate that no
 *                data is being loaded.
 *    > error   : Initially set to null to indicate that there are no
 *                errors.
 * 3. Create financeReducer Function:
 *    a. Define a reducer function named financeReducer
 *    b. You should create cases for action type like FETCH_INCOME_SUCCESS,
 *       FETCH_DATA_LOADING, and handle failure with 'FETCH_INCOME_FAILURE.
*/