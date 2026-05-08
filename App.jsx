import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import ProductsPage from './ProductsPage';
import MissionPage from './MissionPage';
import CartPage from './CartPage';
import ProductInfo from './ProductInfo';
import PaymentPage from './PaymentPage';
import { CartProvider } from './CartContext';

function App() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const API_URL = 'http://localhost:5001/products';

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error('Failed to load products', err));
    }, []);

    // Filter products based on search query
    const filteredProducts = products.filter(product => {
        if (!searchQuery) return true;
        
        const query = searchQuery.toLowerCase();
        return (
            product.name.toLowerCase().includes(query) ||
            (product.brand && product.brand.toLowerCase().includes(query)) ||
            (product.description && product.description.toLowerCase().includes(query))
        );
    });

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <CartProvider>
            <Router>
                <div className="app-container">
                    <Header
                        onSearch={handleSearch}
                    currentSearchQuery={searchQuery}
                    totalProducts={products.length}
                    filteredProductsCount={filteredProducts.length}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProductsPage
                                products={filteredProducts}
                            />
                        }
                    />
                    <Route
                        path="/mission"
                        element={<MissionPage />}
                    />
                    <Route
                        path="/cart"
                        element={
                            <CartPage
                            />
                        }
                    />
                    <Route
                        path="/payment"
                        element={<PaymentPage />}
                    />
                    <Route path="/product/:id" element={<ProductInfo />} />
                </Routes>
            </div>
        </Router>
        </CartProvider>
    );
}

export default App;