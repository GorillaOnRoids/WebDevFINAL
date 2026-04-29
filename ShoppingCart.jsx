const ShoppingCart = ({ cart, removeFromCart, updateQty, total }) => {
    return (
        <aside className="cart-aside">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-list">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <strong>{item.name}</strong>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <input
                                    type="number"
                                    value={item.qty}
                                    min={1}
                                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                                    style={{ width: '40px' }}
                                />
                                <span>${(item.price * item.qty).toFixed(2)}</span>
                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div style={{ marginTop: '15px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        Subtotal: ${total.toFixed(2)}
                    </div>
                </div>
            )}
        </aside>
    );
};

export default ShoppingCart;