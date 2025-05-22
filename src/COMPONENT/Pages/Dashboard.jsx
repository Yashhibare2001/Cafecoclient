import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 

const Dashboard = () => {
  const userName = "Yash Hibare";
  const userRole = "User";        

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome, {userName}!</h2>
        <p>Your role: {userRole}</p>
      </header>

      <section className="dashboard-summary">
        <div className="summary-card">
          <h3>🧾 Orders</h3>
          <p>12 Orders Placed</p>
        </div>
        <div className="summary-card">
          <h3>🍽️ Upcoming Meal</h3>
          <p>Lunch at 1:00 PM</p>
        </div>
      </section>

      <section className="dashboard-actions">
        <Link to="/qsr" className="dashboard-card">
          <h3>🍔 QSR Order</h3>
          <p>Place a quick order</p>
        </Link>

        <Link to="/booking" className="dashboard-card">
          <h3>🕓 Pre-Meal Booking</h3>
          <p>Book your upcoming meals</p>
        </Link>

        <Link to="/summary" className="dashboard-card">
          <h3>📋 Summary</h3>
          <p>View past bookings</p>
        </Link>

        <Link to="/profile" className="dashboard-card">
          <h3>👤 Profile</h3>
          <p>Manage your account</p>
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;
