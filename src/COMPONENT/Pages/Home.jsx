

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import food from '../assests/food.jpg';
import pizzaImg from '../assests/categories/pizza.jpeg';
import burgerImg from '../assests/categories/Burgger.jpeg';
import indianImg from '../assests/categories/indian.jpeg';
import dessertsImg from '../assests/categories/ice cream.jpg';
import axios from 'axios';

export default function Home() {
  const categoriesData = [
    { id: 1, name: 'Pizza', image: pizzaImg },
    { id: 2, name: 'Burgers', image: burgerImg },
    { id: 3, name: 'Indian', image: indianImg },
    { id: 5, name: 'Desserts', image: dessertsImg },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [categories] = useState(categoriesData);
  const [restaurants] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState('');

  const profileIcon = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('userName') || 'User';
    setUserName(storedName);
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const res = await axios.get('https://cafecoserver.onrender.com/restaurants');
      const restaurants = res.data;

      for (const rest of restaurants) {
        const matchedDish = rest.dishes.find(d =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (matchedDish) {
          navigate('/qsr', {
            state: {
              city: rest.city,
              restaurant: rest,
              dish: matchedDish,
            },
          });
          return;
        }
      }

      alert('Dish not found!');
    } catch (err) {
      console.error('Search failed:', err);
      alert('Error fetching dishes.');
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-left" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src={food} alt="CafeCo Logo" className="navbar-logo" />
          <h1 className="navbar-title">Cafe Co</h1>
        </div>

        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Order">Order</Link></li>
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
              <div className="profile-link" style={{ fontWeight: 'bold' }}>
                👤 {userName}
              </div>
              <Link to="/Dashboard" className="profile-link">Dashboard</Link>
              <button
                onClick={() => {
                  alert('Logged out');
                  localStorage.clear();
                  navigate('/login');
                }}
                className="profile-link"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-image-wrapper">
            <img src={food} alt="Food Banner" className="hero-image" />
          </div>
          <div className="hero-text">
            <h2>Welcome! What would you like to do?</h2>
            <p>
              Access food service quickly and conveniently. Choose to place an instant QSR order or schedule a meal in advance.
            </p>

            <div className="buttons-container">
              <Link to="/qsr" className="btn-qsr">🍔 Get Order Now</Link>
              <button onClick={() => navigate('/PreBookMeal')} className="btn-booking">
                🕓 Pre-Meal Booking
              </button>
            </div>

            <div className="search-bar">
              <input
                type="text"
                placeholder="Search food dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button onClick={handleSearch} className="search-btn">🔍</button>
            </div>
          </div>
        </div>
      </section>

      {restaurants.length > 0 && (
        <section className="restaurant-results">
          <h3>Search Results</h3>
          <div className="categories-grid">
            {restaurants.map((rest) => (
              <div key={rest.id} className="category-card">
                <img src={rest.image} alt={rest.restaurant} className="category-image" />
                <div className="category-name">{rest.restaurant} - {rest.city}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="categories-section">
        <h3>Popular Categories</h3>
        <div className="categories-grid">
          {categories.map(cat => (
            <div key={cat.id} className="category-card">
              <img src={cat.image} alt={cat.name} className="category-image" />
              <div className="category-name">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <h3>How It Works</h3>
        <div className="grid-two-columns">
          <div className="card-orange">
            <h4>🍔 Quick Service Restaurant</h4>
            <ul>
              <li>Login with Employee ID or RFID</li>
              <li>Browse categorized menu with images</li>
              <li>Add items to cart and pay via UPI, Wallet, or Payroll</li>
              <li>Get order confirmation and pickup QR/token</li>
            </ul>
          </div>
          <div className="card-blue">
            <h4>🕓 Pre-Meal Booking</h4>
            <ul>
              <li>Login with Employee ID or RFID</li>
              <li>Select date, meal type, and items</li>
              <li>Pay via UPI, Wallet, or Payroll</li>
              <li>Scan RFID to avail meal on the booked date</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>CafeCo is your unified ordering and booking platform for seamless meal services with best deal.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/qsr">QSR Order</Link></li>
            <li><Link to="/booking">Pre-Meal Booking</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>Email: support@CafeCo.com</li>
            <li>Phone: +1 234 567 8900</li>
            <li>Address: 123 Cafeteria St, Food City</li>
          </ul>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">🌐</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">📸</a>
          </div>
        </div>
        <div className="footer-section" style={{ flexBasis: '100%', marginTop: '1rem', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} CafeCo – Powered by QSR Booking Platform
        </div>
      </footer>
    </div>
  );
}
