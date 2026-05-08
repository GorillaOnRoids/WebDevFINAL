import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import CartControls from './CartControls';
import './ProductInfo.css';

function ProductInfo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cart, addToCart, removeFromCart, updateQty } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cartItem = cart.find(item => String(item.id) === String(id));
    const quantity = cartItem ? cartItem.qty : 0;

    const renderStars = (stars) => {
        const filled = '★'.repeat(Math.max(0, Math.min(5, stars)));
        const empty = '☆'.repeat(5 - Math.max(0, Math.min(5, stars)));
        return `${filled}${empty}`;
    };

    useEffect(() => {
        fetch(`http://localhost:5001/products/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Product not found');
                }
                return res.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
        }
    };

    const handleIncrement = () => {
        updateQty(parseInt(id), quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            updateQty(parseInt(id), quantity - 1);
        } else {
            removeFromCart(parseInt(id));
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!product) return <div className="not-found">Product not found</div>;

    return (
        <div className="product-info-page">
            <button className="back-button" onClick={handleBack}>← Back</button>
            <div className="product-info-container">
                <img src={product.image} alt={product.name} className="product-info-image" />
                <div className="product-info-details">
                    <h1 className="product-info-name">{product.name}</h1>
                    {product.brand && <p className="product-info-brand">Brand: {product.brand}</p>}
                    <p className="product-info-description">{product.description}</p>
                    <p className="product-info-price">Price: ${product.price.toFixed(2)}</p>
                    {product.weight && <p className="product-info-weight">Weight: {product.weight}</p>}
                    <p className="product-info-quantity">Available: {product.quantity}</p>
                    <div className="product-info-controls">
                        <CartControls
                            quantity={quantity}
                            onAdd={handleAddToCart}
                            onIncrement={handleIncrement}
                            onDecrement={handleDecrement}
                            onRemove={() => removeFromCart(parseInt(id, 10))}
                        />
                    </div>
                </div>
            </div>

            <section className="reviews-section">
                <h2>Customer Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                    <div className="review-list">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="review-card">
                                <div className="review-stars">{renderStars(review.stars)}</div>
                                <p className="review-comment">"{review.comment}"</p>
                                <p className="review-author">— {review.reviewer}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-reviews">No reviews yet. Be the first to drop some truth!</p>
                )}
            </section>
        </div>
    );
}

export default ProductInfo;