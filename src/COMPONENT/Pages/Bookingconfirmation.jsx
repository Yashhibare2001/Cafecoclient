import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Bookingconfirmation.css';

export default function BookingConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="confirmation-page">
        <h2>⚠️ No booking found</h2>
        <button onClick={() => navigate('/prebookmeal')}>Go to Booking</button>
      </div>
    );
  }

  const { referenceId, date, mealType, items } = state;

  const handlePayment = async () => {
    try {
      const payload = {
        referenceId,
        date,
        mealType,
        items,
      };
      await axios.put('http://localhost:5400/api/employee/booking', payload);
      alert('Booking data sent to backend. Proceed to payment.');
      navigate('/Payment');
    } catch (error) {
      console.error('Error sending data to backend:', error);
      alert('Failed to save booking to backend.');
    }
  };

  return (
    <div className="confirmation-page">
      <h2>✅ Booking Successful!</h2>
      <p><strong>Reference ID:</strong> {referenceId}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Meal Type:</strong> {mealType}</p>

      <h3>🧾 Ordered Items</h3>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            {item.quantity} × {item.name} ({item.restaurant}) – ₹{item.price * item.quantity}
          </li>
        ))}
      </ul>

      <button className="home-btn" onClick={handlePayment}>💳 Proceed to Payment</button>

    </div>
  );
}
