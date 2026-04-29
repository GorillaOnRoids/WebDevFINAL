import React from "react";
import { useState } from "react";
import "./Header.css";

function Header({ onSearch }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchQuery);
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
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

            <nav aria-label="Main navigation">
                <ul className="nav-list">
                    <li>
                        <a href="#" className="nav-link">Home</a>
                    </li>
                    <li>
                        <a href="#shop" className="nav-link">Shop</a>
                    </li>
                    <li>
                        <a href="#cart" className="nav-link nav-cta">Cart</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;