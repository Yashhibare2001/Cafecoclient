import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  // Simulated role and name (in real use, get from auth context/session)
  const userName = "Yash Hibare";
  const userRole = "Admin"; // Change to "User" to test user view

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome, {userName}!</h2>
        <p>Your role: {userRole}</p>
      </header>

      {/* Summary Section (Visible to all roles) */}
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

      {/* User View: QSR & Booking */}
      {userRole === "User" && (
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
      )}

      {/* Admin View: Admin Dashboard Modules */}
      {userRole === "Admin" && (
        <section className="dashboard-actions">
          <Link to="/admin/orders" className="dashboard-card">
            <h3>📋 View Orders & Bookings</h3>
            <p>Filter by Date, Meal Type, Employee ID</p>
          </Link>

          <Link to="/admin/summary" className="dashboard-card">
            <h3>📊 Real-time Summary</h3>
            <p>Track Orders, Peak Hours, Payment Modes</p>
          </Link>

          <Link to="/admin/reports" className="dashboard-card">
            <h3>📤 Export Reports</h3>
            <p>Download in CSV or PDF</p>
          </Link>

          <Link to="/admin/kitchen-status" className="dashboard-card">
            <h3>🔄 Kitchen Status</h3>
            <p>Live order updates (KDS)</p>
          </Link>

          <Link to="/admin/inventory" className="dashboard-card">
            <h3>📦 Inventory Tracking</h3>
            <p>Monitor stock and usage</p>
          </Link>

          <Link to="/profile" className="dashboard-card">
            <h3>👤 Admin Profile</h3>
            <p>Manage your admin account</p>
          </Link>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
