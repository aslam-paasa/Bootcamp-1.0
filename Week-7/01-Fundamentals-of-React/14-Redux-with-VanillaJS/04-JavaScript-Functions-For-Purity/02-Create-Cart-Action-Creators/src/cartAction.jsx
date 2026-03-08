/**
 * Challenge: Create cart action creators
 * Create action creators for each type of action in the cart reducer. 
 * 1. Create constant actions for:
 *    - ADD_TO_CART
 *    - REMOVE_FROM_CART
 *    - UPDATE_QUANTITY
 *    - CALCULATE_TOTAL
 * 2. Create an action creator fn named addToCart that takes a product param
 *    and returns an action with the type of ADD_TO_CART and the payload as
 *    product.
 * 3. Create an action creator fn named removeFromCart that takes a productId
 *    param and returns an action object with the type of REMOVE_FROM_CART
 *    and the payload as productId.
 * 4. Create an action creator fn named updateQuantity that takes a productId
 *    and quantity param and return an action object with the type of
 *    UPDATE_QUANTITY and the payload as an object containing productId and
 *    quantity.
 * 5. Create an action creator fn named calculateTotal that returns an action
 *    object with the type of CALCULATE_TOTAL. 
 * 6. Make sure you update the cartReducer cases with action constants.
*/

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const CALCULATE_TOTAL = "CALCULATE_TOTAL";

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId
});

export const updateQuantity = (productId, quantity) => ({
    type: UPDATE_QUANTITY,
    payload: { productId, quantity }
});

export const calculateTotal = () => ({
    type: CALCULATE_TOTAL
});