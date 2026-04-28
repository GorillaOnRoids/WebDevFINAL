import React from "react";
import "./FoodCard.css"; 
import { useState } from "react";

function FoodCard({ food, onAdd }) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        onAdd();
        setIsAdded(true);
    };

    return (
        <div className="food-card">
            <div>
                <h2 className="food-name">{food.name}</h2>
                {food.brand && <div className="food-brand">{food.brand}</div>}
                {food.weight && <div className="food-weight">{food.weight}</div>}
            </div>

            {food.description && <p className="food-description">{food.description}</p>}

            <div className="food-bottom">
                <div className="food-price">${food.price.toFixed(2)}</div>
                <button className="add-button" onClick={onAdd}>
                    Add
                </button>
            </div>
        </div>
    );
}

export default FoodCard;