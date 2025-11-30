import React from 'react';
import './Checkout.css';

function Checkout() {
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <p>Redirecting to Stripe Checkout...</p>
      <div className="spinner"></div>
    </div>
  );
}

export default Checkout;
