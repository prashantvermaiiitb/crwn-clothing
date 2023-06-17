import { createSlice } from "@reduxjs/toolkit";
// import { CART_ACTION_TYPES } from "./cart.types";

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


export const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITIAL_STATE,
    reducers: {
        addItemToCart(state, action) {
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        clearItemFromCart(state, action) {
            state.cartItems = clearCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart(state, action) {
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
        setIsCartOpen(state, action) {
            state.isCartOpen = action.payload;
        }
    }
});

export const { setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;