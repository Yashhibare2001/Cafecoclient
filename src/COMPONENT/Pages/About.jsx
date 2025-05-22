import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
      const [showProfileMenu, setShowProfileMenu] = useState(false);
        const profileIcon = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const navigate = useNavigate();
  return (
    <div className="about-container">
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src="../assests/food.jpg"
            alt="Corporate Cafeteria Logo"
            className="navbar-logo"
          />
          <h1 className="navbar-title">Cafe Co</h1>
        </div>

        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Order"> Order</Link></li>
          <li><Link to="/Cart">Cart</Link></li>
          <li><Link to="/About">About</Link></li>
        </ul>

        <div className="profile-section">
          <img
            src={profileIcon}
            alt="Profile"
            className="profile-icon"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{ cursor: 'pointer', width: '40px', borderRadius: '50%' }}
          />
          {showProfileMenu && (
            <div className="profile-menu">
              <Link to="/Dashboard" className="profile-link">Dashboard</Link>
              <button onClick={() => {
                alert('Logged out'); navigate('/login'); 
              }}
                className="profile-link"
              >
                Logout
              </button>

            </div>
          )}
        </div>
      </nav>

      <div className="about-section">
        <h2>About QuickServe</h2>
        <p>
          QuickServe is your smart food ordering assistant designed for speed, simplicity, and satisfaction. 
          Whether you're craving a quick bite or planning a special dinner, QuickServe makes discovering and booking your favorite meals effortless.
        </p>

        <h3>What We Offer</h3>
        <ul>
          <li>📍 Search and filter restaurants by city and category</li>
          <li>🍽 Browse menus and view dishes from each restaurant</li>
          <li>🛒 Add dishes to your cart with intuitive controls</li>
          <li>🔍 Search dishes directly and jump to them instantly</li>
        </ul>

        <h3>Our Mission</h3>
        <p>
          We're dedicated to transforming how people explore food. With a clean design, smart features, and responsive layout, QuickServe aims to become your go-to app for all things delicious.
        </p>
      </div>

      <footer className="footer">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f" /></a>
            <a href="#"><i className="fab fa-twitter" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
