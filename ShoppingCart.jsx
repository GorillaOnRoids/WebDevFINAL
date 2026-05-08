const ShoppingCart = ({ cart, removeFromCart, updateQty, total }) => {
    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-list">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <strong>{item.name}</strong>
                            <div className="cart-item-controls">
                                <input
                                    type="number"
                                    value={item.qty}
                                    min={1}
                                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                                    className="quantity-input"
                                />
                                <span className="item-total">${(item.price * item.qty).toFixed(2)}</span>
                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        Subtotal: ${total.toFixed(2)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;