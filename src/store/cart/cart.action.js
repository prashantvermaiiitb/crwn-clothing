import { createAction } from "../../utils/actionCreator";
import { CART_ACTION_TYPES } from "./cart.types";

/**
 * Toggle Cart Open or Close 
 * @param {*} categories 
 * @returns 
 */
export const setIsCartOpen = (isCartOpen) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);
}


export const addItemToCart = (product) => {
    return createAction(CART_ACTION_TYPES.SET_CART_ADD_ITEMS, product);
}

export const clearItemFromCart = (product) => {
    return createAction(CART_ACTION_TYPES.SET_CART_CLEAR_ITEMS, product);
}

export const removeItemFromCart = (product) => {
    return createAction(CART_ACTION_TYPES.SET_CART_REMOVE_ITEMS, product);
}