import { CART_ACTION_TYPES } from "./cart.types";

// Declaring the initial state
const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}

// add item to cart
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }

    // if there is no item in the cartItem array
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

// remove item from cart
const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)

}

const clearCartItem = (cartItems, cartItemToRemove) => cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);

// reducer for the cart
export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    const { cartItems } = state;
    let newCartItems;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ADD_ITEMS:
            newCartItems = addCartItem(cartItems, payload)
            return {
                ...state,
                cartItems: newCartItems
            };
        case CART_ACTION_TYPES.SET_CART_REMOVE_ITEMS:
            newCartItems = removeCartItem(cartItems, payload)
            return {
                ...state,
                cartItems: newCartItems
            }
        case CART_ACTION_TYPES.SET_CART_CLEAR_ITEMS:
            newCartItems = clearCartItem(cartItems, payload)
            return {
                ...state,
                cartItems: newCartItems
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
