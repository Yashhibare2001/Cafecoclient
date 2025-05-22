// import React, { useState } from 'react';
// import './Login.css'; 
// import { Link, useNavigate } from 'react-router-dom'; 

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('User');
//   const [rememberMe, setRememberMe] = useState(false);

//   const navigate = useNavigate(); 

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate('/'); 
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         {/* Logo */}
//         <div className="logo-container">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
//             alt="Logo"
//             className="logo"
//           />
//         </div>

//         {/* Title */}
//         <h2 className="login-title">Welcome Back!</h2>
//         <p className="login-subtitle">Login to continue</p>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="login-form">
//           {/* Email */}
//           <div className="form-group">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="form-input"
//             />
//           </div>

//           {/* Password */}
//           <div className="form-group">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="form-input"
//             />
//           </div>

//           {/* Role Selection */}
//           <div className="form-group">
//             <label className="form-label">Select Role</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="form-input"
//             >
//               <option>User</option>
//               <option>Manager</option>
//               <option>Chef</option>
//               <option>Admin</option>
//             </select>
//           </div>

//           {/* Remember Me and Forgot Password */}
//           <div className="remember-forgot-container">
//             <div className="remember-me">
//               <input
//                 type="checkbox"
//                 id="remember"
//                 checked={rememberMe}
//                 onChange={() => setRememberMe(!rememberMe)}
//               />
//               <label htmlFor="remember" className="remember-label">Remember me</label>
//             </div>
//             <a href="/Register" className="forgot-password">Forgot Password?</a>
//           </div>

//           {/* Login Button */}
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="sign-up-container">
//           <p className="sign-up-text">Don't have an account?</p>
         
//           <Link to="/Register" className="sign-in-link">Sign In</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const fakeRFIDDatabase = {
  '1234567890': { employeeId: 'E101', name: 'Yash Hibare' },
  '9876543210': { employeeId: 'E102', name: 'Anjali Verma' },
};

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [rfid, setRfid] = useState('');

  const navigate = useNavigate();
  const rfidRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Build RFID string input
      if (e.key === 'Enter') {
        if (rfid in fakeRFIDDatabase) {
          setEmployeeId(fakeRFIDDatabase[rfid].employeeId);
          setEmployeeName(fakeRFIDDatabase[rfid].name);
        } else {
          alert('Unknown RFID card');
        }
        setRfid('');
      } else {
        setRfid((prev) => prev + e.key);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [rfid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employeeId.trim()) {
      alert('Employee ID is required.');
      return;
    }

    navigate('/pre-meal-booking');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2723/2723516.png"
            alt="RFID Meal"
            className="logo"
          />
        </div>

        <h2 className="login-title">Pre-Meal Booking</h2>
        <p className="login-subtitle">Scan your RFID card or enter manually</p>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Employee ID */}
          <div className="form-group">
            <label className="form-label">Employee ID *</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter or auto-filled"
              className="form-input"
              required
            />
          </div>

          {/* Employee Name */}
          <div className="form-group">
            <label className="form-label">Employee Name</label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Auto-filled"
              className="form-input"
              readOnly
            />
          </div>

          {/* Hidden RFID Capture Field (simulated via keypress) */}
          <input
            ref={rfidRef}
            type="text"
            value={rfid}
            onChange={() => {}}
            style={{ position: 'absolute', top: '-1000px' }}
          />

          {/* Continue Button */}
          <button type="submit" className="login-button">
            Continue to Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
