import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen } from "./cart.action";
import { CartItem } from "./cart.types";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

// Declaring the initial state
const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

// reducer for the cart
/**
 * ! because we are going to have the action that may or may not have a payload so we can do away with {} and destructuring
 * ! that used earlier.
 * @param state
 * @param action
 * @returns
 */
export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action.type)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action.type)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }
  return state;
};
