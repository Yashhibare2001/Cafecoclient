import React, { useState } from 'react';
import './Register.css';  // You can reuse the Login.css if you want the exact same styles
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here

    // After registration, redirect to login or home page
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
            alt="Logo"
            className="logo"
          />
        </div>

        <h2 className="login-title">Create Account</h2>
        <p className="login-subtitle">Register to get started</p>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="form-input"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-input"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="form-input"
              required
            />
          </div>

          {/* Role Selection */}
          <div className="form-group">
            <label htmlFor="role" className="form-label">Select Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
            >
              <option>User</option>
              <option>Doctor</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Register Button */}
          <button type="submit" className="login-button">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="sign-up-container">
          <p className="sign-up-text">Already have an account?</p>
          <Link to="/login" className="sign-in-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
