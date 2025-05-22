import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Prebooking.css';

export default function Prebooking() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    axios.get('https://cafecoserver.onrender.com/restaurants')
      .then(res => setRestaurants(res.data))
      .catch(err => console.error('Error loading restaurant data:', err));
  }, []);

  const cityMap = restaurants.reduce((acc, rest) => {
    if (!acc[rest.city]) acc[rest.city] = [];
    acc[rest.city].push(rest);
    return acc;
  }, {});

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedRestaurant(null);
    setSelectedDish(null);
    setShowCart(false);
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setSelectedDish(null);
    setShowCart(false);
  };

  const goBack = () => {
    if (selectedDish) {
      setSelectedDish(null);
    } else if (selectedRestaurant) {
      setSelectedRestaurant(null);
    } else {
      setSelectedCity(null);
    }
    setShowCart(false);
  };

  const handleAddToCart = (dish) => {
    const dishWithId = {
      ...dish,
      id: selectedRestaurant.restaurant + '_' + dish.name,
    };

    setCart(prev => {
      const existing = prev.find(item => item.id === dishWithId.id);
      if (existing) {
        return prev.map(item =>
          item.id === dishWithId.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...dishWithId, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="qsr-page">
      <nav className="qsr-navbar">
        <Link to="/" className="navbar-left">
          <img
            src="../assests/food.jpg"
            alt="Corporate Cafeteria Logo"
            className="navbar-logo"
          />
          <h1 className="navbar-title">Cafe Co</h1>
        </Link>
        <button className="cart-icon" onClick={() => setShowCart(!showCart)}>
          🛒 {totalItems}
        </button>
      </nav>

      {showCart && (
        <Cart
          cart={cart}
          setShowCart={setShowCart}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      )}

      {!selectedCity ? (
        <div className="qsr-grid">
          {Object.entries(cityMap).map(([city, cityRestaurants]) => (
            <div key={city} className="qsr-card">
              <img src={cityRestaurants[0].image} alt={city} className="qsr-image" />
              <h3>{city.charAt(0).toUpperCase() + city.slice(1)}</h3>
              <button className="view-btn" onClick={() => handleCitySelect(city)}>View Restaurants</button>
            </div>
          ))}
        </div>
      ) : !selectedRestaurant ? (
        <>
          <button className="back-btn" onClick={goBack}>⬅ Back to Cities</button>
          <h3>Restaurants in {selectedCity}</h3>
          <div className="qsr-grid">
            {cityMap[selectedCity].map((rest) => (
              <div key={rest.id} className="qsr-card">
                <h3>{rest.restaurant}</h3>
                <button className="view-btn" onClick={() => handleRestaurantSelect(rest)}>View Dishes</button>
              </div>
            ))}
          </div>
        </>
      ) : selectedDish ? (
        <>
          <button className="back-btn" onClick={goBack}>⬅ Back to Dishes</button>
          <div className="qsr-card qsr-dish-detail">
            <img src={selectedDish.image} alt={selectedDish.name} className="qsr-image" />
            <h3>{selectedDish.name}</h3>
            <p><strong>Price:</strong> ₹{selectedDish.price}</p>
            <p><strong>Description:</strong> {selectedDish.description}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
              {selectedDish.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
            <div className="cart-controls">
              <button onClick={() => updateQuantity(selectedRestaurant.restaurant + '_' + selectedDish.name, (cart.find(item => item.id === selectedRestaurant.restaurant + '_' + selectedDish.name)?.quantity || 1) - 1)}>-</button>
              <span>🛒 {cart.find(item => item.id === selectedRestaurant.restaurant + '_' + selectedDish.name)?.quantity || 0}</span>
              <button onClick={() => handleAddToCart(selectedDish)}>+</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <button className="back-btn" onClick={goBack}>⬅ Back to Restaurants</button>
          <h3>Dishes at {selectedRestaurant.restaurant}</h3>
          <div className="qsr-grid">
            {selectedRestaurant.dishes.map((dish, index) => {
              const dishId = selectedRestaurant.restaurant + '_' + dish.name;
              const count = cart.find(item => item.id === dishId)?.quantity || 0;

              return (
                <div key={index} className="qsr-card">
                  <img src={dish.image} alt={dish.name} className="qsr-image" />
                  <h3>{dish.name}</h3>
                  <p><strong>Price:</strong> ₹{dish.price}</p>
                  <p><strong>Description:</strong> {dish.description}</p>
                  <div className="cart-controls">
                    <button onClick={() => updateQuantity(dishId, count - 1)}>-</button>
                    <span>🛒 {count}</span>
                    <button onClick={() => handleAddToCart(dish)}>+</button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      
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

        <div className="footer-section" style={{ flexBasis: '100%', marginTop: '1rem', textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} Corporate Cafeteria – Powered by QSR Booking Platform
        </div>
      </footer>
    </div>
  );
}
