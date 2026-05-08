import React from 'react';
import FoodCard from './FoodCard';
import { useCart } from './CartContext';

function ProductsPage({ products }) {
    const { cart, addToCart, removeFromCart, updateQty } = useCart();

    return (
        <main className="main-container">
            <section>
              
                {products.length === 0 ? (
                    <p className="no-results">No products found matching your search.</p>
                ) : (
                    <div className="product-grid">
                        {products.map((p) => (
                            <FoodCard
                                key={p.id}
                                product={p}
                                cart={cart}
                                onAdd={() => addToCart(p)}
                                onRemove={(id) => removeFromCart(id)}
                                onUpdateQty={(id, qty) => updateQty(id, qty)}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default ProductsPage;