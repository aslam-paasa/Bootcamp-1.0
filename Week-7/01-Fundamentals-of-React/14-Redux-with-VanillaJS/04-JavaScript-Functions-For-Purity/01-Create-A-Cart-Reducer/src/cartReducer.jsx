/**
 * Challenge: Create a cart reducer
 * Create a cartReducer that handles adding, removing, updating quantity,
 * and calculating the total price of cart items.
 * 1. Create a cartReducer function that takes two parameters:
 *    a. state(initial state)
 *    b. action
 * 2. Implement the switch case for each action type
 *    a. ADD_TO_CART - cart/added 
 *       - Make sure you handle updating of the quantity of an item if it
 *         already exists in the cart.
 *    b. REMOVE_FROM_CART - cart/removed
 *    c. UPDATE_QUANTITY  - cart/updatedQuantity 
 *    d. CALCULATE_TOTAL  - cart/calculateTotal
 * 3. For ADD_TO_CART, add the product of the cartItems array with the help
 *    of spread operator.
 * 4. For REMOVE_FROM_CART, remove the product from the cartItems array based
 *    on its ID using array.filter
 * 5. FOR UPDATE_QUANTITY, update the quantity of the product based on its
 *    ID using Object.assign. 
 * 6. For CALCULATE_TOTAL, calculate the total price of all items in the cart
 *    and update the total field using array.reduce.
*/

const initialState = {
    cartItems: [],
    total: 0
};


const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case "ADD_TO_CART":
            const existingCartItem = state.cartItems.find((item) => 
                item.id === action.payload.id
            );

            if (existingCartItem) {
                const updatedCartItems = state.cartItems.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });

                return {
                    ...state,
                    cartItems: updatedCartItems
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
                };
            }

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload)
            };

        
        case "UPDATE_QUANTITY":
            const updatedCartItems = state.cartItems.map((item) => {
                if (item.id === action.payload.productId) {
                    return Object.assign({}, item, { quantity: action.payload.quantity });
                }
                return item;
            });

            return {
                ...state,
                cartItems: updatedCartItems
            };

        case "CALCULATE_TOTAL":
            const totalPrice = state.cartItems.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);

            return {
                ...state,
                total: totalPrice
            };

        default:
            return state;
    }
};