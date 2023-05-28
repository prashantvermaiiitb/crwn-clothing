import { useState, createContext, useEffect } from "react";

const addCartItemversion1 = (cartItems, productToAdd) => {
    const index = cartItems.findIndex(cartItem => cartItem.id === productToAdd.id);
    if (index !== -1) {
        cartItems[index].quantity++;
    } else {
        cartItems.push({ ...productToAdd, quantity: 1 });
    }
    return [...cartItems];
}

const removeCartItemversion1 = (cartItems, productToRemove) => {
    const index = cartItems.findIndex(cartItem => cartItem.id === productToRemove.id);
    if (index !== -1) {
        const newQuantity = productToRemove.quantity - 1;
        if (newQuantity === 0) {
            cartItems.splice(index, 1);
        } else {
            cartItems[index] = { ...productToRemove, quantity: productToRemove.quantity - 1 };
        }
    }
    return [...cartItems];
}

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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setIsCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const total = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(total);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setIsCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setIsCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (cartItemToRemove) => {
        setIsCartItems(clearCartItem(cartItems, cartItemToRemove));
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}