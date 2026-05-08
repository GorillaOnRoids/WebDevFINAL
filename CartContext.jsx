import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
            return [];
        }
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const found = prev.find((p) => String(p.id) === String(product.id));
            if (found) {
                return prev.map((p) => (String(p.id) === String(product.id) ? { ...p, qty: p.qty + 1 } : p));
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((p) => String(p.id) !== String(id)));
    };

    const updateQty = (id, qty) => {
        setCart((prev) => prev.map((p) => (String(p.id) === String(id) ? { ...p, qty } : p)));
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.qty, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, getTotal }}>
            {children}
        </CartContext.Provider>
    );
};