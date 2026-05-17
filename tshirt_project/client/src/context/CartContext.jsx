import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cartItemsFromStorage = localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [];
        setCartItems(cartItemsFromStorage);
    }, []);

    const addToCart = (product, qty, size) => {
        const item = {
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty,
            size,
        };

        const existItem = cartItems.find((x) => x.product === item.product && x.size === item.size);

        if (existItem) {
            setCartItems(
                cartItems.map((x) =>
                    x.product === existItem.product && x.size === existItem.size ? item : x
                )
            );
        } else {
            setCartItems([...cartItems, item]);
        }
    };

    const removeFromCart = (id, size) => {
        setCartItems(cartItems.filter((x) => !(x.product === id && x.size === size)));
    };

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
