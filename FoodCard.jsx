import React from "react";
import { Link } from "react-router-dom";
import CartControls from "./CartControls";
import "./FoodCard.css";

function FoodCard({ product, cart, onAdd, onRemove, onUpdateQty }) {
    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.qty : 0;

    const handleIncrement = () => {
        onUpdateQty(product.id, quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            onUpdateQty(product.id, quantity - 1);
        } else {
            onRemove(product.id);
        }
    };

    return (
        <div className="product-card">
            {product.image && (
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} className="product-image" />
                </Link>
            )}
            <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                {product.brand && <div className="product-brand">{product.brand}</div>}
               
            </div>

            <div className="product-bottom">
                <div className="product-price">${product.price.toFixed(2)}</div>
                <CartControls
                    productId={product.id}
                    quantity={quantity}
                    onAdd={() => onAdd(product)}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                />
            </div>
        </div>
    );
}

export default FoodCard;