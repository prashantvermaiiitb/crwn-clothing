import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/actionCreator";
import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

// add item to cart
const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // if there is no item in the cartItem array
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// remove item from cart
const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);

/**
 *  now we are defining type each of our actions as the type
 *  setiscartopen action will have CART_ACTION_TYPES.SET_IS_CART_OPEN & boolean payload
 *  this is the type of the object that's generated after this function is called.
 */
export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

/**
 * These 3 are different functions that manufacture the same action object
 * addItemToCart,clearItemFromCart,removeItemFromCart
 * This the return type that we got after executing the action creator function
 * this will be an action with payload and a type.
 */
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

/**
 * Toggle Cart Open or Close
 * @param {*} categories
 * @returns
 */
export const setIsCartOpen = withMatcher(
  (isCartOpen: boolean): SetIsCartOpen => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);
  }
);
/**
 * for the remaining 3 we have to create the action first then we have to update the name of the function.
 */
export const setCartItems = withMatcher(
  (newCartItems: CartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  }
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  productToClear: CartItem
) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
};
