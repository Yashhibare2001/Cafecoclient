import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Prebooking.css';

export default function Prebooking() {
  const [restaurants, setRestaurants] = useState([]);
  const [mealType, setMealType] = useState('Breakfast');
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://cafecoserver.onrender.com/restaurants')
      .then(res => setRestaurants(res.data))
      .catch(err => console.error('Error loading data:', err));
  }, []);

  const getNext3DaysRange = () => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 2);
    return {
      min: today.toISOString().split('T')[0],
      max: maxDate.toISOString().split('T')[0]
    };
  };

  const allDishes = restaurants.flatMap(r =>
    r.dishes.map(d => ({ ...d, restaurant: r.restaurant }))
  );

  const breakfastKeywords = ['dosa', 'idli', 'pancake', 'poha', 'burger'];
  const lunchKeywords = ['biryani', 'tandoori', 'rice', 'thali', 'curry'];

  const filterDishesByMealType = (type) => {
    const keywords = type === 'Breakfast' ? breakfastKeywords : lunchKeywords;
    return allDishes.filter(d =>
      keywords.some(keyword => d.name.toLowerCase().includes(keyword))
    );
  };

  const filteredDishes = filterDishesByMealType(mealType);
  const { min, max } = getNext3DaysRange();

  const handleBookNow = (dish) => {
    const bookingDetails = {
      referenceId: 'REF' + Math.floor(Math.random() * 100000),
      date: selectedDate,
      mealType,
      items: [{
        name: dish.name,
        quantity: 1,
        price: dish.price,
        restaurant: dish.restaurant,
        image: dish.image
      }],
    };
    navigate('/Bookingconfirmation', { state: bookingDetails });
  };

  return (
    <div className="qsr-page">
      <nav className="qsr-navbar">
        <Link to="/" className="navbar-left">
          <img src="../assests/food.jpg" alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">Cafe Co</h1>
        </Link>
      </nav>

      <div className="booking-options">
        <label>📅 Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          min={min}
          max={max}
          onChange={e => setSelectedDate(e.target.value)}
        />

        <label>🍱 Select Meal Type:</label>
        <select value={mealType} onChange={e => setMealType(e.target.value)}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
        </select>
      </div>

      <h3 style={{ marginTop: '20px' }}>Available Dishes</h3>
      <div className="qsr-grid">
        {filteredDishes.map((dish, index) => (
          <div key={index} className="qsr-card">
            <img src={dish.image} alt={dish.name} className="qsr-image" />
            <h3>{dish.name}</h3>
            <p><strong>From:</strong> {dish.restaurant}</p>
            <p><strong>Price:</strong> ₹{dish.price}</p>
            <p><strong>Description:</strong> {dish.description}</p>
            <button className="view-btn" onClick={() => handleBookNow(dish)}>✅ Book</button>
          </div>
        ))}
      </div>
    </div>
  );
}
