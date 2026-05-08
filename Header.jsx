import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Header.css";

function Header({ onSearch, currentSearchQuery, totalProducts, filteredProductsCount }) {
    const [searchQuery, setSearchQuery] = useState(currentSearchQuery || "");
    const { cart } = useCart();
    const cartQuantity = cart.reduce((total, item) => total + item.qty, 0);

    const handleSearch = (e) => {
        e.preventDefault();
        // Search is already handled in real-time, but this ensures it works on Enter
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <header className="main-header">
            <div className="brand-container">
                <img src="/src/assets/figLogo.png" alt="Fig's Produce Logo" className="brand-logo" />
                <div className="brand-text">
                    <h1 className="brand-title">Fig's Produce</h1>
                    <p className="brand-motto">Fresh produce delivered to your door</p>
                </div>
            </div>

            <form className="search-container" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">
                    🔍
                </button>
            </form>

            {searchQuery && (
                <div className="search-results">
                    <span className="search-info">
                        {filteredProductsCount} of {totalProducts} products
                    </span>
                    <button 
                        className="clear-search" 
                        onClick={() => {
                            setSearchQuery('');
                            onSearch('');
                        }}
                    >
                        ✕ Clear
                    </button>
                </div>
            )}

            <nav aria-label="Main navigation">
                <ul className="nav-list">
                    <li>
                        <Link to="/" className="nav-link">Shop</Link>
                    </li>
                    <li>
                        <Link to="/mission" className="nav-link">Mission</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="nav-link nav-cta cart-link">
                            🛒 Cart
                            {cartQuantity > 0 && (
                                <span className="cart-badge">{cartQuantity}</span>
                            )}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;