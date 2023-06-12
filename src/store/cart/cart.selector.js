import { createSelector } from "reselect";

// Selecting Cart from state.
const cartItemsReducer = (state) => state.cart;

// Memoising cart items
export const cartSelector = createSelector(
    [cartItemsReducer],
    (cart) => {
        return { cartItems: cart.cartItems, isCartOpen: cart.isCartOpen }
    }
)

// Memoise Cart Count basis cartItems
export const cartItemCount = createSelector(
    [cartSelector],
    (cart) => {
        if (cart.cartItems.length) {
            return cart.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        } 
        return 0;
    }
);

// Memoise Cart Total Count basis cartItems
export const cartItemTotal = createSelector(
    [cartSelector],
    (cart) => cart.cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
);
