/**
 * Challenge-2.1: Define Redux Actions - income
 * 1. Create an action creator function named fetchIncome. It will be
 *    an asynchronous function.
 * 2. Inside fetchIncome, use a try-catch block to handle errors.
 * 3. Inside the try block, fetch income data from your backend API.
 *    Replace '/api/income' with the actual API endpoint to fetch
 *    income data.
 * 4. Use await to get the response and parse it as JSON.
 * 5. Dispatch an action of type FETCH_INCOME_SUCCESS with the fetched
 *    data as the payload if the request is successful
 * 6. If there's an error, catch it and dispatch an action of type
 *    FETCH_INCOME_FAILURE.
*/