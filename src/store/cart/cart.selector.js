import { createSelector } from "reselect";

// Selecting Cart from state.
const cartItemsReducer = (state) => state.cart;

// Memoising cart items
export const selectCartItems = createSelector(
    [cartItemsReducer],
    (cart) => cart.cartItems
)


// Memoising cart items
export const selectIsCartOpen = createSelector(
    [cartItemsReducer],
    (cart) => cart.isCartOpen
)


// Memoise Cart Count basis cartItems
export const selectCartItemCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

// Memoise Cart Total Count basis cartItems
export const selectCartItemTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
);
