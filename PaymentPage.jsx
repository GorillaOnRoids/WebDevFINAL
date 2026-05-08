import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

function PaymentPage() {
    const navigate = useNavigate();
    const { cart, getTotal } = useCart();
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const total = getTotal();

    const validatePayment = () => {
        const digitsOnly = (value) => /^\d+$/.test(value);
        const errors = [];

        if (!digitsOnly(cardNumber) || cardNumber.length !== 16) {
            errors.push('Card number must be 16 digits.');
        }

        if (!digitsOnly(expiry) || expiry.length !== 4) {
            errors.push('Expiration must be 4 digits (MMYY).');
        } else {
            const month = Number(expiry.slice(0, 2));
            const year = Number(expiry.slice(2));
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = Number(currentDate.getFullYear().toString().slice(-2));

            if (month < 1 || month > 12) {
                errors.push('Expiration month must be between 01 and 12.');
            } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
                errors.push('Expiration date must be in the future.');
            }
        }

        if (!digitsOnly(cvv) || cvv.length !== 3) {
            errors.push('CVV must be 3 digits.');
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validatePayment();

        if (validationErrors.length > 0) {
            setError(validationErrors.join(' '));
            setSuccess(false);
            return;
        }

        setError('');
        setSuccess(true);
    };

    return (
        <main className="main-container">
            <section className="payment-page">
                <div className="payment-header">
                    <h2>Payment Details</h2>
                    <Link to="/cart" className="back-button payment-back-button">
                        ← Back to Cart
                    </Link>
                </div>

                <div className="payment-summary">
                    <p>Your total is <strong>${total.toFixed(2)}</strong>.</p>
                    <p>Please enter your payment details below.</p>
                </div>

                <form className="payment-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            id="cardNumber"
                            type="text"
                            inputMode="numeric"
                            maxLength={16}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/[^\d]/g, ''))}
                            placeholder="1234123412341234"
                            className="payment-input"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group small-group">
                            <label htmlFor="expiry">Expiration (MMYY)</label>
                            <input
                                id="expiry"
                                type="text"
                                inputMode="numeric"
                                maxLength={4}
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value.replace(/[^\d]/g, ''))}
                                placeholder="0526"
                                className="payment-input"
                            />
                        </div>
                        <div className="form-group small-group">
                            <label htmlFor="cvv">CVV</label>
                            <input
                                id="cvv"
                                type="text"
                                inputMode="numeric"
                                maxLength={3}
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/[^\d]/g, ''))}
                                placeholder="123"
                                className="payment-input"
                            />
                        </div>
                    </div>

                    {error && <div className="payment-error">{error}</div>}
                    {success && <div className="payment-success">Payment accepted. Thank you for your purchase!</div>}

                    <button type="submit" className="payment-submit">
                        Pay ${total.toFixed(2)}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default PaymentPage;
