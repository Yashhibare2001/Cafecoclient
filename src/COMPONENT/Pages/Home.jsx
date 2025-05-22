import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import food from '../assests/food.jpg';
import pizzaImg from '../assests/categories/pizza.jpeg';
import burgerImg from '../assests/categories/Burgger.jpeg';
import indianImg from '../assests/categories/indian.jpeg';
// import chineseImg from '../assests/categories/chinese.jpg';
import dessertsImg from '../assests/categories/ice cream.jpg';
// import beveragesImg from '../assests/categories/beverages.jpg';
import axios from 'axios';

export default function Home() {
  const categoriesData = [
    { id: 1, name: 'Pizza', image: pizzaImg },
    { id: 2, name: 'Burgers', image: burgerImg },
    { id: 3, name: 'Indian', image: indianImg },
    // { id: 4, name: 'Chinese', image: chineseImg },
    { id: 5, name: 'Desserts', image: dessertsImg },
    // { id: 6, name: 'Beverages', image: beveragesImg },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(categoriesData);
  const [restaurants, setRestaurants] = useState([]);

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;
    axios
      .get(`https://cafecoserver.onrender.com/getRestaurantsByCity/${searchTerm}`)
      .then((res) => setRestaurants(res.data.restaurantList))
      .catch((err) => {
        console.error(err);
        setRestaurants([]);
      });
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-left">
          <img 
            src="../assests/food.jpg" 
            alt="Corporate Cafeteria Logo" 
            className="navbar-logo" 
          />
          <h1 className="navbar-title">Corporate Cafeteria</h1>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/qsr">QSR Order</Link></li>
          <li><Link to="/booking">Pre-Meal Booking</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-image-wrapper">
            <img
              src={food}
              alt="A vibrant assortment of fresh and appetizing food items"
              className="hero-image"
            />
          </div>
          <div className="hero-text">
            <h2>Welcome! What would you like to do?</h2>
            <p>
              Access food services quickly and conveniently. Choose to place an instant QSR order or schedule a meal in advance.
            </p>

            <div className="buttons-container">
              <Link to="/qsr" className="btn-qsr">🍔 QSR Order Now</Link>

              <button
                onClick={() => {
                  axios.get('http://localhost:5400/restaurants')
                    .then(res => setRestaurants(res.data))
                    .catch(err => console.error(err));
                }}
                className="btn-booking"
              >
                🕓 Pre-Meal Booking
              </button>
            </div>

            {/* ✅ Search Bar below buttons */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search food categories..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  const term = e.target.value.toLowerCase();
                  const filtered = categoriesData.filter((cat) =>
                    cat.name.toLowerCase().includes(term)
                  );
                  setCategories(filtered);
                }}
                className="search-input"
              />
              <button onClick={handleSearch} className="search-btn">🔍</button>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Render search or QSR/Booking result cards */}
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

      {/* Categories Section */}
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

      {/* How It Works Section */}
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            Corporate Cafeteria is your unified ordering and booking platform for seamless meal services.
          </p>
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
            <li>Email: support@corporatecafeteria.com</li>
            <li>Phone: +1 234 567 8900</li>
            <li>Address: 123 Cafeteria St, Food City</li>
          </ul>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">🌐</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">🐦</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">📸</a>
          </div>
        </div>

        <div className="footer-section" style={{flexBasis: '100%', marginTop: '1rem', textAlign: 'center'}}>
          &copy; {new Date().getFullYear()} Corporate Cafeteria – Powered by QSR Booking Platform
        </div>
      </footer>
    </div>
  );
}
