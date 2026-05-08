import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';
import { useCart } from './CartContext';

function CartPage() {
    const { cart, removeFromCart, updateQty, getTotal } = useCart();
    const total = getTotal();
    return (
        <main className="main-container">
            <section>
                <div className="cart-header">
                    <h2>Shopping Cart</h2>
                    <Link to="/" className="continue-shopping-link">
                        ← Continue Shopping
                    </Link>
                </div>
                <ShoppingCart
                    cart={cart}
                    removeFromCart={removeFromCart}
                    updateQty={updateQty}
                    total={total}
                />
                {cart.length > 0 && (
                    <div className="payment-action">
                        <Link to="/payment" className="payment-link">
                            Proceed to Payment
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
}

export default CartPage;