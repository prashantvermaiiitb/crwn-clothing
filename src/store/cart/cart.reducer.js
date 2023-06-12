import { CART_ACTION_TYPES } from "./cart.types";

// Declaring the initial state
const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}

// reducer for the cart
export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ADD_ITEMS:
        case CART_ACTION_TYPES.SET_CART_REMOVE_ITEMS:
        case CART_ACTION_TYPES.SET_CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            return state;
    }
}