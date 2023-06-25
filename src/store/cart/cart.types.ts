import { CategoryItem } from "../categories/category.types";

// declaring the cart action types
export enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = "cart/SET_IS_CART_OPEN",
  SET_CART_ADD_ITEMS = "cart/SET_CART_ADD_ITEMS",
  SET_CART_REMOVE_ITEMS = "cart/SET_CART_REMOVE_ITEMS",
  SET_CART_CLEAR_ITEMS = "cart/SET_CART_ITEMS",
  SET_CART_ITEMS = "cart/SET_CART_ITEMS",
}

/**
 * cartitem is category Item with quantity as the numeric value.
 */
export type CartItem = CategoryItem & {
  quantity: number;
};
