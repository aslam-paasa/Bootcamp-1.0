import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CALCULATE_TOTAL } from './cartAction';

const initialState = {
    cartItems: [],
    total: 0
};


const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_TO_CART:
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

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload)
            };

        
        case UPDATE_QUANTITY:
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

        case CALCULATE_TOTAL:
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

export default cartReducer;