import { createContext, useReducer } from "react";
// import { createAction } from "../../utils/actionCreator";
import { cartReducer } from "../../store/cart/cart.reducer";

// const addCartItemversion1 = (cartItems, productToAdd) => {
//     const index = cartItems.findIndex(cartItem => cartItem.id === productToAdd.id);
//     if (index !== -1) {
//         cartItems[index].quantity++;
//     } else {
//         cartItems.push({ ...productToAdd, quantity: 1 });
//     }
//     return [...cartItems];
// }

// const removeCartItemversion1 = (cartItems, productToRemove) => {
//     const index = cartItems.findIndex(cartItem => cartItem.id === productToRemove.id);
//     if (index !== -1) {
//         const newQuantity = productToRemove.quantity - 1;
//         if (newQuantity === 0) {
//             cartItems.splice(index, 1);
//         } else {
//             cartItems[index] = { ...productToRemove, quantity: productToRemove.quantity - 1 };
//         }
//     }
//     return [...cartItems];
// }

// const removeCartItem = (cartItems, cartItemToRemove) => {
//     const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

//     if (existingCartItem.quantity === 1) {
//         return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
//     }

//     return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)

// }

// const addCartItem = (cartItems, productToAdd) => {
//     const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
//     if (existingCartItem) {
//         return cartItems.map(cartItem => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
//     }

//     // if there is no item in the cartItem array
//     return [...cartItems, { ...productToAdd, quantity: 1 }];
// }

// const clearCartItem = (cartItems, cartItemToRemove) => cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);

export const CartContext = createContext({
    // isCartOpen: false,
    // setIsCartOpen: () => { },
    // cartItems: [],
    // addItemToCart: () => { },
    // cartCount: 0,
    // removeItemFromCart: () => { },
    // clearItemFromCart: () => { },
    // cartTotal: 0
});





export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    // const { { isCartOpen, cartItems, cartCount, cartTotal }, dispatch
    const [{ cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, {});

    // const setIsCartOpen = (payload) => { dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, payload)) }
    // const setCartItems = (payload) => { dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload }) };
    // const setCartCount = (payload) => { dispatch({ type: CART_ACTION_TYPES.SET_CART_COUNT, payload }) };
    // const setCartTotal = (payload) => { dispatch({ type: CART_ACTION_TYPES.SET_CART_TOTAL, payload }) };

    const updateCartItems = (newCartItems) => {
        // const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        // const total = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        // dispatch(createAction(CART_ACTION_TYPES.SET_CART, {
        //     cartItems: newCartItems,
        //     cartCount: newCartCount,
        //     cartTotal: total
        // }));
    }


    // const addItemToCart = (productToAdd) => {
    // setCartItems({ cartItems: addCartItem(cartItems, productToAdd) });
    // updateCartItems(addCartItem(cartItems, productToAdd));
    // }

    // const removeItemFromCart = (productToRemove) => {
    // setCartItems({ cartitems: removeCartItem(cartItems, productToRemove) });
    // updateCartItems(addCartItem(cartItems, productToRemove));
    // }

    // const clearItemFromCart = (cartItemToRemove) => {
    // setCartItems(updateCartItems(clearCartItem(cartItems, cartItemToRemove)));
    // updateCartItems(clearCartItem(cartItems, cartItemToRemove));
    // }
    // const value = { addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };
    const value = { cartItems, cartCount, cartTotal };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}