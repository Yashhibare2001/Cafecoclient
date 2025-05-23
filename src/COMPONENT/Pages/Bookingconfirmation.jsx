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
    const payload = {
      referenceId: referenceId || 'ABC123',
      date: date || '2025-05-24',
      mealType: mealType || 'Lunch',
      items: items.length > 0 ? items : [
        { name: 'Paneer Biryani', restaurant: 'Tandoori Nights', quantity: 2, price: 120 }
      ]
    };

    try {
      console.log("📦 Payload being sent:", payload);
      const response = await axios.post('http://localhost:5400/employee/booking', payload);
      alert('✅ Booking data sent successfully.');
      navigate('/Payment');
    } catch (error) {
      console.error('❌ Error sending booking:', error);
      alert('Booking failed.');
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
