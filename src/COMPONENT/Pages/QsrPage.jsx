// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './QsrPage.css';

// export default function QsrPage() {
//   const [restaurants, setRestaurants] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:5400/restaurants')
//       .then(res => setRestaurants(res.data))
//       .catch(err => console.error('Error loading QSR data:', err));
//   }, []);

//   // Group restaurants by city
//   const cityMap = restaurants.reduce((acc, rest) => {
//     if (!acc[rest.city]) {
//       acc[rest.city] = [];
//     }
//     acc[rest.city].push(rest);
//     return acc;
//   }, {});

//   return (
//     <div className="qsr-page">
//       <h2 className="qsr-title">QSR Express</h2>

//       {/* If no city is selected, show city cards */}
//       {!selectedCity ? (
//         <div className="qsr-grid">
//           {Object.entries(cityMap).map(([city, cityRestaurants]) => (
//             <div key={city} className="qsr-card">
//               <img
//                 src={cityRestaurants[0].image}
//                 alt={city}
//                 className="qsr-image"
//               />
//               <h3>{city.charAt(0).toUpperCase() + city.slice(1)}</h3>
//               <button
//                 className="view-btn"
//                 onClick={() => setSelectedCity(city)}
//               >
//                 View Restaurants
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <>
//           <button className="back-btn" onClick={() => setSelectedCity(null)}>⬅ Back to Cities</button>
//           <h3>Restaurants in {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}</h3>
//           <div className="qsr-grid">
//             {cityMap[selectedCity].map((rest) => (
//               <div key={rest.id} className="qsr-card">
//                 <img src={rest.image} alt={rest.restaurant} className="qsr-image" />
//                 <h3>{rest.restaurant}</h3>
//                 <ul>
//                   {rest.reviews.map((review, index) => (
//                     <li key={index}>
//                       <strong>{review.username}</strong>: {review.comment} ({review.rating}★)
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';


import axios from 'axios';
import './QsrPage.css';

export default function QsrPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

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
    setShowCart(false);
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowCart(false);
  };

  const goBack = () => {
    if (selectedRestaurant) {
      setSelectedRestaurant(null);
    } else {
      setSelectedCity(null);
    }
    setShowCart(false);
  };

  const handleAddToCart = (dish) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === dish.name);
      if (existing) {
        return prev.map(item =>
          item.name === dish.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...dish, quantity: 1 }];
      }
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);



  return (
    <div className="qsr-page">
      {/* ✅ Navbar */}
      <nav className="qsr-navbar">
        <h2 className="qsr-title">QSR Express</h2>
        <button className="cart-icon" onClick={(Cart) => setShowCart(!showCart)}>
          🛒 {totalItems}
        </button>
        {/* <button className="cart-icon" onClick={() => navigate('/cart')}>
  🛒 {totalItems}
</button> */}

      </nav>

      {/* ✅ Cart View Toggle
      {showCart && (
        <div className="cart-page">
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p>No dishes in cart yet.</p>
          ) : (
            <div className="qsr-grid">
              {cart.map((dish, i) => (
                <div key={i} className="qsr-card">
                  <img src={dish.image} alt={dish.name} className="qsr-image" />
                  <h3>{dish.name}</h3>
                  <p><strong>Price:</strong> ₹{dish.price}</p>
                  <p><strong>Quantity:</strong> {dish.quantity}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )} */}

      {/* ✅ City Selection */}
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
      ) : (
        <>
          <button className="back-btn" onClick={goBack}>⬅ Back to Restaurants</button>
          <h3>Dishes at {selectedRestaurant.restaurant}</h3>
          <div className="qsr-grid">
            {selectedRestaurant.dishes.map((dish, index) => {
              const count = cart.find(item => item.name === dish.name)?.quantity || 0;
              return (
                <div key={index} className="qsr-card">
                  <img src={dish.image} alt={dish.name} className="qsr-image" />
                  <h3>{dish.name}</h3>
                  <p><strong>Price:</strong> ₹{dish.price}</p>
                  <p><strong>Description:</strong> {dish.description}</p>
                  <p><strong>Ingredients:</strong></p>
                  <ul>
                    {dish.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                  <button className="view-btn" onClick={() => handleAddToCart(dish)}>
                    Add to Cart ({count})
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
