import React from 'react';
import './CartControls.css';

function CartControls({ quantity, onAdd, onIncrement, onDecrement, onRemove }) {
    return (
        <>
            {quantity > 0 ? (
                <div className="quantity-controls">
                    <button
                        className="quantity-btn"
                        onClick={quantity > 1 ? onDecrement : onRemove}
                    >
                        -
                    </button>
                    <span className="quantity-display">{quantity}</span>
                    <button className="quantity-btn" onClick={onIncrement}>+</button>
                </div>
            ) : (
                <button className="add-button" onClick={onAdd}>
                    Add
                </button>
            )}
        </>
    );
}

export default CartControls;