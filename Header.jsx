import React from "react";
import { useState } from "react";
import "./Header.css";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="main-header">
            <div className="brand-container">
                <h1 className="brand-title">Fig's Produce</h1>
                <p className="brand-motto">Fresh produce delivered to your door</p>
            </div>

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