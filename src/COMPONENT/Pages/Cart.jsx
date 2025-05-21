// src/CartPage.jsx
import React from 'react';
import './QsrPage.css';

export default function Cart({ cart }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="qsr-page">
      <h2>Your Cart ({totalItems})</h2>
      {cart.length === 0 ? (
        <p>No dishes in cart yet.</p>
      ) : (
        <div className="qsr-grid">
          {cart.map((dish, i) => (
            <div key={i} className="qsr-card">
              <img src={dish.image} alt={dish.name} className="qsr-image" />
              <h3>{dish.name}</h3>
              <p><strong>Price:</strong> ₹{dish.price}</p>
              <p><strong>Quantity:</strong> {dish.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
