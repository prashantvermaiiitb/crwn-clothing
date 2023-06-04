import { createContext, useReducer } from "react";
import { createAction } from "../../utils/actionCreator";

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

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)

}

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }

    // if there is no item in the cartItem array
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const clearCartItem = (cartItems, cartItemToRemove) => cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartTotal: 0
});

// Declaring the initial state
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

// declaing the cart action types
const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    // SET_CART_ITEMS: 'SET_CART_ITEMS',
    // SET_CART_COUNT: 'SET_CART_COUNT',
    // SET_CART_TOTAL: 'SET_CART_TOTAL',
    SET_CART: 'SET_CART'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        // case CART_ACTION_TYPES.SET_CART_ITEMS:
        //     return {
        //         ...state,
        //         cartItems: payload.cartItems,
        //     }
        // case CART_ACTION_TYPES.SET_CART_COUNT:
        //     return {
        //         ...state,
        //         cartCount: payload.cartCount,
        //     }
        // case CART_ACTION_TYPES.SET_CART_TOTAL:
        //     return {
        //         ...state,
        //         cartTotal: payload.cartTotal,
        //     }
        default:
            throw new Error(`Unhandled type ${type} in Cart Reducer`);
    }
}

export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    // const { { isCartOpen, cartItems, cartCount, cartTotal }, dispatch
    const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const setIsCartOpen = (payload) => { dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, payload)) }
    // const setCartItems = (payload) => { dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload }) };
    // const setCartCount = (payload) => { dispatch({ type: CART_ACTION_TYPES.SET_CART_COUNT, payload }) };
    // const setCartTotal = (payload) => { dispatch({ type: CART_ACTION_TYPES.SET_CART_TOTAL, payload }) };

    const updateCartItems = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const total = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        dispatch(createAction(CART_ACTION_TYPES.SET_CART, {
            cartItems: newCartItems,
            cartCount: newCartCount,
            cartTotal: total
        }));
    }


    const addItemToCart = (productToAdd) => {
        // setCartItems({ cartItems: addCartItem(cartItems, productToAdd) });
        updateCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        // setCartItems({ cartitems: removeCartItem(cartItems, productToRemove) });
        updateCartItems(addCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (cartItemToRemove) => {
        // setCartItems(updateCartItems(clearCartItem(cartItems, cartItemToRemove)));
        updateCartItems(clearCartItem(cartItems, cartItemToRemove));
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}