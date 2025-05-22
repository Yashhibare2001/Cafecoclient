import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Order.css';
import delivery from '../assests/categories/delivery.jpeg';

export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart = [], total = 0 } = location.state || {};

  const [activeOrders, setActiveOrders] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedActive = JSON.parse(localStorage.getItem('activeOrders')) || [];
    const storedHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const newOrders = cart.map(item => ({ ...item, status: 'Active' }));
    const updatedActive = [...storedActive, ...newOrders];
    setActiveOrders(updatedActive);
    setHistory(storedHistory);
    localStorage.setItem('activeOrders', JSON.stringify(updatedActive));
  }, [cart]);

  const handleCancel = (id) => {
    const updatedOrders = activeOrders.filter(item => item.id !== id);
    const canceledItem = activeOrders.find(item => item.id === id);
    const updatedHistory = [...history, { ...canceledItem, status: 'Canceled' }];
    setActiveOrders(updatedOrders);
    setHistory(updatedHistory);
    localStorage.setItem('activeOrders', JSON.stringify(updatedOrders));
    localStorage.setItem('orderHistory', JSON.stringify(updatedHistory));
  };

  const handleDeleteHistory = (indexToDelete) => {
    const updatedHistory = history.filter((_, index) => index !== indexToDelete);
    setHistory(updatedHistory);
    localStorage.setItem('orderHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="order-page">
      <nav className="qsr-navbar">
        <div className="navbar-left" onClick={() => navigate('/')}> 
          <img src="../assests/food.jpg" alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">Cafe Co</h1>
        </div>
        <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      </nav>

      <h2>✅ Order Placed Successfully!</h2>
      <p>Thank you for your order. Here are your order details:</p>

      <div className="order-summary">
        {activeOrders.length > 0 && activeOrders.map(item => (
          <div key={item.id} className="order-receipt">
            <img src={delivery} alt="Delivery" className="delivery-icon" />
            <div className="order-details">
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price * item.quantity}</p>
              <p>ETA: {Math.floor(Math.random() * 15) + 15} min | Distance: {(Math.random() * 5 + 1).toFixed(1)} km</p>
              <p>Fare: ₹{item.price * item.quantity}</p>
              <button className="cancel-btn" onClick={() => handleCancel(item.id)}>Cancel</button>
            </div>
          </div>
        ))}

        {activeOrders.length > 0 && <h3 className="total-fare">Total Paid: ₹{total}</h3>}
        {activeOrders.length === 0 && <p className="empty-msg">No active orders. All items have been delivered or cancelled.</p>}

        {history.length > 0 && (
          <>
            <h3>Order History</h3>
            {history.map((item, index) => (
              <div key={item.id + item.status + index} className="order-receipt">
                <img src={delivery} alt="Delivery" className="delivery-icon" />
                <img src={item.image} alt={item.name} className="order-image" />
                <div className="order-details">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Status: {item.status}</p>
                  <p>Price: ₹{item.price * item.quantity}</p>
                  <button className="delete-history-btn" onClick={() => handleDeleteHistory(index)}>Delete</button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
