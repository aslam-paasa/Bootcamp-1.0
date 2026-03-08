const initialState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0
};

/**
 * Testing Reducers:
 * Q. Write this for this reducer:
 *    Add two products and test that the output is as expected times.
*/

/**
 * When we do "Add to Cart", we need to: 
 * a. add the item to the cart
 * b. update the total price
 * c. update the total quantity 
 * 
 * Suppose there is an initial state which has 1 item already and we add
 * one more item and then we call this cartReducer function. 
 * 
 * We need to test that the output is as expected.
*/
function cartReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                items: [...state.items, action.payload.item],
                totalPrice: state.totalPrice + action.payload.item.price,
                totalQuantity: state.totalQuantity + 1
            };

        default:
            break;
    }
}

module.exports = { cartReducer };