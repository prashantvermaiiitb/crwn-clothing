import { useState, createContext, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const index = cartItems.findIndex(cartItem => cartItem.id === productToAdd.id);
    if (index !== -1) {
        cartItems[index].quantity++;
    } else {
        cartItems.push({ ...productToAdd, quantity: 1 });
    }
    return [...cartItems];
}

const addCartItemVer2 = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }

    // if there is no item in the cartItem array
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setIsCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setIsCartItems(addCartItem(cartItems, productToAdd));
    }
    
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}