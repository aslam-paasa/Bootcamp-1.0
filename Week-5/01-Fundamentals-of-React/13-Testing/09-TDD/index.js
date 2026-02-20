/**
 * Test Driven Development(TDD): 
 * - It is a development process that uses tests to drive the development.
 * - It is a cycle of:
 *    a. Write a test
 *    b. Run the test & see it fail
 *    c. Write the code to pass the test
 *    d. Refactor the code
*/

const initialState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0
};


function cartReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                items: [...state.items, action.payload.item],
                totalPrice: state.totalPrice + action.payload.item.price,
                totalQuantity: state.totalQuantity + 1
            };

        case "REMOVE_FROM_CART":
            const itemToBeRemoved = action.payload.item;
            const items = state.items.filter(item => item.id !== itemToBeRemoved.id);
            return {
                ...state,
                items,
                totalPrice: state.totalPrice - itemToBeRemoved.price,
                totalQuantity: state.totalQuantity - 1
            };

        default:
            break;
    }
}

module.exports = { cartReducer };