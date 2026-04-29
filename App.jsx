import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import ShoppingCart from './ShoppingCart';
import FoodCard from './FoodCard';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const API_URL = 'http://localhost:5001/products';

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error('Failed to load products', err));
    }, []);

    const addToCart = (product) => {
        setCart((prev) => {
            const found = prev.find((p) => p.id === product.id);
            if (found) {
                return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    const updateQty = (id, qty) => {
        setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p)));
    };

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

    return (
        <div className="app-container">
            <Header 
                onSearch={(q) => console.log("Searching for:", q)} 
                cartCount={cart.length} 
                />
            <main className="main-container">
                <section>
                    <h2>Results</h2>
                    <div className="product-grid">
                        {products.map((p) => (
                            <FoodCard key={p.id} product={p} onAdd={() => addToCart(p)} />
                        ))}
                    </div>
                </section>

                <ShoppingCart 
                    cart={cart} 
                    removeFromCart={removeFromCart} 
                    updateQty={updateQty} 
                    total={total} 
                />
            </main>
        </div>
    );
}

export default App;