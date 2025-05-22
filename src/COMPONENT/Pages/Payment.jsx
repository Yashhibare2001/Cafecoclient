import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total } = location.state || {};

  const handlePayment = () => {

    navigate('/order', { state: { cart, total } });
  };

  return (
    <div className="payment-page">
      <h2>Choose Payment Method</h2>
      <div className="payment-options">
        <label><input type="radio" name="payment" defaultChecked /> UPI</label>
        <label><input type="radio" name="payment" /> Debit Card</label>
        <label><input type="radio" name="payment" /> Credit Card</label>
        <label><input type="radio" name="payment" /> Cash on Delivery</label>
      </div>

      <div className="qr-section">
        <h3>Scan to Pay</h3>
        <img src="/assets/qr-code.png" alt="QR Code" className="qr-code" />
      </div>

      <button className="confirm-payment" onClick={handlePayment}>
        Confirm Payment
      </button>
    </div>
  );
}
