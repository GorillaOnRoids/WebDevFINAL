import React from "react";
import "./FoodCard.css"; 
import { useState } from "react";

function FoodCard({ product, onAdd }) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        onAdd();
        setIsAdded(true);
    };

    return (
        <div className="product-card">
            {product.image && (
                <img src={product.image} alt={product.name} className="product-image" />
            )}
            <div>
                <h2 className="product-name">{product.name}</h2>
                {product.brand && <div className="product-brand">{product.brand}</div>}
                {product.weight && <div className="product-weight">{product.weight}</div>}
            </div>

            {product.description && <p className="product-description">{product.description}</p>}

            <div className="product-bottom">
                <div className="product-price">${product.price.toFixed(2)}</div>
                <button className="add-button" onClick={onAdd}>
                    Add
                </button>
            </div>
        </div>
    );
}

export default FoodCard;