import React, { useState } from 'react';
import './Login.css'; // Import CSS for styling
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/'); // Redirect to home page after login
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo */}
        <div className="logo-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
            alt="Logo"
            className="logo"
          />
        </div>

        {/* Title */}
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Login to continue</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          {/* Role Selection */}
          <div className="form-group">
            <label className="form-label">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-input"
            >
              <option>User</option>
              <option>Doctor</option>
              <option>Admin</option>
            </select>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="remember-forgot-container">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember" className="remember-label">Remember me</label>
            </div>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="sign-up-container">
          <p className="sign-up-text">Don't have an account?</p>
          {/* <a href="#" className="sign-up-link">Sign Up</a> */}
          <Link to="/Register" className="sign-in-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
